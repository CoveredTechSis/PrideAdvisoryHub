import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

// todo: remove mock functionality - replace with real auth
const mockUser = {
  name: "Adaobi Okafor",
  email: "adaobi@example.com",
  portfolio: "Professional",
  onboardingProgress: 75,
};

// todo: remove mock functionality
const mockDocuments = [
  { id: 1, name: "KYC Form.pdf", status: "verified", uploadedAt: "Dec 1, 2024" },
  { id: 2, name: "ID Verification.pdf", status: "verified", uploadedAt: "Dec 1, 2024" },
  { id: 3, name: "Proof of Address.pdf", status: "pending", uploadedAt: "Dec 10, 2024" },
  { id: 4, name: "Investment Agreement.pdf", status: "action_required", uploadedAt: null },
];

export default function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", email);
    setIsLoggedIn(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle className="h-3 w-3" />Verified</Badge>;
      case "pending":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "action_required":
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Action Required</Badge>;
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Client Portal</CardTitle>
            <CardDescription>
              Secure access to your investment dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    data-testid="input-portal-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    data-testid="input-portal-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" data-testid="button-portal-login">
                Sign In
              </Button>
              <div className="text-center text-sm">
                <a href="#" className="text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                New client? Contact your relationship manager to set up your portal access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {mockUser.name}</h1>
            <p className="text-muted-foreground">{mockUser.portfolio} Portfolio</p>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)} data-testid="button-portal-logout">
            Sign Out
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Onboarding Progress</CardTitle>
              <CardDescription>Complete your profile to unlock all features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>
                  <span className="font-medium">{mockUser.onboardingProgress}%</span>
                </div>
                <Progress value={mockUser.onboardingProgress} className="h-2" />
              </div>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>KYC Complete</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span>Agreement Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                View Portfolio Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Download Statements
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents">
          <TabsList className="mb-6">
            <TabsTrigger value="documents" data-testid="tab-portal-documents">Documents</TabsTrigger>
            <TabsTrigger value="upload" data-testid="tab-portal-upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>View and manage your submitted documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover-elevate"
                      data-testid={`doc-row-${doc.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.uploadedAt || "Not uploaded"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(doc.status)}
                        {doc.status === "verified" && (
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {doc.status === "action_required" && (
                          <Button size="sm">
                            Upload Now
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>
                  Securely upload your KYC and verification documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  onClick={() => console.log("File picker opened")}
                  data-testid="dropzone-upload"
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  All documents are encrypted and stored securely in compliance with NDPR regulations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
