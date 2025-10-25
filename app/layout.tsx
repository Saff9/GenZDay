import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenZ Day - Your moments, your week, your way',
  description: 'Share your moments that last for 7 days. Connect with friends and experience ephemeral content sharing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-telegram-light to-white dark:from-telegram-dark dark:to-gray-900">
          {children}
        </div>
      </body>
    </html>
  );
}
