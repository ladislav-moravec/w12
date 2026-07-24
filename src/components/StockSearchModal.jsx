import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, TrendingDown, Plus, Check, Star } from 'lucide-react';
import { INITIAL_STOCKS, CATEGORIES, searchStocks } from '../services/stockApi';

export default function StockSearchModal({ 
  isOpen, 
  onClose, 
  onSelectStock, 
  onAddToPortfolio,
  portfolioHoldings = []
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Všechny');
  const [results, setResults] = useState(INITIAL_STOCKS);

  useEffect(() => {
    let filtered = searchStocks(query);
    if (selectedCategory !== 'Všechny') {
      filtered = filtered.filter(s => s.category === selectedCategory || s.sector === selectedCategory);
    }
    setResults(filtered);
  }, [query, selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose(); else ;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isInPortfolio = (symbol) => {
    return portfolioHoldings.some(item => item.symbol.toUpperCase() === symbol.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="glass-panel w-full max-w-3xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-gray-900/60">
          <Search className="w-5 h-5 text-brand-500 shrink-0" />
          <input
            type="text"
            placeholder="Vyhledat podle tickeru nebo náznaku (AAPL, NVDA, S&P 500, Tesla)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-800 rounded-lg text-gray-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-semibold rounded-lg border border-gray-700"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 border-b border-gray-800/60 bg-[#070a12] flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stock List Results */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-gray-800/50">
          {results.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30 text-gray-400" />
              <p className="text-base font-semibold text-gray-400">Žádná akcie pro "{query}" nenalezena</p>
              <p className="text-xs text-gray-500 mt-1">Zkuste zadat např. AAPL, NVDA, TSLA, MSFT nebo Crypto.</p>
            </div>
          ) : (
            results.map((stock) => {
              const positive = stock.change >= 0;
              const inPortfolio = isInPortfolio(stock.symbol);

              return (
                <div 
                  key={stock.symbol}
                  className="py-3 px-3 hover:bg-gray-800/60 rounded-xl flex items-center justify-between gap-4 group transition cursor-pointer"
                  onClick={() => {
                    onSelectStock(stock);
                    onClose();
                  }}
                >
                  {/* Symbol & Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center font-bold font-mono text-brand-400 group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition shrink-0">
                      {stock.symbol.slice(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono">{stock.symbol}</span>
                        <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded border border-gray-700">
                          {stock.sector}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{stock.name}</p>
                    </div>
                  </div>

                  {/* Price & Change */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-mono font-bold text-white">${stock.price.toFixed(2)}</div>
                      <div className={`flex items-center justify-end text-xs font-mono font-semibold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {positive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    {/* Quick Add to Portfolio */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToPortfolio(stock);
                      }}
                      title={inPortfolio ? "Součást vašeho portfolia" : "Přidat do portfolia"}
                      className={`p-2 rounded-lg border transition ${
                        inPortfolio 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                          : 'bg-gray-900 border-gray-800 hover:border-brand-500 text-gray-400 hover:text-white'
                      }`}
                    >
                      {inPortfolio ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
