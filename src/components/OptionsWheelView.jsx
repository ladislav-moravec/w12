import React, { useState } from 'react';
import { 
  CircleDollarSign, 
  Clock, 
  HelpCircle, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  ArrowRightLeft, 
  ChevronRight,
  Zap,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_STOCKS, fetchOptionChain30D } from '../services/stockApi';

export default function OptionsWheelView({ selectedStock, onSelectStock }) {
  const [activeTicker, setActiveTicker] = useState(selectedStock?.symbol || 'NVDA');
  const [optionTypeFilter, setOptionTypeFilter] = useState('PUT'); // 'PUT' (Cash Secured Put) | 'CALL' (Covered Call) | 'ALL'
  const [selectedOptionRow, setSelectedOptionRow] = useState(null);
  const [showRealtimeDataModal, setShowRealtimeDataModal] = useState(false);

  const currentStock = INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === activeTicker.toUpperCase()) || INITIAL_STOCKS[0];
  const optionChainData = fetchOptionChain30D(currentStock.symbol, currentStock.price);

  return (
    <div className="space-y-6">
      {/* Top Banner / Strategy Header */}
      <div className="glass-card rounded-2xl p-6 border border-gray-800 shadow-xl bg-gradient-to-r from-[#0d1322] via-[#0e172a] to-[#11192e]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-500/10 text-brand-400 text-xs font-bold px-2.5 py-1 rounded-full border border-brand-500/20 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5" />
                Option Wheel Strategy (~30 Days DTE)
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
                Příjmová Opční Strategie
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3 mt-2">
              Opční Řetězec & Výnosy z Prémie: <span className="text-brand-400 font-mono">{currentStock.symbol}</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-3xl">
              Strategie Option Wheel spočívá v prodávání **Cash-Secured Putů** (0.20-0.30 Delta) na akcie, které chcete vlastnit, 
              a při přiřazení prodáváte **Covered Call** opce. Expirace 30 dní přináší optimální časový rozpad (Theta decay).
            </p>
          </div>

          {/* Ticker Picker */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Vybrat akcii:</span>
            <select
              value={activeTicker}
              onChange={(e) => {
                const found = INITIAL_STOCKS.find(s => s.symbol === e.target.value);
                setActiveTicker(e.target.value);
                if (found && onSelectStock) onSelectStock(found);
              }}
              className="bg-gray-900 border border-gray-700 text-white font-mono text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-500 cursor-pointer shadow-lg"
            >
              {INITIAL_STOCKS.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.symbol} — ${s.price.toFixed(2)} ({s.changePercent > 0 ? '+' : ''}{s.changePercent}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Option Chain Meta Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Spotová Cena</span>
            <span className="text-xl font-bold font-mono text-white">${currentStock.price.toFixed(2)}</span>
          </div>

          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Expirace (DTE)</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-400" />
              <span className="text-base font-bold font-mono text-brand-300">~{optionChainData.dte} Dní ({optionChainData.expirationDate})</span>
            </div>
          </div>

          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-400 block mb-1">Implikovaná Volatilita (IV)</span>
            <span className="text-base font-bold font-mono text-amber-400">{optionChainData.impliedVolatility}% (IV Rank: {optionChainData.ivRank})</span>
          </div>

          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 block mb-1">Status Dat</span>
              <button 
                onClick={() => setShowRealtimeDataModal(true)}
                className="text-[10px] text-brand-400 underline hover:text-brand-300 flex items-center gap-0.5"
              >
                <HelpCircle className="w-3 h-3 inline" /> Real-time info?
              </button>
            </div>
            <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block font-mono">
              ⚡ 15-min Delayed (OPRA)
            </span>
          </div>
        </div>
      </div>

      {/* Answer Callout for Real-time Option Data Query */}
      <div className="bg-brand-950/40 border border-brand-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Otázka k Opčním Datům: Jsou k dispozici opční data bez zpoždění (real-time)?
            </h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Všechny bezplatné veřejné API (Yahoo Finance, CBOE public) poskytují opční data s **15minutovým zpožděním** kvůli poplatkům sítě OPRA. 
              Pro ne-zpožděná data v reálném čase je vyžadováno placené API (Polygon.io Realtime Options, ThetaData Pro) nebo účet u brokera s platným opčním předplatným (Interactive Brokers, Tradier). Pro 30D Option Wheel je však 15-min zpoždění plně dostačující.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowRealtimeDataModal(true)}
          className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shrink-0 transition"
        >
          Detailní Přehled Z zdrojů
        </button>
      </div>

      {/* Option Chain Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 font-medium">Typ Opce:</span>
          <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setOptionTypeFilter('PUT')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
                optionTypeFilter === 'PUT' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cash Secured Puts (CSP)
            </button>
            <button
              onClick={() => setOptionTypeFilter('CALL')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
                optionTypeFilter === 'CALL' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Covered Calls (CC)
            </button>
            <button
              onClick={() => setOptionTypeFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
                optionTypeFilter === 'ALL' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Kompletní Řetězec
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-400 font-mono">
          * Cílová Delta pro prodávání Putů: <span className="text-emerald-400 font-bold">0.20 – 0.30</span>
        </div>
      </div>

      {/* Option Chain Table */}
      <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/80 border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400 font-mono">
                <th className="py-3 px-4">Strike Cena</th>
                <th className="py-3 px-4">Vzdálenost od Spotu</th>
                <th className="py-3 px-4">Typ Opce</th>
                <th className="py-3 px-4">Prémie (Mid)</th>
                <th className="py-3 px-4">Bid / Ask</th>
                <th className="py-3 px-4">Delta</th>
                <th className="py-3 px-4">Roční Výnos (ARR % p.a.)</th>
                <th className="py-3 px-4">Wheel Rating</th>
                <th className="py-3 px-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs font-mono">
              {optionChainData.strikes.map((row, idx) => {
                const isATM = Math.abs(row.pctDiff) < 1.5;
                const renderRows = [];

                if (optionTypeFilter === 'PUT' || optionTypeFilter === 'ALL') {
                  const put = row.put;
                  renderRows.push(
                    <tr 
                      key={`put_${idx}`} 
                      className={`hover:bg-gray-800/40 transition cursor-pointer ${
                        isATM ? 'bg-brand-950/20 border-l-4 border-l-brand-500' : ''
                      } ${put.suitableForWheel ? 'bg-emerald-950/10' : ''}`}
                      onClick={() => setSelectedOptionRow({ ...row, type: 'PUT', option: put })}
                    >
                      <td className="py-3 px-4 font-bold text-white text-sm">
                        ${row.strike.toFixed(2)}
                        {isATM && <span className="ml-2 text-[10px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded">ATM</span>}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${row.pctDiff <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.pctDiff > 0 ? '+' : ''}{row.pctDiff}% ({put.safetyMarginPercent}% polštář)
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400">
                        PUT (CSP)
                      </td>
                      <td className="py-3 px-4 font-bold text-white text-sm">
                        ${put.mid.toFixed(2)} <span className="text-[10px] text-gray-400 font-normal">(${(put.mid * 100).toFixed(0)} / kontrakt)</span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        ${put.bid.toFixed(2)} / ${put.ask.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-200">
                        {put.delta}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-emerald-400 text-sm">
                        {put.arrPercent}% p.a.
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          put.suitableForWheel 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                            : 'bg-gray-800 text-gray-400 border-gray-700'
                        }`}>
                          {put.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-2.5 py-1 bg-gray-800 hover:bg-brand-600 text-gray-300 hover:text-white rounded-lg text-[11px] transition">
                          Vybrat
                        </button>
                      </td>
                    </tr>
                  );
                }

                if (optionTypeFilter === 'CALL' || optionTypeFilter === 'ALL') {
                  const call = row.call;
                  renderRows.push(
                    <tr 
                      key={`call_${idx}`} 
                      className={`hover:bg-gray-800/40 transition cursor-pointer ${
                        isATM ? 'bg-brand-950/20 border-l-4 border-l-brand-500' : ''
                      } ${call.suitableForWheel ? 'bg-blue-950/10' : ''}`}
                      onClick={() => setSelectedOptionRow({ ...row, type: 'CALL', option: call })}
                    >
                      <td className="py-3 px-4 font-bold text-white text-sm">
                        ${row.strike.toFixed(2)}
                        {isATM && <span className="ml-2 text-[10px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded">ATM</span>}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${row.pctDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.pctDiff > 0 ? '+' : ''}{row.pctDiff}% (upside)
                      </td>
                      <td className="py-3 px-4 font-bold text-blue-400">
                        CALL (CC)
                      </td>
                      <td className="py-3 px-4 font-bold text-white text-sm">
                        ${call.mid.toFixed(2)} <span className="text-[10px] text-gray-400 font-normal">(${(call.mid * 100).toFixed(0)} / kontrakt)</span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        ${call.bid.toFixed(2)} / ${call.ask.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-200">
                        {call.delta}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-blue-400 text-sm">
                        {call.arrPercent}% p.a.
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          call.suitableForWheel 
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                            : 'bg-gray-800 text-gray-400 border-gray-700'
                        }`}>
                          {call.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-2.5 py-1 bg-gray-800 hover:bg-brand-600 text-gray-300 hover:text-white rounded-lg text-[11px] transition">
                          Vybrat
                        </button>
                      </td>
                    </tr>
                  );
                }

                return renderRows;
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Option Detail Drawer / Modal */}
      {selectedOptionRow && (
        <div className="glass-card rounded-2xl p-6 border border-brand-500/40 shadow-2xl bg-[#0f172a] animate-fade-in space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              Detail Vybrané Opce: {currentStock.symbol} ${selectedOptionRow.strike} {selectedOptionRow.type} ({optionChainData.expirationDate})
            </h3>
            <button 
              onClick={() => setSelectedOptionRow(null)}
              className="text-gray-400 hover:text-white text-xs px-2.5 py-1 bg-gray-800 rounded-lg"
            >
              Zavřít
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-400 block mb-1">Inkasovaná Prémie (Kredit)</span>
              <span className="text-xl font-extrabold font-mono text-emerald-400">
                ${(selectedOptionRow.option.mid * 100).toFixed(0)} <span className="text-xs font-normal text-gray-400"> za 100 akcií</span>
              </span>
              <p className="text-xs text-gray-400 mt-2">
                Okamžitý hotovostní kredit připsán na obchodní účet při prodeji opce.
              </p>
            </div>

            <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-400 block mb-1">Požadovaný Kapitál (Collateral)</span>
              <span className="text-xl font-extrabold font-mono text-white">
                ${(selectedOptionRow.strike * 100).toFixed(0)}
              </span>
              <p className="text-xs text-gray-400 mt-2">
                Blokovaná hotovost v případě přiřazení (assignment) u Cash-Secured Putu.
              </p>
            </div>

            <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-400 block mb-1">Roční Výnos p.a. (ARR)</span>
              <span className="text-xl font-extrabold font-mono text-brand-400">
                {selectedOptionRow.option.arrPercent}% p.a.
              </span>
              <p className="text-xs text-gray-400 mt-2">
                Přepočtený roční úrok z alokovaného kapitálu za 30 dní držení.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal clarifying non-delayed real-time option data sources */}
      {showRealtimeDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel max-w-lg w-full rounded-2xl border border-gray-800 p-6 space-y-4 shadow-2xl bg-[#0b0f19]">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-400" />
                Opční Data & Real-time Zdroje
              </h3>
              <button 
                onClick={() => setShowRealtimeDataModal(false)}
                className="text-gray-400 hover:text-white text-xs px-2.5 py-1 bg-gray-800 rounded-lg"
              >
                Zavřít
              </button>
            </div>

            <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">Proč mají bezplatná opční data 15-minutové zpoždění?</strong><br />
                Americké opční burzy (CBOE, NASDAQ Options) účtují licenční poplatky sítě <em>OPRA (Option Price Reporting Authority)</em> za přístup k live tick-by-tick datům. Všechna bezplatná veřejná API (Yahoo Finance, CBOE public) proto mají zákonné 15-minutové zpoždění.
              </p>

              <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800 space-y-2">
                <span className="font-bold text-brand-400 block text-xs uppercase tracking-wider">
                  Kde lze získat opční data bez zpoždění (Real-time)?
                </span>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong className="text-white">Interactive Brokers (IBKR API)</strong> — Zdarma při aktivním předplatném US Option Market Data.</li>
                  <li><strong className="text-white">Polygon.io Options Realtime API</strong> — Placený datový plán s OPRA websocket feedem.</li>
                  <li><strong className="text-white">ThetaData / Tradier API</strong> — Specializovaná opční API rozhraní pro algoritmy.</li>
                </ul>
              </div>

              <p className="text-emerald-400 font-semibold bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                💡 **Pro strategii Option Wheel (30D expirace):** 15-minutové zpoždění je plně postačující pro nalezení vhodného striku (Delta 0.20-0.30) a výpočet výnosu ARR %.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
