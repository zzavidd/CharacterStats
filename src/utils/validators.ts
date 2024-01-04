import { z } from 'zod';

import { Stat, Type, Universe } from './constants/enums';

export const zStats = z.object({
  [Stat.HP]: z.number(),
  [Stat.ATTACK]: z.number(),
  [Stat.DEFENCE]: z.number(),
  [Stat.SPATK]: z.number(),
  [Stat.SPDEF]: z.number(),
  [Stat.SPEED]: z.number(),
});

export const zCharacter = z.object({
  id: z.string().optional(),
  name: z.string(),
  universe: z.nativeEnum(Universe),
  type1: z.nativeEnum(Type),
  type2: z.nativeEnum(Type).nullable(),
  ability1: z.number().nullable(),
  ability2: z.number().nullable(),
  abilityX: z.number().nullable(),
  stats: zStats,
  learnset: z.record(z.string(), z.number().array()),
  lastModified: z.number(),
  createTime: z.number(),
});

export const zCharacterUpdateInput = zCharacter.omit({ createTime: true });
