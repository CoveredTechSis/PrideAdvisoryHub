import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "wouter";
import prideAdvisoryLogo from "@assets/PrideAdvisory_Logo_1764714261145.png";

const navItems = [
  { label: "Home", href: "/", sectionId: null },
  { label: "Services", href: "/", sectionId: "services" },
  { label: "Performance", href: "/", sectionId: "performance" },
  { label: "Team", href: "/", sectionId: "team" },
  { label: "Research", href: "/", sectionId: "research" },
  { label: "Contact", href: "/", sectionId: "contact" },
];

const scrollToSection = (sectionId: string | null) => {
  if (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

interface HeaderProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function Header({ isDark = false, onToggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img 
              src={prideAdvisoryLogo} 
              alt="Pride Advisory" 
              className="h-20

  
              dark:invert"
              data-testid="img-logo"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={(e) => {
                  if (location === "/" && item.sectionId) {
                    e.preventDefault();
                    scrollToSection(item.sectionId);
                  }
                }}
              >
                <Button
                  variant={location === item.href && !item.sectionId ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              data-testid="button-theme-toggle"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-1" data-testid="button-login">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>

            <Link href="/signup">
              <Button size="sm" className="hidden sm:flex" data-testid="button-signup">
                Sign Up
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      onClick={(e) => {
                        setIsOpen(false);
                        if (location === "/" && item.sectionId) {
                          e.preventDefault();
                          setTimeout(() => scrollToSection(item.sectionId), 300);
                        }
                      }}
                    >
                      <Button
                        variant={location === item.href && !item.sectionId ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        data-testid={`link-mobile-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full" data-testid="button-mobile-login">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full" data-testid="button-mobile-signup">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
