'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Post {
  id: string;
  userId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  expiresAt: string;
  createdAt: string;
  views: number;
  user?: {
    name: string;
    image?: string;
  };
  likes?: number;
  comments?: number;
  isLiked?: boolean;
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

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

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        // Update local state
        setPosts(posts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: data.data.liked,
                likes: data.data.liked ? (post.likes || 0) + 1 : (post.likes || 1) - 1
              }
            : post
        ));
      }
    } catch (error) {
      console.error('Failed to like post');
    }
  };

  const calculateTimeLeft = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telegram-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-telegram-text-secondary mb-2">No posts yet</h3>
          <p className="text-telegram-text-secondary">Be the first to share a moment!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="telegram-card overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-telegram-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-telegram-blue to-whatsapp-green rounded-full flex items-center justify-center text-white font-bold">
                    {post.user?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-telegram-text">{post.user?.name || 'Anonymous'}</p>
                    <p className="text-sm text-telegram-text-secondary">
                      {new Date(post.createdAt).toLocaleDateString()} • {calculateTimeLeft(post.expiresAt)} left
                    </p>
                  </div>
                </div>
                <button className="text-telegram-text-secondary hover:text-telegram-text transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Post Content */}
            {post.caption && (
              <div className="p-4 pb-0">
                <p className="text-telegram-text">{post.caption}</p>
              </div>
            )}

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

            {/* Post Stats */}
            <div className="p-4 border-t border-telegram-border">
              <div className="flex items-center justify-between text-sm text-telegram-text-secondary">
                <span>{post.likes || 0} likes</span>
                <span>{post.comments || 0} comments</span>
                <span>{post.views || 0} views</span>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex border-t border-telegram-border">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 transition-colors ${
                  post.isLiked 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-telegram-text-secondary hover:bg-telegram-border'
                }`}
              >
                <span>{post.isLiked ? '❤️' : '🤍'}</span>
                <span>Like</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-3 text-telegram-text-secondary hover:bg-telegram-border transition-colors">
                <span>💬</span>
                <span>Comment</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-3 text-telegram-text-secondary hover:bg-telegram-border transition-colors">
                <span>🔄</span>
                <span>Repost</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
