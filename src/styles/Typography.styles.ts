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
  fontFamily: kanit.style.fontFamily,
  fontSize: 13,
  h1: {
    fontSize: 28,
    marginBottom: 18,
  },
  h2: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 4,
  },
  h6: {
    fontSize: 15,
  },
};

export default typography;
