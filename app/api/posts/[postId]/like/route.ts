import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { xata } from '@/lib/db';
import { ApiResponse } from '@/lib/types';

// POST /api/posts/[postId]/like - Like/unlike a post
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

    const postId = params.postId;
    const userId = session.user.id;

    // Check if post exists and hasn't expired
    const post = await xata.db.posts.read(postId);
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

    // Check if already liked
    const existingLike = await xata.db.likes
      .filter({ postId, userId })
      .getFirst();

    if (existingLike) {
      // Unlike
      await xata.db.likes.delete(existingLike.id);
      const response: ApiResponse<{ liked: boolean }> = {
        success: true,
        data: { liked: false },
        message: 'Post unliked',
      };
      return NextResponse.json(response);
    } else {
      // Like
      await xata.db.likes.create({
        postId,
        userId,
        createdAt: new Date(),
      });
      const response: ApiResponse<{ liked: boolean }> = {
        success: true,
        data: { liked: true },
        message: 'Post liked',
      };
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
