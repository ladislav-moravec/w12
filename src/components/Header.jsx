import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  User, 
  LogOut, 
  Briefcase, 
  LineChart, 
  DollarSign, 
  Sparkles,
  Lock,
  ChevronDown
} from 'lucide-react';
import { MARKET_INDICES } from '../services/stockApi';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onOpenAuth, 
  user, 
  onLogout,
  currency,
  setCurrency,
  portfolioCount
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-800/80">
      {/* Live Top Market Ticker Bar */}
      <div className="bg-[#070a12] border-b border-gray-800/50 py-1.5 px-4 text-xs overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 whitespace-nowrap">
          <div className="flex items-center gap-2 text-gray-400 font-medium shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">TRHY ŽIVĚ</span>
          </div>

          <div className="flex items-center gap-6 text-gray-300">
            {MARKET_INDICES.map((idx, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-gray-400 font-medium">{idx.name}:</span>
                <span className="font-mono text-white font-semibold">{idx.value}</span>
                <span className={`flex items-center text-[11px] font-mono font-medium ${idx.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {idx.positive ? <TrendingUp className="w-3 h-3 mr-0.5 inline" /> : <TrendingDown className="w-3 h-3 mr-0.5 inline" />}
                  {idx.percent}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <span className="text-gray-400 text-[11px]">Měna:</span>
            <div className="flex bg-gray-900 border border-gray-800 rounded p-0.5 text-[11px]">
              {['USD', 'EUR', 'CZK'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded transition ${currency === c ? 'bg-brand-600 text-white font-semibold' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  {c === 'USD' ? '$' : c === 'EUR' ? '€' : 'Kč'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('screener')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-accent-cyan flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <LineChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">LM<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-cyan">vest</span></span>
              <span className="bg-brand-500/10 text-brand-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-brand-500/20">PRO</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Akciový Screener & Správa Portfolia</p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/80 p-1.5 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('screener')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'screener' 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <LineChart className="w-4 h-4" />
            Screener & Grafy
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition relative ${
              activeTab === 'portfolio' 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Moje Portfolio
            {portfolioCount > 0 && (
              <span className="ml-1 bg-emerald-500/20 text-emerald-400 font-mono text-[11px] px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                {portfolioCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions: Search trigger & Auth */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 px-3.5 py-2 rounded-xl text-sm transition group"
          >
            <Search className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium">Hledat ticker (AAPL, TSLA...)</span>
            <kbd className="hidden lg:inline-block bg-gray-800 text-gray-400 text-[10px] px-1.5 py-0.5 rounded font-mono border border-gray-700">⌘K</kbd>
          </button>

          {/* User Auth Profile Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-900 border border-gray-800 hover:border-gray-700 p-1.5 pr-3 rounded-xl transition"
              >
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || 'user'}`} 
                  alt={user.displayName || 'Profil'} 
                  className="w-7 h-7 rounded-lg bg-brand-600/30 border border-brand-500/30"
                />
                <span className="text-sm font-semibold text-gray-200 hidden md:inline max-w-[120px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl p-2 z-50 border border-gray-800">
                  <div className="px-3 py-2 border-b border-gray-800 mb-1">
                    <p className="text-xs text-gray-400">Přihlášen jako</p>
                    <p className="text-sm font-bold text-white truncate">{user.email || user.displayName}</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                      Cloud Sync Aktivní
                    </span>
                  </div>
                  <button
                    onClick={() => { setActiveTab('portfolio'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/80 rounded-lg transition"
                  >
                    <Briefcase className="w-4 h-4 text-brand-400" />
                    Spravovat portfolio
                  </button>
                  <button
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Odhlásit se
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-brand-500/25 transition active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Přihlásit se</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
