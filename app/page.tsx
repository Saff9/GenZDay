'use client';

import { useState } from 'react';
import UploadModal from '@/components/UploadModal';
import PostFeed from '@/components/PostFeed';

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GZ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GenZ Day
                  </h1>
                  <p className="text-sm text-gray-500">Ephemeral social sharing</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>📸</span>
                <span>Create Post</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl text-blue-600 mb-2">📸</div>
              <p className="text-sm text-gray-600">Posts Today</p>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl text-green-600 mb-2">👥</div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl text-purple-600 mb-2">⏰</div>
              <p className="text-sm text-gray-600">Content Expires In</p>
              <p className="text-2xl font-bold text-gray-800">7 Days</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl text-orange-600 mb-2">🚀</div>
              <p className="text-sm text-gray-600">App Status</p>
              <p className="text-xl font-bold text-green-600">Live</p>
            </div>
          </div>

          {/* Feed */}
          <PostFeed />
        </div>

        {/* Upload Modal */}
        <UploadModal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
        />
      </main>
    </>
  );
}
