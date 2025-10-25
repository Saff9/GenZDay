import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenZ Day - Share Moments That Vanish in 7 Days',
  description: 'The ultimate ephemeral social platform. Share photos and videos that disappear after one week.',
  keywords: 'social media, ephemeral, photos, videos, genz, 7 days',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-telegram-bg`}>
        <Providers>
          <div className="flex h-screen">
            {/* Desktop Sidebar */}
            <aside className="w-80 bg-white border-r border-telegram-border hidden lg:flex flex-col">
              <Sidebar />
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0">
              {/* Mobile Header */}
              <header className="telegram-header p-4 lg:hidden">
                <MobileHeader />
              </header>
              
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <>
      <div className="telegram-header p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">GZ</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">GenZ Day</h1>
            <p className="text-white/80 text-sm">Your moments, your week</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon="🏠" label="Feed" active />
        <NavItem icon="📸" label="Stories" />
        <NavItem icon="💬" label="Messages" />
        <NavItem icon="👥" label="Friends" />
        <NavItem icon="🎯" label="Discover" />
        <NavItem icon="⭐" label="Favorites" />
        <NavItem icon="⚡" label="Streaks" />
      </nav>

      <div className="p-4 border-t border-telegram-border">
        <UserProfile />
      </div>
    </>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <button className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
      active ? 'bg-telegram-blue text-white' : 'text-telegram-text-secondary hover:bg-telegram-border'
    }`}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function MobileHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">GZ</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">GenZ Day</h1>
          <p className="text-white/80 text-sm">12 online</p>
        </div>
      </div>
      <button className="text-white/80 hover:text-white transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-telegram-border transition-colors cursor-pointer">
      <div className="w-10 h-10 bg-gradient-to-r from-telegram-blue to-whatsapp-green rounded-full flex items-center justify-center text-white font-bold">
        YT
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-telegram-text truncate">Your Name</p>
        <p className="text-sm text-telegram-text-secondary truncate">@username</p>
      </div>
    </div>
  );
}
