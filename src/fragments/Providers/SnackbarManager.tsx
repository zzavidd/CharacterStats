import type { AlertColor } from '@mui/material';
import { Alert, Fade, useTheme } from '@mui/material';
import type { CustomContentProps } from 'notistack';
import { SnackbarProvider } from 'notistack';
import React from 'react';

export default function SnackbarManager({ children }: React.PropsWithChildren) {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      autoHideDuration={5000}
      Components={{
        success: Snack,
        warning: Snack,
        error: Snack,
        info: Snack,
      }}
      maxSnack={2}
      preventDuplicate={true}
      TransitionComponent={Fade}
      transitionDuration={300}>
      {children}
    </SnackbarProvider>
  );
}

const Snack = React.forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message, variant, style }, ref) => {
    const theme = useTheme();
    return (
      <Alert
        variant={theme.palette.mode === 'light' ? 'filled' : 'standard'}
        severity={variant as AlertColor}
        ref={ref}
        sx={{ maxWidth: (t) => t.spacing(14) }}
        style={style}>
        {message}
      </Alert>
    );
  },
);
