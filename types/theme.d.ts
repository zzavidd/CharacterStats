import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

import { Type } from 'src/utils/constants/enums';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }

  interface Palette {
    types: Record<`${Type}`, PaletteColor>;
  }
  interface PaletteOptions {
    types?: Record<`${Type}`, PaletteColorOptions>;
  }
}
