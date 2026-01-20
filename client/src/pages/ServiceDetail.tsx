import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, BarChart3, FileCheck, Briefcase, ShieldCheck, CheckCircle, TrendingUp, Target, Users } from "lucide-react";

const servicesData: Record<string, {
  icon: typeof BarChart3;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
}> = {
  "equity-advisory": {
    icon: BarChart3,
    title: "Equity Advisory",
    subtitle: "Data-driven stock selection for the Nigerian Stock Exchange",
    description: "Our equity advisory service provides comprehensive analysis and recommendations for investing in Nigerian stocks. We combine fundamental analysis, technical indicators, and market sentiment to identify high-potential opportunities that align with your investment goals.",
    features: ["NSE Stock Analysis", "Sector Rotation Strategies", "Portfolio Rebalancing", "Dividend Growth Investing", "Growth Stock Selection", "Value Investing Approach"],
    benefits: [
      { title: "Expert Analysis", description: "Access institutional-grade research on Nigerian equities with detailed company analysis and valuations." },
      { title: "Timely Recommendations", description: "Receive buy, hold, and sell signals based on rigorous analysis and market conditions." },
      { title: "Risk-Adjusted Returns", description: "Focus on maximizing returns while managing downside risk through diversification." },
      { title: "Regular Updates", description: "Stay informed with weekly market updates and portfolio performance reviews." },
    ],
    process: [
      { step: 1, title: "Initial Consultation", description: "We discuss your investment goals, risk tolerance, and time horizon." },
      { step: 2, title: "Portfolio Analysis", description: "We analyze your current holdings and identify opportunities for optimization." },
      { step: 3, title: "Strategy Development", description: "We create a customized equity investment strategy tailored to your needs." },
      { step: 4, title: "Ongoing Management", description: "We provide continuous monitoring and recommendations for your portfolio." },
    ],
  },
  "fixed-income-advisory": {
    icon: FileCheck,
    title: "Fixed-Income Advisory",
    subtitle: "Optimize your bond portfolio with expert guidance",
    description: "Our fixed-income advisory service helps you navigate the Nigerian bond market, including Federal Government bonds, corporate bonds, and money market instruments. We focus on yield optimization while managing interest rate and credit risks.",
    features: ["FGN Bonds", "Corporate Bonds", "Treasury Bills", "Commercial Papers", "Eurobonds", "Yield Curve Analysis"],
    benefits: [
      { title: "Stable Income", description: "Build a portfolio that generates consistent, predictable income streams." },
      { title: "Capital Preservation", description: "Protect your principal while earning competitive returns." },
      { title: "Inflation Protection", description: "Structure your bond holdings to hedge against inflation erosion." },
      { title: "Liquidity Management", description: "Balance yield with liquidity needs through laddered maturity strategies." },
    ],
    process: [
      { step: 1, title: "Needs Assessment", description: "We understand your income requirements and risk preferences." },
      { step: 2, title: "Market Analysis", description: "We analyze current yields, credit spreads, and interest rate outlook." },
      { step: 3, title: "Portfolio Construction", description: "We build a diversified fixed-income portfolio matching your objectives." },
      { step: 4, title: "Monitoring & Rebalancing", description: "We track maturities and reinvest proceeds optimally." },
    ],
  },
  "portfolio-construction": {
    icon: Briefcase,
    title: "Portfolio Construction",
    subtitle: "Custom-built portfolios aligned with your financial goals",
    description: "Our portfolio construction service creates personalized investment portfolios based on your unique circumstances. We consider your risk tolerance, investment horizon, liquidity needs, and financial objectives to build a diversified portfolio optimized for Nigerian market conditions.",
    features: ["Asset Allocation", "Risk Profiling", "Goal-Based Planning", "Tax Efficiency", "Rebalancing Strategy", "Performance Attribution"],
    benefits: [
      { title: "Personalized Approach", description: "Every portfolio is tailored to your specific financial situation and goals." },
      { title: "Diversification", description: "Reduce risk through strategic allocation across asset classes and sectors." },
      { title: "Goal Achievement", description: "Align your investments with specific objectives like retirement or education funding." },
      { title: "Tax Optimization", description: "Structure your portfolio to minimize tax liabilities legally." },
    ],
    process: [
      { step: 1, title: "Discovery Session", description: "We conduct a comprehensive review of your financial situation and goals." },
      { step: 2, title: "Risk Assessment", description: "We determine your risk tolerance through detailed questionnaires and discussions." },
      { step: 3, title: "Portfolio Design", description: "We create an optimal asset allocation strategy for your profile." },
      { step: 4, title: "Implementation", description: "We execute the strategy and establish ongoing monitoring protocols." },
    ],
  },
  "risk-management": {
    icon: ShieldCheck,
    title: "Risk Management",
    subtitle: "Protect your wealth with comprehensive risk strategies",
    description: "Our risk management service helps you identify, assess, and mitigate investment risks. We employ sophisticated techniques including currency hedging, inflation protection, and stress testing to safeguard your portfolio against adverse market conditions.",
    features: ["Risk Assessment", "Currency Hedging", "Inflation Protection", "Stress Testing", "Scenario Analysis", "Drawdown Management"],
    benefits: [
      { title: "Peace of Mind", description: "Sleep better knowing your wealth is protected against market volatility." },
      { title: "Currency Protection", description: "Hedge against Naira depreciation with strategic USD exposure." },
      { title: "Downside Protection", description: "Limit potential losses during market corrections." },
      { title: "Long-term Preservation", description: "Ensure your wealth maintains purchasing power over time." },
    ],
    process: [
      { step: 1, title: "Risk Identification", description: "We identify all potential risks affecting your portfolio." },
      { step: 2, title: "Risk Quantification", description: "We measure the potential impact of each risk factor." },
      { step: 3, title: "Strategy Development", description: "We design mitigation strategies for identified risks." },
      { step: 4, title: "Continuous Monitoring", description: "We track risk metrics and adjust strategies as needed." },
    ],
  },
};

export default function ServiceDetail() {
  const [match, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <Link href="/#services" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <ServiceIcon className="h-10 w-10" />
              </div>
              <Badge variant="outline" className="text-sm">Investment Advisory</Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-service-title">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.subtitle}
            </p>
            
            <Link href="/book-consultation">
              <Button size="lg" className="hover:bg-amber-400 hover:text-slate-900 transition-colors">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">What's Included</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {service.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                      {index === 0 && <TrendingUp className="h-5 w-5" />}
                      {index === 1 && <Target className="h-5 w-5" />}
                      {index === 2 && <ShieldCheck className="h-5 w-5" />}
                      {index === 3 && <Users className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Process</h2>
          <div className="max-w-3xl mx-auto">
            {service.process.map((step, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  {index < service.process.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free consultation with our investment advisors to discuss how {service.title.toLowerCase()} can help you achieve your financial goals.
          </p>
          <Link href="/book-consultation">
            <Button size="lg" className="hover:bg-amber-400 hover:text-slate-900 transition-colors">
              Book Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
