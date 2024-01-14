'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'src/utils/reducers';

import SnackbarManager from './SnackbarManager';
import ThemeManager from './ThemeManager';

export default function CSProvider({ children }: React.PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeManager>
          <SnackbarManager>{children}</SnackbarManager>
        </ThemeManager>
      </PersistGate>
    </Provider>
  );
}
