"use client";

import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import { Investor } from '../types';
import LegalWaiver from '../components/LegalWaiver';
import InvestorFinder from '../components/InvestorFinder';
import EmailComposer from '../components/EmailComposer';
import MoneyManager from '../components/MoneyManager';
import MetricsDashboard from '../components/MetricsDashboard';

const RideWireHUD = () => {
  const [view, setView] = useState<AppState>(AppState.COMMAND_CENTER);
  const [showWaiver, setShowWaiver] = useState(false);
  const [selectedInvestors, setSelectedInvestors] = useState<Investor[]>([]);
  const [emailsSent, setEmailsSent] = useState(0);
  const [emailsOpened, setEmailsOpened] = useState(0);
  const [emailsReplied, setEmailsReplied] = useState(0);
  
  // Check if waiver has been accepted on mount
  useEffect(() => {
    const waiverAccepted = localStorage.getItem('ridewire_legal_waiver');
    if (!waiverAccepted) {
      setShowWaiver(true);
    }
  }, []);
  
  const handleWaiverAccept = () => {
    setShowWaiver(false);
  };
  
  const handleInvestorSelection = (investors: Investor[]) => {
    setSelectedInvestors(investors);
    setView(AppState.EMAIL_COMPOSER);
  };
  
  const handleEmailsSent = (count: number) => {
    setEmailsSent(prev => prev + count);
  };
  
  // If waiver not accepted, show only waiver
  if (showWaiver) {
    return <LegalWaiver onAccept={handleWaiverAccept} />;
  }
  
  // Render appropriate view based on AppState
  if (view === AppState.INVESTOR_SEARCH) {
    return (
      <InvestorFinder
        onCompose={handleInvestorSelection}
        onClose={() => setView(AppState.COMMAND_CENTER)}
      />
    );
  }
  
  if (view === AppState.EMAIL_COMPOSER) {
    return (
      <EmailComposer
        investors={selectedInvestors}
        onClose={() => setView(AppState.INVESTOR_SEARCH)}
        onSent={handleEmailsSent}
      />
    );
  }
  
  if (view === AppState.MONEY_DASHBOARD) {
    return (
      <MoneyManager
        onClose={() => setView(AppState.COMMAND_CENTER)}
      />
    );
  }
  
  if (view === AppState.METRICS_DASHBOARD) {
    return (
      <MetricsDashboard
        onClose={() => setView(AppState.COMMAND_CENTER)}
      />
    );
  }

  const CommandCenter = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700">
      {/* Wicked Problem Panel */}
      <div className="md:col-span-2 border border-cyan-500/30 bg-black/40 p-6 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <h2 className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Central Objective</h2>
        <h1 className="text-2xl font-bold text-white mb-4">RideWire R.I.D.E. OS - AI Investor Funding</h1>
        <p className="text-gray-400 mb-6">Raising $500K seed funding for Stark-class AI diagnostic platform targeting $47B automotive repair market.</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <span className="text-cyan-500 mt-1">▶</span>
            <span className="text-gray-300">Built R.I.D.E. OS in 30 days - Ready to ship to 1,000 shops</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-cyan-500 mt-1">▶</span>
            <span className="text-gray-300">40% improvement in first-time fix rates proven</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-cyan-500 mt-1">▶</span>
            <span className="text-gray-300">500+ pre-vetted investors in database</span>
          </div>
        </div>
      </div>

      {/* KPI Panel */}
      <div className="space-y-6">
        <div className="border border-cyan-500/30 bg-black/40 p-4 rounded-lg">
          <div className="text-cyan-400 text-[10px] font-mono uppercase tracking-tighter">Funding Target</div>
          <div className="text-3xl font-bold text-white">$500K</div>
        </div>
        <div className="border border-green-500/30 bg-black/40 p-4 rounded-lg">
          <div className="text-green-400 text-[10px] font-mono uppercase tracking-tighter">Investors in DB</div>
          <div className="text-3xl font-bold text-white">500+</div>
        </div>
        <div className="border border-magenta-500/30 bg-black/40 p-4 rounded-lg">
          <div className="text-magenta-400 text-[10px] font-mono uppercase tracking-tighter">Emails Sent</div>
          <div className="text-3xl font-bold text-white">{emailsSent}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="md:col-span-3 border border-gray-800 bg-black/20 p-6 rounded-lg">
        <h3 className="text-gray-500 text-xs font-mono uppercase mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setView(AppState.INVESTOR_SEARCH)}
            className="p-4 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-cyan-400 font-bold mb-1">Find Investors</div>
            <div className="text-xs text-gray-400">Search & filter 500+ investors</div>
          </button>
          
          <button
            onClick={() => setView(AppState.MONEY_DASHBOARD)}
            className="p-4 bg-gradient-to-br from-magenta-500/20 to-magenta-500/5 border border-magenta-500/30 rounded-lg hover:border-magenta-500 transition-all hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]"
          >
            <div className="text-2xl mb-2">💰</div>
            <div className="text-magenta-400 font-bold mb-1">Money Manager</div>
            <div className="text-xs text-gray-400">Track cash, runway & exits</div>
          </button>
          
          <button
            onClick={() => setView(AppState.METRICS_DASHBOARD)}
            className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-green-400 font-bold mb-1">Metrics</div>
            <div className="text-xs text-gray-400">Track outreach performance</div>
          </button>
          
          <button
            onClick={() => setView(AppState.SHOP_VIEW)}
            className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg hover:border-blue-500 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <div className="text-2xl mb-2">🔧</div>
            <div className="text-blue-400 font-bold mb-1">R.I.D.E. OS</div>
            <div className="text-xs text-gray-400">Diagnostic platform demo</div>
          </button>
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
          <span className="text-xl font-bold tracking-tighter">RIDEWIRE <span className="text-cyan-500 font-mono text-sm ml-2">v1.0-INVESTOR</span></span>
        </div>
        <nav className="flex gap-2 p-1 bg-black/40 border border-gray-800 rounded-lg">
          <button 
            onClick={() => setView(AppState.COMMAND_CENTER)}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${view === AppState.COMMAND_CENTER ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-gray-500 hover:text-white'}`}
          >
            COMMAND CENTER
          </button>
          <button 
            onClick={() => setView(AppState.SHOP_VIEW)}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${view === AppState.SHOP_VIEW ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-gray-500 hover:text-white'}`}
          >
            IRON MAN BAY
          </button>
          <button 
            onClick={() => setView(AppState.INVESTOR_SEARCH)}
            className="px-4 py-1.5 text-xs font-mono rounded-md transition-all text-gray-500 hover:text-white hover:bg-magenta-500/20"
          >
            🎯 FIND INVESTORS
          </button>
          <button 
            onClick={() => setView(AppState.MONEY_DASHBOARD)}
            className="px-4 py-1.5 text-xs font-mono rounded-md transition-all text-gray-500 hover:text-white hover:bg-green-500/20"
          >
            💰 MONEY
          </button>
          {emailsSent > 0 && (
            <div className="px-3 py-1.5 text-xs font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-md">
              📧 {emailsSent} sent · {emailsReplied} replies
            </div>
          )}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {view === AppState.COMMAND_CENTER ? <CommandCenter /> : <ShopView />}
      </main>

      <footer className="fixed bottom-8 left-8 right-8 flex justify-between text-[10px] font-mono text-gray-600 uppercase tracking-widest">
        <div>Investor Mode Active · Legal Waiver Accepted</div>
        <div>System Healthy · 100% Uptime</div>
      </footer>
    </div>
  );
};

export default RideWireHUD;
