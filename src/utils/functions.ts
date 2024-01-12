import { capitalCase } from 'change-case';
import Papa from 'papaparse';
import { z } from 'zod';
import { Type } from './constants/enums';
import {
  V2_ABILITIES,
  V2_ABILITIES_BY_POKEMON,
  V2_ABILITY_FLAVOR_TEXTS,
  V2_TYPES,
  V2_TYPES_BY_POKEMON,
  zAbilityFlavorTextResponse,
  zAbilityResponse,
  zPokemonAbilitiesResponse,
  zPokemonTypesResponse,
  zTypeResponse,
} from './constants/sources';

export async function getAbilities(): Promise<Record<number, PokeAbility>> {
  const [v2a, v2b, v2c, v2d, v2e] = await Promise.all([
    getSource(V2_ABILITIES, zAbilityResponse),
    getSource(V2_ABILITY_FLAVOR_TEXTS, zAbilityFlavorTextResponse),
    getSource(V2_ABILITIES_BY_POKEMON, zPokemonAbilitiesResponse),
    getSource(V2_TYPES_BY_POKEMON, zPokemonTypesResponse),
    getSource(V2_TYPES, zTypeResponse),
  ]);

  const types = v2e.reduce<Record<number, string>>(
    (acc, a) => ({ ...acc, [a.id]: a.identifier }),
    {},
  );

  const typePerPokemon = v2d.reduce<Record<number, number[]>>(
    (acc, a) => ({
      ...acc,
      [a.pokemon_id]: [...(acc[a.pokemon_id] || []), a.type_id],
    }),
    {},
  );

  const pokemonPerAbility = v2c.reduce<Record<number, number[]>>(
    (acc, a) => ({
      ...acc,
      [a.ability_id]: [...(acc[a.ability_id] || []), a.pokemon_id],
    }),
    {},
  );

  const abilityDescriptions = v2b
    .filter((e) => e.language_id === 9)
    .reduce<Record<number, string>>(
      (acc, a) => ({
        ...acc,
        [a.ability_id]: a.flavor_text.replaceAll('\n', ' '),
      }),
      {},
    );

  const abilities = v2a
    .filter((a) => a.is_main_series)
    .filter((a) => pokemonPerAbility[a.id])
    .reduce<PokeAbilityMap>((acc, a) => {
      const abilityTypes = pokemonPerAbility[a.id].flatMap(
        (p) => typePerPokemon[p],
      );
      const commonTypeId = abilityTypes
        .sort(
          (a, b) =>
            abilityTypes.filter((t) => t === a).length -
            abilityTypes.filter((t) => t === b).length,
        )
        .pop();
      return {
        ...acc,
        [a.id]: {
          id: a.id,
          name: capitalCase(a.identifier),
          generation: a.generation_id,
          description: abilityDescriptions[a.id],
          commonType: commonTypeId
            ? (capitalCase(types[commonTypeId]) as Type)
            : Type.UNKNOWN,
        },
      };
    }, {});

  return abilities;
}

export function calculateBST(stats: Stats): number {
  return Object.values(stats).reduce((bst, value: unknown) => {
    if (value) {
      bst += parseInt(value as string);
    }
    return bst;
  }, 0);
}

async function getSource<T extends {}>(
  source: string,
  validator: z.ZodObject<T>,
): Promise<z.infer<z.ZodObject<T>>[]> {
  const res = await fetch(source, { next: { revalidate: 24 * 60 * 60 } }).then(
    (r) => r.text(),
  );
  const { data } = Papa.parse<T>(res, {
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
  });
  return data.map((d) => validator.parse(d));
}
