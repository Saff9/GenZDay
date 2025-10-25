import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: [],
    message: "GenZ Day API is working!"
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      success: true, 
      data: { 
        id: 'temp-' + Date.now(),
        ...body,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      message: "Post created successfully (demo mode)"
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create post' 
    }, { status: 500 });
  }
}
