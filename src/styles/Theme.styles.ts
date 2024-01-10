import type { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import components from './Components.styles';
import { palette } from './Palette.styles';
import typography from './Typography.styles';

export const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    },
  },
  components,
  palette,
  shape: {
    borderRadius: 10,
  },
  spacing: [
    0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768, 896,
    1024, 1152, 1280,
  ],
  typography,
};

const theme = createTheme(themeOptions);
export default theme;
