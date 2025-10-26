'use client';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (provider: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSignIn }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Join GenZ Day
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Create an account to start sharing moments
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <button
            onClick={() => onSignIn('google')}
            className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-700 rounded-lg py-4 px-6 hover:bg-gray-50 transition-colors font-medium"
          >
            <span className="text-xl">🔗</span>
            <span>Continue with Google</span>
          </button>
          
          <button
            onClick={() => onSignIn('phone')}
            className="w-full flex items-center justify-center space-x-3 bg-blue-500 text-white rounded-lg py-4 px-6 hover:bg-blue-600 transition-colors font-medium"
          >
            <span className="text-xl">📱</span>
            <span>Continue with Phone</span>
          </button>
          
          <button
            onClick={() => onSignIn('email')}
            className="w-full flex items-center justify-center space-x-3 bg-green-500 text-white rounded-lg py-4 px-6 hover:bg-green-600 transition-colors font-medium"
          >
            <span className="text-xl">✉️</span>
            <span>Continue with Email</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-200 text-center">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
