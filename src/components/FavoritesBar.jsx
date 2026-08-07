import React from 'react';
import { Star, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { INITIAL_STOCKS } from '../services/stockApi';

export default function FavoritesBar({ 
  favorites = [], 
  selectedStock, 
  onSelectStock, 
  onToggleFavorite 
}) {
  // Map favorite symbols to full stock data from INITIAL_STOCKS
  const favoriteStocks = favorites
    .map(symbol => INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()))
    .filter(Boolean);

  if (favoriteStocks.length === 0) return null;

  return (
    <div className="w-full bg-[#0d1322]/90 border border-gray-800/80 rounded-2xl p-2.5 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Rychlé Přepínání Akcií (Favorites)
          </span>
        </div>
        <span className="text-[11px] text-gray-500 font-mono hidden sm:inline">
          Kliknutím přepnete graf
        </span>
      </div>

      {/* Horizontally scrollable quick buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
        {favoriteStocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const isSelected = selectedStock?.symbol === stock.symbol;

          return (
            <button
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shrink-0 group ${
                isSelected
                  ? 'ring-2 ring-brand-500 shadow-md scale-[1.02] bg-brand-950/40 border-brand-500/60'
                  : isPositive
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-500/50'
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-300 hover:bg-rose-900/30 hover:border-rose-500/50'
              }`}
            >
              {/* Ticker & Status Icon */}
              <span className="font-extrabold font-mono text-white tracking-wide">
                {stock.symbol}
              </span>

              {/* Price & Change % */}
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <span className={`font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
                <span className="text-gray-400 font-mono text-[11px] hidden sm:inline">
                  ${stock.price.toFixed(2)}
                </span>
              </div>

              {/* Active selection dot */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse ml-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
