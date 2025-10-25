import { NextResponse } from 'next/server';
import { xata } from '@/lib/db';
import { ApiResponse } from '@/lib/types';

export async function GET(request: Request) {
  // Verify cron secret
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Delete expired posts
    const expiredPosts = await xata.db.posts
      .filter({ expiresAt: { $lt: new Date() } })
      .getAll();

    let deletedCount = 0;
    
    for (const post of expiredPosts) {
      await xata.db.posts.delete(post.id);
      deletedCount++;
    }

    const response: ApiResponse<{ deleted: number }> = {
      success: true,
      data: { deleted: deletedCount },
      message: `Cleaned up ${deletedCount} expired posts`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error cleaning up expired posts:', error);
    return NextResponse.json(
      { success: false, error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}
