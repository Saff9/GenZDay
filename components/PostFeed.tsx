'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  createdAt: string;
  expiresAt: string;
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch posts');
    }
    setLoading(false);
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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
          <p className="text-gray-500">Be the first to share a moment!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    GZ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">GenZ User</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {calculateTimeLeft(post.expiresAt)}
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="relative">
              {post.mediaType === 'image' ? (
                <img 
                  src={post.mediaUrl} 
                  alt={post.caption || 'Post image'}
                  className="w-full h-auto max-h-96 object-cover"
                />
              ) : (
                <video 
                  src={post.mediaUrl}
                  controls
                  className="w-full h-auto max-h-96 object-cover"
                />
              )}
            </div>

            {/* Caption & Actions */}
            <div className="p-4">
              {post.caption && (
                <p className="text-gray-800 mb-3">{post.caption}</p>
              )}
              
              <div className="flex space-x-4 pt-3 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                  <span>❤️</span>
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <span>💬</span>
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <span>🔄</span>
                  <span>Repost</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
