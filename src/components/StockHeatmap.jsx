import React, { useEffect, useRef, useState } from 'react';
import { Map, TrendingUp, BarChart2 } from 'lucide-react';

export default function StockHeatmap() {
  const containerRef = useRef(null);
  const [dataSource, setDataSource] = useState('SPX500');
  const [grouping, setGrouping] = useState('sector');
  const [blockColor, setBlockColor] = useState('change');

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear old widget
    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    containerRef.current.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      exchanges: [],
      dataSource: dataSource,
      grouping: grouping,
      blockSize: 'market_cap_basic',
      blockColor: blockColor,
      locale: 'en',
      symbolUrl: '',
      colorTheme: 'dark',
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: '100%',
      height: '580'
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [dataSource, grouping, blockColor]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-brand-500" />
          <h3 className="font-bold text-white text-base">Heatmapa Trhu</h3>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">ŽIVĚ</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Data Source */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium whitespace-nowrap">Index:</span>
            <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-0.5">
              {[
                { value: 'SPX500', label: 'S&P 500' },
                { value: 'NASDAQ100', label: 'NASDAQ' },
                { value: 'AllUSA', label: 'All USA' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setDataSource(opt.value)}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition whitespace-nowrap ${
                    dataSource === opt.value
                      ? 'bg-brand-600 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grouping */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium whitespace-nowrap">Skupiny:</span>
            <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-0.5">
              {[
                { value: 'sector', label: 'Sektory' },
                { value: 'no_group', label: 'Vše' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setGrouping(opt.value)}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition ${
                    grouping === opt.value
                      ? 'bg-brand-600 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color by */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium whitespace-nowrap">Barva:</span>
            <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-0.5">
              {[
                { value: 'change', label: '1D %' },
                { value: 'change_from_open', label: 'Od Open' },
                { value: 'Perf.W', label: '1W %' },
                { value: 'Perf.1M', label: '1M %' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setBlockColor(opt.value)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition whitespace-nowrap ${
                    blockColor === opt.value
                      ? 'bg-brand-600 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Widget */}
      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
        <div
          ref={containerRef}
          className="tradingview-widget-container w-full"
          style={{ minHeight: '580px' }}
        >
          <div className="flex items-center justify-center h-[580px] text-gray-500 text-sm gap-2">
            <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            Načítám heatmapu trhu...
          </div>
        </div>
      </div>
    </div>
  );
}
