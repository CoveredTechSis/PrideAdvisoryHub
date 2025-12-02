import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/lagos_financial_skyline_hero.png";

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Shield className="h-3 w-3 mr-1" />
              SEC Registered
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Award className="h-3 w-3 mr-1" />
              CAC Verified
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              NDPR Compliant
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Build Lasting Wealth with
            <span className="block text-blue-400">Nigeria's Trusted Advisors</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Expert equity and fixed-income investment advisory. Institutional-grade research,
            verified track records, and personalized portfolio strategies tailored for Nigerian markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/90"
              data-testid="button-hero-consultation"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
              data-testid="button-hero-performance"
            >
              View Our Performance
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono" data-testid="text-stat-aum">
                ₦50B+
              </div>
              <div className="text-sm text-white/60 mt-1">Assets Advised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono" data-testid="text-stat-clients">
                500+
              </div>
              <div className="text-sm text-white/60 mt-1">Active Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono" data-testid="text-stat-years">
                15+
              </div>
              <div className="text-sm text-white/60 mt-1">Years Experience</div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToServices}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to services"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
