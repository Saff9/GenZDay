import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenZ Day - Your moments, your week, your way',
  description: 'Share your moments that last for 7 days. Connect with friends and experience ephemeral content sharing.',
  keywords: 'social media, ephemeral, photos, videos, genz',
  authors: [{ name: 'GenZ Day Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-telegram-light to-white dark:from-telegram-dark dark:to-gray-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
