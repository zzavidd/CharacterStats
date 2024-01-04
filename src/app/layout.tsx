import { getServerSession } from 'next-auth';
import CSProvider from 'src/fragments/Providers/CSProvider';

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getServerSession();
  return (
    <html lang={'en'}>
      <body>
        <CSProvider session={session}>{children}</CSProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Character Stats',
};
