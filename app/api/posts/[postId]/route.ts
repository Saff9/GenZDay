import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { xata } from '@/lib/db';
import { ApiResponse, Post } from '@/lib/types';

// GET /api/posts/[postId] - Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const post = await xata.db.posts.read(params.postId);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if post has expired
    if (new Date(post.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Post has expired' },
        { status: 410 }
      );
    }

    // Increment view count
    await xata.db.posts.update(post.id, {
      views: (post.views || 0) + 1,
    });

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

    const postWithDetails = {
      ...post,
      user,
      likes: likes.length,
      comments: comments.length,
      isLiked: !!isLiked,
    };

    const response: ApiResponse<Post> = {
      success: true,
      data: postWithDetails as any,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[postId] - Delete post
export async function DELETE(
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

    const post = await xata.db.posts.read(params.postId);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user owns the post
    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to delete this post' },
        { status: 403 }
      );
    }

    // Delete associated likes and comments
    const likes = await xata.db.likes
      .filter({ postId: post.id })
      .getAll();
    
    const comments = await xata.db.comments
      .filter({ postId: post.id })
      .getAll();

    // Delete likes
    for (const like of likes) {
      await xata.db.likes.delete(like.id);
    }

    // Delete comments
    for (const comment of comments) {
      await xata.db.comments.delete(comment.id);
    }

    // Delete post
    await xata.db.posts.delete(post.id);

    const response: ApiResponse = {
      success: true,
      message: 'Post deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
