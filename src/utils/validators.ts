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
  type2: z.nativeEnum(Type).nullish(),
  ability1: z.number(),
  ability2: z.number().nullish(),
  abilityX: z.number().nullish(),
  stats: zStats,
  learnset: z.record(z.string(), z.number().array()),
  lastModified: z.number(),
  createTime: z.number(),
});

export const zCharacterInput = zCharacter
  .omit({
    id: true,
    lastModified: true,
    createTime: true,
  })
  .extend({
    universe: z.nativeEnum(Universe).optional(),
    type1: z.nativeEnum(Type).optional(),
    ability1: z.number().optional(),
    learnset: z.object({ level: z.number(), moveId: z.number() }).array(),
  });
