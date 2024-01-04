'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'src/utils/reducers';

import ThemeManager from './ThemeManager';

export default function CSProvider({ children, session }: CSProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <ThemeManager>{children}</ThemeManager>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}

interface CSProviderProps extends React.PropsWithChildren {
  session: Session | null;
}
