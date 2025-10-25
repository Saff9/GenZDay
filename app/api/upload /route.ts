import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // For demo - generate a placeholder image URL
    const timestamp = Date.now();
    const randomColor = ['0088cc', '25d366', 'ff6b35', '8b5cf6'][Math.floor(Math.random() * 4)];
    
    const demoUrl = `https://placehold.co/600x400/${randomColor}/white?text=GenZ+Day+${timestamp}`;
    
    return NextResponse.json({
      success: true,
      data: {
        url: demoUrl,
        filename: `upload-${timestamp}.jpg`,
        uploadedAt: new Date().toISOString()
      },
      message: "File uploaded successfully"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Upload failed'
    }, { status: 500 });
  }
}

// Allow GET for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload endpoint ready - POST a file to upload"
  });
}
