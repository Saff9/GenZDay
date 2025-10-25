'use client';

import { useState, useEffect } from 'react';

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

  // Sample posts for demo
  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: '1',
        userId: '1',
        mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Beautiful+Sunset',
        mediaType: 'image',
        caption: 'Just discovered this amazing platform! The 7-day expiry is genius 🔥',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        views: 124,
        user: { name: 'Alex Johnson' },
        likes: 12,
        comments: 3,
        isLiked: false
      },
      {
        id: '2',
        userId: '2',
        mediaUrl: 'https://placehold.co/600x400/25d366/white?text=Beach+Vibes',
        mediaType: 'image',
        caption: 'Perfect day at the beach! 🏖️',
        expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        views: 89,
        user: { name: 'Sarah Miller' },
        likes: 45,
        comments: 8,
        isLiked: true
      }
    ];

    setPosts(samplePosts);
    setLoading(false);
  }, []);

  const handleLike = async (postId: string) => {
    // Simple like toggle for demo
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? (post.likes || 1) - 1 : (post.likes || 0) + 1
          }
        : post
    ));
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
          <div key={post.id} className="telegram-card overflow-hidden animate-fade-in">
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
                      {new Date(post.createdAt).toLocaleDateString()} • {calculateTimeLeft(post.expiresAt)}
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
