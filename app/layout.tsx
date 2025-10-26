import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from '@/hooks/useSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenZ Day - Share Moments That Last 7 Days',
  description: 'The ultimate ephemeral social platform for GenZ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
