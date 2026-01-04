'use client';

import React, { useState, useEffect } from 'react';
import { FinancialData, InvestorPipelineCard, InvestorStatus, ExitScenario } from '../types';

interface MoneyManagerProps {
  onClose: () => void;
}

const MoneyManager: React.FC<MoneyManagerProps> = ({ onClose }) => {
  // Financial Data State
  const [financials, setFinancials] = useState<FinancialData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ridewire_financials');
      if (saved) return JSON.parse(saved);
    }
    return {
      cashOnHand: 50000,
      monthlyBurnRate: 15000,
      runway: 3.3,
      mrr: 0,
      arr: 0,
      customerCount: 0,
      arpu: 0,
      growthRate: 0
    };
  });
  
  // Pipeline State
  const [pipeline, setPipeline] = useState<InvestorPipelineCard[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ridewire_pipeline');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  
  // Exit Scenarios State
  const [exitScenarios, setExitScenarios] = useState({
    sellNow: { valuation: 1000000, taxRate: 0.20 },
    seriesA: { raise: 5000000, preMoney: 15000000, dilution: 25 },
    bootstrap: { mrrGrowth: 20, targetMrr: 50000 }
  });
  
  const [kidsCalculator, setKidsCalculator] = useState({
    exitAmount: 1000000,
    numKids: 2
  });
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('ridewire_financials', JSON.stringify(financials));
  }, [financials]);
  
  useEffect(() => {
    localStorage.setItem('ridewire_pipeline', JSON.stringify(pipeline));
  }, [pipeline]);
  
  // Calculate runway
  useEffect(() => {
    if (financials.monthlyBurnRate > 0) {
      const runway = financials.cashOnHand / financials.monthlyBurnRate;
      setFinancials(prev => ({ ...prev, runway }));
    }
  }, [financials.cashOnHand, financials.monthlyBurnRate]);
  
  // Calculate ARR and ARPU
  useEffect(() => {
    const arr = financials.mrr * 12;
    const arpu = financials.customerCount > 0 ? financials.mrr / financials.customerCount : 0;
    setFinancials(prev => ({ ...prev, arr, arpu }));
  }, [financials.mrr, financials.customerCount]);
  
  const getRunwayColor = (months: number) => {
    if (months < 3) return 'text-red-400 animate-pulse';
    if (months < 6) return 'text-amber-400';
    return 'text-green-400';
  };
  
  const getRunwayBg = (months: number) => {
    if (months < 3) return 'bg-red-500/20 border-red-500/30';
    if (months < 6) return 'bg-amber-500/20 border-amber-500/30';
    return 'bg-green-500/20 border-green-500/30';
  };
  
  const movePipelineCard = (cardId: string, newStage: InvestorStatus) => {
    setPipeline(prev => prev.map(card => 
      card.investorId === cardId ? { ...card, stage: newStage } : card
    ));
  };
  
  const calculateKidsBreakdown = () => {
    const { exitAmount, numKids } = kidsCalculator;
    const collegePerKid = 240000; // 4 years × $60K
    const totalCollege = collegePerKid * numKids;
    const houseDown = 200000;
    const emergency = 100000;
    const committed = totalCollege + houseDown + emergency;
    const remaining = Math.max(0, exitAmount - committed);
    const passiveIncome = remaining * 0.04; // 4% rule
    
    return {
      totalCollege,
      houseDown,
      emergency,
      committed,
      remaining,
      passiveIncome: passiveIncome / 12 // Monthly
    };
  };
  
  const kidsBreakdown = calculateKidsBreakdown();
  
  const pipelineStages = [
    InvestorStatus.CONTACTED,
    InvestorStatus.RESPONDED,
    InvestorStatus.MEETING_SCHEDULED,
    InvestorStatus.SECOND_MEETING,
    InvestorStatus.DUE_DILIGENCE,
    InvestorStatus.TERM_SHEET,
    InvestorStatus.NEGOTIATING,
    InvestorStatus.CLOSED
  ];
  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">💰 Money Manager</h1>
            <p className="text-gray-400">Financial Health · Pipeline · Exit Planning</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        {/* Section 1: Financial Health */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">📊 Financial Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cash on Hand */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">Cash on Hand</label>
              <input
                type="number"
                value={financials.cashOnHand}
                onChange={(e) => setFinancials(prev => ({ ...prev, cashOnHand: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
              />
              <div className="text-xs text-gray-500 mt-1">USD</div>
            </div>
            
            {/* Monthly Burn Rate */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">Monthly Burn Rate</label>
              <input
                type="number"
                value={financials.monthlyBurnRate}
                onChange={(e) => setFinancials(prev => ({ ...prev, monthlyBurnRate: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
              />
              <div className="text-xs text-gray-500 mt-1">USD/month</div>
            </div>
            
            {/* Runway */}
            <div className={`border rounded-lg p-5 ${getRunwayBg(financials.runway)}`}>
              <div className="text-sm text-gray-400 mb-2">Runway</div>
              <div className={`text-3xl font-bold ${getRunwayColor(financials.runway)}`}>
                {financials.runway.toFixed(1)} months
              </div>
              {financials.runway < 6 && (
                <div className="text-xs text-red-400 mt-2">⚠️ Low runway!</div>
              )}
            </div>
            
            {/* Growth Rate */}
            <div className="bg-slate-900 border border-green-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">Growth Rate (MoM)</label>
              <input
                type="number"
                value={financials.growthRate}
                onChange={(e) => setFinancials(prev => ({ ...prev, growthRate: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-slate-800 border border-green-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-green-500"
              />
              <div className="text-xs text-gray-500 mt-1">%</div>
            </div>
          </div>
        </section>
        
        {/* Section 2: Revenue Tracking */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">💵 Revenue Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">MRR</label>
              <input
                type="number"
                value={financials.mrr}
                onChange={(e) => setFinancials(prev => ({ ...prev, mrr: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <div className="text-sm text-gray-400 mb-2">ARR</div>
              <div className="text-2xl font-bold text-cyan-400">
                ${financials.arr.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <label className="block text-sm text-gray-400 mb-2">Customers</label>
              <input
                type="number"
                value={financials.customerCount}
                onChange={(e) => setFinancials(prev => ({ ...prev, customerCount: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <div className="text-sm text-gray-400 mb-2">ARPU</div>
              <div className="text-2xl font-bold text-cyan-400">
                ${financials.arpu.toFixed(2)}
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 3: Funding Pipeline */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎯 Funding Pipeline</h2>
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
              {pipelineStages.map(stage => {
                const count = pipeline.filter(c => c.stage === stage).length;
                return (
                  <div key={stage} className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">{stage}</div>
                    <div className="text-2xl font-bold text-cyan-400">{count}</div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center text-gray-500 py-8">
              <p className="mb-2">Pipeline tracking coming soon</p>
              <p className="text-sm">Manually track investors through each stage</p>
            </div>
          </div>
        </section>
        
        {/* Section 4: Exit Scenarios */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">🚀 Exit Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scenario A: Sell Now */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Scenario A: Sell Now</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Valuation</label>
                  <input
                    type="number"
                    value={exitScenarios.sellNow.valuation}
                    onChange={(e) => setExitScenarios(prev => ({
                      ...prev,
                      sellNow: { ...prev.sellNow, valuation: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="text-sm text-gray-400">Your Take (after 20% tax)</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${(exitScenarios.sellNow.valuation * 0.8).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Timeline: 90 days</div>
                </div>
              </div>
            </div>
            
            {/* Scenario B: Series A */}
            <div className="bg-slate-900 border border-magenta-500/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-magenta-400 mb-4">Scenario B: Raise Series A</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Raise Amount</label>
                  <input
                    type="number"
                    value={exitScenarios.seriesA.raise}
                    onChange={(e) => setExitScenarios(prev => ({
                      ...prev,
                      seriesA: { ...prev.seriesA, raise: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-magenta-500/30 rounded-lg text-white focus:outline-none focus:border-magenta-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Pre-Money</label>
                  <input
                    type="number"
                    value={exitScenarios.seriesA.preMoney}
                    onChange={(e) => setExitScenarios(prev => ({
                      ...prev,
                      seriesA: { ...prev.seriesA, preMoney: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-magenta-500/30 rounded-lg text-white focus:outline-none focus:border-magenta-500"
                  />
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="text-sm text-gray-400">Your Dilution</div>
                  <div className="text-2xl font-bold text-amber-400">
                    {((exitScenarios.seriesA.raise / (exitScenarios.seriesA.preMoney + exitScenarios.seriesA.raise)) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Timeline: 18-24 months</div>
                </div>
              </div>
            </div>
            
            {/* Scenario C: Bootstrap */}
            <div className="bg-slate-900 border border-green-500/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-green-400 mb-4">Scenario C: Bootstrap</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">MRR Growth Rate (%)</label>
                  <input
                    type="number"
                    value={exitScenarios.bootstrap.mrrGrowth}
                    onChange={(e) => setExitScenarios(prev => ({
                      ...prev,
                      bootstrap: { ...prev.bootstrap, mrrGrowth: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Target MRR</label>
                  <input
                    type="number"
                    value={exitScenarios.bootstrap.targetMrr}
                    onChange={(e) => setExitScenarios(prev => ({
                      ...prev,
                      bootstrap: { ...prev.bootstrap, targetMrr: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="text-sm text-gray-400">Annual Profit (at target)</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${(exitScenarios.bootstrap.targetMrr * 12 * 0.3).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Timeline: Forever (passive)</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 5: Kids' Future Calculator */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">👨‍👩‍👧‍👦 Kids' Future Calculator</h2>
          <div className="bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Exit Amount</label>
                <input
                  type="number"
                  value={kidsCalculator.exitAmount}
                  onChange={(e) => setKidsCalculator(prev => ({ ...prev, exitAmount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Number of Kids</label>
                <input
                  type="number"
                  value={kidsCalculator.numKids}
                  onChange={(e) => setKidsCalculator(prev => ({ ...prev, numKids: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">College Fund</div>
                <div className="text-xl font-bold text-cyan-400">
                  ${kidsBreakdown.totalCollege.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">($240K × {kidsCalculator.numKids})</div>
              </div>
              
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">House Down Payment</div>
                <div className="text-xl font-bold text-cyan-400">
                  ${kidsBreakdown.houseDown.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Emergency Fund</div>
                <div className="text-xl font-bold text-cyan-400">
                  ${kidsBreakdown.emergency.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-green-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Passive Income</div>
                <div className="text-xl font-bold text-green-400">
                  ${kidsBreakdown.passiveIncome.toFixed(0)}/mo
                </div>
                <div className="text-xs text-gray-500">(4% rule)</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-cyan-500/30">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400">Investment Portfolio (Remaining)</div>
                  <div className="text-3xl font-bold text-cyan-400">
                    ${kidsBreakdown.remaining.toLocaleString()}
                  </div>
                </div>
                {kidsBreakdown.remaining < 0 && (
                  <div className="text-red-400 font-bold">
                    ⚠️ Need ${Math.abs(kidsBreakdown.remaining).toLocaleString()} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoneyManager;
