import { SxProps, Theme, alpha, useTheme } from '@mui/material';
import Papa from 'papaparse';
import { useFormContext } from 'react-hook-form';
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

export function getMenuItemSx(type: PokeType): SxProps<Theme> {
  return {
    'backgroundColor': (t) => alpha(t.palette[TypeName[type]].dark, 0.8),
    '&:hover': {
      backgroundColor: (t) => t.palette[TypeName[type]].main,
    },
  };
}

export function useTypeColorToken(): {
  token?: (typeof TypeName)[keyof typeof TypeName];
  color?: string;
} {
  const { watch } = useFormContext<CharacterInput>();
  const { type1 } = watch();
  const t = useTheme();
  return {
    token: type1 ? TypeName[type1] : undefined,
    color: type1 ? t.palette[TypeName[type1]].main : undefined,
  };
}
