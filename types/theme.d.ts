import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

import { PokeType } from 'src/utils/constants/enums';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }

  interface Palette {
    types: Record<`${PokeType}`, PaletteColor>;
  }
  interface PaletteOptions {
    types?: Record<`${PokeType}`, PaletteColorOptions>;
  }
}
