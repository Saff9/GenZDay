import { NextRequest, NextResponse } from 'next/server';
import { getXataClient } from '@/lib/xata';

const xata = getXataClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, mediaUrl, mediaType, caption } = await request.json();
    
    const post = await xata.db.posts.create({
      user_id: userId,
      media_url: mediaUrl,
      media_type: mediaType,
      caption,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const posts = await xata.db.posts
      .filter({ expires_at: { $ge: new Date() } })
      .sort('created_at', 'desc')
      .getMany();
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
