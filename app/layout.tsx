import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenZ Day - Share Moments That Last 7 Days',
  description: 'The next-gen social platform where your photos and videos disappear after 7 days. Connect with friends in real-time.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-[#f0f2f5]`}>
        <div className="flex h-screen">
          {/* Sidebar - Telegram Style */}
          <aside className="w-80 bg-white border-r border-[#e6e6e6] hidden md:flex flex-col">
            {/* Sidebar Header */}
            <div className="telegram-header p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">GZ</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">GenZ Day</h1>
                    <p className="text-white/80 text-sm">Online</p>
                  </div>
                </div>
                <button className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex border-b border-[#e6e6e6]">
              <button className="flex-1 py-3 text-center text-[#0088cc] border-b-2 border-[#0088cc] font-medium">
                Feed
              </button>
              <button className="flex-1 py-3 text-center text-[#707579] hover:text-[#0088cc] transition-colors">
                Stories
              </button>
              <button className="flex-1 py-3 text-center text-[#707579] hover:text-[#0088cc] transition-colors">
                Chats
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#f5f5f5] transition-colors text-left">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0088cc] to-[#25d366] rounded-full flex items-center justify-center text-white">
                  📸
                </div>
                <div>
                  <p className="font-medium text-[#000000]">Create Post</p>
                  <p className="text-sm text-[#707579]">Share a moment</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#f5f5f5] transition-colors text-left">
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff6b35] to-[#8b5cf6] rounded-full flex items-center justify-center text-white">
                  👥
                </div>
                <div>
                  <p className="font-medium text-[#000000]">Friends</p>
                  <p className="text-sm text-[#707579]">12 active now</p>
                </div>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="flex-1 p-4">
              <h3 className="font-medium text-[#707579] text-sm mb-3">RECENT</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        User
                      </div>
                      <div className="online-indicator"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#000000] truncate">Friend {item}</p>
                      <p className="text-sm text-[#707579] truncate">Active now</p>
                    </div>
                    <div className="w-2 h-2 bg-[#25d366] rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-[#e6e6e6]">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0088cc] to-[#25d366] rounded-full flex items-center justify-center text-white font-bold">
                  YT
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#000000] truncate">Your Name</p>
                  <p className="text-sm text-[#707579] truncate">@username</p>
                </div>
                <button className="text-[#707579] hover:text-[#0088cc] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-h-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
