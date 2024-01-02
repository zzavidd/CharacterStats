
export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Character Stats',
};
