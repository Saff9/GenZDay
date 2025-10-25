import { NextResponse } from 'next/server';

// In-memory storage for demo (replace with database later)
let posts = [
  {
    id: '1',
    userId: '1', 
    mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Welcome+To+GenZ+Day+🎉',
    mediaType: 'image' as const,
    caption: 'Welcome to GenZ Day! Share moments that disappear in 7 days ⏰',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    views: 156,
    user: { name: 'GenZ Team', avatar: 'GZ' },
    likes: 23,
    comments: 5,
    isLiked: false
  },
  {
    id: '2',
    userId: '2',
    mediaUrl: 'https://placehold.co/600x400/25d366/white?text=Beach+Day+🏖️',
    mediaType: 'image' as const,
    caption: 'Perfect weather for the beach! ☀️',
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 89,
    user: { name: 'Sarah', avatar: 'SA' },
    likes: 45,
    comments: 8,
    isLiked: true
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: posts,
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
    const { mediaUrl, mediaType, caption } = await request.json();

    if (!mediaUrl || !mediaType) {
      return NextResponse.json({
        success: false,
        error: 'Media URL and type are required'
      }, { status: 400 });
    }

    const newPost = {
      id: 'post-' + Date.now(),
      userId: 'user-' + Math.random().toString(36).substr(2, 9),
      mediaUrl,
      mediaType,
      caption: caption || '',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      views: 0,
      user: { name: 'You', avatar: 'YT' },
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
