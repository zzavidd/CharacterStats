import type { PaletteColor, PaletteOptions } from '@mui/material';
import { indigo } from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';

import { COLOR_TYPE } from 'src/utils/constants/colors';
import { Type } from 'src/utils/constants/enums';

const typePalette = Object.values(Type).reduce(
  (acc, type) => {
    return {
      ...acc,
      [type]: createPalette({ contrastThreshold: 4.4 }).augmentColor({
        color: { main: COLOR_TYPE[type] },
      }),
    };
  },
  {} as Record<`${Type}`, PaletteColor>,
);

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#7767ee',
  },
  secondary: {
    main: indigo[100],
  },
  background: {
    paper: 'rgb(17, 17, 17)',
  },
  divider: 'rgba(255,255,255,0.3)',
  contrastThreshold: 4.4,
  types: typePalette,
};
