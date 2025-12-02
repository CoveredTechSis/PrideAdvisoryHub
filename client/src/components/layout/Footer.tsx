import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Lock } from "lucide-react";
import { SiLinkedin, SiX, SiFacebook, SiInstagram } from "react-icons/si";

const footerLinks = {
  services: [
    { label: "Equity Advisory", href: "/services#equity" },
    { label: "Fixed-Income Advisory", href: "/services#fixed-income" },
    { label: "Portfolio Construction", href: "/services#portfolio" },
    { label: "Risk Management", href: "/services#risk" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Media Kit", href: "/media" },
  ],
  resources: [
    { label: "Research & Insights", href: "/research" },
    { label: "Market Calculator", href: "/calculators" },
    { label: "Client Portal", href: "/portal" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy (NDPR)", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Risk Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiX, href: "https://twitter.com", label: "X" },
  { icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-xl font-bold">Pride Advisory</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Nigeria's trusted investment advisory firm. Building wealth through
              disciplined, research-driven strategies.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            SEC Registered: RC/2024/001234
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Award className="h-3.5 w-3.5 text-primary" />
            CAC: BN 1234567
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" />
            SSL Encrypted
          </Badge>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Pride Advisory Limited. All rights reserved.
          </p>
          <p className="text-xs max-w-3xl mx-auto">
            Investment advisory services are provided by Pride Advisory Limited, a company registered
            with the Securities and Exchange Commission of Nigeria. Past performance is not indicative
            of future results. Investing involves risk including possible loss of principal. Please
            read our risk disclaimer before making any investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
