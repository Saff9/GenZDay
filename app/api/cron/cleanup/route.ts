import { NextResponse } from 'next/server';
import { getXataClient } from '@/lib/xata';

const xata = getXataClient();

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const expiredPosts = await xata.db.posts
      .filter({ expires_at: { $lt: new Date() } })
      .getMany();
    
    // Delete expired posts
    for (const post of expiredPosts) {
      await xata.db.posts.delete(post.id);
    }
    
    return NextResponse.json({ deleted: expiredPosts.length });
  } catch (error) {
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
