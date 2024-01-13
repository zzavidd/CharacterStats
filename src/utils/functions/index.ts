import { SxProps, Theme, alpha } from '@mui/material';
import Papa from 'papaparse';
import { z } from 'zod';
import { Type } from '../constants/enums';

export { default as getAbilities } from './abilities';
export { default as getMoves } from './moves';

export function calculateBST(stats: Stats): number {
  return Object.values(stats).reduce((bst, value: unknown) => {
    if (value) {
      bst += parseInt(value as string);
    }
    return bst;
  }, 0);
}

export async function getSource<T extends {}>(
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

export function getMenuItemSx(type: Type): SxProps<Theme> {
  return {
    'backgroundColor': (t) => alpha(t.palette.types[type].dark, 0.8),
    '&:hover': {
      backgroundColor: (t) => t.palette.types[type].main,
    },
  };
}
