import React, { useEffect, useRef } from 'react';

export default function TradingViewChart({ symbol = "NASDAQ:NVDA", theme = "dark", height = 580 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear container
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== 'undefined' && containerRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1", // Candlesticks
          locale: "cs_CZ",
          toolbar_bg: "#0b0f19",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          hide_side_toolbar: false,
          studies: [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies"
          ]
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol]);

  const uniqueId = `tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`;

  return (
    <div className="w-full mx-auto glass-card rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      <div 
        id={uniqueId} 
        ref={containerRef} 
        style={{ width: '100%' }}
        className="rounded-xl overflow-hidden bg-[#0b0f19] h-[520px] sm:h-[580px]"
      >
        <div className="flex items-center justify-center h-full text-gray-500 text-sm gap-2">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          Načítám interaktivní graf pro {symbol}...
        </div>
      </div>
    </div>
  );
}
