import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TradingViewChart from './components/TradingViewChart';
import StockDetailsCard from './components/StockDetailsCard';
import ScreenerFilters from './components/ScreenerFilters';
import PortfolioManager from './components/PortfolioManager';
import StockSearchModal from './components/StockSearchModal';
import AuthModal from './components/AuthModal';
import StockHeatmap from './components/StockHeatmap';
import { INITIAL_STOCKS } from './services/stockApi';
import { auth, onAuthStateChanged, logoutUser, saveUserPortfolio, loadUserPortfolio } from './services/firebase';
import { Sparkles, LineChart, Briefcase, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('screener'); // 'screener' | 'portfolio'
  const [selectedStock, setSelectedStock] = useState(INITIAL_STOCKS[0]); // NVDA default
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Toast notification trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Auth observer & initial load
  useEffect(() => {
    // Check local demo storage first
    const demoUser = localStorage.getItem("lmvest_demo_user");
    if (demoUser) {
      try {
        const u = JSON.parse(demoUser);
        setUser(u);
        loadUserPortfolio(u.uid).then(data => setHoldings(data));
      } catch (e) {}
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const data = await loadUserPortfolio(firebaseUser.uid);
        setHoldings(data);
      } else if (!demoUser) {
        // Guest mode default portfolio
        const guestData = localStorage.getItem('lmvest_guest_portfolio');
        if (guestData) {
          try { setHoldings(JSON.parse(guestData)); } catch (e) {}
        } else {
          // Default demo holdings
          setHoldings([
            { symbol: 'NVDA', shares: 15, buyPrice: 110.00, dateAdded: '2024-05-10' },
            { symbol: 'AAPL', shares: 8, buyPrice: 185.50, dateAdded: '2024-03-15' },
            { symbol: 'MSFT', shares: 5, buyPrice: 410.20, dateAdded: '2024-04-01' }
          ]);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save holdings state change
  const updateHoldingsState = (newHoldings) => {
    setHoldings(newHoldings);
    if (user) {
      saveUserPortfolio(user.uid, newHoldings);
    } else {
      localStorage.setItem('lmvest_guest_portfolio', JSON.stringify(newHoldings));
    }
  };

  // Portfolio handlers
  const handleAddHolding = (stockOrHolding) => {
    const symbol = stockOrHolding.symbol;
    const existingIndex = holdings.findIndex(h => h.symbol.toUpperCase() === symbol.toUpperCase());
    
    let newHoldings = [...holdings];
    if (existingIndex >= 0) {
      // Update existing
      const existing = newHoldings[existingIndex];
      const newShares = (stockOrHolding.shares || 1) + existing.shares;
      const newPrice = stockOrHolding.buyPrice || stockOrHolding.price || existing.buyPrice;
      newHoldings[existingIndex] = { ...existing, shares: newShares, buyPrice: newPrice };
    } else {
      // Add new
      newHoldings.push({
        symbol: symbol,
        shares: stockOrHolding.shares || 5,
        buyPrice: stockOrHolding.buyPrice || stockOrHolding.price,
        dateAdded: stockOrHolding.dateAdded || new Date().toISOString().split('T')[0]
      });
    }

    updateHoldingsState(newHoldings);
    showToast(`Akcie ${symbol} byla úspěšně přidána do vašeho portfolia!`);
  };

  const handleRemoveHolding = (symbol) => {
    const filtered = holdings.filter(h => h.symbol.toUpperCase() !== symbol.toUpperCase());
    updateHoldingsState(filtered);
    showToast(`Akcie ${symbol} byla odebrána z portfolia.`);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    showToast("Byli jste odhlášeni.");
  };

  const isInPortfolio = (symbol) => {
    return holdings.some(item => item.symbol.toUpperCase() === symbol.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel bg-brand-600/90 border border-brand-400 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        currency={currency}
        setCurrency={setCurrency}
        portfolioCount={holdings.length}
      />

      {/* App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'screener' ? (
          <>
            {/* Top Interactive TradingView Chart Section */}
            <div className="space-y-4">
              <StockDetailsCard 
                stock={selectedStock}
                onAddToPortfolio={handleAddHolding}
                isInPortfolio={isInPortfolio(selectedStock.symbol)}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-brand-500" />
                    Interaktivní Graf a Technická Analýza: <span className="text-brand-400 font-mono">{selectedStock.tradingViewSymbol || selectedStock.symbol}</span>
                  </h3>
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    * TradingView Engine v reálném čase zdarma
                  </span>
                </div>

                <TradingViewChart 
                  symbol={selectedStock.tradingViewSymbol || `NASDAQ:${selectedStock.symbol}`}
                  height={540}
                />
              </div>
            </div>

            {/* Screener Filters & Stock Table */}
            <div className="pt-4 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500" />
                Akciový Screener a Přehled Tickerů
              </h3>
              <ScreenerFilters 
                onSelectStock={setSelectedStock}
                selectedStock={selectedStock}
                onAddToPortfolio={handleAddHolding}
                portfolioHoldings={holdings}
              />
            </div>
          </>
        ) : activeTab === 'heatmap' ? (
          /* Heatmap Tab View */
          <StockHeatmap />
        ) : (
          /* Portfolio Tab View */
          <PortfolioManager 
            holdings={holdings}
            onAddHolding={handleAddHolding}
            onRemoveHolding={handleRemoveHolding}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            currency={currency}
          />
        )}
      </main>

      {/* Modals */}
      <StockSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStock={setSelectedStock}
        onAddToPortfolio={handleAddHolding}
        portfolioHoldings={holdings}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => {
          setUser(u);
          showToast(`Vítejte zpět, ${u.displayName || u.email}! Sledované definice uloženy.`);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#070a12] py-8 text-center text-xs text-gray-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white text-xs">LM</div>
            <span className="font-bold text-gray-300">LMvest Screener</span>
            <span>© 2026</span>
          </div>
          <p className="text-gray-500 max-w-md text-left sm:text-right">
            Určeno pouze pro informační účely a osobní správu portfolia. Není finančním poradenstvím.
          </p>
        </div>
      </footer>
    </div>
  );
}
