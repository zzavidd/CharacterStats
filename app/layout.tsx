import ThemeManager from 'src/fragments/ThemeManager';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang={'en'}>
      <body>
        <ThemeManager>{children}</ThemeManager>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Character Stats',
};
