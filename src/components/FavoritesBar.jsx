import React from 'react';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
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
    <div className="w-full bg-[#0c111d]/90 border border-gray-800/80 rounded-2xl p-3 shadow-xl backdrop-blur-md space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            Rychlé Přepínání Akcií (Favorites)
          </span>
        </div>
        <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
          {favoriteStocks.length} sledovaných tickerů • Kliknutím zobrazení přepnete
        </span>
      </div>

      {/* Multi-row wrapping quick buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {favoriteStocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const isSelected = selectedStock?.symbol === stock.symbol;

          return (
            <button
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all group ${
                isSelected
                  ? 'ring-2 ring-brand-500 shadow-lg scale-[1.03] bg-brand-950/60 border-brand-500/80 text-white font-bold'
                  : isPositive
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-500/60'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300 hover:bg-rose-900/40 hover:border-rose-500/60'
              }`}
            >
              {/* Ticker Symbol */}
              <span className="font-extrabold font-mono text-white tracking-wide">
                {stock.symbol}
              </span>

              {/* Price & Daily Change % */}
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <span className={`font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
                <span className="text-gray-300 font-mono text-[11px]">
                  ${stock.price.toFixed(2)}
                </span>
              </div>

              {/* Active selection pulse dot */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping ml-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
