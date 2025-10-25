import { NextResponse } from 'next/server';

export async function GET() {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0',
    services: {
      database: 'connected',
      storage: 'ready',
      authentication: 'demo-mode',
      api: 'operational'
    }
  };

  return NextResponse.json(healthCheck);
}
