import { z } from 'zod';

import { PokeType, Stat, Universe } from './constants/enums';

const zStat = z.number().min(0).max(255);
export const zStats = z.object({
  [Stat.HP]: zStat,
  [Stat.ATTACK]: zStat,
  [Stat.DEFENCE]: zStat,
  [Stat.SPATK]: zStat,
  [Stat.SPDEF]: zStat,
  [Stat.SPEED]: zStat,
});
export const zLearnset = z.record(z.coerce.number(), z.number().array());
export const zLearnsetInput = z
  .object({ level: z.number().min(0).max(100), moveId: z.number() })
  .array();

export const zCharacter = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  universe: z.nativeEnum(Universe),
  type1: z.nativeEnum(PokeType),
  type2: z.nativeEnum(PokeType).nullable(),
  ability1: z.number().optional(),
  ability2: z.number().nullable(),
  abilityX: z.number().nullable(),
  stats: zStats,
  learnset: zLearnset,
  lastModified: z.number(),
  createTime: z.number(),
});

export const zCharacterWithErrors = zCharacter
  .pick({
    id: true,
    name: true,
    lastModified: true,
    createTime: true,
  })
  .extend({
    errors: z.object({ message: z.string() }).array(),
  });

export const zCharacterInput = zCharacter.extend({
  type1: z.nativeEnum(PokeType).optional(),
  universe: z.nativeEnum(Universe),
  learnset: zLearnsetInput,
  lastModified: z.number().optional(),
  createTime: z.number().optional(),
});
