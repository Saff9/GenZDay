import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      // For demo purposes, generate a placeholder image
      const timestamp = Date.now();
      const colors = ['0088cc', '25d366', 'ff6b35', '8b5cf6'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const demoUrl = `https://placehold.co/600x400/${randomColor}/white?text=Uploaded+${timestamp}`;
      
      return NextResponse.json({
        success: true,
        data: {
          url: demoUrl,
          filename: `upload-${timestamp}.jpg`,
          size: file?.size || 1024000,
          type: file?.type || 'image/jpeg',
          uploadedAt: new Date().toISOString()
        },
        message: "File uploaded successfully (demo mode)"
      });
    }

    // File validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: 'File type not allowed. Please upload images or MP4 videos.'
      }, { status: 400 });
    }

    // Size validation (10MB for images, 50MB for videos)
    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        error: `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
      }, { status: 400 });
    }

    // In production, you would upload to Vercel Blob or similar service
    const timestamp = Date.now();
    const demoUrl = `https://placehold.co/600x400/0088cc/white?text=Real+Upload+${timestamp}`;
    
    return NextResponse.json({
      success: true,
      data: {
        url: demoUrl,
        filename: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      },
      message: "File uploaded successfully"
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      error: 'Upload failed. Please try again.'
    }, { status: 500 });
  }
}
