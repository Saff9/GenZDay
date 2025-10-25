import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // For demo purposes, we'll simulate file upload
    // In production, you'd use Vercel Blob or another service
    
    // Generate a demo URL based on timestamp
    const timestamp = Date.now();
    const demoUrl = `https://placehold.co/600x400/0088cc/white?text=GenZ+Day+${timestamp}`;
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        url: demoUrl,
        filename: `upload-${timestamp}.jpg`,
        size: 1024 * 1024, // 1MB demo
        uploadedAt: new Date().toISOString()
      },
      message: "File uploaded successfully (demo mode)"
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Upload failed' 
    }, { status: 500 });
  }
}

// Also handle GET for testing
export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: "Upload endpoint is ready",
    instructions: "Send a POST request with form data containing a file"
  });
}
