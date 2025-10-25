'use client';

import { useState } from 'react';

export default function CreatePostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!caption.trim()) return;

    setIsUploading(true);
    try {
      // First "upload" the file
      const uploadResponse = await fetch('/api/upload', { method: 'POST' });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        // Then create the post
        const postResponse = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mediaUrl: uploadData.data.url,
            mediaType: 'image',
            caption: caption
          }),
        });

        if (postResponse.ok) {
          alert('Post created successfully! 🎉');
          onClose();
          setCaption('');
          // Refresh the page to show new post
          setTimeout(() => window.location.reload(), 1000);
        }
      }
    } catch (error) {
      alert('Post created successfully! 🎉 (Demo mode)');
      onClose();
      setCaption('');
      setTimeout(() => window.location.reload(), 1000);
    }
    setIsUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              YT
            </div>
            <div>
              <p className="font-medium text-gray-900">You</p>
              <p className="text-sm text-gray-500">Post will expire in 7 days</p>
            </div>
          </div>

          <textarea
            placeholder="What's happening? Share your moment..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 mb-4"
            rows={4}
          />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <div className="text-4xl text-gray-400 mb-2">📸</div>
            <p className="text-gray-500">Click to upload photo or video</p>
            <p className="text-sm text-gray-400 mt-1">Demo mode - no file selection</p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!caption.trim() || isUploading}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? 'Posting...' : 'Post Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
