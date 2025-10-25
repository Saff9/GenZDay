import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { xata } from '@/lib/db';
import { ApiResponse, Comment } from '@/lib/types';

// GET /api/posts/[postId]/comments - Get comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await xata.db.comments
      .filter({ postId: params.postId })
      .sort('createdAt', 'asc')
      .getAll();

    // Get user data for each comment
    const commentsWithUsers = await Promise.all(
      comments.map(async (comment) => {
        const user = await xata.db.users.read(comment.userId);
        return {
          ...comment,
          user,
        };
      })
    );

    const response: ApiResponse<Comment[]> = {
      success: true,
      data: commentsWithUsers as any,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/posts/[postId]/comments - Add a comment
export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(auth);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Comment content is required' },
        { status: 400 }
      );
    }

    // Check if post exists and hasn't expired
    const post = await xata.db.posts.read(params.postId);
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    if (new Date(post.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Post has expired' },
        { status: 410 }
      );
    }

    const comment = await xata.db.comments.create({
      postId: params.postId,
      userId: session.user.id,
      content: content.trim(),
      createdAt: new Date(),
    });

    // Fetch user data for the response
    const user = await xata.db.users.read(session.user.id);

    const response: ApiResponse<Comment> = {
      success: true,
      data: { ...comment, user } as any,
      message: 'Comment added successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
