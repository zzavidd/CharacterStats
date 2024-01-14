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

export const metadata = {
  title: 'Character Stats',
};
