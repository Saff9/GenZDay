import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'GenZ Day API',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      upload: '/api/upload',
      health: '/api/health'
    }
  });
}
