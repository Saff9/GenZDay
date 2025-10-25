// Simple session management without NextAuth complications
'use client';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export function useSession() {
  // Simple mock session for demo
  const user: User = {
    id: '1',
    name: 'GenZ User',
    email: 'user@genzday.com',
    avatar: 'GZ'
  };

  return {
    data: { user },
    status: 'authenticated' as const
  };
}

export function signIn(provider: string) {
  console.log(`Signing in with ${provider}`);
  // In real app, redirect to auth provider
  return Promise.resolve();
}

export function signOut() {
  console.log('Signing out');
  // In real app, clear session
  return Promise.resolve();
}
