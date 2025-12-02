import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

// todo: remove mock functionality - replace with real market data API
const mockStocks = [
  { symbol: "DANGCEM", price: 285.50, change: 2.35 },
  { symbol: "GTCO", price: 42.80, change: -0.65 },
  { symbol: "ZENITH", price: 38.20, change: 1.15 },
  { symbol: "MTNN", price: 195.00, change: 3.50 },
  { symbol: "BUA", price: 85.75, change: -1.20 },
  { symbol: "AIRTEL", price: 1450.00, change: 12.50 },
  { symbol: "SEPLAT", price: 1850.00, change: -25.00 },
  { symbol: "NESTLE", price: 895.00, change: 5.75 },
];

// todo: remove mock functionality
const mockBonds = [
  { symbol: "FGN 2029", yield: 14.25, change: 0.15 },
  { symbol: "FGN 2031", yield: 15.50, change: -0.08 },
  { symbol: "LAGOS 2028", yield: 13.75, change: 0.22 },
];

export default function MarketTicker() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // todo: remove mock functionality - implement real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <RefreshCw className="h-3 w-3" />
            <span className="hidden sm:inline">Live</span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...mockStocks, ...mockStocks].map((stock, i) => (
                <div key={`stock-${i}`} className="flex items-center gap-2 text-sm">
                  <span className="font-medium" data-testid={`text-ticker-symbol-${stock.symbol}`}>
                    {stock.symbol}
                  </span>
                  <span className="font-mono">₦{stock.price.toFixed(2)}</span>
                  <span
                    className={`flex items-center gap-0.5 font-mono text-xs ${
                      stock.change >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                  </span>
                </div>
              ))}
              
              <div className="border-l border-border pl-6" />
              
              {[...mockBonds, ...mockBonds].map((bond, i) => (
                <div key={`bond-${i}`} className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{bond.symbol}</span>
                  <span className="font-mono">{bond.yield.toFixed(2)}%</span>
                  <span
                    className={`flex items-center gap-0.5 font-mono text-xs ${
                      bond.change >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {bond.change >= 0 ? "+" : ""}{bond.change.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
