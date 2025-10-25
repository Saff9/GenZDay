'use client';

import { useState } from 'react';

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        // Create post
        const postResponse = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mediaUrl: uploadData.data.url,
            mediaType: file.type.startsWith('image/') ? 'image' : 'video',
            caption: caption
          }),
        });

        const postData = await postResponse.json();

        if (postData.success) {
          alert('Posted successfully! 🎉');
          setIsUploadModalOpen(false);
          setFile(null);
          setCaption('');
          setPreview('');
        }
      }
    } catch (error) {
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GZ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GenZ Day
                  </h1>
                  <p className="text-sm text-gray-500">Ephemeral social sharing</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>📸</span>
                <span>Create Post</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              GenZ Day
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Your moments, your week, your way ✨
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-4">📸</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Upload & Share</h3>
                <p className="text-gray-600">Post photos and videos that disappear in 7 days</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">7-Day Magic</h3>
                <p className="text-gray-600">Content automatically vanishes after one week</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">GenZ Focused</h3>
                <p className="text-gray-600">Built for the next generation of social media</p>
              </div>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 mb-4"
            >
              🚀 Start Sharing Now
            </button>
          </div>

          {/* Demo Posts */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      GZ
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">GenZ User</p>
                      <p className="text-sm text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    7d left
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-800 mb-4">Welcome to GenZ Day! This is what your posts will look like. 🎉</p>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-500">Your image/video will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Post</h2>
            
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-600">Click to upload photo or video</p>
                  <p className="text-sm text-gray-400 mt-1">Supports JPEG, PNG, MP4</p>
                </label>
              </div>
            )}

            {/* Caption */}
            <textarea
              placeholder="Add a caption... (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
              rows={3}
            />

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Post Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
