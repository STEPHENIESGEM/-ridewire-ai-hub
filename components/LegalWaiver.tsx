'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LegalWaiverProps {
  onAccept: () => void;
}

const LegalWaiver: React.FC<LegalWaiverProps> = ({ onAccept }) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [hasReadAgreed, setHasReadAgreed] = useState(false);
  const [acceptanceText, setAcceptanceText] = useState('');
  const [fullName, setFullName] = useState('');
  const [certified, setCertified] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const canAccept = scrolledToBottom && hasReadAgreed && acceptanceText === 'I ACCEPT' && fullName.trim() !== '' && certified;
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Consider "scrolled to bottom" if within 50px of bottom
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setScrolledToBottom(true);
      }
    }
  };
  
  const handleAccept = () => {
    if (canAccept) {
      // Store acceptance in localStorage
      const waiverData = {
        accepted: true,
        timestamp: new Date().toISOString(),
        fullName,
        version: '1.0.0',
        ipAddress: 'client-side' // In production, get from server
      };
      localStorage.setItem('ridewire_legal_waiver', JSON.stringify(waiverData));
      onAccept();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-900 border-2 border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10">
          <h1 className="text-3xl font-bold text-center">
            <span className="text-cyan-400">⚖️ LEGAL WAIVER & TERMS OF USE</span>
          </h1>
          <p className="text-center text-gray-400 mt-2 text-sm">
            Please read carefully before using RideWire R.I.D.E. OS
          </p>
        </div>
        
        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-300"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Educational Use Disclaimer */}
          <section className="border border-amber-500/30 bg-amber-500/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              ⚠️ EDUCATIONAL USE ONLY
            </h2>
            <p className="mb-4">
              RideWire R.I.D.E. OS is designed for <strong>TRAINING and EDUCATIONAL purposes</strong>.
            </p>
            <p className="mb-4">
              <strong>DO NOT</strong> use this tool on customer vehicles without:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Proper ASE certification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Shop insurance coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Customer consent</span>
              </li>
            </ul>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded">
              <p className="font-bold text-red-400 mb-2">YOU assume all responsibility for repairs performed.</p>
              <p className="text-sm">RideWire Inc. is NOT liable for:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• Property damage</li>
                <li>• Personal injury</li>
                <li>• Lost revenue</li>
                <li>• Warranty claims</li>
              </ul>
            </div>
          </section>
          
          {/* Video Recording Consent */}
          <section className="border border-blue-500/30 bg-blue-500/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              📹 VIDEO RECORDING NOTICE
            </h2>
            <p className="mb-4">
              This app can record video for training purposes.
            </p>
            <p className="mb-4">
              <strong>YOU are responsible for:</strong>
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Obtaining customer consent before recording</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Complying with local privacy laws (GDPR/CCPA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Securing recorded footage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Not uploading customer data without permission</span>
              </li>
            </ul>
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded">
              <p className="font-bold text-blue-400">All recordings are stored LOCALLY on your device.</p>
              <p className="text-sm mt-2">RideWire does NOT have access to your recordings.</p>
            </div>
          </section>
          
          {/* Investment Disclaimer */}
          <section className="border border-green-500/30 bg-green-500/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              💰 INVESTOR OUTREACH NOTICE
            </h2>
            <p className="mb-4">
              The investor finder tool sends emails on your behalf.
            </p>
            <p className="mb-4">
              By using this feature, you certify that:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>You are not making a public securities offering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>You comply with SEC Regulation D</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>You will not spam or harass recipients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>You have the right to solicit investment</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded">
              <p className="text-sm">RideWire provides the tool only. <strong className="text-green-400">YOU are responsible for legal compliance.</strong></p>
            </div>
          </section>
          
          {/* Limitation of Liability */}
          <section className="border border-red-500/30 bg-red-500/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              ⚖️ LIMITATION OF LIABILITY
            </h2>
            <p className="mb-4 text-lg font-bold">
              Use of RideWire is AT YOUR OWN RISK.
            </p>
            <p className="mb-4">
              RideWire Inc., its employees, and AI models are <strong>NOT LIABLE</strong> for:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li>• Incorrect diagnoses</li>
              <li>• Failed repairs</li>
              <li>• Financial losses</li>
              <li>• Legal claims</li>
              <li>• Data breaches</li>
            </ul>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded">
              <p className="font-bold text-red-400">Maximum liability: Amount paid for software (if any).</p>
            </div>
          </section>
          
          {/* Insurance Requirement */}
          <section className="border border-purple-500/30 bg-purple-500/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              🛡️ INSURANCE REQUIREMENT
            </h2>
            <p className="mb-4 font-bold">
              REQUIRED before using this tool professionally:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>General liability insurance ($1M+ coverage)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Garage keepers insurance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Tools & equipment coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Professional liability (errors & omissions)</span>
              </li>
            </ul>
            <p className="text-sm text-purple-300">
              Check with your insurance provider before use.
            </p>
          </section>
          
          {/* Terms Update Notice */}
          <section className="border border-cyan-500/30 bg-cyan-500/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              📝 TERMS MAY CHANGE
            </h2>
            <p className="mb-2">
              We may update these terms at any time.
            </p>
            <p className="mb-2">
              Continued use = acceptance of new terms.
            </p>
            <p className="mb-4">
              Check back regularly.
            </p>
            <p className="text-sm text-cyan-300">
              <strong>Last updated:</strong> January 4, 2026 | <strong>Version:</strong> 1.0.0
            </p>
          </section>
          
          {/* Scroll indicator if not at bottom */}
          {!scrolledToBottom && (
            <div className="sticky bottom-0 left-0 right-0 text-center py-4 bg-gradient-to-t from-slate-900 to-transparent">
              <p className="text-cyan-400 animate-pulse font-mono text-sm">
                ↓ Scroll to bottom to continue ↓
              </p>
            </div>
          )}
        </div>
        
        {/* Acceptance Section */}
        <div className="p-6 border-t border-cyan-500/30 bg-slate-800/50 space-y-4">
          {/* Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasReadAgreed}
              onChange={(e) => setHasReadAgreed(e.target.checked)}
              disabled={!scrolledToBottom}
              className="mt-1 w-5 h-5 rounded border-cyan-500 bg-slate-700 text-cyan-500 focus:ring-cyan-500 disabled:opacity-50"
            />
            <span className={`text-sm ${!scrolledToBottom ? 'text-gray-600' : 'text-gray-300 group-hover:text-white'}`}>
              I have read and understood all terms and conditions above
            </span>
          </label>
          
          {/* Full Name Input */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Legal Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!hasReadAgreed}
              placeholder="Enter your full legal name"
              className="w-full px-4 py-2 bg-slate-700 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
            />
          </div>
          
          {/* Type "I ACCEPT" */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Type "<span className="text-cyan-400 font-mono">I ACCEPT</span>" to continue:
            </label>
            <input
              type="text"
              value={acceptanceText}
              onChange={(e) => setAcceptanceText(e.target.value.toUpperCase())}
              disabled={!hasReadAgreed}
              placeholder="I ACCEPT"
              className="w-full px-4 py-2 bg-slate-700 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 font-mono disabled:opacity-50"
            />
          </div>
          
          {/* Certification Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={certified}
              onChange={(e) => setCertified(e.target.checked)}
              disabled={!hasReadAgreed}
              className="mt-1 w-5 h-5 rounded border-cyan-500 bg-slate-700 text-cyan-500 focus:ring-cyan-500 disabled:opacity-50"
            />
            <span className={`text-sm ${!hasReadAgreed ? 'text-gray-600' : 'text-gray-300 group-hover:text-white'}`}>
              I certify that I am authorized to use this software and accept full responsibility
            </span>
          </label>
          
          {/* Accept Button */}
          <button
            onClick={handleAccept}
            disabled={!canAccept}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
              canAccept
                ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02]'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canAccept ? '✓ Agree & Continue to RideWire' : 'Complete All Fields Above'}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-2">
            By clicking "Agree & Continue", you acknowledge that you have read and agreed to all terms above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalWaiver;
