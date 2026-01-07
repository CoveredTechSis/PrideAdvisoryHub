import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileCheck, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Equity Advisory",
    description: "Data-driven stock selection and timing strategies for the Nigerian Stock Exchange. We analyze fundamentals, technicals, and market sentiment to identify high-potential opportunities.",
    features: ["NSE Stock Analysis", "Sector Rotation", "Portfolio Management"],
  },
  {
    icon: FileCheck,
    title: "Fixed-Income Advisory",
    description: "Optimize your bond portfolio with our expert guidance on Federal Government bonds, corporate bonds, and money market instruments.",
    features: ["FGN Bonds", "Corporate Bonds", "T-Bills Strategy", "Yield Optimization"],
  },
  {
    icon: Briefcase,
    title: "Portfolio Construction",
    description: "Custom-built portfolios aligned with your risk tolerance, investment horizon, and financial goals. Diversification strategies that work in Nigerian markets.",
    features: ["Asset Allocation", "Risk Profiling", "Goal-Based Planning", "Tax Efficiency"],
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Protect your wealth with comprehensive risk assessment and mitigation strategies. Currency hedging, inflation protection, and downside risk management.",
    features: ["Risk Assessment", "Currency Hedging", "Inflation Protection", "Stress Testing"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Investment Advisory Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive investment solutions designed for Nigerian investors seeking sustainable
            wealth creation through disciplined, research-backed strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate group" data-testid={`card-service-${index}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-secondary rounded-md text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
