import type { Dispatch, SetStateAction } from 'react';
import type { z } from 'zod';

import type { DamageClass, Type } from 'src/utils/constants/enums';
import type { zCharacter, zCharacterInput, zStats } from 'src/utils/validators';

declare global {
  export type Character = z.infer<typeof zCharacter>;
  export type CharacterInput = z.infer<typeof zCharacterInput>;
  export type Stats = z.infer<typeof zStats>;

  export type ReactDispatch<T> = Dispatch<SetStateAction<T>>;
  export type ReactUseState<T> = [T, ReactDispatch<T>];

  export type AbilityKey = 'ability1' | 'ability2' | 'abilityX';
  export type TypeKey = 'type1' | 'type2';

  export type PokeAbilityMap = Record<number, PokeAbility>;
  export type PokeMoveMap = Record<number, PokeMove>;

  export interface PokeMove {
    id: number;
    name: string;
    description: string;
    power: number | null;
    pp: number | null;
    accuracy: number | null;
    type: Type;
    damageClass: DamageClass;
    generation: number;
  }

  export interface PokeAbility {
    id: number;
    name: string;
    generation: number;
    description: string;
    commonType: Type;
  }
}
