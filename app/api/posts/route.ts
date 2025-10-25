import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { xata } from '@/lib/db';
import { ApiResponse, Post } from '@/lib/types';

// GET /api/posts - Get all posts (with pagination)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get posts that haven't expired
    const posts = await xata.db.posts
      .filter({ expiresAt: { $gt: new Date() } })
      .sort('createdAt', 'desc')
      .getPaginated({
        pagination: { size: limit, offset }
      });

    // Get user data for each post
    const postsWithUsers = await Promise.all(
      posts.records.map(async (post) => {
        const user = await xata.db.users.read(post.userId);
        const likes = await xata.db.likes
          .filter({ postId: post.id })
          .getAll();
        
        const comments = await xata.db.comments
          .filter({ postId: post.id })
          .getAll();

        const isLiked = await xata.db.likes
          .filter({ postId: post.id, userId: session.user.id })
          .getFirst();

        return {
          ...post,
          user,
          likes: likes.length,
          comments: comments.length,
          isLiked: !!isLiked,
        };
      })
    );

    const response: ApiResponse<{ posts: Post[]; hasMore: boolean }> = {
      success: true,
      data: {
        posts: postsWithUsers as any,
        hasMore: posts.hasNextPage(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(auth);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { mediaUrl, mediaType, caption } = await request.json();

    if (!mediaUrl || !mediaType) {
      return NextResponse.json(
        { success: false, error: 'Media URL and type are required' },
        { status: 400 }
      );
    }

    // Calculate expiration date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const post = await xata.db.posts.create({
      userId: session.user.id,
      mediaUrl,
      mediaType,
      caption,
      expiresAt,
      views: 0,
      createdAt: new Date(),
    });

    const response: ApiResponse<Post> = {
      success: true,
      data: post as any,
      message: 'Post created successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
