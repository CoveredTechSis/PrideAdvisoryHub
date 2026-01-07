import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Essential",
    description: "For individual investors starting their journey",
    fee: "2%",
    feeNote: "of AUM annually",
    minimumAUM: "₦10M",
    features: [
      "Quarterly portfolio review",
      "Quarterly strategy calls",
      "Market research reports",
      "Basic performance reporting",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    description: "For serious investors seeking comprehensive service",
    fee: "1.5%",
    feeNote: "of AUM annually",
    minimumAUM: "₦50M",
    features: [
      "Monthly portfolio monitoring",
      "Weekly strategy calls",
      "Premium research access",
      "Real-time performance dashboard",
      "Priority phone support",
      "Tax optimization guidance",
      "Estate planning coordination",
    ],
    popular: true,
  },
  {
    name: "Institutional",
    description: "For family offices and institutional investors",
    fee: "Custom",
    feeNote: "negotiated pricing",
    minimumAUM: "₦500M+",
    features: [
      "Dedicated portfolio manager",
      "Daily monitoring & reporting",
      "Custom research on demand",
      "Board presentation support",
      "24/7 relationship manager",
      "Regulatory compliance support",
      "Co-investment opportunities",
      "White-glove service",
    ],
    popular: false,
  },
];

const engagementSteps = [
  { step: 1, title: "Discovery Call", description: "Free consultation to understand your goals" },
  { step: 2, title: "Risk Assessment", description: "Comprehensive profiling and KYC" },
  { step: 3, title: "Strategy Proposal", description: "Customized investment plan presentation" },
  { step: 4, title: "Onboarding", description: "Account setup and documentation" },
  { step: 5, title: "Advisory Services", description: "Ongoing advisory services begins" },
];

export default function FeesSection() {
  return (
    <section id="fees" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Transparent Fee Structure
          </h2>
          <p className="text-lg text-muted-foreground">
            Clear, competitive pricing with no hidden fees. Our interests are aligned with yours
            through performance-focused fee arrangements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative hover-elevate ${tier.popular ? "border-primary" : ""}`}
              data-testid={`card-tier-${tier.name.toLowerCase()}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-1">{tier.fee}</div>
                  <div className="text-sm text-muted-foreground">{tier.feeNote}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Minimum: {tier.minimumAUM}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                  data-testid={`button-tier-${tier.name.toLowerCase()}`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Our Engagement Process
          </h3>
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden md:block" />
            <div className="grid md:grid-cols-5 gap-6">
              {engagementSteps.map((item, index) => (
                <div key={index} className="relative text-center" data-testid={`step-${item.step}`}>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
