'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  isLoggedIn: boolean;
}

interface Session {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const SessionContext = createContext<Session>({
  user: null,
  status: 'loading'
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    status: 'loading'
  });

  useEffect(() => {
    // Check if user is logged in (in a real app, this would call an API)
    const checkAuth = async () => {
      // Simulate API call
      setTimeout(() => {
        setSession({
          user: null, // Start with no user for demo
          status: 'unauthenticated'
        });
      }, 1000);
    };

    checkAuth();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
