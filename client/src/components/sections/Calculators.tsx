import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Scale } from "lucide-react";

export default function Calculators() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(15);
  const [years, setYears] = useState(5);
  
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(25);
  const [maxLoss, setMaxLoss] = useState(10);

  const compoundReturn = principal * Math.pow(1 + rate / 100, years);
  const totalGain = compoundReturn - principal;

  const riskRewardRatio = expectedReturn / maxLoss;
  const potentialGain = investmentAmount * (expectedReturn / 100);
  const potentialLoss = investmentAmount * (maxLoss / 100);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Investment Calculators
          </h2>
          <p className="text-lg text-muted-foreground">
            Plan your investment journey with our interactive tools. Estimate returns
            and understand risk-reward dynamics.
          </p>
        </div>

        <Tabs defaultValue="returns" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="returns" className="gap-2" data-testid="tab-calculator-returns">
              <Calculator className="h-4 w-4" />
              Returns Calculator
            </TabsTrigger>
            <TabsTrigger value="risk" className="gap-2" data-testid="tab-calculator-risk">
              <Scale className="h-4 w-4" />
              Risk vs Reward
            </TabsTrigger>
          </TabsList>

          <TabsContent value="returns">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Compound Returns
                  </CardTitle>
                  <CardDescription>
                    Calculate how your investment grows over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="principal">Initial Investment</Label>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="font-mono"
                      data-testid="input-principal"
                    />
                    <Slider
                      value={[principal]}
                      onValueChange={([v]) => setPrincipal(v)}
                      min={100000}
                      max={100000000}
                      step={100000}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate">Annual Return Rate: {rate}%</Label>
                    <Slider
                      id="rate"
                      value={[rate]}
                      onValueChange={([v]) => setRate(v)}
                      min={1}
                      max={50}
                      step={0.5}
                      data-testid="slider-rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years">Investment Period: {years} years</Label>
                    <Slider
                      id="years"
                      value={[years]}
                      onValueChange={([v]) => setYears(v)}
                      min={1}
                      max={30}
                      step={1}
                      data-testid="slider-years"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>Projected Value</CardTitle>
                  <CardDescription className="text-primary-foreground/70">
                    After {years} years at {rate}% annual return
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold font-mono mb-4" data-testid="text-projected-value">
                    {formatCurrency(compoundReturn)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-foreground/70">Initial Investment</span>
                      <span className="font-mono">{formatCurrency(principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-foreground/70">Total Gain</span>
                      <span className="font-mono text-success-foreground">
                        +{formatCurrency(totalGain)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-foreground/70">Return Multiple</span>
                      <span className="font-mono">
                        {(compoundReturn / principal).toFixed(2)}x
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Risk-Reward Analysis
                  </CardTitle>
                  <CardDescription>
                    Understand the balance between potential gains and losses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="investmentAmount">Investment Amount</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="font-mono"
                      data-testid="input-investment-amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Return: {expectedReturn}%</Label>
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={([v]) => setExpectedReturn(v)}
                      min={1}
                      max={100}
                      step={1}
                      data-testid="slider-expected-return"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Loss Tolerance: {maxLoss}%</Label>
                    <Slider
                      value={[maxLoss]}
                      onValueChange={([v]) => setMaxLoss(v)}
                      min={1}
                      max={50}
                      step={1}
                      data-testid="slider-max-loss"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardContent className="py-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Risk-Reward Ratio</div>
                      <div
                        className={`text-4xl font-bold font-mono ${
                          riskRewardRatio >= 2
                            ? "text-success"
                            : riskRewardRatio >= 1
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                        data-testid="text-risk-reward-ratio"
                      >
                        {riskRewardRatio.toFixed(2)}:1
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {riskRewardRatio >= 2
                          ? "Favorable risk-reward"
                          : riskRewardRatio >= 1
                          ? "Moderate risk-reward"
                          : "Unfavorable risk-reward"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-success/10 border-success/20">
                    <CardContent className="py-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Potential Gain</div>
                      <div className="text-xl font-bold font-mono text-success">
                        +{formatCurrency(potentialGain)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-destructive/10 border-destructive/20">
                    <CardContent className="py-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Maximum Loss</div>
                      <div className="text-xl font-bold font-mono text-destructive">
                        -{formatCurrency(potentialLoss)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
