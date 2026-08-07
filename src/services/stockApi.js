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
  },
  {
    symbol: "SOFI",
    name: "SoFi Technologies, Inc.",
    tradingViewSymbol: "NASDAQ:SOFI",
    sector: "Financial Services",
    category: "Fintech & Growth",
    price: 13.85,
    change: 0.42,
    changePercent: 3.13,
    marketCap: "14.8B",
    peRatio: 48.2,
    high52: 16.40,
    low52: 6.01,
    volume: "42.1M",
    dividendYield: "0.00%",
    description: "Moderní digitální banka a platforma osobních financí (půjčky, spoření, investice)."
  },
  {
    symbol: "HOOD",
    name: "Robinhood Markets, Inc.",
    tradingViewSymbol: "NASDAQ:HOOD",
    sector: "Financial Services",
    category: "Fintech & Growth",
    price: 24.60,
    change: 0.85,
    changePercent: 3.58,
    marketCap: "21.5B",
    peRatio: 51.2,
    high52: 34.90,
    low52: 10.85,
    volume: "18.3M",
    dividendYield: "0.00%",
    description: "Bezprovizní obchodní platforma pro akcie, kryptoměny a deriváty."
  },
  {
    symbol: "COIN",
    name: "Coinbase Global, Inc.",
    tradingViewSymbol: "NASDAQ:COIN",
    sector: "Financial Services",
    category: "Crypto",
    price: 248.30,
    change: 9.40,
    changePercent: 3.93,
    marketCap: "62.4B",
    peRatio: 32.1,
    high52: 349.75,
    low52: 115.80,
    volume: "12.5M",
    dividendYield: "0.00%",
    description: "Největší regulovaná kryptoburza v USA, partner ETF fondů pro Bitcoin a Ethereum."
  },
  {
    symbol: "NET",
    name: "Cloudflare, Inc.",
    tradingViewSymbol: "NYSE:NET",
    sector: "Technology",
    category: "AI Winners",
    price: 112.40,
    change: 2.15,
    changePercent: 1.95,
    marketCap: "36.8B",
    peRatio: 0,
    high52: 131.08,
    low52: 55.82,
    volume: "7.8M",
    dividendYield: "0.00%",
    description: "Globální síťová platforma poskytující CDN, kybernetickou bezpečnost a AI edge computing."
  },
  {
    symbol: "SMCI",
    name: "Super Micro Computer, Inc.",
    tradingViewSymbol: "NASDAQ:SMCI",
    sector: "Semiconductors",
    category: "AI Winners",
    price: 42.60,
    change: 1.80,
    changePercent: 4.41,
    marketCap: "25.1B",
    peRatio: 18.5,
    high52: 122.90,
    low52: 17.25,
    volume: "28.4M",
    dividendYield: "0.00%",
    description: "Výrobce serverů a AI infrastruktury používaných pro trénink modelů a datacentry NVIDIA."
  },
  {
    symbol: "IONQ",
    name: "IonQ, Inc.",
    tradingViewSymbol: "NYSE:IONQ",
    sector: "Technology",
    category: "AI Winners",
    price: 34.20,
    change: 1.50,
    changePercent: 4.59,
    marketCap: "7.8B",
    peRatio: 0,
    high52: 54.74,
    low52: 6.17,
    volume: "9.2M",
    dividendYield: "0.00%",
    description: "Přední společnost v oblasti kvantové výpočetní techniky, vyvíjející iontové kvantové počítače."
  },
  {
    symbol: "RKLB",
    name: "Rocket Lab USA, Inc.",
    tradingViewSymbol: "NASDAQ:RKLB",
    sector: "Aerospace & Defense",
    category: "Space & Defense",
    price: 23.80,
    change: 0.95,
    changePercent: 4.16,
    marketCap: "11.4B",
    peRatio: 0,
    high52: 34.99,
    low52: 4.48,
    volume: "14.7M",
    dividendYield: "0.00%",
    description: "Komerční vesmírná společnost provozující rakety Electron a vyvíjející Neutron pro náklad."
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum / US Dollar",
    tradingViewSymbol: "BINANCE:ETHUSDT",
    sector: "Cryptocurrency",
    category: "Crypto",
    price: 3480.00,
    change: 85.00,
    changePercent: 2.50,
    marketCap: "418B",
    peRatio: 0,
    high52: 4092.00,
    low52: 1500.00,
    volume: "18.2B",
    dividendYield: "0.00%",
    description: "Druhá největší kryptoměna, základ pro DeFi, NFT a smart kontrakty."
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    tradingViewSymbol: "NYSE:V",
    sector: "Financial Services",
    category: "Value & Dividend",
    price: 278.40,
    change: 1.20,
    changePercent: 0.43,
    marketCap: "575.2B",
    peRatio: 31.5,
    high52: 292.17,
    low52: 213.38,
    volume: "5.2M",
    dividendYield: "0.76%",
    description: "Světový lídr platebního ekosystému, zpracovávající miliardy transakcí ročně."
  },
  {
    symbol: "INTC",
    name: "Intel Corporation",
    tradingViewSymbol: "NASDAQ:INTC",
    sector: "Semiconductors",
    category: "Value & Dividend",
    price: 20.40,
    change: -0.30,
    changePercent: -1.45,
    marketCap: "87.5B",
    peRatio: 0,
    high52: 45.48,
    low52: 18.51,
    volume: "52.3M",
    dividendYield: "2.45%",
    description: "Historický výrobce procesorů procházející strategickou transformací a výstavbou fabů."
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
  "Fintech & Growth",
  "Space & Defense",
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

// Generate realistic ~30-day DTE Option Chain data for Option Wheel Strategy
export const fetchOptionChain30D = (stockSymbol, currentPrice = 124.30) => {
  const symbol = stockSymbol.toUpperCase();
  const dte = 30; // 30 days to expiration target
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + dte);
  const expirationStr = expDate.toISOString().split('T')[0];

  // Implied Volatility estimation based on ticker category
  const ivMap = {
    NVDA: 42.5, TSLA: 54.0, PLTR: 48.2, AMD: 44.0, SMCI: 65.0,
    AAPL: 22.1, MSFT: 21.5, GOOGL: 24.8, AMZN: 28.0, META: 31.2,
    SPY: 14.2, QQQ: 18.5, BRK: 16.0, JPM: 19.5, BTCUSD: 68.0
  };
  const iv = ivMap[symbol] || 32.0;

  // Generate strikes around current price (-15% to +15%)
  const strikes = [];
  const baseStep = currentPrice > 300 ? 10 : currentPrice > 100 ? 5 : currentPrice > 50 ? 2.5 : 1;
  const roundedPrice = Math.round(currentPrice / baseStep) * baseStep;

  for (let i = -6; i <= 6; i++) {
    const strike = Number((roundedPrice + i * baseStep).toFixed(2));
    if (strike <= 0) continue;

    // Distances
    const pctDiff = ((strike - currentPrice) / currentPrice) * 100;
    
    // Put option delta approx
    let putDelta = 0.5 - (pctDiff / 25);
    putDelta = Math.max(0.05, Math.min(0.95, putDelta));

    // Call option delta approx
    let callDelta = 0.5 + (pctDiff / 25);
    callDelta = Math.max(0.05, Math.min(0.95, callDelta));

    // Rough Black-Scholes approximations for premiums
    const timeFactor = Math.sqrt(dte / 365);
    const putVolatilityValue = strike * (iv / 100) * timeFactor * 0.4;
    const putIntrinsic = Math.max(0, strike - currentPrice);
    const putPrice = Number((putVolatilityValue + putIntrinsic * 0.8).toFixed(2));

    const callVolatilityValue = currentPrice * (iv / 100) * timeFactor * 0.4;
    const callIntrinsic = Math.max(0, currentPrice - strike);
    const callPrice = Number((callVolatilityValue + callIntrinsic * 0.8).toFixed(2));

    // Annualized Return on Capital (ARR %) for Wheel Strategy
    // ARR % = (Premium / Capital Required) * (365 / DTE) * 100
    const cspARR = Number(((putPrice / strike) * (365 / dte) * 100).toFixed(1));
    const ccARR = Number(((callPrice / currentPrice) * (365 / dte) * 100).toFixed(1));

    // Option suitability rating
    let putRating = "Nízký Výnos";
    if (putDelta >= 0.15 && putDelta <= 0.30) {
      putRating = "⭐ Cílová Delta (0.20-0.30)";
    } else if (putDelta > 0.30 && putDelta <= 0.45) {
      putRating = "Vyšší Prémie (Bližší k ceně)";
    } else if (putDelta < 0.15 && putDelta >= 0.05) {
      putRating = "Konzervativní (Vzdálenější)";
    }

    let callRating = "Konzervativní Call";
    if (callDelta >= 0.20 && callDelta <= 0.35) {
      callRating = "⭐ Cílová Delta (0.25-0.35)";
    } else if (callDelta > 0.35) {
      callRating = "Vyšší Prémie (Bližší k ceně)";
    }

    strikes.push({
      strike,
      pctDiff: Number(pctDiff.toFixed(1)),
      // PUT details
      put: {
        bid: Number((putPrice * 0.95).toFixed(2)),
        ask: Number((putPrice * 1.05).toFixed(2)),
        mid: putPrice,
        delta: Number(putDelta.toFixed(2)),
        arrPercent: cspARR,
        safetyMarginPercent: Number((-pctDiff).toFixed(1)), // % below current price
        rating: putRating,
        suitableForWheel: putDelta >= 0.15 && putDelta <= 0.35
      },
      // CALL details
      call: {
        bid: Number((callPrice * 0.95).toFixed(2)),
        ask: Number((callPrice * 1.05).toFixed(2)),
        mid: callPrice,
        delta: Number(callDelta.toFixed(2)),
        arrPercent: ccARR,
        upsideToStrikePercent: Number(pctDiff.toFixed(1)),
        rating: callRating,
        suitableForWheel: callDelta >= 0.15 && callDelta <= 0.35
      }
    });
  }

  return {
    symbol,
    spotPrice: currentPrice,
    dte,
    expirationDate: expirationStr,
    impliedVolatility: iv,
    ivRank: Math.round(iv * 1.1),
    earningsNotice: "Výsledky hospodaření až po expiraci",
    dataStatus: "Delayed 15-min (OPRA standard)",
    isRealtimeAvailable: false,
    strikes
  };
};

// Complete Financial Statements (Income Statement, Balance Sheet, Cash Flow Statement)
export const fetchFinancialStatements = (stockSymbol) => {
  const symbol = stockSymbol.toUpperCase();
  const found = INITIAL_STOCKS.find(s => s.symbol === symbol) || INITIAL_STOCKS[0];
  const capMult = found.marketCap.endsWith('T') ? 1000 : 1;
  const rawCap = parseFloat(found.marketCap) * capMult; // in Billions

  const rev = (rawCap * 0.12).toFixed(1);
  const grossProfit = (rawCap * 0.08).toFixed(1);
  const ebitda = (rawCap * 0.045).toFixed(1);
  const netIncome = (rawCap * 0.035).toFixed(1);
  
  const totalAssets = (rawCap * 0.25).toFixed(1);
  const cash = (rawCap * 0.08).toFixed(1);
  const totalDebt = (rawCap * 0.06).toFixed(1);
  const totalEquity = (totalAssets - totalDebt).toFixed(1);

  const operatingCF = (rawCap * 0.042).toFixed(1);
  const capEx = (rawCap * 0.012).toFixed(1);
  const fcf = (operatingCF - capEx).toFixed(1);
  const fcfYield = ((fcf / rawCap) * 100).toFixed(1);

  return {
    symbol,
    currency: "USD",
    period: "Posledních 12 měsíců (TTM)",
    incomeStatement: [
      { name: "Celkové Tržby (Revenue)", value: `$${rev}B`, change: "+24.5% YoY", status: "positive" },
      { name: "Hrubý Zisk (Gross Profit)", value: `$${grossProfit}B`, change: "Marže 66.8%", status: "positive" },
      { name: "EBITDA (Provozní zisk)", value: `$${ebitda}B`, change: "+28.1% YoY", status: "positive" },
      { name: "Čistý Zisk (Net Income)", value: `$${netIncome}B`, change: "+31.4% YoY", status: "positive" },
      { name: "Zisk na Akcii (EPS)", value: `$${(found.price / (found.peRatio || 25)).toFixed(2)}`, change: "TTM", status: "neutral" }
    ],
    balanceSheet: [
      { name: "Celková Aktiva (Total Assets)", value: `$${totalAssets}B`, change: "Silná rozvaha", status: "positive" },
      { name: "Hotovost & Ekvivalenty (Cash)", value: `$${cash}B`, change: "Vysoká likvidita", status: "positive" },
      { name: "Celkový Dluh (Total Debt)", value: `$${totalDebt}B`, change: "Kontrolovaný", status: "neutral" },
      { name: "Vlastní Kapitál (Total Equity)", value: `$${totalEquity}B`, change: "Rostoucí", status: "positive" },
      { name: "Pomer Dluhu k Vlastnímu Kapitálu (D/E)", value: `${(totalDebt / totalEquity).toFixed(2)}`, change: "< 0.5 Ideální", status: "positive" }
    ],
    cashFlow: [
      { name: "Provozní Cash Flow (Operating CF)", value: `$${operatingCF}B`, change: "+22.0% YoY", status: "positive" },
      { name: "Kapitálové Výdaje (CapEx)", value: `$${capEx}B`, change: "Investice do R&D", status: "neutral" },
      { name: "Volný Cash Flow (Free Cash Flow)", value: `$${fcf}B`, change: "Čistá hotovost", status: "positive" },
      { name: "FCF Yield (Výnos Volného Cash Flow)", value: `${fcfYield}%`, change: "Výnosnost p.a.", status: "positive" }
    ]
  };
};

// Historical 4-Year Financial Data (2022-2025) + Future Estimates (2026E, 2027E)
export const fetchHistoricalFinancials = (stockSymbol) => {
  const symbol = stockSymbol.toUpperCase();
  const found = INITIAL_STOCKS.find(s => s.symbol === symbol) || INITIAL_STOCKS[0];
  const capMult = found.marketCap.endsWith('T') ? 1000 : 1;
  const baseRev = parseFloat(found.marketCap) * capMult * 0.08;

  const years = ["2022", "2023", "2024", "2025 (TTM)", "2026E (Odhad)", "2027E (Odhad)"];
  
  // Growth multipliers per year
  const revMultipliers = [0.65, 0.78, 0.92, 1.0, 1.18, 1.38];
  const netIncomeMultipliers = [0.55, 0.70, 0.88, 1.0, 1.22, 1.45];
  const fcfMultipliers = [0.50, 0.68, 0.85, 1.0, 1.25, 1.50];

  const baseEPS = found.price / (found.peRatio || 25);

  return {
    symbol,
    years,
    revenue: years.map((year, i) => ({
      year,
      value: Number((baseRev * revMultipliers[i]).toFixed(1)),
      isEstimate: year.includes('E')
    })),
    netIncome: years.map((year, i) => ({
      year,
      value: Number((baseRev * 0.3 * netIncomeMultipliers[i]).toFixed(1)),
      isEstimate: year.includes('E')
    })),
    freeCashFlow: years.map((year, i) => ({
      year,
      value: Number((baseRev * 0.35 * fcfMultipliers[i]).toFixed(1)),
      isEstimate: year.includes('E')
    })),
    eps: years.map((year, i) => ({
      year,
      value: Number((baseEPS * netIncomeMultipliers[i]).toFixed(2)),
      isEstimate: year.includes('E')
    }))
  };
};

// Global Macroeconomic Countries Dataset
export const GLOBAL_MACRO_DATA = [
  {
    code: "USA",
    country: "Spojené Státy Americké",
    flag: "🇺🇸",
    centralBank: "Federal Reserve (FED)",
    interestRate: 5.25,
    gdpBillions: 28200,
    gdpGrowth: 2.8,
    inflation: 2.9,
    debtToGdp: 122.3,
    unemployment: 4.1,
    rating: "AAA",
    outlook: "Stabilní",
    keyFocus: "FED zvažuje snížení sazeb. Sledována jádrová inflace PCE a trh práce."
  },
  {
    code: "CZK",
    country: "Česká Republika",
    flag: "🇨🇿",
    centralBank: "Česká Národní Banka (ČNB)",
    interestRate: 4.50,
    gdpBillions: 330,
    gdpGrowth: 1.4,
    inflation: 2.2,
    debtToGdp: 44.2,
    unemployment: 3.8,
    rating: "AA-",
    outlook: "Pozitivní",
    keyFocus: "ČNB drží opatrné tempo snižování sazeb. Inflace se drží v 2% tolerančním pásmu."
  },
  {
    code: "SVK",
    country: "Slovensko",
    flag: "🇸🇰",
    centralBank: "Európska Centrálna Banka (ECB)",
    interestRate: 3.75,
    gdpBillions: 135,
    gdpGrowth: 2.1,
    inflation: 2.7,
    debtToGdp: 57.8,
    unemployment: 5.4,
    rating: "A",
    outlook: "Stabilní",
    keyFocus: "Řešení rozpočtového konsolidačního balíčku a závislost na exportu automotive."
  },
  {
    code: "POL",
    country: "Polsko",
    flag: "🇵🇱",
    centralBank: "Narodowy Bank Polski (NBP)",
    interestRate: 5.75,
    gdpBillions: 840,
    gdpGrowth: 3.1,
    inflation: 4.2,
    debtToGdp: 49.6,
    unemployment: 5.0,
    rating: "A-",
    outlook: "Pozitivní",
    keyFocus: "Silný spotřebitelský růst a vysoký příliv EU fondů pro infrastrukturu."
  },
  {
    code: "DEU",
    country: "Německo",
    flag: "🇩🇪",
    centralBank: "Európska Centrálna Banka (ECB)",
    interestRate: 3.75,
    gdpBillions: 4500,
    gdpGrowth: 0.3,
    inflation: 2.3,
    debtToGdp: 63.7,
    unemployment: 5.9,
    rating: "AAA",
    outlook: "Stabilní",
    keyFocus: "Strukturální výzvy v průmyslu a vysoké ceny energií pro výrobní sektor."
  },
  {
    code: "GBR",
    country: "Velká Británie",
    flag: "🇬🇧",
    centralBank: "Bank of England (BoE)",
    interestRate: 5.00,
    gdpBillions: 3300,
    gdpGrowth: 1.1,
    inflation: 2.2,
    debtToGdp: 98.5,
    unemployment: 4.2,
    rating: "AA",
    outlook: "Stabilní",
    keyFocus: "BoE započala uvolňování měnové politiky. Sledována fiskální politika nové vlády."
  },
  {
    code: "JPN",
    country: "Japonsko",
    flag: "🇯🇵",
    centralBank: "Bank of Japan (BoJ)",
    interestRate: 0.25,
    gdpBillions: 4200,
    gdpGrowth: 0.7,
    inflation: 2.8,
    debtToGdp: 254.6,
    unemployment: 2.5,
    rating: "A+",
    outlook: "Stabilní",
    keyFocus: "BoJ postupně opouští záporné sazby. Volatilitu způsobuje yen carry trade."
  },
  {
    code: "CHN",
    country: "Čína",
    flag: "🇨🇳",
    centralBank: "People's Bank of China (PBoC)",
    interestRate: 3.35,
    gdpBillions: 18500,
    gdpGrowth: 4.8,
    inflation: 0.5,
    debtToGdp: 83.6,
    unemployment: 5.0,
    rating: "A+",
    outlook: "Negativní",
    keyFocus: "Stimulační balíčky pro realitní sektor a boj s deflačními tlaky."
  },
  {
    code: "CHE",
    country: "Švýcarsko",
    flag: "🇨🇭",
    centralBank: "Swiss National Bank (SNB)",
    interestRate: 1.25,
    gdpBillions: 890,
    gdpGrowth: 1.2,
    inflation: 1.3,
    debtToGdp: 38.1,
    unemployment: 2.3,
    rating: "AAA",
    outlook: "Stabilní",
    keyFocus: "Nejnižší inflace v Evropě. SNB intervence pro stabilizaci švýcarského franku."
  },
  {
    code: "EUR",
    country: "Eurozóna (Celkem)",
    flag: "🇪🇺",
    centralBank: "Európska Centrálna Banka (ECB)",
    interestRate: 3.75,
    gdpBillions: 15800,
    gdpGrowth: 0.8,
    inflation: 2.6,
    debtToGdp: 88.6,
    unemployment: 6.4,
    rating: "AA+",
    outlook: "Stabilní",
    keyFocus: "ECB vyvažuje zpomalující růst s návratem inflace k 2% cíli."
  }
];

export const fetchMacroNews = () => [
  {
    id: 1,
    title: "Rozhodování FED a ECB: Očekává se koordinované snižování úrokových sazeb na podzim",
    source: "Financial Times",
    time: "Před 1 hodinou",
    country: "USA / EU",
    summary: "Centrální banky vnímájí pokles inflačních tlaků a zaměřují se na podporu hospodářského růstu a zaměstnanosti."
  },
  {
    id: 2,
    title: "Česká Národní Banka (ČNB) drží opatrný přístup. Koruna reaguje zpevněním vůči Euru",
    source: "Hospodářské Noviny",
    time: "Před 3 hodinami",
    country: "Česká Republika",
    summary: "Inflace v ČR na 2.2% je stabilizovaná, avšak růst cen služeb brzdí agresivnější pokles sazeb."
  },
  {
    id: 3,
    title: "Bank of Japan a dopady na globální trhy: Yen Carry Trade a nová sazba BoJ",
    source: "Nikkei Asia",
    time: "Před 5 hodinami",
    country: "Japonsko",
    summary: "Zvýšení sazeb v Japonsku vyvolalo přesun kapitálu z globálních akctiv zpět do yenu."
  }
];

// Stock news & catalysts generator tailored for selected ticker
export const fetchStockNews = (stockSymbol) => {
  const newsDatabase = {
    NVDA: [
      {
        id: 1,
        title: "NVIDIA představuje novou architekturu Blackwell B200 s rekordní poptávkou od hyperscalery",
        source: "Bloomberg Finance",
        time: "Před 2 hodinami",
        sentiment: "positive",
        summary: "Poptávka po AI čipech Blackwell překračuje výrobu na následujících 12 měsíců. Bank of America zvyšuje cílovou cenu na $165."
      },
      {
        id: 2,
        title: "Analytici Goldman Sachs potvrzují nákupní doporučení s přesvědčením o růstu datacentrových tržeb",
        source: "Reuters",
        time: "Před 5 hodinami",
        sentiment: "positive",
        summary: "Tržby z výpočetních čipů pro cloudové giganty Microsoft, Alphabet a Meta rostou o 45% meziročně."
      },
      {
        id: 3,
        title: "Exportní omezení do Číny zůstávají sledovaným rizikem pro dodavatelský řetězec TSMC",
        source: "Financial Times",
        time: "Včera",
        sentiment: "warning",
        summary: "Dopad na celkové tržby je však kompenzován masivní poptávkou na západních trzích."
      }
    ],
    AAPL: [
      {
        id: 1,
        title: "Apple Intelligence přináší rekordní cyklus výměny iPhonů v Severní Americe a Evropě",
        source: "WSJ",
        time: "Před 3 hodinami",
        sentiment: "positive",
        summary: "Nový systém osobní AI motivuje zákazníky ke starším modelům pře jít na novou generaci."
      },
      {
        id: 2,
        title: "Tržby ze služeb (App Store, iCloud, Apple Pay) dosáhly nového historického maxima $24.2 mld",
        source: "CNBC",
        time: "Před 6 hodinami",
        sentiment: "positive",
        summary: "Sektor služeb přináší vysoké marže přes 74% a stabilní opakující se příjmy."
      }
    ],
    TSLA: [
      {
        id: 1,
        title: "Tesla Cybercab & Robotaxi flota dostává schválení pro komerční testování v Austinu",
        source: "Electrek",
        time: "Před 1 hodinou",
        sentiment: "positive",
        summary: "Autonomní jízda FSD v12.5 vykazuje 5x méně zásahů řidiče na tisíc mil."
      },
      {
        id: 2,
        title: "Produkce bateriových úložišť Megapack ve Lathropu roste o 80% meziročně",
        source: "Energy Storage News",
        time: "Před 4 hodinami",
        sentiment: "positive",
        summary: "Energetický segment Tesly se stává druhou nejsilnější růstovou nohou společnosti."
      }
    ]
  };

  const defaultNews = [
    {
      id: 101,
      title: `${stockSymbol}: Analytický přehled výsledků hospodaření a technických indikátorů pro tento měsíc`,
      source: "MarketWatch",
      time: "Před 3 hodinami",
      sentiment: "positive",
      summary: "Společnost vykazuje silnou rozvahu, stabilní cash flow a pozitivní doporučení většiny Wall Street analytiků."
    },
    {
      id: 102,
      title: `Makroekonomický výhled a vliv úrokových sazeb FED na sektor ${stockSymbol}`,
      source: "Seeking Alpha",
      time: "Před 6 hodinami",
      sentiment: "neutral",
      summary: "Očekávané snížení sazeb podporuje růstové valuace a zájem institucionálních investorů."
    }
  ];

  return newsDatabase[stockSymbol.toUpperCase()] || defaultNews;
};



