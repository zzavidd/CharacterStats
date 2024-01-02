import type { PaletteOptions } from '@mui/material';
import { indigo, purple } from '@mui/material/colors';

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: purple['A100'],
  },
  secondary: {
    main: indigo[100],
  },
  background: {
    paper: 'rgb(17, 17, 17)',
  },
  divider: 'rgba(255,255,255,0.3)',
  contrastThreshold: 4.4,
};
