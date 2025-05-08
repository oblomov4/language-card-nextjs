import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { roboto } from '@/shared/fonts';
import '@/shared/scss/app.scss';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  description: 'Записывай, повторяй и изучай новые иностранные слова вместе с Language Card!',
  applicationName: 'Language Card',
  keywords: [
    'language card',
    'учить слова',
    'как быстро запоминать иностранные слова',
    'учить язык',
    'английский язык',
    'испанский язык',
    'приложение для изучения слов',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Analytics />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
