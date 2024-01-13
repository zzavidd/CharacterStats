import { z } from 'zod';

import { DamageClass, Type } from './enums';

const BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv';

export const V2_ABILITIES = `${BASE_URL}/abilities.csv`;
export const V2_ABILITY_FLAVOR_TEXTS = `${BASE_URL}/ability_flavor_text.csv`;
export const V2_ABILITIES_BY_POKEMON = `${BASE_URL}/pokemon_abilities.csv`;

export const V2_MOVES = `${BASE_URL}/moves.csv`;
export const V2_MOVE_DAMAGE_CLASSES = `${BASE_URL}/move_damage_classes.csv`;
export const V2_MOVE_FLAVOR_TEXTS = `${BASE_URL}/move_flavor_text.csv`;

export const V2_TYPES = `${BASE_URL}/types.csv`;
export const V2_TYPES_BY_POKEMON = `${BASE_URL}/pokemon_types.csv`;

export const zAbilitiesResponse = z.object({
  id: z.number(),
  identifier: z.string(),
  generation_id: z.number(),
  is_main_series: z.coerce.boolean(),
});

export const zAbilityFlavorTextsResponse = z.object({
  ability_id: z.number(),
  language_id: z.number(),
  flavor_text: z.string(),
});

export const zMovesResponse = z.object({
  id: z.number(),
  identifier: z.string(),
  generation_id: z.number(),
  type_id: z.number(),
  power: z.number().nullable(),
  pp: z.number().nullable(),
  accuracy: z.number().nullable(),
  damage_class_id: z.number(),
});

export const zMoveDamageClassesResponse = z.object({
  id: z.number(),
  identifier: z.nativeEnum(DamageClass),
});

export const zMoveFlavorTextsResponse = z.object({
  move_id: z.number(),
  language_id: z.number(),
  flavor_text: z.string(),
  version_group_id: z.number(),
});

export const zPokemonAbilitiesResponse = z.object({
  pokemon_id: z.number(),
  ability_id: z.number(),
});
export const zPokemonTypesResponse = z.object({
  pokemon_id: z.number(),
  type_id: z.number(),
});

export const zTypesResponse = z.object({
  id: z.number(),
  identifier: z.nativeEnum(Type),
});
