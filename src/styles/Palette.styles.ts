import type { PaletteOptions } from '@mui/material';
import { indigo } from '@mui/material/colors';

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
};
