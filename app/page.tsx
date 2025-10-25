export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 pt-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            GenZ Day
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Your moments, your week, your way ✨
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* CTA Buttons */}
        <div className="space-y-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105">
            🚀 Start Sharing Now
          </button>
          <div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl text-md mr-4">
              📱 Mobile App
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl text-md">
              👥 Join Community
            </button>
          </div>
        </div>

        {/* Live Demo */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Live Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Test the API</h3>
              <div className="space-y-3 text-left">
                <a href="/api/health" className="block p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                  ✅ Health Check
                </a>
                <a href="/api/posts" className="block p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                  📝 Posts API
                </a>
                <a href="/api/upload" className="block p-3 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                  📤 Upload API
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">App Status</h3>
              <div className="space-y-2 text-left">
                <div className="flex items-center text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Backend API: Running
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Database: Connected
                </div>
                <div className="flex items-center text-blue-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Frontend: Ready for Development
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
