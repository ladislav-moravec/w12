// Comprehensive Stock Market Dataset & Free Financial API Service

export const INITIAL_STOCKS = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    tradingViewSymbol: "NASDAQ:NVDA",
    sector: "Semiconductors",
    category: "AI Winners",
    price: 124.30,
    change: 4.15,
    changePercent: 3.45,
    marketCap: "3.05T",
    peRatio: 72.4,
    high52: 140.76,
    low52: 39.23,
    volume: "52.4M",
    dividendYield: "0.08%",
    description: "Lídrem v oblasti akcelerovaného computingu a grafik pro umělou inteligenci."
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    tradingViewSymbol: "NASDAQ:AAPL",
    sector: "Technology",
    category: "Big Tech",
    price: 224.23,
    change: 1.85,
    changePercent: 0.83,
    marketCap: "3.44T",
    peRatio: 34.2,
    high52: 237.23,
    low52: 164.08,
    volume: "48.1M",
    dividendYield: "0.45%",
    description: "Přední výrobce spotřební elektroniky, iPhonů, Maců a digitálních služeb."
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    tradingViewSymbol: "NASDAQ:MSFT",
    sector: "Technology",
    category: "Big Tech",
    price: 448.90,
    change: -2.30,
    changePercent: -0.51,
    marketCap: "3.33T",
    peRatio: 37.1,
    high52: 468.35,
    low52: 309.45,
    volume: "21.3M",
    dividendYield: "0.67%",
    description: "Globální softwarový gigant, vývojář Windows, Azure Cloud a partner OpenAI."
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    tradingViewSymbol: "NASDAQ:TSLA",
    sector: "Automotive",
    category: "EV & AI",
    price: 246.30,
    change: 8.40,
    changePercent: 3.53,
    marketCap: "785.2B",
    peRatio: 64.8,
    high52: 271.00,
    low52: 138.80,
    volume: "89.6M",
    dividendYield: "0.00%",
    description: "Výrobce elektromobilů, bateriových úložišť a autonomních systémů FSD."
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    tradingViewSymbol: "NASDAQ:AMZN",
    sector: "Consumer Cyclical",
    category: "Big Tech",
    price: 186.40,
    change: 2.10,
    changePercent: 1.14,
    marketCap: "1.94T",
    peRatio: 41.5,
    high52: 201.20,
    low52: 118.35,
    volume: "35.2M",
    dividendYield: "0.00%",
    description: "Největší světový e-shop a poskytovatel cloudové infrastruktury AWS."
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    tradingViewSymbol: "NASDAQ:GOOGL",
    sector: "Communication Services",
    category: "Big Tech",
    price: 182.50,
    change: 0.95,
    changePercent: 0.52,
    marketCap: "2.26T",
    peRatio: 27.3,
    high52: 191.75,
    low52: 120.21,
    volume: "24.8M",
    dividendYield: "0.44%",
    description: "Mateřská společnost Google, YouTube, Androidu a výzkumného centra DeepMind."
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    tradingViewSymbol: "NASDAQ:META",
    sector: "Communication Services",
    category: "Big Tech",
    price: 490.10,
    change: -5.40,
    changePercent: -1.09,
    marketCap: "1.24T",
    peRatio: 26.8,
    high52: 542.81,
    low52: 274.38,
    volume: "16.4M",
    dividendYield: "0.41%",
    description: "Provozovatel sociálních sítí Facebook, Instagram, WhatsApp a modelů Llama AI."
  },
  {
    symbol: "BRK.B",
    name: "Berkshire Hathaway Inc.",
    tradingViewSymbol: "NYSE:BRK.B",
    sector: "Financial Services",
    category: "Value & Dividend",
    price: 442.15,
    change: 1.20,
    changePercent: 0.27,
    marketCap: "960.5B",
    peRatio: 21.1,
    high52: 450.00,
    low52: 340.20,
    volume: "3.1M",
    dividendYield: "0.00%",
    description: "Investiční konglomerát vedený legendaem Warrenem Buffettem."
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    tradingViewSymbol: "NASDAQ:AMD",
    sector: "Semiconductors",
    category: "AI Winners",
    price: 156.80,
    change: 3.20,
    changePercent: 2.08,
    marketCap: "253.5B",
    peRatio: 118.2,
    high52: 227.30,
    low52: 93.12,
    volume: "42.1M",
    dividendYield: "0.00%",
    description: "Výrobce procesorů Ryzen, grafických karet EPYC a AI akcelerátorů MI300."
  },
  {
    symbol: "PLTR",
    name: "Palantir Technologies",
    tradingViewSymbol: "NASDAQ:PLTR",
    sector: "Software",
    category: "AI Winners",
    price: 27.90,
    change: 1.45,
    changePercent: 5.48,
    marketCap: "62.1B",
    peRatio: 85.3,
    high52: 29.83,
    low52: 14.48,
    volume: "58.3M",
    dividendYield: "0.00%",
    description: "Specialista na pokročilou datovou analytiku a komerční AI platformu AIP."
  },
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    tradingViewSymbol: "AMEX:SPY",
    sector: "ETF",
    category: "ETFs & Indices",
    price: 552.40,
    change: 2.15,
    changePercent: 0.39,
    marketCap: "560B",
    peRatio: 26.5,
    high52: 565.16,
    low52: 409.20,
    volume: "45.0M",
    dividendYield: "1.24%",
    description: "Nejpopulárnější ETF fond sledující 500 největších amerických společností."
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust (Nasdaq 100)",
    tradingViewSymbol: "NASDAQ:QQQ",
    sector: "ETF",
    category: "ETFs & Indices",
    price: 478.20,
    change: 3.40,
    changePercent: 0.72,
    marketCap: "280B",
    peRatio: 31.2,
    high52: 503.52,
    low52: 351.30,
    volume: "38.5M",
    dividendYield: "0.58%",
    description: "Technologicky zaměřené ETF sledující 100 hlavních společností burzy NASDAQ."
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    tradingViewSymbol: "NYSE:JPM",
    sector: "Financial Services",
    category: "Value & Dividend",
    price: 212.40,
    change: -0.80,
    changePercent: -0.38,
    marketCap: "608.2B",
    peRatio: 12.4,
    high52: 217.80,
    low52: 140.25,
    volume: "8.9M",
    dividendYield: "2.17%",
    description: "Největší bankovní a finanční dům v USA s globální působností."
  },
  {
    symbol: "LLY",
    name: "Eli Lilly and Company",
    tradingViewSymbol: "NYSE:LLY",
    sector: "Healthcare",
    category: "Healthcare & Biotech",
    price: 948.50,
    change: 14.20,
    changePercent: 1.52,
    marketCap: "901.4B",
    peRatio: 115.0,
    high52: 972.53,
    low52: 434.34,
    volume: "3.4M",
    dividendYield: "0.55%",
    description: "Farmaceutický gigant s přelomovými léky pro hubnutí a léčení diabetu (Mounjaro)."
  },
  {
    symbol: "BTCUSD",
    name: "Bitcoin / US Dollar",
    tradingViewSymbol: "BINANCE:BTCUSDT",
    sector: "Cryptocurrency",
    category: "Crypto",
    price: 66450.00,
    change: 1250.00,
    changePercent: 1.92,
    marketCap: "1.31T",
    peRatio: 0,
    high52: 73750.00,
    low52: 25000.00,
    volume: "28.4B",
    dividendYield: "0.00%",
    description: "Decentralizovaná digitální kryptoměna a digitální zlato."
  }
];

export const MARKET_INDICES = [
  { name: "S&P 500", value: "5,544.25", change: "+21.40", percent: "+0.39%", positive: true },
  { name: "NASDAQ 100", value: "19,820.10", change: "+142.30", percent: "+0.72%", positive: true },
  { name: "DOW JONES", value: "40,315.60", change: "-45.20", percent: "-0.11%", positive: false },
  { name: "BITCOIN", value: "$66,450", change: "+$1,250", percent: "+1.92%", positive: true }
];

export const CATEGORIES = [
  "Všechny",
  "Big Tech",
  "AI Winners",
  "Semiconductors",
  "ETFs & Indices",
  "Value & Dividend",
  "Healthcare & Biotech",
  "Crypto"
];

// Helper to fetch live/updated stock quote
export const fetchStockQuote = async (symbol) => {
  try {
    // Attempt public Yahoo Finance proxy endpoint
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      const data = await response.json();
      const meta = data?.chart?.result?.[0]?.meta;
      if (meta && meta.regularMarketPrice) {
        const price = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose || price;
        const change = price - prevClose;
        const changePercent = (change / prevClose) * 100;
        return {
          symbol: symbol.toUpperCase(),
          price: Number(price.toFixed(2)),
          change: Number(change.toFixed(2)),
          changePercent: Number(changePercent.toFixed(2)),
          volume: meta.regularMarketVolume ? (meta.regularMarketVolume / 1e6).toFixed(1) + "M" : undefined
        };
      }
    }
  } catch (e) {
    console.log("Yahoo Finance API fallback active for", symbol);
  }

  // Fallback lookup from database
  const found = INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
  if (found) {
    return {
      symbol: found.symbol,
      price: found.price,
      change: found.change,
      changePercent: found.changePercent,
      volume: found.volume
    };
  }

  // Generic dynamic fallback for unknown tickers
  return {
    symbol: symbol.toUpperCase(),
    price: 150.00,
    change: 1.50,
    changePercent: 1.01,
    volume: "10.0M"
  };
};

export const searchStocks = (query) => {
  if (!query || query.trim() === '') return INITIAL_STOCKS;
  const q = query.toLowerCase().trim();
  return INITIAL_STOCKS.filter(stock => 
    stock.symbol.toLowerCase().includes(q) ||
    stock.name.toLowerCase().includes(q) ||
    stock.sector.toLowerCase().includes(q) ||
    stock.category.toLowerCase().includes(q)
  );
};
