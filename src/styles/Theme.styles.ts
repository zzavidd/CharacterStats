import type { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { palette } from './Palette.styles';

export const themeOptions: ThemeOptions = {
  palette,
  shape: {
    borderRadius: 10,
  },
  spacing: [
    0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768, 896,
    1024, 1152, 1280,
  ],
};

const theme = createTheme(themeOptions);
export default theme;
