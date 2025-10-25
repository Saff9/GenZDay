'use client';

export default function StoriesBar() {
  const stories = [
    { id: 1, user: 'You', hasNew: true, isMe: true },
    { id: 2, user: 'Alex', hasNew: true },
    { id: 3, user: 'Sarah', hasNew: false },
    { id: 4, user: 'Mike', hasNew: true },
    { id: 5, user: 'Emma', hasNew: false },
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-2">
          <div className={`story-ring ${story.hasNew ? 'animate-pulse-slow' : ''}`}>
            <div className="w-16 h-16 bg-gradient-to-r from-telegram-blue to-whatsapp-green rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
              {story.isMe ? '➕' : story.user[0]}
            </div>
          </div>
          <span className="text-xs text-telegram-text-secondary">
            {story.isMe ? 'Your Story' : story.user}
          </span>
        </div>
      ))}
    </div>
  );
}
