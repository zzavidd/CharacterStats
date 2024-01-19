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
  const min = Math.floor(Math.random() * 4);
  const max = Math.min(maxLevel, 100);

  const learnset = convertInputToLearnset(learnsetInput);
  const moveCount =
    Object.entries(learnset).reduce((acc, [level, moveIds]) => {
      if (level === '0') {
        return acc + moveIds.length;
      }
      return acc + 1;
    }, 0) - 1;

  const deviation = (max - min) / moveCount;
  const levels = Array.from({ length: moveCount }).map((_, i) =>
    Math.round(deviation * (i + 1)),
  );

  let levelIndex = 0;
  const newLearnset = Object.entries(learnset).flatMap(([key, moveIds]) => {
    const level = Number(key);
    if (level === 1) {
      return moveIds.map((moveId) => ({ level, moveId }));
    }

    return moveIds.map((moveId) => {
      const entry = { level: levels[levelIndex], moveId };
      levelIndex++;
      return entry;
    });
  });

  return newLearnset;
}
