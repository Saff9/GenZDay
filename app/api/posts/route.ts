import { NextResponse } from 'next/server';

// Simple in-memory storage for demo
let posts = [
  {
    id: '1',
    mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Welcome+To+GenZ+Day',
    mediaType: 'image',
    caption: 'Welcome to GenZ Day! Share moments that disappear in 7 days 🎉',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    user: { name: 'GenZ Team', avatar: 'GZ' },
    likes: 23,
    comments: 5
  }
];

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: posts 
  });
}

export async function POST(request: Request) {
  try {
    const { mediaUrl, mediaType, caption } = await request.json();
    
    const newPost = {
      id: 'post-' + Date.now(),
      mediaUrl: mediaUrl || 'https://placehold.co/600x400/25d366/white?text=New+Post',
      mediaType: mediaType || 'image',
      caption: caption || '',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      user: { name: 'You', avatar: 'YT' },
      likes: 0,
      comments: 0
    };

    posts.unshift(newPost);
    
    return NextResponse.json({ 
      success: true, 
      data: newPost 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create post' 
    }, { status: 500 });
  }
}
