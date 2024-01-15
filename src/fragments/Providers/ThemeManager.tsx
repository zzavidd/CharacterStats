'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import theme from 'src/styles/Theme.styles';

export default function ThemeManager({ children }: React.PropsWithChildren) {
  return (
    <AppRouterCacheProvider
      options={{
        ...(process.env.NEXT_PUBLIC_APP_ENV === 'development' && {
          stylisPlugins: [],
        }),
      }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
