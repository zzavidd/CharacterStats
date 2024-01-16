import { SxProps, Theme, alpha } from '@mui/material';
import Papa from 'papaparse';
import { z } from 'zod';

import { PokeType, TypeName } from '../constants/enums';

export { default as getAbilities } from './abilities';
export { default as getMoves } from './moves';
export { default as getTypes } from './types';

export function calculateBST(stats: Stats): number {
  return Object.values(stats).reduce((bst, value: unknown) => {
    if (value) {
      bst += parseInt(value as string);
    }
    return bst;
  }, 0);
}

export function convertInputToLearnset(learnsetInput: LearnsetInput): Learnset {
  return learnsetInput.reduce<Learnset>((acc, a) => {
    return { ...acc, [a.level]: [...(acc[a.level] || []), a.moveId] };
  }, {});
}

export function convertLearnsetToInput(learnset: Learnset): LearnsetInput {
  return Object.entries(learnset).flatMap(([level, moveIds]) =>
    moveIds.map((moveId) => ({ level: Number(level), moveId })),
  );
}

export async function getSource<T extends Record<string, any>>(
  source: string,
  validator: z.ZodObject<T>,
): Promise<z.infer<z.ZodObject<T>>[]> {
  const res = await fetch(source).then((r) => r.text());
  const { data } = Papa.parse<T>(res, {
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
  });
  return data.map((d) => validator.parse(d));
}

export function getMenuItemSx(type: PokeType): SxProps<Theme> {
  return {
    'backgroundColor': (t) => alpha(t.palette[TypeName[type]].dark, 0.8),
    '&:hover': {
      backgroundColor: (t) => t.palette[TypeName[type]].main,
    },
    'py': 4,
  };
}

export function spreadMoves(
  learnsetInput: LearnsetInput,
  maxLevel: number,
): LearnsetInput {
  const min = 2;
  const max = Math.min(maxLevel, 100);

  const learnset = convertInputToLearnset(learnsetInput);
  delete learnset['0'];
  const moveCount = Object.keys(learnset).length;

  const deviation = (max - min) / moveCount;

  let currentLevel = 1;
  const newLearnset = Object.entries(learnset).flatMap(([key, moveIds]) => {
    const level = Number(key);
    if (level === 1) {
      return moveIds.map((moveId) => ({ level, moveId }));
    }

    const coefficient = deviation - Math.floor(deviation);
    const interval =
      Math.random() < coefficient
        ? Math.floor(deviation)
        : Math.ceil(deviation);
    currentLevel += interval;
    const newLevel = Math.min(currentLevel, max);

    return moveIds.map((moveId) => ({ level: newLevel, moveId }));
  });

  return newLearnset;
}
