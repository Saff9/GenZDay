import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    message: 'GenZ Day API is running!',
    timestamp: new Date().toISOString()
  });
}
