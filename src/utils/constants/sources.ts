import { z } from 'zod';

const BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv';

export const V2_ABILITIES = `${BASE_URL}/abilities.csv`;
export const V2_ABILITY_FLAVOR_TEXTS = `${BASE_URL}/ability_flavor_text.csv`;
export const V2_ABILITIES_BY_POKEMON = `${BASE_URL}/pokemon_abilities.csv`;

export const V2_TYPES = `${BASE_URL}/types.csv`;
export const V2_TYPES_BY_POKEMON = `${BASE_URL}/pokemon_types.csv`;

export const zAbilityResponse = z.object({
  id: z.number(),
  identifier: z.string(),
  generation_id: z.number(),
  is_main_series: z.coerce.boolean(),
});

export const zAbilityFlavorTextResponse = z.object({
  ability_id: z.number(),
  language_id: z.number(),
  flavor_text: z.string(),
});

export const zPokemonAbilitiesResponse = z.object({
  pokemon_id: z.number(),
  ability_id: z.number(),
});
export const zPokemonTypesResponse = z.object({
  pokemon_id: z.number(),
  type_id: z.number(),
});

export const zTypeResponse = z.object({
  id: z.number(),
  identifier: z.string(),
});
