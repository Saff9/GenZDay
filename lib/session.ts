'use client';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  isLoggedIn: boolean;
}

// Simple session management for demo
export function useSession() {
  const user: User = {
    id: 'user-demo',
    name: 'Demo User',
    email: 'demo@genzday.com',
    avatar: 'DU',
    isLoggedIn: true
  };

  return {
    data: { user },
    status: 'authenticated' as const
  };
}

export function signIn() {
  // In real app, this would redirect to auth provider
  console.log('Signing in...');
  return Promise.resolve();
}

export function signOut() {
  // In real app, this would clear session
  console.log('Signing out...');
  return Promise.resolve();
}
