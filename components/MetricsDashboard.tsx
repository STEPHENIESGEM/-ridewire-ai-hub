'use client';

import React, { useState, useEffect } from 'react';
import { EmailMetrics, DailyMetrics, EmailOutreach, EmailStatus } from '../types';

interface MetricsDashboardProps {
  onClose: () => void;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<EmailMetrics>({
    totalSent: 0,
    totalOpened: 0,
    totalReplied: 0,
    totalMeetings: 0,
    totalTermSheets: 0,
    totalClosed: 0,
    openRate: 0,
    replyRate: 0,
    meetingRate: 0,
    termSheetRate: 0,
    closeRate: 0
  });
  
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics[]>([]);
  
  // Load metrics from localStorage
  useEffect(() => {
    const outreach = localStorage.getItem('ridewire_outreach');
    if (outreach) {
      const emails: EmailOutreach[] = JSON.parse(outreach);
      
      // Calculate metrics
      const totalSent = emails.filter(e => e.status === EmailStatus.SENT || e.status === EmailStatus.OPENED || e.status === EmailStatus.REPLIED).length;
      const totalOpened = emails.filter(e => e.openedAt).length;
      const totalReplied = emails.filter(e => e.repliedAt).length;
      const totalMeetings = emails.filter(e => e.meetingBookedAt).length;
      
      setMetrics({
        totalSent,
        totalOpened,
        totalReplied,
        totalMeetings,
        totalTermSheets: 0,
        totalClosed: 0,
        openRate: totalSent > 0 ? (totalOpened / totalSent) * 100 : 0,
        replyRate: totalSent > 0 ? (totalReplied / totalSent) * 100 : 0,
        meetingRate: totalReplied > 0 ? (totalMeetings / totalReplied) * 100 : 0,
        termSheetRate: 0,
        closeRate: 0
      });
    }
  }, []);
  
  const getMetricColor = (value: number, target: number) => {
    if (value >= target) return 'text-green-400';
    if (value >= target * 0.7) return 'text-cyan-400';
    return 'text-amber-400';
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">📊 Metrics Dashboard</h1>
            <p className="text-gray-400">Track your investor outreach performance</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-2">Emails Sent</div>
            <div className="text-3xl font-bold text-cyan-400">{metrics.totalSent}</div>
          </div>
          
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-2">Open Rate</div>
            <div className={`text-3xl font-bold ${getMetricColor(metrics.openRate, 40)}`}>
              {metrics.openRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Target: 40%</div>
          </div>
          
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-2">Reply Rate</div>
            <div className={`text-3xl font-bold ${getMetricColor(metrics.replyRate, 5)}`}>
              {metrics.replyRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Target: 5%</div>
          </div>
          
          <div className="bg-slate-900 border border-green-500/30 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-2">Meetings</div>
            <div className="text-3xl font-bold text-green-400">{metrics.totalMeetings}</div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics.totalReplied > 0 ? `${metrics.meetingRate.toFixed(0)}% of replies` : 'No replies yet'}
            </div>
          </div>
          
          <div className="bg-slate-900 border border-magenta-500/30 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-2">Term Sheets</div>
            <div className="text-3xl font-bold text-magenta-400">{metrics.totalTermSheets}</div>
          </div>
          
          <div className="bg-slate-900 border border-green-500/30 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-2">Closed</div>
            <div className="text-3xl font-bold text-green-400">{metrics.totalClosed}</div>
          </div>
        </div>
        
        {/* Funnel Visualization */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">📉 Conversion Funnel</h2>
          <div className="space-y-3">
            {/* Sent */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Emails Sent</span>
                <span className="text-white font-bold">{metrics.totalSent}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full flex items-center justify-center text-black font-bold text-sm"
                  style={{ width: '100%' }}
                >
                  100%
                </div>
              </div>
            </div>
            
            {/* Opened */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Opened</span>
                <span className="text-white font-bold">{metrics.totalOpened}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full flex items-center justify-center text-black font-bold text-sm"
                  style={{ width: `${metrics.totalSent > 0 ? (metrics.totalOpened / metrics.totalSent) * 100 : 0}%` }}
                >
                  {metrics.openRate.toFixed(1)}%
                </div>
              </div>
            </div>
            
            {/* Replied */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Replied</span>
                <span className="text-white font-bold">{metrics.totalReplied}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${metrics.totalSent > 0 ? (metrics.totalReplied / metrics.totalSent) * 100 : 0}%` }}
                >
                  {metrics.replyRate.toFixed(1)}%
                </div>
              </div>
            </div>
            
            {/* Meetings */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Meetings Booked</span>
                <span className="text-white font-bold">{metrics.totalMeetings}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-magenta-500 h-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${metrics.totalSent > 0 ? (metrics.totalMeetings / metrics.totalSent) * 100 : 0}%` }}
                >
                  {metrics.totalSent > 0 ? ((metrics.totalMeetings / metrics.totalSent) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>
            
            {/* Closed */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Closed</span>
                <span className="text-white font-bold">{metrics.totalClosed}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-magenta-500 to-green-500 h-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${metrics.totalSent > 0 ? (metrics.totalClosed / metrics.totalSent) * 100 : 0}%` }}
                >
                  {metrics.closeRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Insights */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">💡 Performance Insights</h2>
          <div className="space-y-3 text-gray-300">
            {metrics.totalSent === 0 && (
              <div className="text-center py-8">
                <p className="text-xl text-gray-500 mb-2">No data yet</p>
                <p className="text-sm text-gray-600">Start sending emails to see metrics</p>
              </div>
            )}
            
            {metrics.totalSent > 0 && (
              <>
                {metrics.openRate < 40 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="font-bold text-amber-400 mb-1">📬 Improve Open Rates</div>
                    <div className="text-sm">Your open rate is below target. Try:</div>
                    <ul className="text-sm mt-2 space-y-1 ml-4">
                      <li>• Personalizing subject lines more</li>
                      <li>• Sending emails at optimal times (10AM-11AM)</li>
                      <li>• A/B testing different subject formats</li>
                    </ul>
                  </div>
                )}
                
                {metrics.replyRate < 5 && metrics.totalOpened > 10 && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="font-bold text-blue-400 mb-1">✉️ Increase Reply Rate</div>
                    <div className="text-sm">People are opening but not replying. Try:</div>
                    <ul className="text-sm mt-2 space-y-1 ml-4">
                      <li>• Shorter emails (under 150 words)</li>
                      <li>• Clearer call-to-action</li>
                      <li>• Reference specific recent investments</li>
                    </ul>
                  </div>
                )}
                
                {metrics.openRate >= 40 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="font-bold text-green-400 mb-1">✅ Great Open Rate!</div>
                    <div className="text-sm">Your subject lines are working well. Keep it up!</div>
                  </div>
                )}
                
                {metrics.replyRate >= 5 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="font-bold text-green-400 mb-1">✅ Excellent Reply Rate!</div>
                    <div className="text-sm">Your email content is resonating with investors.</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
