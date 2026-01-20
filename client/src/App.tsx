import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ClientPortal from "@/pages/ClientPortal";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import BookConsultation from "@/pages/BookConsultation";
import ServiceDetail from "@/pages/ServiceDetail";
import MarketAnalysis from "@/pages/MarketAnalysis";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portal" component={ClientPortal} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/book-consultation" component={BookConsultation} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/market-analysis" component={MarketAnalysis} />
      <Route path="/services" component={Home} />
      <Route path="/performance" component={Home} />
      <Route path="/team" component={Home} />
      <Route path="/research" component={Home} />
      <Route path="/contact" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header isDark={isDark} onToggleTheme={toggleTheme} />
          <div className="flex-1">
            <Router />
          </div>
          <Footer />
        </div>
        <CookieBanner />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
