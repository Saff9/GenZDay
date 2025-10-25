'use client';

import { useState } from 'react';
import PostFeed from '@/components/PostFeed';
import CreatePostModal from '@/components/CreatePostModal';
import StoriesBar from '@/components/StoriesBar';
import QuickActions from '@/components/QuickActions';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [user] = useState({
    name: 'GenZ User',
    avatar: 'GZ'
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Mobile Tabs */}
      <div className="flex border-b border-telegram-border bg-white lg:hidden">
        {['feed', 'stories', 'discover'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === tab 
                ? 'text-telegram-blue border-b-2 border-telegram-blue' 
                : 'text-telegram-text-secondary'
            }`}
          >
            {tab === 'feed' && '🏠 Feed'}
            {tab === 'stories' && '📸 Stories'}
            {tab === 'discover' && '🎯 Discover'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          {/* Welcome Banner */}
          <div className="telegram-card p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-telegram-blue to-whatsapp-green rounded-full flex items-center justify-center text-white text-2xl">
                👋
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-telegram-text">Welcome to GenZ Day!</h2>
                <p className="text-telegram-text-secondary">Share moments that vanish in 7 days</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="telegram-button px-6 py-3 font-medium"
            >
              📸 Start Sharing Now
            </button>
          </div>

          {/* Stories */}
          <StoriesBar />

          {/* Quick Actions */}
          <QuickActions />

          {/* Create Post Card */}
          <div className="telegram-card p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-telegram-blue to-whatsapp-green rounded-full flex items-center justify-center text-white font-bold">
                {user.avatar}
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex-1 bg-telegram-bg hover:bg-telegram-border text-telegram-text-secondary rounded-full py-3 px-4 text-left transition-colors"
              >
                What's happening? Share a moment...
              </button>
            </div>
            <div className="flex justify-around border-t border-telegram-border pt-3">
              <button className="flex items-center space-x-2 text-telegram-text-secondary hover:text-telegram-blue transition-colors">
                <span>📸</span>
                <span>Photo/Video</span>
              </button>
              <button className="flex items-center space-x-2 text-telegram-text-secondary hover:text-whatsapp-green transition-colors">
                <span>🎵</span>
                <span>Music</span>
              </button>
              <button className="flex items-center space-x-2 text-telegram-text-secondary hover:text-orange-500 transition-colors">
                <span>📝</span>
                <span>Poll</span>
              </button>
            </div>
          </div>

          {/* Post Feed */}
          <PostFeed />
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Simple Login Modal */}
      <LoginModal />
    </div>
  );
}

function LoginModal() {
  const [showLogin, setShowLogin] = useState(false);

  if (!showLogin) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="telegram-card w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-telegram-text mb-4">Join GenZ Day</h2>
        <p className="text-telegram-text-secondary mb-6">
          Create an account to start sharing moments
        </p>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center space-x-3 bg-telegram-blue text-white rounded-lg py-3 px-4 hover:bg-telegram-blue-dark transition-colors">
            <span>📱</span>
            <span>Continue with Phone</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-3 bg-white border border-telegram-border text-telegram-text rounded-lg py-3 px-4 hover:bg-telegram-border transition-colors">
            <span>🔗</span>
            <span>Continue with Google</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-3 bg-whatsapp-green text-white rounded-lg py-3 px-4 hover:bg-whatsapp-green-dark transition-colors">
            <span>✉️</span>
            <span>Continue with Email</span>
          </button>
        </div>

        <button 
          onClick={() => setShowLogin(false)}
          className="w-full mt-4 py-3 text-telegram-text-secondary hover:text-telegram-text transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
