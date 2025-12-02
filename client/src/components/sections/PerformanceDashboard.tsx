import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, TrendingDown, Info, AlertTriangle } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// todo: remove mock functionality - replace with verified performance data
const portfolioData = {
  growth: {
    name: "Growth Portfolio",
    ytdReturn: 28.5,
    monthReturn: 3.2,
    benchmark: "NGX ASI",
    benchmarkReturn: 18.2,
    risk: "High",
    chartData: [
      { month: "Jan", portfolio: 100, benchmark: 100 },
      { month: "Feb", portfolio: 104, benchmark: 102 },
      { month: "Mar", portfolio: 108, benchmark: 105 },
      { month: "Apr", portfolio: 112, benchmark: 107 },
      { month: "May", portfolio: 118, benchmark: 110 },
      { month: "Jun", portfolio: 115, benchmark: 108 },
      { month: "Jul", portfolio: 122, benchmark: 112 },
      { month: "Aug", portfolio: 126, benchmark: 115 },
      { month: "Sep", portfolio: 124, benchmark: 114 },
      { month: "Oct", portfolio: 128, benchmark: 116 },
      { month: "Nov", portfolio: 125, benchmark: 117 },
      { month: "Dec", portfolio: 128.5, benchmark: 118.2 },
    ],
  },
  balanced: {
    name: "Balanced Portfolio",
    ytdReturn: 18.3,
    monthReturn: 1.8,
    benchmark: "60/40 Index",
    benchmarkReturn: 12.5,
    risk: "Medium",
    chartData: [
      { month: "Jan", portfolio: 100, benchmark: 100 },
      { month: "Feb", portfolio: 102, benchmark: 101 },
      { month: "Mar", portfolio: 105, benchmark: 103 },
      { month: "Apr", portfolio: 107, benchmark: 104 },
      { month: "May", portfolio: 110, benchmark: 106 },
      { month: "Jun", portfolio: 109, benchmark: 105 },
      { month: "Jul", portfolio: 112, benchmark: 107 },
      { month: "Aug", portfolio: 114, benchmark: 109 },
      { month: "Sep", portfolio: 116, benchmark: 110 },
      { month: "Oct", portfolio: 117, benchmark: 111 },
      { month: "Nov", portfolio: 117.5, benchmark: 112 },
      { month: "Dec", portfolio: 118.3, benchmark: 112.5 },
    ],
  },
  income: {
    name: "Income Portfolio",
    ytdReturn: 14.2,
    monthReturn: 1.2,
    benchmark: "Bond Index",
    benchmarkReturn: 11.8,
    risk: "Low",
    chartData: [
      { month: "Jan", portfolio: 100, benchmark: 100 },
      { month: "Feb", portfolio: 101, benchmark: 100.5 },
      { month: "Mar", portfolio: 102.5, benchmark: 102 },
      { month: "Apr", portfolio: 104, benchmark: 103 },
      { month: "May", portfolio: 106, benchmark: 104.5 },
      { month: "Jun", portfolio: 107, benchmark: 105 },
      { month: "Jul", portfolio: 108.5, benchmark: 106.5 },
      { month: "Aug", portfolio: 110, benchmark: 108 },
      { month: "Sep", portfolio: 111, benchmark: 109 },
      { month: "Oct", portfolio: 112.5, benchmark: 110 },
      { month: "Nov", portfolio: 113.5, benchmark: 111 },
      { month: "Dec", portfolio: 114.2, benchmark: 111.8 },
    ],
  },
};

type PortfolioKey = keyof typeof portfolioData;

export default function PerformanceDashboard() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioKey>("growth");
  const data = portfolioData[selectedPortfolio];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Performance Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent, verified returns across our model portfolios. Track our performance
            against market benchmarks with full methodology disclosure.
          </p>
        </div>

        <Tabs
          value={selectedPortfolio}
          onValueChange={(v) => setSelectedPortfolio(v as PortfolioKey)}
          className="max-w-5xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="growth" data-testid="tab-portfolio-growth">Growth</TabsTrigger>
            <TabsTrigger value="balanced" data-testid="tab-portfolio-balanced">Balanced</TabsTrigger>
            <TabsTrigger value="income" data-testid="tab-portfolio-income">Income</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPortfolio}>
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card data-testid="card-ytd-return">
                <CardHeader className="pb-2">
                  <CardDescription>YTD Return</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-success">
                      +{data.ytdReturn}%
                    </span>
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    vs {data.benchmark}: +{data.benchmarkReturn}%
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-month-return">
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Return</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold font-mono ${data.monthReturn >= 0 ? "text-success" : "text-destructive"}`}>
                      {data.monthReturn >= 0 ? "+" : ""}{data.monthReturn}%
                    </span>
                    {data.monthReturn >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">December 2024</p>
                </CardContent>
              </Card>

              <Card data-testid="card-risk-level">
                <CardHeader className="pb-2">
                  <CardDescription>Risk Profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        data.risk === "High"
                          ? "destructive"
                          : data.risk === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-base px-3 py-1"
                    >
                      {data.risk}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Volatility-adjusted strategy
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>{data.name} Performance</CardTitle>
                    <CardDescription>
                      Indexed to 100 at start of year
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Portfolio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span>{data.benchmark}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80" data-testid="chart-performance">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartData}>
                      <defs>
                        <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis domain={[95, 135]} className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="portfolio"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#portfolioGradient)"
                        name="Portfolio"
                      />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name={data.benchmark}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Performance Disclaimer</p>
                    <p className="text-muted-foreground">
                      Past performance is not indicative of future results. Returns shown are model portfolio
                      returns and may differ from actual client returns. All data is verified by independent
                      auditors annually. Investment involves risk including possible loss of principal.
                    </p>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Our performance data is audited quarterly by KPMG Nigeria and verified
                        against source trade confirmations.</p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
