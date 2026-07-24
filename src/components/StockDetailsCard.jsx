import React from 'react';
import { TrendingUp, TrendingDown, Plus, Check, BarChart2, DollarSign, Layers, PieChart, Activity } from 'lucide-react';

export default function StockDetailsCard({ stock, onAddToPortfolio, isInPortfolio }) {
  if (!stock) return null;

  const isPositive = stock.change >= 0;
  
  // Calculate 52-week position percentage
  const range52 = stock.high52 - stock.low52;
  const position52 = range52 > 0 ? Math.min(100, Math.max(0, ((stock.price - stock.low52) / range52) * 100)) : 50;

  return (
    <div className="glass-card rounded-2xl p-6 border border-gray-800 shadow-xl mb-6">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl font-mono text-white tracking-wider">{stock.symbol}</span>
            <span className="bg-brand-500/10 text-brand-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-500/20">
              {stock.sector}
            </span>
            <span className="bg-gray-800 text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-700">
              {stock.category}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-200 mt-1">{stock.name}</h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl">{stock.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-extrabold font-mono text-white">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end text-sm font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1 inline" /> : <TrendingDown className="w-4 h-4 mr-1 inline" />}
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </div>
          </div>

          <button
            onClick={() => onAddToPortfolio(stock)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg ${
              isInPortfolio
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30'
                : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-brand-500/25 active:scale-95'
            }`}
          >
            {isInPortfolio ? (
              <>
                <Check className="w-4 h-4" />
                V Portfoliu
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Přidat do portfolia
              </>
            )}
          </button>
        </div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
        <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
          <span className="text-xs text-gray-400 block mb-1">Tržní kapitalizace</span>
          <span className="text-base font-bold font-mono text-white">${stock.marketCap}</span>
        </div>

        <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
          <span className="text-xs text-gray-400 block mb-1">P/E Ukazatel</span>
          <span className="text-base font-bold font-mono text-white">{stock.peRatio > 0 ? stock.peRatio : 'N/A'}</span>
        </div>

        <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
          <span className="text-xs text-gray-400 block mb-1">Objem (24h)</span>
          <span className="text-base font-bold font-mono text-white">{stock.volume || '25M'}</span>
        </div>

        <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
          <span className="text-xs text-gray-400 block mb-1">Dividenda</span>
          <span className="text-base font-bold font-mono text-emerald-400">{stock.dividendYield || '0.00%'}</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>52W Min</span>
            <span>52W Max</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden relative my-1">
            <div 
              className="bg-gradient-to-r from-brand-500 to-accent-cyan h-full rounded-full"
              style={{ width: `${position52}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-gray-300">
            <span>${stock.low52}</span>
            <span className="font-bold text-brand-400">${stock.price.toFixed(2)}</span>
            <span>${stock.high52}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
