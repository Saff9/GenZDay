'use client';

import { useState } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Posted successfully! 🎉\n\nIn a real app, this would:\n1. Upload to Vercel Blob\n2. Create post in database\n3. Show in feed immediately');
      
      onClose();
      setFile(null);
      setCaption('');
      setPreview('');
    } catch (error) {
      alert('Upload failed. Please try again.');
    }
    setIsUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="telegram-card w-full max-w-md">
        <div className="p-4 border-b border-telegram-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-telegram-text">Create Post</h2>
          <button 
            onClick={onClose}
            className="text-telegram-text-secondary hover:text-telegram-text transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-telegram-blue to-whatsapp-green rounded-full flex items-center justify-center text-white font-bold">
              GZ
            </div>
            <div>
              <p className="font-medium text-telegram-text">GenZ User</p>
              <p className="text-sm text-telegram-text-secondary">Post will expire in 7 days</p>
            </div>
          </div>

          {/* Caption */}
          <textarea
            placeholder="What's happening? Share your moment..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full h-32 p-3 border border-telegram-border rounded-lg resize-none focus:outline-none focus:border-telegram-blue mb-4"
          />

          {/* Preview */}
          {preview && (
            <div className="mb-4">
              {file?.type.startsWith('image/') ? (
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              ) : (
                <video src={preview} controls className="w-full h-48 object-cover rounded-lg" />
              )}
            </div>
          )}

          {/* Upload Area */}
          {!preview && (
            <div className="border-2 border-dashed border-telegram-border rounded-lg p-8 text-center mb-4">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl text-telegram-text-secondary mb-2">📸</div>
                <p className="text-telegram-text-secondary">Click to upload photo or video</p>
                <p className="text-sm text-telegram-text-secondary mt-1">Supports JPEG, PNG, MP4</p>
              </label>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-telegram-border text-telegram-text-secondary rounded-lg font-medium hover:bg-telegram-border transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-1 py-3 bg-telegram-blue text-white rounded-lg font-medium hover:bg-telegram-blue-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting...
                </>
              ) : (
                'Post Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
