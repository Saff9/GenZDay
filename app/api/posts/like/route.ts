import { NextResponse } from 'next/server';

// Simple in-memory store for demo
let posts = [
  {
    id: '1',
    likes: 23,
    isLiked: false
  },
  {
    id: '2', 
    likes: 45,
    isLiked: true
  }
];

export async function POST(request: Request) {
  try {
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Post ID is required' 
      }, { status: 400 });
    }

    // Find post and toggle like
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Post not found' 
      }, { status: 404 });
    }

    posts[postIndex].isLiked = !posts[postIndex].isLiked;
    posts[postIndex].likes = posts[postIndex].isLiked ? 
      posts[postIndex].likes + 1 : 
      Math.max(0, posts[postIndex].likes - 1);

    return NextResponse.json({ 
      success: true, 
      data: { 
        liked: posts[postIndex].isLiked,
        likes: posts[postIndex].likes
      },
      message: posts[postIndex].isLiked ? "Post liked" : "Post unliked"
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to toggle like' 
    }, { status: 500 });
  }
}
