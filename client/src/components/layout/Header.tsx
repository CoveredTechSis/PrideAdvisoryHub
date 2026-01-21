import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, User, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "wouter";
import prideAdvisoryLogo from "@assets/PrideAdvisory_Logo_1764714261145.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Performance", href: "/performance" },
  { label: "Team", href: "/team" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

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
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-1" data-testid="button-login">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              
               <DropdownMenuItem data-testid="link-admin-login">Admin Login</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> 

            <Button size="sm" className="hidden sm:flex" data-testid="button-book-consultation">
              Sign Up
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={location === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        data-testid={`link-mobile-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Button className="w-full" data-testid="button-mobile-consultation">
                      Book Consultation
                    </Button>
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
