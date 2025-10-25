import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenZ Day - Share Moments That Last 7 Days',
  description: 'The next-gen social platform where your photos and videos disappear after 7 days. Join the GenZ revolution!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600">
              Made with ❤️ for GenZ • Your moments, your week, your way
            </p>
            <p className="text-sm text-gray-400 mt-2">
              © 2024 GenZ Day. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
