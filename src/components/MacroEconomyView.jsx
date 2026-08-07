import React, { useState } from 'react';
import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  Landmark, 
  DollarSign, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles,
  Newspaper,
  ArrowUpDown,
  CheckCircle2,
  Info
} from 'lucide-react';
import { GLOBAL_MACRO_DATA, fetchMacroNews } from '../services/stockApi';

export default function MacroEconomyView() {
  const [sortBy, setSortBy] = useState('gdpBillions'); // 'gdpBillions' | 'interestRate' | 'inflation' | 'debtToGdp'
  const [selectedCountry, setSelectedCountry] = useState(null);
  const macroNews = fetchMacroNews();

  // Sort countries
  const countries = [...GLOBAL_MACRO_DATA].sort((a, b) => {
    if (sortBy === 'interestRate') return b.interestRate - a.interestRate;
    if (sortBy === 'inflation') return b.inflation - a.inflation;
    if (sortBy === 'debtToGdp') return b.debtToGdp - a.debtToGdp;
    return b.gdpBillions - a.gdpBillions; // default GDP
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Macro Header */}
      <div className="glass-card rounded-2xl p-6 border border-gray-800 shadow-xl bg-gradient-to-r from-[#0b1329] via-[#0e1938] to-[#121c3b]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-500/10 text-brand-400 text-xs font-bold px-2.5 py-1 rounded-full border border-brand-500/20 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Globální Makroekonomie & Státy
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
                Státní Přehled 2026
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3 mt-2">
              Přehled Úrokových Sazeb, HDP, Inflace a Zadlužení Států
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-3xl">
              Kompletní makroekonomický přehled pro klíčové světové ekonomiky (USA, Eurozóna, Velká Británie, Japonsko, Čína) 
              i středoevropský region (**Česká Republika, Slovensko, Polsko**). Porovnejte úrokové sazby, inflaci a dluh k HDP.
            </p>
          </div>
        </div>

        {/* Global Summary Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Průměrná Sazba FED</span>
            <span className="text-xl font-bold font-mono text-emerald-400">5.25%</span>
            <span className="text-[11px] text-gray-400 block mt-0.5">USA central bank</span>
          </div>

          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">ČNB Základní Sazba</span>
            <span className="text-xl font-bold font-mono text-brand-400">4.50%</span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Česká republika</span>
          </div>

          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">ECB Základní Sazba</span>
            <span className="text-xl font-bold font-mono text-blue-400">3.75%</span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Eurozóna & SK</span>
          </div>

          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Polsko NBP Sazba</span>
            <span className="text-xl font-bold font-mono text-amber-400">5.75%</span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Narodowy Bank Polski</span>
          </div>
        </div>
      </div>

      {/* Sorting & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-brand-400" />
          <span className="text-xs text-gray-400 font-medium">Řadit státy podle:</span>
          <div className="flex flex-wrap bg-gray-900 border border-gray-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSortBy('gdpBillions')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                sortBy === 'gdpBillions' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Velikost HDP
            </button>
            <button
              onClick={() => setSortBy('interestRate')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                sortBy === 'interestRate' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Úrokové Sazby %
            </button>
            <button
              onClick={() => setSortBy('inflation')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                sortBy === 'inflation' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Míra Inflace %
            </button>
            <button
              onClick={() => setSortBy('debtToGdp')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                sortBy === 'debtToGdp' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Zadlužení k HDP %
            </button>
          </div>
        </div>

        <span className="text-xs text-gray-400 font-mono">
          Zobrazeno {countries.length} států a celků
        </span>
      </div>

      {/* Main Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((item) => (
          <div 
            key={item.code} 
            className="glass-card rounded-2xl p-5 border border-gray-800/80 hover:border-brand-500/50 transition shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Country Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{item.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{item.country}</h3>
                    <span className="text-[11px] text-gray-400 font-mono">{item.centralBank}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded border bg-brand-500/10 text-brand-400 border-brand-500/20 font-mono">
                    Rating: {item.rating}
                  </span>
                </div>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 font-mono text-xs">
                <div className="bg-gray-900/70 p-2.5 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Úroková Sazba</span>
                  <span className="text-base font-extrabold text-emerald-400">{item.interestRate}%</span>
                </div>

                <div className="bg-gray-900/70 p-2.5 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 block mb-0.5">HDP ($ / Růst)</span>
                  <span className="text-sm font-bold text-white">
                    ${item.gdpBillions > 1000 ? (item.gdpBillions / 1000).toFixed(1) + 'T' : item.gdpBillions + 'B'}
                  </span>
                  <span className="text-[10px] text-emerald-400 ml-1">(+{item.gdpGrowth}%)</span>
                </div>

                <div className="bg-gray-900/70 p-2.5 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Míra Inflace</span>
                  <span className={`text-sm font-bold ${item.inflation > 3.0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {item.inflation}%
                  </span>
                </div>

                <div className="bg-gray-900/70 p-2.5 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Dluh k HDP</span>
                  <span className={`text-sm font-bold ${item.debtToGdp > 90 ? 'text-rose-400' : 'text-gray-200'}`}>
                    {item.debtToGdp}%
                  </span>
                </div>
              </div>

              {/* Current Country Focus / Challenge */}
              <div className="mt-3.5 bg-gray-950/60 p-3 rounded-xl border border-gray-800 text-xs">
                <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider block mb-1">
                  💡 Aktuální Téma & Výzva:
                </span>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  {item.keyFocus}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Geopolitical & Macro News Feed */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-brand-400" />
          Aktuální Makroekonomické & Geopolitické Zprávy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {macroNews.map((news) => (
            <div key={news.id} className="bg-gray-900/60 p-4 rounded-xl border border-gray-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span>{news.source} • {news.time}</span>
                <span className="bg-brand-500/10 text-brand-400 px-2 py-0.5 rounded border border-brand-500/20 font-semibold">
                  {news.country}
                </span>
              </div>
              <h4 className="text-xs font-bold text-gray-100">{news.title}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">{news.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
