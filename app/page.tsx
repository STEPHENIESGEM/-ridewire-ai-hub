"use client";

import React, { useState } from 'react';

const RideWireHUD = () => {
  const [view, setView] = useState('command');

  const CommandCenter = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700">
      {/* Wicked Problem Panel */}
      <div className="md:col-span-2 border border-cyan-500/30 bg-black/40 p-6 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <h2 className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Central Objective</h2>
        <h1 className="text-2xl font-bold text-white mb-4">Local Food Bank Cash Crisis</h1>
        <p className="text-gray-400 mb-6">Albuquerque Food Bank projected to hit zero cash in 182 days. Impacting 1,200+ families.</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <span className="text-cyan-500 mt-1">▶</span>
            <span className="text-gray-300">Donation volatility post-pandemic: -22% YoY</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-cyan-500 mt-1">▶</span>
            <span className="text-gray-300">Operational rent & utilities spike: +18%</span>
          </div>
        </div>
      </div>

      {/* KPI Panel */}
      <div className="space-y-6">
        <div className="border border-red-500/30 bg-black/40 p-4 rounded-lg">
          <div className="text-red-400 text-[10px] font-mono uppercase tracking-tighter">Runway</div>
          <div className="text-3xl font-bold text-white">182 DAYS</div>
        </div>
        <div className="border border-cyan-500/30 bg-black/40 p-4 rounded-lg">
          <div className="text-cyan-400 text-[10px] font-mono uppercase tracking-tighter">Probable Success</div>
          <div className="text-3xl font-bold text-white">71%</div>
          <div className="h-1 w-full bg-gray-800 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 w-[71%]"></div>
          </div>
        </div>
      </div>

      {/* Intelligence Loop */}
      <div className="md:col-span-3 border border-gray-800 bg-black/20 p-6 rounded-lg">
        <h3 className="text-gray-500 text-xs font-mono uppercase mb-4">Intelligence Loop Status</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <span className="px-3 py-1 bg-cyan-900/40 text-cyan-400 text-[10px] rounded border border-cyan-500/40">INTAKE: COMPLETE</span>
          <span className="text-gray-700">→</span>
          <span className="px-3 py-1 bg-cyan-900/40 text-cyan-400 text-[10px] rounded border border-cyan-500/40">ROOT CAUSE: COMPLETE</span>
          <span className="text-gray-700">→</span>
          <span className="px-3 py-1 bg-amber-900/40 text-amber-400 text-[10px] rounded border border-amber-500/40 animate-pulse">EXPLORATION: ACTIVE</span>
          <span className="text-gray-700">→</span>
          <span className="px-3 py-1 bg-gray-900/40 text-gray-600 text-[10px] rounded border border-gray-800">ROLLOUT: PENDING</span>
        </div>
      </div>
    </div>
  );

  const ShopView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700">
      <div className="border border-cyan-500/30 bg-black/40 p-6 rounded-lg">
        <h2 className="text-cyan-400 text-xs font-mono uppercase mb-2">Vehicle ID</h2>
        <h1 className="text-xl font-bold text-white">2015 Subaru Outback</h1>
        <div className="text-gray-500 text-sm font-mono mt-1">142,300 MI · VIN: 4S4BS...</div>
      </div>
      <div className="border border-cyan-500/30 bg-black/40 p-6 rounded-lg md:col-span-2">
        <h2 className="text-cyan-400 text-xs font-mono uppercase mb-4">Active Checklist</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-center gap-2">
            <input type="checkbox" checked className="rounded border-cyan-500" readOnly /> 
            Measure pads/rotors
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-cyan-500" /> 
            Scan OBD Codes
          </li>
          <li className="flex items-center gap-2 text-amber-400">
            <input type="checkbox" className="rounded border-amber-500" /> 
            Capture photo of front left rotor
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 p-8 font-sans selection:bg-cyan-500/30">
      <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-500">RW</div>
          <span className="text-xl font-bold tracking-tighter">RIDEWIRE <span className="text-cyan-500 font-mono text-sm ml-2">v1.0-BLITZ</span></span>
        </div>
        <nav className="flex gap-2 p-1 bg-black/40 border border-gray-800 rounded-lg">
          <button 
            onClick={() => setView('command')}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${view === 'command' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-gray-500 hover:text-white'}`}
          >
            COMMAND CENTER
          </button>
          <button 
            onClick={() => setView('shop')}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${view === 'shop' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-gray-500 hover:text-white'}`}
          >
            IRON MAN BAY
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {view === 'command' ? <CommandCenter /> : <ShopView />}
      </main>

      <footer className="fixed bottom-8 left-8 right-8 flex justify-between text-[10px] font-mono text-gray-600 uppercase tracking-widest">
        <div>Ghost Protocol Active</div>
        <div>System Healthy · 100% Uptime</div>
      </footer>
    </div>
  );
};

export default RideWireHUD;
