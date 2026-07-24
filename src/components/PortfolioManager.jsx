import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Edit3, 
  Lock, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_STOCKS } from '../services/stockApi';

export default function PortfolioManager({ 
  holdings = [], 
  onAddHolding, 
  onRemoveHolding, 
  onUpdateHolding, 
  user, 
  onOpenAuth,
  currency = 'USD'
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState(INITIAL_STOCKS[0].symbol);
  const [shares, setShares] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  // Currency multiplier
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'CZK' ? 'Kč' : '$';
  const currencyRate = currency === 'EUR' ? 0.92 : currency === 'CZK' ? 23.5 : 1;

  // Calculate totals
  let totalValueUSD = 0;
  let totalCostUSD = 0;

  const holdingsWithCurrentData = holdings.map((item) => {
    const currentStock = INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === item.symbol.toUpperCase()) || {
      price: item.buyPrice,
      changePercent: 0,
      name: item.symbol
    };

    const currentValueUSD = item.shares * currentStock.price;
    const costValueUSD = item.shares * item.buyPrice;
    const profitLossUSD = currentValueUSD - costValueUSD;
    const profitLossPercent = costValueUSD > 0 ? (profitLossUSD / costValueUSD) * 100 : 0;

    totalValueUSD += currentValueUSD;
    totalCostUSD += costValueUSD;

    return {
      ...item,
      currentPrice: currentStock.price,
      currentValueUSD,
      costValueUSD,
      profitLossUSD,
      profitLossPercent,
      name: currentStock.name,
      changePercent: currentStock.changePercent
    };
  });

  const totalProfitLossUSD = totalValueUSD - totalCostUSD;
  const totalProfitLossPercent = totalCostUSD > 0 ? (totalProfitLossUSD / totalCostUSD) * 100 : 0;

  const formatCurrency = (valUSD) => {
    const converted = valUSD * currencyRate;
    return `${currencySymbol}${converted.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const numShares = parseFloat(shares);
    const price = parseFloat(buyPrice);

    if (!numShares || numShares <= 0 || !price || price <= 0) return;

    onAddHolding({
      symbol: selectedStockSymbol,
      shares: numShares,
      buyPrice: price,
      dateAdded: new Date().toISOString().split('T')[0]
    });

    setShares('');
    setBuyPrice('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Top Banner / Summary */}
      <div className="glass-card rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Briefcase className="w-48 h-48 text-brand-500" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              Správa Portfolia
            </div>
            <h2 className="text-2xl font-extrabold text-white">Přehled vašeho majetku</h2>
            <p className="text-xs text-gray-400 mt-1">
              {user 
                ? `Přihlášen jako ${user.email || user.displayName} — vaše portfolio je bezpečně synchronizováno v cloudu.`
                : 'Používáte lokální režim. Pro uložení a prístup z mobilu nebo jiného PC se přihlaste.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-brand-400 border border-brand-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                <Lock className="w-3.5 h-3.5" />
                Uložit v cloudu (Přihlásit)
              </button>
            )}
            <button
              onClick={() => {
                const defaultStock = INITIAL_STOCKS[0];
                setSelectedStockSymbol(defaultStock.symbol);
                setBuyPrice(defaultStock.price.toString());
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-brand-500/20 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Přidat novou pozici
            </button>
          </div>
        </div>

        {/* Portfolio Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Celková hodnota portfolia</span>
            <span className="text-2xl font-extrabold font-mono text-white">
              {formatCurrency(totalValueUSD)}
            </span>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Investováno (Nákupní hodnota)</span>
            <span className="text-2xl font-extrabold font-mono text-gray-300">
              {formatCurrency(totalCostUSD)}
            </span>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Celkový Zisk / Ztráta (P&L)</span>
            <div className={`text-2xl font-extrabold font-mono flex items-center gap-2 ${totalProfitLossUSD >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalProfitLossUSD >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {formatCurrency(totalProfitLossUSD)}
              <span className="text-xs px-2 py-0.5 rounded-md bg-gray-800 border border-gray-700">
                {totalProfitLossUSD >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
        <div className="p-4 bg-gray-900/80 border-b border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-brand-500" />
            Vlastněné pozice ({holdingsWithCurrentData.length})
          </h3>
        </div>

        {holdingsWithCurrentData.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20 text-brand-400" />
            <p className="text-base font-semibold text-gray-400">Vaše portfolio je zatím prázdné</p>
            <p className="text-xs text-gray-500 mt-1 mb-4">Klikněte na tlačítko "Přidat novou pozici" a vyberte své akcie.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
            >
              + Přidat první akcii
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-950/50">
                  <th className="p-3.5 pl-5">Ticker & Název</th>
                  <th className="p-3.5 font-mono">Počet kusů</th>
                  <th className="p-3.5 font-mono">Nákupní cena</th>
                  <th className="p-3.5 font-mono">Aktuální cena</th>
                  <th className="p-3.5 font-mono">Celková hodnota</th>
                  <th className="p-3.5 font-mono">Zisk / Ztráta</th>
                  <th className="p-3.5 text-right pr-5">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {holdingsWithCurrentData.map((item) => {
                  const positive = item.profitLossUSD >= 0;

                  return (
                    <tr key={item.symbol} className="hover:bg-gray-800/40 transition">
                      <td className="p-3.5 pl-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center font-bold font-mono text-brand-400 text-xs">
                            {item.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-bold text-white font-mono">{item.symbol}</div>
                            <div className="text-xs text-gray-400 truncate max-w-[140px]">{item.name}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 font-mono text-gray-200 font-semibold">{item.shares} ks</td>
                      <td className="p-3.5 font-mono text-gray-300">{formatCurrency(item.buyPrice)}</td>
                      <td className="p-3.5 font-mono font-bold text-white">{formatCurrency(item.currentPrice)}</td>
                      <td className="p-3.5 font-mono font-bold text-white">{formatCurrency(item.currentValueUSD)}</td>
                      
                      <td className="p-3.5 font-mono font-semibold">
                        <div className={`flex items-center gap-1 ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {positive ? '+' : ''}{formatCurrency(item.profitLossUSD)}
                          <span className="text-[11px] opacity-80">
                            ({positive ? '+' : ''}{item.profitLossPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </td>

                      <td className="p-3.5 text-right pr-5">
                        <button
                          onClick={() => onRemoveHolding(item.symbol)}
                          title="Smazat z portfolia"
                          className="p-1.5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Holding Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl border border-gray-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-500" />
              Přidat pozici do portfolia
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Vyberte Akcii / Ticker</label>
                <select
                  value={selectedStockSymbol}
                  onChange={(e) => {
                    setSelectedStockSymbol(e.target.value);
                    const st = INITIAL_STOCKS.find(s => s.symbol === e.target.value);
                    if (st) setBuyPrice(st.price.toString());
                  }}
                  className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl p-3 text-sm focus:border-brand-500 outline-none"
                >
                  {INITIAL_STOCKS.map(st => (
                    <option key={st.symbol} value={st.symbol}>
                      {st.symbol} - {st.name} (${st.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Počet akcií (kusů)</label>
                <input
                  type="number"
                  step="any"
                  placeholder="např. 10"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  required
                  className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl p-3 text-sm focus:border-brand-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Průměrná nákupní cena ($ USD za ks)</label>
                <input
                  type="number"
                  step="any"
                  placeholder="např. 120.50"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  required
                  className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl p-3 text-sm focus:border-brand-500 outline-none font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-xl font-semibold text-sm transition"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-brand-500/20 transition"
                >
                  Uložit pozici
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
