'use client';

import { useState } from 'react';

const mockPosts = [
  { id: 1, author: 'Alice', content: 'Just deployed my first AI model!', likes: 24, timestamp: '2 hours ago' },
  { id: 2, author: 'Bob', content: 'RideWire looking smooth today 🚀', likes: 18, timestamp: '1 hour ago' },
  { id: 3, author: 'Charlie', content: 'Working on the Diagnostic Garage feature...', likes: 12, timestamp: '30 mins ago' },
];

export default function Home() {
  const [posts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {/* Main Feed */}
      <div className="lg:col-span-2">
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 mb-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-400">Create a Post</h2>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts with the RideWire community..."
            className="w-full bg-slate-800 text-white p-4 rounded border border-slate-700 focus:border-cyan-400 focus:outline-none mb-4"
            rows={4}
          />
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded">
            Post
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-cyan-300">{post.author}</h3>
                  <p className="text-sm text-slate-400">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-slate-100 mb-4">{post.content}</p>
              <div className="flex gap-4 text-slate-400">
                <button className="hover:text-cyan-400">♥ {post.likes}</button>
                <button className="hover:text-cyan-400">💬 Reply</button>
                <button className="hover:text-cyan-400">↗ Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Garage Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-cyan-500/30 sticky top-20">
          <h2 className="text-xl font-bold mb-4 text-cyan-300">🔧 Diagnostic Garage</h2>
          
          <div className="space-y-4">
            {/* AI Status */}
            <div className="bg-slate-800 rounded p-4 border-l-4 border-green-500">
              <p className="text-sm text-slate-300">AI Engine</p>
              <p className="font-bold text-green-400">● Online</p>
            </div>

            {/* System Health */}
            <div className="bg-slate-800 rounded p-4 border-l-4 border-cyan-500">
              <p className="text-sm text-slate-300">System Health</p>
              <div className="mt-2 bg-slate-700 rounded full h-2">
                <div className="bg-cyan-500 h-2 rounded" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">92% - Optimal</p>
            </div>

            {/* Quick Access */}
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition">
              Enter Full Garage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
