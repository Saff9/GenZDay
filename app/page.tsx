export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          GenZ Day
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your moments, your week, your way ✨
        </p>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚀 Backend is Live!
          </h2>
          <p className="text-gray-600 mb-6">
            Your GenZ Day API is successfully deployed. Next, we'll build the frontend.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">✅ Posts API</h3>
              <p className="text-sm text-green-600">Ready for demo</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">✅ Upload API</h3>
              <p className="text-sm text-blue-600">Ready for demo</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">✅ Health Check</h3>
              <p className="text-sm text-purple-600">System running</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
