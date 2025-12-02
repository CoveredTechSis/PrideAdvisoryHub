import HeroSection from "@/components/sections/HeroSection";
import MarketTicker from "@/components/sections/MarketTicker";
import ServicesSection from "@/components/sections/ServicesSection";
import PerformanceDashboard from "@/components/sections/PerformanceDashboard";
import Calculators from "@/components/sections/Calculators";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FeesSection from "@/components/sections/FeesSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarketTicker />
      <ServicesSection />
      <PerformanceDashboard />
      <Calculators />
      <TeamSection />
      <TestimonialsSection />
      <FeesSection />
      <BlogSection />
      <ContactSection />
      <NewsletterSection />
    </main>
  );
}
