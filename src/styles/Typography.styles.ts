import type { TypographyOptions } from '@mui/material/styles/createTypography';
import { DM_Sans } from 'next/font/google';

export const kanit = DM_Sans({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  style: ['normal'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const typography: TypographyOptions = {
  fontWeightLight: '500',
  fontFamily: kanit.style.fontFamily,
  h2: {
    fontSize: 24,
  },
};

export default typography;
