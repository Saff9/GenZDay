import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ 
    success: true, 
    data: { 
      url: 'https://placehold.co/600x400/0088cc/white?text=GenZ+Day+Demo',
      demo: true
    },
    message: "Upload successful (demo mode)"
  });
}
