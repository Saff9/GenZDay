import { NextResponse } from 'next/server';

export async function POST() {
  // Return a demo URL for now
  const demoUrl = `https://placehold.co/600x400/0088cc/white?text=Uploaded+${Date.now()}`;
  
  return NextResponse.json({ 
    success: true, 
    data: { url: demoUrl } 
  });
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Upload endpoint - POST to upload files' 
  });
}
