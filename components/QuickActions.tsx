'use client';

export default function QuickActions() {
  const actions = [
    { icon: '🎵', label: 'Add Music', color: 'text-green-500' },
    { icon: '🤳', label: 'AR Filter', color: 'text-purple-500' },
    { icon: '📊', label: 'Create Poll', color: 'text-orange-500' },
    { icon: '🎮', label: 'Play Game', color: 'text-pink-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <button
          key={index}
          className="telegram-card p-4 text-center hover:bg-telegram-border transition-colors"
        >
          <div className={`text-2xl mb-2 ${action.color}`}>{action.icon}</div>
          <div className="text-sm font-medium text-telegram-text">{action.label}</div>
        </button>
      ))}
    </div>
  );
}
