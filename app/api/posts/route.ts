import { NextResponse } from 'next/server';

// In a real app, this would be your Xata database
// For now, we'll use a simple in-memory store that persists during the server lifetime
let posts = [
  {
    id: '1',
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
      avatar: 'GZ',
      image: 'https://placehold.co/100x100/0088cc/white?text=GZ'
    },
    likes: 23,
    comments: 5,
    isLiked: false
  },
  {
    id: '2',
    userId: 'user-2',
    mediaUrl: 'https://placehold.co/600x400/25d366/white?text=Beach+Day+🏖️',
    mediaType: 'image',
    caption: 'Beautiful day at the beach! Perfect weather ☀️',
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 89,
    user: { 
      id: 'user-2',
      name: 'Sarah', 
      avatar: 'SA',
      image: 'https://placehold.co/100x100/25d366/white?text=SA'
    },
    likes: 45,
    comments: 8,
    isLiked: true
  }
];

export async function GET() {
  try {
    // Filter out expired posts
    const currentTime = new Date();
    const activePosts = posts.filter(post => new Date(post.expiresAt) > currentTime);
    
    return NextResponse.json({ 
      success: true, 
      data: activePosts,
      message: "Posts fetched successfully"
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch posts',
      data: []
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { mediaUrl, mediaType, caption, userId = 'current-user' } = await request.json();

    if (!mediaUrl || !mediaType) {
      return NextResponse.json({ 
        success: false, 
        error: 'Media URL and type are required' 
      }, { status: 400 });
    }

    const newPost = {
      id: 'post-' + Date.now(),
      userId,
      mediaUrl,
      mediaType,
      caption: caption || '',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      views: 0,
      user: { 
        id: userId,
        name: 'You', 
        avatar: 'YT',
        image: 'https://placehold.co/100x100/0088cc/white?text=YT'
      },
      likes: 0,
      comments: 0,
      isLiked: false
    };

    posts.unshift(newPost);

    return NextResponse.json({ 
      success: true, 
      data: newPost,
      message: "Post created successfully"
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create post' 
    }, { status: 500 });
  }
}
