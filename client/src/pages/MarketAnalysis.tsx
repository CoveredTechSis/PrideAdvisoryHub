import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Calendar } from "lucide-react";

const marketHighlights = [
  {
    title: "NGX All-Share Index",
    value: "102,847.25",
    change: "+2.34%",
    isPositive: true,
  },
  {
    title: "Market Cap",
    value: "₦58.2T",
    change: "+1.89%",
    isPositive: true,
  },
  {
    title: "Volume Traded",
    value: "485.6M",
    change: "-5.12%",
    isPositive: false,
  },
  {
    title: "Value Traded",
    value: "₦12.8B",
    change: "+8.45%",
    isPositive: true,
  },
];

const sectorPerformance = [
  { sector: "Banking", change: "+4.2%", isPositive: true },
  { sector: "Consumer Goods", change: "+1.8%", isPositive: true },
  { sector: "Oil & Gas", change: "-2.1%", isPositive: false },
  { sector: "Insurance", change: "+3.5%", isPositive: true },
  { sector: "Industrial", change: "+0.9%", isPositive: true },
  { sector: "Technology", change: "+6.7%", isPositive: true },
];

const topGainers = [
  { name: "Zenith Bank", symbol: "ZENITH", price: "₦42.50", change: "+9.8%" },
  { name: "GTBank", symbol: "GTCO", price: "₦48.75", change: "+7.2%" },
  { name: "Dangote Cement", symbol: "DANGCEM", price: "₦285.00", change: "+5.5%" },
  { name: "MTN Nigeria", symbol: "MTNN", price: "₦198.50", change: "+4.3%" },
  { name: "BUA Cement", symbol: "BUACEMENT", price: "₦95.00", change: "+3.9%" },
];

const topLosers = [
  { name: "Seplat Energy", symbol: "SEPLAT", price: "₦2,850.00", change: "-4.2%" },
  { name: "Nigerian Breweries", symbol: "NB", price: "₦32.50", change: "-3.1%" },
  { name: "Nestle Nigeria", symbol: "NESTLE", price: "₦1,180.00", change: "-2.8%" },
  { name: "Oando", symbol: "OANDO", price: "₦18.25", change: "-2.5%" },
  { name: "Airtel Africa", symbol: "AIRTEL", price: "₦1,520.00", change: "-1.9%" },
];

const weeklyOutlook = {
  title: "Weekly Market Outlook",
  date: "January 20-24, 2025",
  summary: "The Nigerian equity market is expected to maintain its bullish momentum this week, driven by positive corporate earnings expectations and renewed foreign investor interest. Key events to watch include the Monetary Policy Committee (MPC) meeting and tier-1 bank quarterly results.",
  keyPoints: [
    "Banking stocks expected to lead gains following strong Q4 earnings preview",
    "Foreign portfolio investment inflows continue to support market liquidity",
    "Naira stability providing confidence for equity investments",
    "Consumer goods sector may face headwinds from inflation concerns",
    "Oil & Gas stocks tracking global crude oil price movements",
  ],
};

export default function MarketAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container mx-auto px-4">
          <Link href="/#research" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-8 w-8" />
            </div>
            <Badge variant="outline">Updated Daily</Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Market Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive analysis of the Nigerian Stock Exchange, sector performance, and investment opportunities.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Market Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketHighlights.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                  <p className="text-2xl font-bold mb-1">{item.value}</p>
                  <div className={`flex items-center gap-1 text-sm ${item.isPositive ? "text-green-600" : "text-red-600"}`}>
                    {item.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {item.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">{weeklyOutlook.title}</h2>
            <Badge variant="secondary">{weeklyOutlook.date}</Badge>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground mb-6">
                {weeklyOutlook.summary}
              </p>
              <h3 className="font-semibold mb-3">Key Points to Watch:</h3>
              <ul className="space-y-2">
                {weeklyOutlook.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Sector Performance</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorPerformance.map((sector, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between py-4">
                  <span className="font-medium">{sector.sector}</span>
                  <span className={`flex items-center gap-1 font-semibold ${sector.isPositive ? "text-green-600" : "text-red-600"}`}>
                    {sector.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {sector.change}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h2 className="text-2xl font-bold">Top Gainers</h2>
              </div>
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {topGainers.map((stock, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{stock.name}</p>
                          <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{stock.price}</p>
                          <p className="text-sm text-green-600">{stock.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <h2 className="text-2xl font-bold">Top Losers</h2>
              </div>
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {topLosers.map((stock, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{stock.name}</p>
                          <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{stock.price}</p>
                          <p className="text-sm text-red-600">{stock.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Want Personalized Analysis?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get tailored market insights and investment recommendations from our team of experienced analysts.
          </p>
          <Link href="/book-consultation">
            <Button size="lg" className="hover:bg-amber-400 hover:text-slate-900 transition-colors">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
