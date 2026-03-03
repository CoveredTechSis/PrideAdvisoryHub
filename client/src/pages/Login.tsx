import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client using environment variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to portal if already authenticated
    if (isAuthenticated && !isLoading) {
      setLocation("/portal");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Handler for secure Supabase Sign In
  const handleLogin = async () => {
    // This triggers an OAuth provider (e.g., Google)
    // or you can switch to email/password if you prefer.
    await supabase.auth.signInWithOAuth({
      provider: 'google', 
      options: { 
        redirectTo: window.location.origin + '/portal' 
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your investment dashboard and portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Swapped Replit link for onClick handler while keeping the exact styling */}
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleLogin}
              data-testid="button-login-submit"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In Securely
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  New to Pride Advisory?
                </span>
              </div>
            </div>

            <Link href="/signup">
              <Button variant="outline" className="w-full" data-testid="button-goto-signup">
                Create an Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Client Portal Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>View your portfolio performance</li>
                <li>Access investment reports</li>
                <li>Upload KYC documents securely</li>
                <li>Schedule consultations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="underline hover:text-primary">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}