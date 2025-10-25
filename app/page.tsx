'use client';

import { useState } from 'react';
import PostFeed from '@/components/PostFeed';
import CreatePostModal from '@/components/CreatePostModal';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                GZ
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GenZ Day</h1>
                <p className="text-sm text-gray-500">Your moments, your week</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Create Post
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
            👋
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to GenZ Day!</h2>
          <p className="text-gray-600 mb-4">
            Share photos and videos that disappear after 7 days. Connect with friends and make every moment count.
          </p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start Sharing Now
          </button>
        </div>

        {/* Post Feed */}
        <PostFeed />
      </main>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
