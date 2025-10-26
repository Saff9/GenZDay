'use client';

import { useState } from 'react';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    image?: string;
  } | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

export default function UserMenu({ user, onSignOut, onSignIn }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <button
        onClick={onSignIn}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="font-medium text-gray-700 hidden sm:block">
          {user.name}
        </span>
        <span className="text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            📱 My Profile
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            ⭐ My Posts
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            ⚙️ Settings
          </button>
          
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button 
              onClick={onSignOut}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
