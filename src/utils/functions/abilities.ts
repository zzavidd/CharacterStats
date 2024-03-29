import { capitalCase } from 'change-case';

import { PokeType } from '../constants/enums';
import {
  V2_ABILITIES,
  V2_ABILITIES_BY_POKEMON,
  V2_ABILITY_FLAVOR_TEXTS,
  V2_TYPES_BY_POKEMON,
  zAbilitiesResponse,
  zAbilityFlavorTextsResponse,
  zPokemonAbilitiesResponse,
  zPokemonTypesResponse,
} from '../constants/sources';

import { getSource } from '.';

export default async function getAbilities(): Promise<PokeAbilityMap> {
  const [v2a, v2b, v2c, v2d] = await Promise.all([
    getSource(V2_ABILITIES, zAbilitiesResponse),
    getSource(V2_ABILITY_FLAVOR_TEXTS, zAbilityFlavorTextsResponse),
    getSource(V2_ABILITIES_BY_POKEMON, zPokemonAbilitiesResponse),
    getSource(V2_TYPES_BY_POKEMON, zPokemonTypesResponse),
  ]);

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
        [a.ability_id]: a.flavor_text
          .replaceAll('\n', ' ')
          .replaceAll('Pokémon', 'character'),
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
          commonType: commonTypeId || PokeType.UNKNOWN,
        },
      };
    }, {});

  return abilities;
}
