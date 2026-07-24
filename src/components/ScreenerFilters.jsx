import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  Plus, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { CATEGORIES, INITIAL_STOCKS } from '../services/stockApi';

export default function ScreenerFilters({ 
  onSelectStock, 
  selectedStock, 
  onAddToPortfolio, 
  portfolioHoldings = [] 
}) {
  const [activeCategory, setActiveCategory] = useState('Všechny');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('marketCap'); // marketCap, gainers, losers, peRatio

  const isInPortfolio = (symbol) => {
    return portfolioHoldings.some(item => item.symbol.toUpperCase() === symbol.toUpperCase());
  };

  // Filter stocks
  let stocks = INITIAL_STOCKS.filter((s) => {
    const matchesCat = activeCategory === 'Všechny' || s.category === activeCategory || s.sector === activeCategory;
    const matchesSearch = !searchQuery || 
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort stocks
  stocks.sort((a, b) => {
    if (sortBy === 'gainers') return b.changePercent - a.changePercent;
    if (sortBy === 'losers') return a.changePercent - b.changePercent;
    if (sortBy === 'peRatio') return (a.peRatio || 999) - (b.peRatio || 999);
    // Market cap default parse (T/B)
    const getCap = (val) => {
      if (val.endsWith('T')) return parseFloat(val) * 1000;
      if (val.endsWith('B')) return parseFloat(val);
      return 0;
    };
    return getCap(b.marketCap) - getCap(a.marketCap);
  });

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md' 
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filtrovat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl pl-9 pr-3 py-1.5 text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 rounded-xl p-1 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500 ml-1.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-300 outline-none cursor-pointer pr-2 py-0.5 text-xs font-medium"
            >
              <option value="marketCap" className="bg-gray-900">Největší Tržní Kap.</option>
              <option value="gainers" className="bg-gray-900">Největší Růst (%)</option>
              <option value="losers" className="bg-gray-900">Největší Pokles (%)</option>
              <option value="peRatio" className="bg-gray-900">Nejnižší P/E Ukazatel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stock Screener Table / Grid */}
      <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-950/60">
                <th className="p-3.5 pl-5">Ticker & Společnost</th>
                <th className="p-3.5 font-mono">Cena ($)</th>
                <th className="p-3.5 font-mono">Změna (%)</th>
                <th className="p-3.5 font-mono hidden sm:table-cell">Market Cap</th>
                <th className="p-3.5 font-mono hidden md:table-cell">P/E Ratio</th>
                <th className="p-3.5 font-mono hidden lg:table-cell">Sektor</th>
                <th className="p-3.5 text-right pr-5">Graf & Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-sm">
              {stocks.map((stock) => {
                const positive = stock.change >= 0;
                const isSelected = selectedStock?.symbol === stock.symbol;
                const inPortfolio = isInPortfolio(stock.symbol);

                return (
                  <tr 
                    key={stock.symbol}
                    onClick={() => onSelectStock(stock)}
                    className={`cursor-pointer transition ${
                      isSelected 
                        ? 'bg-brand-600/15 border-l-4 border-l-brand-500' 
                        : 'hover:bg-gray-800/40'
                    }`}
                  >
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold font-mono text-xs transition ${
                          isSelected 
                            ? 'bg-brand-600 border-brand-400 text-white shadow-md' 
                            : 'bg-gray-900 border-gray-800 text-brand-400'
                        }`}>
                          {stock.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white font-mono">{stock.symbol}</span>
                            {isSelected && (
                              <span className="text-[10px] bg-brand-500/20 text-brand-400 px-1.5 py-0.2 rounded font-semibold border border-brand-500/30">
                                VYBRÁNO
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 truncate max-w-[160px]">{stock.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono font-bold text-white">
                      ${stock.price.toFixed(2)}
                    </td>

                    <td className="p-3.5 font-mono font-semibold">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs ${
                        positive 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {positive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-gray-300 hidden sm:table-cell">
                      ${stock.marketCap}
                    </td>

                    <td className="p-3.5 font-mono text-gray-400 hidden md:table-cell">
                      {stock.peRatio > 0 ? stock.peRatio : 'N/A'}
                    </td>

                    <td className="p-3.5 hidden lg:table-cell">
                      <span className="text-xs bg-gray-900 text-gray-400 px-2 py-1 rounded-lg border border-gray-800">
                        {stock.sector}
                      </span>
                    </td>

                    <td className="p-3.5 text-right pr-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectStock(stock);
                          }}
                          className="px-2.5 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-lg border border-gray-800 hover:border-gray-700 transition flex items-center gap-1"
                        >
                          Graf
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToPortfolio(stock);
                          }}
                          className={`p-1.5 rounded-lg border transition ${
                            inPortfolio 
                              ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
                              : 'bg-gray-900 border-gray-800 hover:border-brand-500 text-gray-400 hover:text-white'
                          }`}
                        >
                          {inPortfolio ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
