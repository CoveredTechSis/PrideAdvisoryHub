import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, PiggyBank, Target, Shield, BarChart3, Coins, Clock, CheckCircle, Users, ExternalLink } from "lucide-react";

const educationTopics = [
  {
    icon: BookOpen,
    title: "What is Investing?",
    description: "Learn the fundamentals of investing and how it differs from saving. Understand the power of compound interest and long-term wealth building.",
    readTime: "5 min read",
    level: "Beginner",
    url: "https://www.investopedia.com/terms/i/investing.asp",
  },
  {
    icon: BarChart3,
    title: "Understanding Stocks",
    description: "Discover what stocks are, how the stock market works, and why companies issue shares. Learn about equity ownership and shareholder rights.",
    readTime: "8 min read",
    level: "Beginner",
    url: "https://www.investopedia.com/terms/s/stock.asp",
  },
  {
    icon: Coins,
    title: "Bonds & Fixed Income",
    description: "Explore the world of bonds, treasury bills, and other fixed-income securities. Understand yields, maturity dates, and interest payments.",
    readTime: "7 min read",
    level: "Beginner",
    url: "https://www.investopedia.com/terms/b/bond.asp",
  },
  {
    icon: PiggyBank,
    title: "Benefits of Investing",
    description: "Learn how investing can help you beat inflation, build wealth, achieve financial goals, and secure your retirement.",
    readTime: "6 min read",
    level: "Beginner",
    url: "https://www.investopedia.com/articles/basics/11/3-s-simple-investing.asp",
  },
  {
    icon: Target,
    title: "Setting Investment Goals",
    description: "How to define your financial objectives, determine your investment timeline, and create a roadmap for achieving your goals.",
    readTime: "6 min read",
    level: "Beginner",
    url: "https://www.investopedia.com/articles/personal-finance/100516/setting-financial-goals/",
  },
  {
    icon: Shield,
    title: "Understanding Risk",
    description: "Learn about different types of investment risks, how to assess your risk tolerance, and strategies for managing portfolio risk.",
    readTime: "8 min read",
    level: "Intermediate",
    url: "https://www.investopedia.com/terms/r/risk.asp",
  },
];

const gettingStartedSteps = [
  {
    step: 1,
    title: "Assess Your Financial Situation",
    description: "Before investing, ensure you have an emergency fund covering 3-6 months of expenses. Pay off high-interest debt and understand your monthly cash flow.",
  },
  {
    step: 2,
    title: "Define Your Goals",
    description: "Determine what you're investing for - retirement, education, home purchase, or wealth building. Your goals will shape your investment strategy.",
  },
  {
    step: 3,
    title: "Understand Your Risk Tolerance",
    description: "Consider how much volatility you can handle emotionally and financially. Younger investors typically can take more risk than those near retirement.",
  },
  {
    step: 4,
    title: "Learn the Basics",
    description: "Educate yourself about different investment types - stocks, bonds, mutual funds, and ETFs. Understand the Nigerian Stock Exchange and how it operates.",
  },
  {
    step: 5,
    title: "Start Small and Diversify",
    description: "Begin with an amount you're comfortable with. Spread your investments across different asset classes and sectors to reduce risk.",
  },
  {
    step: 6,
    title: "Seek Professional Guidance",
    description: "Consider working with a registered investment advisor who can provide personalized advice based on your unique situation.",
  },
];

const investmentBenefits = [
  {
    title: "Beat Inflation",
    description: "While savings accounts often lose purchasing power to inflation, well-chosen investments can grow faster than the inflation rate.",
    icon: TrendingUp,
  },
  {
    title: "Build Long-term Wealth",
    description: "The power of compound interest means your investments can grow exponentially over time, building substantial wealth.",
    icon: Coins,
  },
  {
    title: "Achieve Financial Goals",
    description: "Whether it's retirement, education, or buying a home, investing helps you reach major financial milestones.",
    icon: Target,
  },
  {
    title: "Generate Passive Income",
    description: "Dividend-paying stocks and bonds can provide regular income streams without active work.",
    icon: PiggyBank,
  },
];

const nigerianMarketFacts = [
  "The Nigerian Stock Exchange (NGX) was founded in 1960",
  "Over 150 companies are listed on the NGX",
  "The NGX All-Share Index tracks overall market performance",
  "Foreign investors can participate in the Nigerian market",
  "Minimum investment amounts vary by broker and product",
  "Stocks are traded Monday to Friday, 10:00 AM to 2:30 PM",
];

export default function Education() {
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
              <BookOpen className="h-8 w-8" />
            </div>
            <Badge variant="outline">Investment Education</Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Investment Education Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Your comprehensive guide to understanding investments, building wealth, and starting your investment journey in Nigeria.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Educational Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationTopics.map((topic, index) => {
              const TopicIcon = topic.icon;
              return (
                <a 
                  key={index} 
                  href={topic.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`link-topic-${index}`}
                >
                  <Card className="hover-elevate h-full cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                          <TopicIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">{topic.level}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {topic.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {topic.title}
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {topic.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Why Invest?</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentBenefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 w-fit mb-4">
                      <BenefitIcon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">How to Get Started</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {gettingStartedSteps.map((item, index) => (
              <div key={index} className="flex gap-4 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  {index < gettingStartedSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Nigerian Market Facts</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {nigerianMarketFacts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{fact}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experienced advisors is here to guide you every step of the way. Book a free consultation to discuss your goals and create a personalized investment plan.
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
