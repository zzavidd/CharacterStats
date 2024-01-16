import { Metadata, Viewport } from 'next';

import CSProvider from 'src/fragments/Providers/CSProvider';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang={'en'}>
      <body>
        <CSProvider>{children}</CSProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Character Stats',
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  width: 'device-width',
};
