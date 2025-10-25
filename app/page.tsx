'use client';

import { useState } from 'react';

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  // Sample posts data
  const samplePosts = [
    {
      id: 1,
      user: { name: 'Alex Johnson', avatar: 'AJ', online: true },
      time: '2 min ago',
      content: 'Just discovered this amazing platform! The 7-day expiry is genius 🔥',
      media: null,
      likes: 12,
      comments: 3,
      expiresIn: '6d 23h'
    },
    {
      id: 2,
      user: { name: 'Sarah Miller', avatar: 'SM', online: false },
      time: '1 hour ago',
      content: 'Beautiful sunset from my window today 🌅',
      media: 'sunset',
      likes: 45,
      comments: 8,
      expiresIn: '6d 22h'
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Mobile Header */}
      <header className="telegram-header p-4 md:hidden">
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
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="flex border-b border-[#e6e6e6] bg-white md:hidden">
        <button 
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'feed' ? 'text-[#0088cc] border-b-2 border-[#0088cc]' : 'text-[#707579]'
          }`}
          onClick={() => setActiveTab('feed')}
        >
          Feed
        </button>
        <button 
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'stories' ? 'text-[#0088cc] border-b-2 border-[#0088cc]' : 'text-[#707579]'
          }`}
          onClick={() => setActiveTab('stories')}
        >
          Stories
        </button>
        <button 
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'chats' ? 'text-[#0088cc] border-b-2 border-[#0088cc]' : 'text-[#707579]'
          }`}
          onClick={() => setActiveTab('chats')}
        >
          Chats
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          {/* Create Post Card */}
          <div className="telegram-card p-4 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0088cc] to-[#25d366] rounded-full flex items-center justify-center text-white font-bold">
                YT
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="flex-1 bg-[#f5f5f5] hover:bg-[#e5e5e5] text-[#707579] rounded-full py-3 px-4 text-left transition-colors"
              >
                What's happening? Share a moment...
              </button>
            </div>
            <div className="flex justify-around border-t border-[#e6e6e6] pt-3">
              <button className="flex items-center space-x-2 text-[#707579] hover:text-[#0088cc] transition-colors">
                <span>📸</span>
                <span>Photo/Video</span>
              </button>
              <button className="flex items-center space-x-2 text-[#707579] hover:text-[#25d366] transition-colors">
                <span>🎵</span>
                <span>Music</span>
              </button>
              <button className="flex items-center space-x-2 text-[#707579] hover:text-[#ff6b35] transition-colors">
                <span>📍</span>
                <span>Location</span>
              </button>
            </div>
          </div>

          {/* Sample Posts */}
          {samplePosts.map((post) => (
            <div key={post.id} className="telegram-card p-4 animate-fade-in">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                      {post.user.avatar}
                    </div>
                    {post.user.online && <div className="online-indicator"></div>}
                  </div>
                  <div>
                    <p className="font-medium text-[#000000]">{post.user.name}</p>
                    <p className="text-sm text-[#707579]">{post.time}</p>
                  </div>
                </div>
                <div className="bg-[#0088cc] text-white px-2 py-1 rounded-full text-xs font-medium">
                  {post.expiresIn}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-[#000000] mb-3">{post.content}</p>

              {/* Post Media */}
              {post.media && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center">
                    <span className="text-[#707579]">📸 Media Content</span>
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#e6e6e6]">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-[#707579] hover:text-red-500 transition-colors">
                    <span>❤️</span>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-[#707579] hover:text-[#0088cc] transition-colors">
                    <span>💬</span>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-[#707579] hover:text-[#25d366] transition-colors">
                    <span>🔄</span>
                  </button>
                </div>
                <button className="text-[#707579] hover:text-[#0088cc] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Welcome Card */}
          <div className="telegram-card p-6 text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-[#0088cc] to-[#25d366] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              🎉
            </div>
            <h2 className="text-xl font-bold text-[#000000] mb-2">Welcome to GenZ Day!</h2>
            <p className="text-[#707579] mb-4">
              Share moments that disappear in 7 days. Connect with friends in real-time with our unique ephemeral social experience.
            </p>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="telegram-button px-6 py-3 font-medium"
            >
              Create Your First Post
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="telegram-card w-full max-w-md">
            <div className="p-4 border-b border-[#e6e6e6]">
              <h2 className="text-xl font-bold text-[#000000]">Create Post</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#0088cc] to-[#25d366] rounded-full flex items-center justify-center text-white font-bold">
                  YT
                </div>
                <div>
                  <p className="font-medium text-[#000000]">Your Name</p>
                  <p className="text-sm text-[#707579]">Post will expire in 7 days</p>
                </div>
              </div>
              
              <textarea 
                placeholder="What's happening? Share your moment..."
                className="w-full h-32 p-3 border border-[#e6e6e6] rounded-lg resize-none focus:outline-none focus:border-[#0088cc]"
              />

              <div className="border-2 border-dashed border-[#e6e6e6] rounded-lg p-8 text-center mt-4">
                <div className="text-4xl text-[#707579] mb-2">📸</div>
                <p className="text-[#707579]">Add photos or video</p>
                <p className="text-sm text-[#707579] mt-1">Drag and drop or click to browse</p>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 py-3 border border-[#e6e6e6] text-[#707579] rounded-lg font-medium hover:bg-[#f5f5f5] transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-[#0088cc] text-white rounded-lg font-medium hover:bg-[#006ea6] transition-colors">
                  Post Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
