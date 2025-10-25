'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
