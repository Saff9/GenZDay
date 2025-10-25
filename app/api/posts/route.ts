import { NextResponse } from 'next/server';

// Sample posts data for demo
const samplePosts = [
  {
    id: '1',
    userId: '1',
    mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Beautiful+Sunset+🌅',
    mediaType: 'image' as const,
    caption: 'Just discovered this amazing platform! The 7-day expiry is genius 🔥',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    views: 124,
    user: { name: 'Alex Johnson', avatar: 'AJ' },
    likes: 12,
    comments: 3,
    isLiked: false
  },
  {
    id: '2', 
    userId: '2',
    mediaUrl: 'https://placehold.co/600x400/25d366/white?text=Beach+Vibes+🏖️',
    mediaType: 'image' as const,
    caption: 'Perfect day at the beach! The water was amazing 💙',
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 89,
    user: { name: 'Sarah Miller', avatar: 'SM' },
    likes: 45,
    comments: 8,
    isLiked: true
  },
  {
    id: '3',
    userId: '3',
    mediaUrl: 'https://placehold.co/600x400/ff6b35/white?text=City+Lights+🌃',
    mediaType: 'image' as const,
    caption: 'Night life in the city never disappoints! ✨',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    views: 203,
    user: { name: 'Mike Chen', avatar: 'MC' },
    likes: 67,
    comments: 12,
    isLiked:
