'use client';

import React, { useState, useEffect } from 'react';
import { Investor } from '../types';
import { generateSubjectLines, generateEmailBody, validateEmailContent, EmailVariables } from '../utils/email-templates';
import { sendInvestorEmail, getRemainingEmailsToday } from '../utils/email-service';
import { checkSpamScore, getSpamRating } from '../utils/spam-checker';

interface EmailComposerProps {
  investors: Investor[];
  onClose: () => void;
  onSent: (count: number) => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ investors, onClose, onSent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [variant, setVariant] = useState<1 | 2 | 3>(1);
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [remainingToday, setRemainingToday] = useState(100);
  
  const currentInvestor = investors[currentIndex];
  
  const emailVars: EmailVariables = {
    investorName: currentInvestor?.name.split(' ')[0] || '',
    firmName: currentInvestor?.firm || '',
    recentInvestment: currentInvestor?.recentInvestments[0],
    founderName: 'Founder', // Could be customized
    companyName: 'RideWire',
    companyDescription: 'AI-powered diagnostic OS for automotive repair',
    fundingAmount: '$500K seed',
    keyMetric: '40% improvement in first-time fix rates'
  };
  
  const subjects = currentInvestor ? generateSubjectLines(currentInvestor, emailVars) : [];
  const generatedSubject = subjects[variant - 1] || '';
  const generatedBody = currentInvestor ? generateEmailBody(currentInvestor, emailVars, variant) : '';
  
  const currentSubject = isCustom ? customSubject : generatedSubject;
  const currentBody = isCustom ? customBody : generatedBody;
  
  const spamCheck = checkSpamScore(currentSubject, currentBody);
  const spamRating = getSpamRating(spamCheck.score);
  const validation = validateEmailContent(currentSubject, currentBody);
  
  useEffect(() => {
    setRemainingToday(getRemainingEmailsToday());
  }, []);
  
  useEffect(() => {
    if (!isCustom) {
      setCustomSubject(generatedSubject);
      setCustomBody(generatedBody);
    }
  }, [currentIndex, variant, isCustom]);
  
  const handleSendCurrent = async () => {
    if (!validation.valid || !spamCheck.passed) {
      alert('Please fix validation errors before sending');
      return;
    }
    
    setIsSending(true);
    
    const result = await sendInvestorEmail({
      to: currentInvestor.email,
      subject: currentSubject,
      body: currentBody,
      investorName: currentInvestor.name,
      firmName: currentInvestor.firm
    });
    
    if (result.success) {
      setSentCount(prev => prev + 1);
      setRemainingToday(getRemainingEmailsToday());
      
      // Move to next investor if available
      if (currentIndex < investors.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsCustom(false);
      } else {
        alert(`All ${sentCount + 1} emails sent successfully!`);
        onSent(sentCount + 1);
        onClose();
      }
    } else {
      alert(`Failed to send email: ${result.message}`);
    }
    
    setIsSending(false);
  };
  
  const handleSendAll = async () => {
    if (!confirm(`Send emails to all ${investors.length} investors? This will use ${investors.length} of your daily limit.`)) {
      return;
    }
    
    setIsSending(true);
    let successful = 0;
    
    for (let i = 0; i < investors.length; i++) {
      const investor = investors[i];
      setSendProgress(((i + 1) / investors.length) * 100);
      
      const subject = generateSubjectLines(investor, emailVars)[variant - 1];
      const body = generateEmailBody(investor, emailVars, variant);
      
      const result = await sendInvestorEmail({
        to: investor.email,
        subject,
        body,
        investorName: investor.name,
        firmName: investor.firm
      });
      
      if (result.success) {
        successful++;
      }
      
      // Small delay between sends
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setSentCount(successful);
    setIsSending(false);
    alert(`Sent ${successful} out of ${investors.length} emails successfully!`);
    onSent(successful);
    setRemainingToday(getRemainingEmailsToday());
  };
  
  const handleSkip = () => {
    if (currentIndex < investors.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsCustom(false);
    }
  };
  
  if (!currentInvestor) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">No investors selected</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition-colors"
          >
            Back to Investor Finder
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">📧 Email Composer</h1>
            <p className="text-gray-400">
              Investor {currentIndex + 1} of {investors.length} · {sentCount} sent · {remainingToday} remaining today
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            ← Back
          </button>
        </div>
        
        {/* Progress Bar */}
        {isSending && (
          <div className="mb-6 bg-slate-900 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-400">Sending emails...</span>
              <span className="text-white font-bold">{Math.round(sendProgress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-magenta-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${sendProgress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Investor Info & Controls */}
          <div className="space-y-6">
            {/* Current Investor */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Current Investor</h3>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="text-white font-bold">{currentInvestor.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Firm</div>
                  <div className="text-white">{currentInvestor.firm}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-cyan-400 text-sm">{currentInvestor.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fit Score</div>
                  <div className="text-white font-bold">{currentInvestor.fitScore}%</div>
                </div>
              </div>
            </div>
            
            {/* Email Variant Selector */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Email Variant</h3>
              <div className="space-y-2">
                {[1, 2, 3].map(v => (
                  <button
                    key={v}
                    onClick={() => {
                      setVariant(v as 1 | 2 | 3);
                      setIsCustom(false);
                    }}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      variant === v && !isCustom
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                        : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-cyan-500/50'
                    }`}
                  >
                    Variant {v}
                  </button>
                ))}
                <button
                  onClick={() => setIsCustom(true)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isCustom
                      ? 'bg-magenta-500/20 border-magenta-500 text-magenta-400'
                      : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-magenta-500/50'
                  }`}
                >
                  ✏️ Custom
                </button>
              </div>
            </div>
            
            {/* Spam Score */}
            <div className={`border rounded-lg p-5 ${
              spamCheck.passed ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <h3 className="text-lg font-bold mb-3" style={{ color: spamRating.color }}>
                {spamRating.emoji} Spam Score: {spamCheck.score}
              </h3>
              <div className="text-sm space-y-2">
                <div style={{ color: spamRating.color }} className="font-bold">
                  {spamRating.rating}
                </div>
                {spamCheck.issues.length > 0 && (
                  <div className="mt-3">
                    <div className="text-gray-400 mb-1">Issues:</div>
                    {spamCheck.issues.slice(0, 3).map((issue, i) => (
                      <div key={i} className="text-xs text-gray-300">• {issue.message}</div>
                    ))}
                  </div>
                )}
                {spamCheck.suggestions.length > 0 && spamCheck.score > 3 && (
                  <div className="mt-3">
                    <div className="text-gray-400 mb-1">Suggestions:</div>
                    {spamCheck.suggestions.slice(0, 2).map((suggestion, i) => (
                      <div key={i} className="text-xs text-gray-300">• {suggestion}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSendCurrent}
                disabled={isSending || !validation.valid || !spamCheck.passed}
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  isSending || !validation.valid || !spamCheck.passed
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                }`}
              >
                {isSending ? 'Sending...' : '✓ Send to This Investor'}
              </button>
              
              <button
                onClick={handleSendAll}
                disabled={isSending || remainingToday < investors.length}
                className="w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send to All {investors.length} Investors
              </button>
              
              <button
                onClick={handleSkip}
                disabled={isSending}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-50"
              >
                Skip to Next
              </button>
            </div>
          </div>
          
          {/* Right: Email Preview/Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Subject Line */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">Subject Line</label>
              {isCustom ? (
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              ) : (
                <div className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white">
                  {generatedSubject}
                </div>
              )}
            </div>
            
            {/* Email Body */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">Email Body</label>
              {isCustom ? (
                <textarea
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
              ) : (
                <div 
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: generatedBody }}
                />
              )}
            </div>
            
            {/* Validation Errors */}
            {!validation.valid && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-bold mb-2">⚠️ Validation Errors</h4>
                {validation.errors.map((error, i) => (
                  <div key={i} className="text-sm text-red-300">• {error}</div>
                ))}
              </div>
            )}
            
            {/* Validation Warnings */}
            {validation.warnings.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="text-amber-400 font-bold mb-2">⚠️ Warnings</h4>
                {validation.warnings.map((warning, i) => (
                  <div key={i} className="text-sm text-amber-300">• {warning}</div>
                ))}
              </div>
            )}
            
            {/* Legal Compliance Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-bold mb-2">✓ Legal Compliance</h4>
              <div className="text-sm text-blue-300 space-y-1">
                <div>• CAN-SPAM Act footer included</div>
                <div>• Unsubscribe link added</div>
                <div>• Investment disclaimer included</div>
                <div>• Rate limiting: {remainingToday} emails remaining today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;
