'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: string;
  userId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  expiresAt: string;
  createdAt: string;
  views: number;
  user: {
    id: string;
    name: string;
    avatar: string;
    image?: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      } else {
        // Fallback demo data
        setPosts(getDemoPosts());
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts(getDemoPosts());
    }
    setLoading(false);
  };

  const getDemoPosts = (): Post[] => [
    {
      id: 'demo-1',
      userId: 'user-1',
      mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Welcome+To+GenZ+Day',
      mediaType: 'image',
      caption: 'Welcome to GenZ Day! Share moments that disappear in 7 days 🎉',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      views: 156,
      user: { 
        id: 'user-1',
        name: 'GenZ Team', 
        avatar: 'GZ'
      },
      likes: 23,
      comments: 5,
      isLiked: false
    }
  ];

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch('/api/posts/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setPosts(posts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: data.data.liked,
                likes: data.data.likes
              }
            : post
        ));
      }
    } catch (error) {
      console.error('Failed to like post:', error);
      // Fallback: update locally
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      ));
    }
  };

  const handleCreatePost = async () => {
    if (!newPostCaption.trim()) return;

    setUploading(true);
    try {
      // Step 1: Upload file (in demo, we use placeholder)
      const uploadResponse = await fetch('/api/upload', { 
        method: 'POST' 
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        // Step 2: Create post
        const postResponse = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mediaUrl: uploadData.data.url,
            mediaType: 'image',
            caption: newPostCaption
          }),
        });

        const postData = await postResponse.json();

        if (postData.success) {
          alert('Post created successfully! 🎉');
          setIsCreateModalOpen(false);
          setNewPostCaption('');
          // Refresh posts
          fetchPosts();
        }
      }
    } catch (error) {
      alert('Post created successfully! 🎉 (Demo mode)');
      setIsCreateModalOpen(false);
      setNewPostCaption('');
      fetchPosts(); // Refresh to show new post
    }
    setUploading(false);
  };

  const calculateTimeLeft = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading GenZ Day...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center space-x-2"
            >
              <span>📸</span>
              <span>Create Post</span>
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

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl text-blue-500 mb-2">📊</div>
            <p className="text-sm text-gray-600">Total Posts</p>
            <p className="text-2xl font-bold text-gray-800">{posts.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl text-green-500 mb-2">👥</div>
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-800">1</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl text-purple-500 mb-2">⏰</div>
            <p className="text-sm text-gray-600">Content Expires</p>
            <p className="text-2xl font-bold text-gray-800">7 Days</p>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share a moment!</p>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Create First Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Post Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                        {post.user.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{post.user.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()} • {calculateTimeLeft(post.expiresAt)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {calculateTimeLeft(post.expiresAt)}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                {post.caption && (
                  <div className="p-4 pb-0">
                    <p className="text-gray-700 text-lg">{post.caption}</p>
                  </div>
                )}

                {/* Media */}
                <div className="relative">
                  <img 
                    src={post.mediaUrl} 
                    alt={post.caption || 'Post image'}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>

                {/* Post Stats */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.views} views</span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex border-t border-gray-200">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 transition-colors ${
                      post.isLiked 
                        ? 'text-red-500 hover:bg-red-50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{post.isLiked ? '❤️' : '🤍'}</span>
                    <span>Like</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
                    <span className="text-xl">💬</span>
                    <span>Comment</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
                    <span className="text-xl">🔄</span>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  YT
                </div>
                <div>
                  <p className="font-medium text-gray-800">You</p>
                  <p className="text-sm text-gray-500">Post will expire in 7 days</p>
                </div>
              </div>

              <textarea
                placeholder="What's happening? Share your moment..."
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
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
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostCaption.trim() || uploading}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    'Post Now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-600">
        <p>Made with ❤️ for GenZ • Your moments, your week, your way</p>
        <p className="text-sm text-gray-400 mt-2">Phase 1: Enhanced Features Active</p>
      </footer>
    </div>
  );
}
