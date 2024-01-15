import type { Components, Theme } from '@mui/material';

const components: Components<Theme> = {
  MuiButton: {
    defaultProps: {
      sx: {
        fontWeight: 700,
        py: 2,
      },
    },
  },
  MuiMenuList: {
    defaultProps: {
      disablePadding: true,
    },
  },
};

export default components;
