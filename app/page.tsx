export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold gradient-text mb-4">
            GenZ Day
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your moments, your week, your way ✨
          </p>
        </div>

        {/* Main Content */}
        <div className="glass-effect rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            🚀 Welcome to GenZ Day!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl mb-2">📸</div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Upload Media</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">Share photos and videos that last 7 days</p>
            </div>
            
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">7-Day Expiry</h3>
              <p className="text-sm text-green-600 dark:text-green-400">Content automatically disappears after a week</p>
            </div>
            
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Secure & Private</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Your data is protected and encrypted</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="telegram-button text-lg">
              Get Started - It's Free
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required. Join thousands of GenZ users!
            </p>
          </div>
        </div>

        {/* API Status */}
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            API Status
          </h3>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Backend: Online</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Database: Connected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Storage: Ready</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
