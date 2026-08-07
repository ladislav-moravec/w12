import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Check, 
  Star, 
  Activity, 
  Newspaper, 
  Target, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  FileText,
  DollarSign,
  PieChart,
  BarChart3,
  Layers,
  Scale
} from 'lucide-react';
import { fetchStockNews, fetchFinancialStatements, fetchHistoricalFinancials } from '../services/stockApi';

export default function StockDetailsCard({ 
  stock, 
  onAddToPortfolio, 
  isInPortfolio,
  isFavorite = false,
  onToggleFavorite
}) {
  const [news, setNews] = useState([]);
  const [isRefreshingNews, setIsRefreshingNews] = useState(false);
  const [activeStatementTab, setActiveStatementTab] = useState('income'); // 'income' | 'balance' | 'cashflow'
  const [activeChartMetric, setActiveChartMetric] = useState('revenue'); // 'revenue' | 'netIncome' | 'freeCashFlow' | 'eps'

  useEffect(() => {
    if (stock) {
      setNews(fetchStockNews(stock.symbol));
    }
  }, [stock]);

  const handleRefreshNews = () => {
    setIsRefreshingNews(true);
    setTimeout(() => {
      setNews(fetchStockNews(stock.symbol));
      setIsRefreshingNews(false);
    }, 600);
  };

  if (!stock) return null;

  const isPositive = stock.change >= 0;
  
  // Calculate 52-week position percentage
  const range52 = stock.high52 - stock.low52;
  const position52 = range52 > 0 ? Math.min(100, Math.max(0, ((stock.price - stock.low52) / range52) * 100)) : 50;

  // Technical indicators mock calculations based on daily performance
  const rsiValue = Math.round(50 + (stock.changePercent * 3.5));
  const rsiClamped = Math.max(25, Math.min(85, rsiValue));
  const rsiStatus = rsiClamped > 70 ? "Překoupeno (Riziko)" : rsiClamped < 35 ? "Přeprodáno (Nákupní Šance)" : "Neutrální Růstový Trend";

  // Target price calculation (~15-25% upside)
  const targetPrice = (stock.price * 1.18).toFixed(2);
  const targetUpside = 18.0;

  // Financial statements & historical chart data
  const statements = fetchFinancialStatements(stock.symbol);
  const historicalData = fetchHistoricalFinancials(stock.symbol);

  // Selected chart metric data
  const chartItems = historicalData[activeChartMetric] || [];
  const maxVal = Math.max(...chartItems.map(d => d.value), 1);

  return (
    <div className="glass-card rounded-2xl p-6 border border-gray-800 shadow-xl space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl font-mono text-white tracking-wider flex items-center gap-2">
              {stock.symbol}
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(stock.symbol)}
                  className="text-gray-500 hover:text-amber-400 transition"
                  title={isFavorite ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
                >
                  <Star className={`w-5 h-5 ${isFavorite ? 'text-amber-400 fill-amber-400' : 'hover:scale-110'}`} />
                </button>
              )}
            </span>

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

      {/* Primary Financial Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

      {/* Decision-Making Technical Indicators & Analyst Consensus */}
      <div className="bg-gray-950/70 p-4 rounded-2xl border border-gray-800/80 space-y-3">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-400" />
          Technické Ukazatele & Doporučení Pro Rozhodování
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* RSI Indicator */}
          <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-gray-400 block text-[11px]">RSI (14 dní)</span>
              <span className="text-base font-bold text-white">{rsiClamped}</span>
            </div>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
              rsiClamped > 70 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                : rsiClamped < 35 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                : 'bg-brand-500/20 text-brand-300 border-brand-500/30'
            }`}>
              {rsiStatus}
            </span>
          </div>

          {/* Analyst Consensus */}
          <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-gray-400 block text-[11px]">Konsenzus Analytiků</span>
              <span className="text-base font-bold text-emerald-400">Silné Koupit (Buy)</span>
            </div>
            <Target className="w-6 h-6 text-emerald-400" />
          </div>

          {/* Target Price */}
          <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-gray-400 block text-[11px]">Cílový Kurz (12m)</span>
              <span className="text-base font-bold text-white">${targetPrice}</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              +{targetUpside}% Upside
            </span>
          </div>
        </div>
      </div>

      {/* 4-Year Historical Financial Charts & Future Estimates (2022-2027E) */}
      <div className="bg-gray-950/90 p-5 rounded-2xl border border-gray-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Historie Účetnictví (2022–2025) a Odhady Růstu (2026E–2027E)
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Přehled vývoje hospodaření společnosti za 4 roky + budoucí odhady Wall Street analytiků.
            </p>
          </div>

          {/* Metric selector */}
          <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 text-xs shrink-0">
            <button
              onClick={() => setActiveChartMetric('revenue')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                activeChartMetric === 'revenue' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Tržby
            </button>
            <button
              onClick={() => setActiveChartMetric('netIncome')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                activeChartMetric === 'netIncome' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Čistý Zisk
            </button>
            <button
              onClick={() => setActiveChartMetric('freeCashFlow')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                activeChartMetric === 'freeCashFlow' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Free Cash Flow
            </button>
            <button
              onClick={() => setActiveChartMetric('eps')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                activeChartMetric === 'eps' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              EPS
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-2">
          <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-48 px-2 pb-2 border-b border-gray-800">
            {chartItems.map((item, idx) => {
              const heightPct = Math.max(12, Math.round((item.value / maxVal) * 100));
              return (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-200">
                    {activeChartMetric === 'eps' ? `$${item.value}` : `$${item.value}B`}
                  </span>

                  <div className="w-full max-w-[44px] bg-gray-900 rounded-t-lg h-full flex items-end overflow-hidden">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        item.isEstimate 
                          ? 'bg-gradient-to-t from-brand-600/80 to-accent-cyan border-t-2 border-accent-cyan' 
                          : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>

                  <span className={`text-[10px] font-mono text-center font-medium ${
                    item.isEstimate ? 'text-brand-300 font-bold' : 'text-gray-400'
                  }`}>
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 px-2 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Historická Skutečnost (2022-2025)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-accent-cyan inline-block"></span> Konsenzuální Odhad (2026E-2027E)
            </span>
          </div>
        </div>
      </div>

      {/* Complete Financial Statements Section (Income Statement, Balance Sheet, Cash Flow) */}
      <div className="bg-gray-950/80 p-5 rounded-2xl border border-gray-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" />
              Kompletní Účetnictví & Finanční Výkazy TTM ({stock.symbol})
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Detailní auditované výsledky hospodaření z rozvahy, zisku a ztrát a výkazu cash flow.
            </p>
          </div>

          {/* Statement Tabs */}
          <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 text-xs shrink-0">
            <button
              onClick={() => setActiveStatementTab('income')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeStatementTab === 'income' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              1. Zisk a Ztráta
            </button>
            <button
              onClick={() => setActiveStatementTab('balance')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeStatementTab === 'balance' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              2. Rozvaha
            </button>
            <button
              onClick={() => setActiveStatementTab('cashflow')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeStatementTab === 'cashflow' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              3. Cash Flow
            </button>
          </div>
        </div>

        {/* Financial Statement Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeStatementTab === 'income' && statements.incomeStatement.map((item, index) => (
            <div key={index} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-0.5">{item.name}</span>
                <span className="text-base font-bold font-mono text-white">{item.value}</span>
              </div>
              <span className="text-xs font-semibold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {item.change}
              </span>
            </div>
          ))}

          {activeStatementTab === 'balance' && statements.balanceSheet.map((item, index) => (
            <div key={index} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-0.5">{item.name}</span>
                <span className="text-base font-bold font-mono text-white">{item.value}</span>
              </div>
              <span className="text-xs font-semibold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {item.change}
              </span>
            </div>
          ))}

          {activeStatementTab === 'cashflow' && statements.cashFlow.map((item, index) => (
            <div key={index} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-0.5">{item.name}</span>
                <span className="text-base font-bold font-mono text-white">{item.value}</span>
              </div>
              <span className="text-xs font-semibold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stock News & Catalysts Section with Live Refresh */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-brand-400" />
            Živé Zprávy a Katalyzátory pro {stock.symbol}
          </h3>

          <button
            onClick={handleRefreshNews}
            disabled={isRefreshingNews}
            className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-lg text-xs font-medium transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-brand-400 ${isRefreshingNews ? 'animate-spin' : ''}`} />
            <span>Obnovit Zprávy</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800/80 hover:border-gray-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] text-gray-400 font-mono">{item.source} • {item.time}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.2 rounded border uppercase font-mono ${
                    item.sentiment === 'positive' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : item.sentiment === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {item.sentiment === 'positive' ? 'Pozitivní Katalyzátor' : item.sentiment === 'warning' ? 'Sledovat Riziko' : 'Neutrální'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-200 line-clamp-2">{item.title}</h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
