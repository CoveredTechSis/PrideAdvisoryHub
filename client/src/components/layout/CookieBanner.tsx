import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, X, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
    console.log("All cookies accepted");
  };

  const acceptNecessary = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly));
    setIsVisible(false);
    console.log("Only necessary cookies accepted");
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowSettings(false);
    setIsVisible(false);
    console.log("Cookie preferences saved:", preferences);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
        <Card className="shadow-lg border-border">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                <Cookie className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium mb-1">Cookie Preferences</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We use cookies to enhance your browsing experience and analyze site traffic.
                  In accordance with NDPR, your privacy choices are respected.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={acceptAll} data-testid="button-cookie-accept-all">
                    Accept All
                  </Button>
                  <Button size="sm" variant="outline" onClick={acceptNecessary} data-testid="button-cookie-necessary">
                    Necessary Only
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowSettings(true)}
                    data-testid="button-cookie-settings"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Customize
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 -mt-1 -mr-1"
                onClick={acceptNecessary}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie Settings</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. Some cookies are necessary for the website to function properly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="necessary" className="font-medium">Necessary Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Required for the website to function. Cannot be disabled.
                </p>
              </div>
              <Switch
                id="necessary"
                checked={preferences.necessary}
                disabled
                data-testid="switch-cookie-necessary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics" className="font-medium">Analytics Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                data-testid="switch-cookie-analytics"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing" className="font-medium">Marketing Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Used to track visitors and display relevant ads.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                data-testid="switch-cookie-marketing"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={savePreferences} data-testid="button-save-cookie-preferences">
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
