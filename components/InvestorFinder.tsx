'use client';

import React, { useState, useMemo } from 'react';
import { Investor, InvestorStage, InvestorStatus } from '../types';
import { INVESTOR_DATABASE, calculateFitScore, filterInvestors, searchInvestors } from '../utils/investor-database';

interface InvestorFinderProps {
  onCompose: (investors: Investor[]) => void;
  onClose: () => void;
}

const InvestorFinder: React.FC<InvestorFinderProps> = ({ onCompose, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<InvestorStage | ''>('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedGeography, setSelectedGeography] = useState('');
  const [minCheckSize, setMinCheckSize] = useState('');
  const [maxCheckSize, setMaxCheckSize] = useState('');
  const [selectedInvestors, setSelectedInvestors] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'fitScore' | 'name' | 'checkSize'>('fitScore');
  
  // Company profile for fit scoring
  const companyProfile = {
    stage: InvestorStage.SEED,
    sectors: ['AI', 'Automotive'],
    geography: 'US',
    fundingNeeded: 500000
  };
  
  // Filter and search investors
  const filteredInvestors = useMemo(() => {
    let investors = INVESTOR_DATABASE;
    
    // Apply search
    if (searchQuery.trim()) {
      investors = searchInvestors(searchQuery);
    }
    
    // Apply filters
    const filters: any = {};
    if (selectedStage) filters.stage = selectedStage;
    if (selectedSector) filters.sector = selectedSector;
    if (selectedGeography) filters.geography = selectedGeography;
    if (minCheckSize) filters.minCheckSize = parseInt(minCheckSize);
    if (maxCheckSize) filters.maxCheckSize = parseInt(maxCheckSize);
    
    if (Object.keys(filters).length > 0) {
      investors = filterInvestors(filters);
    }
    
    // Calculate fit scores
    investors = investors.map(inv => ({
      ...inv,
      fitScore: calculateFitScore(inv, companyProfile)
    }));
    
    // Sort
    investors.sort((a, b) => {
      if (sortBy === 'fitScore') {
        return (b.fitScore || 0) - (a.fitScore || 0);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.checkSizeMin - b.checkSizeMin;
      }
    });
    
    return investors;
  }, [searchQuery, selectedStage, selectedSector, selectedGeography, minCheckSize, maxCheckSize, sortBy]);
  
  const toggleInvestor = (investorId: string) => {
    const newSelected = new Set(selectedInvestors);
    if (newSelected.has(investorId)) {
      newSelected.delete(investorId);
    } else {
      if (newSelected.size >= 50) {
        alert('Maximum 50 investors can be selected at once');
        return;
      }
      newSelected.add(investorId);
    }
    setSelectedInvestors(newSelected);
  };
  
  const selectAll = () => {
    const newSelected = new Set<string>();
    filteredInvestors.slice(0, 50).forEach(inv => newSelected.add(inv.id));
    setSelectedInvestors(newSelected);
  };
  
  const clearSelection = () => {
    setSelectedInvestors(new Set());
  };
  
  const handleCompose = () => {
    const investors = INVESTOR_DATABASE.filter(inv => selectedInvestors.has(inv.id));
    onCompose(investors);
  };
  
  const exportToCSV = () => {
    const investors = INVESTOR_DATABASE.filter(inv => selectedInvestors.has(inv.id));
    
    const headers = ['Name', 'Firm', 'Email', 'Stage', 'Sectors', 'Check Size', 'Fit Score'];
    const rows = investors.map(inv => [
      inv.name,
      inv.firm,
      inv.email,
      inv.stage.join('; '),
      inv.sectors.join('; '),
      `$${inv.checkSizeMin / 1000}K-$${inv.checkSizeMax / 1000000}M`,
      inv.fitScore?.toString() || '0'
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ridewire-investors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };
  
  const getFitScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-cyan-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-red-400';
  };
  
  const getFitScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-cyan-500/20 border-cyan-500/30';
    if (score >= 40) return 'bg-amber-500/20 border-amber-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">🎯 Investor Finder</h1>
            <p className="text-gray-400">Search 500+ pre-vetted investors · Select up to 50 for outreach</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4">
            <div className="text-cyan-400 text-sm mb-1">Total Investors</div>
            <div className="text-2xl font-bold">{INVESTOR_DATABASE.length}</div>
          </div>
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4">
            <div className="text-cyan-400 text-sm mb-1">Filtered Results</div>
            <div className="text-2xl font-bold">{filteredInvestors.length}</div>
          </div>
          <div className="bg-slate-900 border border-magenta-500/30 rounded-lg p-4">
            <div className="text-magenta-400 text-sm mb-1">Selected</div>
            <div className="text-2xl font-bold">{selectedInvestors.size} / 50</div>
          </div>
          <div className="bg-slate-900 border border-green-500/30 rounded-lg p-4">
            <div className="text-green-400 text-sm mb-1">Avg Fit Score</div>
            <div className="text-2xl font-bold">
              {filteredInvestors.length > 0 
                ? Math.round(filteredInvestors.reduce((sum, inv) => sum + (inv.fitScore || 0), 0) / filteredInvestors.length)
                : 0}
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search by name or firm..."
                className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            {/* Stage Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value as any)}
                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">All Stages</option>
                <option value={InvestorStage.PRE_SEED}>Pre-seed</option>
                <option value={InvestorStage.SEED}>Seed</option>
                <option value={InvestorStage.SERIES_A}>Series A</option>
                <option value={InvestorStage.SERIES_B}>Series B+</option>
              </select>
            </div>
            
            {/* Sector Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sector</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">All Sectors</option>
                <option value="AI">AI</option>
                <option value="Automotive">Automotive</option>
                <option value="Climate">Climate</option>
                <option value="SaaS">SaaS</option>
                <option value="Biotech">Biotech</option>
              </select>
            </div>
            
            {/* Geography Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Geography</label>
              <select
                value={selectedGeography}
                onChange={(e) => setSelectedGeography(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">All Regions</option>
                <option value="US">US</option>
                <option value="EU">EU</option>
                <option value="Asia">Asia</option>
                <option value="Global">Global</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Check Size */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Min Check Size</label>
              <input
                type="number"
                value={minCheckSize}
                onChange={(e) => setMinCheckSize(e.target.value)}
                placeholder="250000"
                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            {/* Max Check Size */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Max Check Size</label>
              <input
                type="number"
                value={maxCheckSize}
                onChange={(e) => setMaxCheckSize(e.target.value)}
                placeholder="1000000"
                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            {/* Sort By */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="fitScore">Fit Score (High to Low)</option>
                <option value="name">Name (A-Z)</option>
                <option value="checkSize">Check Size (Low to High)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={selectAll}
            className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded-lg transition-colors"
          >
            Select Top 50
          </button>
          <button
            onClick={clearSelection}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            Clear Selection
          </button>
          <button
            onClick={exportToCSV}
            disabled={selectedInvestors.size === 0}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📊 Export to CSV
          </button>
          <div className="flex-1"></div>
          <button
            onClick={handleCompose}
            disabled={selectedInvestors.size === 0}
            className={`px-8 py-2 rounded-lg font-bold transition-all ${
              selectedInvestors.size > 0
                ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            📧 Compose Emails ({selectedInvestors.size})
          </button>
        </div>
      </div>
      
      {/* Investor List */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {filteredInvestors.map(investor => (
            <div
              key={investor.id}
              className={`bg-slate-900 border rounded-lg p-5 transition-all cursor-pointer hover:border-cyan-500/50 ${
                selectedInvestors.has(investor.id)
                  ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'border-slate-700'
              }`}
              onClick={() => toggleInvestor(investor.id)}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedInvestors.has(investor.id)}
                  onChange={() => {}}
                  className="mt-1 w-5 h-5 rounded border-cyan-500 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                
                {/* Investor Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{investor.name}</h3>
                      <p className="text-cyan-400">{investor.firm}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg border ${getFitScoreBg(investor.fitScore || 0)}`}>
                      <span className={`font-bold ${getFitScoreColor(investor.fitScore || 0)}`}>
                        {investor.fitScore}% Fit
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Stage:</span>
                      <span className="text-gray-300 ml-2">{investor.stage.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Check Size:</span>
                      <span className="text-gray-300 ml-2">
                        ${investor.checkSizeMin / 1000}K-${investor.checkSizeMax / 1000000}M
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Geography:</span>
                      <span className="text-gray-300 ml-2">{investor.geography.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sectors:</span>
                      <span className="text-gray-300 ml-2">{investor.sectors.join(', ')}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2">
                    <strong className="text-gray-300">Thesis:</strong> {investor.thesis}
                  </p>
                  
                  {investor.recentInvestments.length > 0 && (
                    <p className="text-gray-400 text-sm">
                      <strong className="text-gray-300">Recent:</strong> {investor.recentInvestments.slice(0, 3).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredInvestors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-2">No investors found</p>
              <p className="text-sm">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorFinder;
