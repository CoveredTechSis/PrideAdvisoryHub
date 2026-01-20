import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useUpload } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Shield,
  Loader2,
  LogOut,
  User,
} from "lucide-react";
import type { Document } from "@shared/schema";

export default function ClientPortal() {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);

  const { data: documents = [], isLoading: docsLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
    enabled: isAuthenticated,
  });

  const { uploadFile, isUploading } = useUpload({
    onSuccess: async (response) => {
      if (uploadingFile && response) {
        await createDocumentMutation.mutateAsync({
          name: uploadingFile.name,
          type: getDocumentType(uploadingFile.name),
          objectPath: response.objectPath,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: async (data: { name: string; type: string; objectPath: string }) => {
      const response = await apiRequest("POST", "/api/documents", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Document uploaded",
        description: "Your document has been submitted for review.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      setUploadingFile(null);
    },
    onError: () => {
      toast({
        title: "Failed to save document",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const getDocumentType = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes("kyc")) return "kyc";
    if (lower.includes("id") || lower.includes("passport")) return "identification";
    if (lower.includes("address") || lower.includes("utility")) return "proof_of_address";
    if (lower.includes("agreement") || lower.includes("contract")) return "agreement";
    return "other";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingFile(file);
      await uploadFile(file);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle className="h-3 w-3" />Verified</Badge>;
      case "pending":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
    }
  };

  const getOnboardingProgress = () => {
    if (documents.length === 0) return 25;
    const verified = documents.filter(d => d.status === "verified").length;
    const total = Math.max(documents.length, 3);
    return Math.min(25 + (verified / total) * 75, 100);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
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
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              asChild
              data-testid="button-portal-login"
            >
              <a href="/api/login">
                <User className="mr-2 h-4 w-4" />
                Sign In to Portal
              </a>
            </Button>

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

  const displayName = user?.firstName 
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user?.email || 'Client';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {user?.profileImageUrl && (
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome back, {displayName}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => logout()} 
            data-testid="button-portal-logout"
          >
            <LogOut className="mr-2 h-4 w-4" />
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
                  <span className="font-medium">{Math.round(getOnboardingProgress())}%</span>
                </div>
                <Progress value={getOnboardingProgress()} className="h-2" />
              </div>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Account Created</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {documents.some(d => d.type === "identification" && d.status === "verified") ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  <span>Identity Verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {documents.some(d => d.type === "kyc" && d.status === "verified") ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  <span>KYC Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" disabled>
                <FileText className="h-4 w-4" />
                View Portfolio Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" disabled>
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
                {docsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No documents uploaded yet</p>
                    <p className="text-sm">Upload your KYC documents to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
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
                              {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "Just now"}
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                <label
                  className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer block"
                  data-testid="dropzone-upload"
                >
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    disabled={isUploading || createDocumentMutation.isPending}
                  />
                  {isUploading || createDocumentMutation.isPending ? (
                    <>
                      <Loader2 className="h-12 w-12 mx-auto text-primary mb-4 animate-spin" />
                      <p className="font-medium mb-1">Uploading...</p>
                      <p className="text-sm text-muted-foreground">
                        Please wait while we process your document
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, PNG, JPG up to 10MB
                      </p>
                    </>
                  )}
                </label>
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
