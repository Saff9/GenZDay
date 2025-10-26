'use client';

import { useState } from 'react';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Sample posts data
  const posts = [
    {
      id: '1',
      mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Welcome+To+GenZ+Day',
      caption: 'Welcome to GenZ Day! Share moments that disappear in 7 days 🎉',
      user: { name: 'GenZ Team', avatar: 'GZ' },
      likes: 23,
      comments: 5,
      isLiked: false
    },
    {
      id: '2', 
      mediaUrl: 'https://placehold.co/600x400/25d366/white?text=Beach+Day+🏖️',
      caption: 'Beautiful day at the beach! Perfect weather ☀️',
      user: { name: 'Sarah', avatar: 'SA' },
      likes: 45,
      comments: 8,
      isLiked: true
    }
  ];

  const handleLike = (postId: string) => {
    // Like functionality would go here
    console.log('Liked post:', postId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                GZ
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">GenZ Day</h1>
                <p className="text-gray-600">Your moments, your week, your way</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Create Post
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6">
            👋
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GenZ Day!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Share photos and videos that disappear after 7 days. 
            Connect with friends in real-time.
          </p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all transform hover:scale-105"
          >
            🚀 Start Sharing Now
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Upload & Share</h3>
            <p className="text-gray-600">Post photos and videos that disappear in 7 days</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">7-Day Magic</h3>
            <p className="text-gray-600">Content automatically vanishes after one week</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">GenZ Focused</h3>
            <p className="text-gray-600">Built for the next generation of social media</p>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                  {post.user.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{post.user.name}</h3>
                  <p className="text-gray-500">Just now • 7d left</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg mb-4">{post.caption}</p>
              
              <img 
                src={post.mediaUrl} 
                alt="Post" 
                className="w-full rounded-xl mb-4"
              />
              
              <div className="flex space-x-6 text-gray-600">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <span className="text-2xl">{post.isLiked ? '❤️' : '🤍'}</span>
                  <span>{post.likes} likes</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <span className="text-2xl">💬</span>
                  <span>{post.comments} comments</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Post</h2>
            
            <textarea
              placeholder="What's happening? Share your moment..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 mb-4 text-lg"
              rows={4}
            />
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4">
              <div className="text-4xl text-gray-400 mb-2">📸</div>
              <p className="text-gray-500">Add photos or videos</p>
              <p className="text-sm text-gray-400 mt-2">Click to upload (demo mode)</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Post created successfully! 🎉');
                  setIsCreateModalOpen(false);
                }}
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Post Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-600">
        <p>Made with ❤️ for GenZ • Your moments, your week, your way</p>
      </footer>
    </div>
  );
}
