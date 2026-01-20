import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Download, ArrowRight, Search, FileText, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import type { BlogPost, Whitepaper } from "@shared/schema";

const fallbackPosts = [
  {
    id: "1",
    title: "2025 Nigerian Market Outlook: Navigating Volatility",
    slug: "2025-market-outlook",
    excerpt: "Our comprehensive analysis of expected market trends, sector opportunities, and risk factors for Nigerian investors in the coming year.",
    content: "",
    author: "Pride Advisory Research",
    category: "Market Analysis",
    imageUrl: null,
    isPublished: true,
    publishedAt: new Date("2025-01-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Understanding FGN Bond Auctions: A Guide for New Investors",
    slug: "fgn-bond-guide",
    excerpt: "Step-by-step guide to participating in Federal Government of Nigeria bond auctions and maximizing your fixed-income returns.",
    content: "",
    author: "Pride Advisory Education",
    category: "Education",
    imageUrl: null,
    isPublished: true,
    publishedAt: new Date("2025-01-10"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Banking Sector Analysis: Q4 2024 Results Preview",
    slug: "banking-q4-2024",
    excerpt: "What to expect from tier-1 Nigerian banks as they report quarterly earnings, and implications for stock prices.",
    content: "",
    author: "Pride Advisory Analysts",
    category: "Sector Analysis",
    imageUrl: null,
    isPublished: true,
    publishedAt: new Date("2025-01-05"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fallbackWhitepapers = [
  {
    id: "1",
    title: "Nigerian Pension Fund Investment Strategies",
    description: "Best practices for pension fund asset allocation in Nigerian markets",
    author: "Pride Advisory Research",
    fileUrl: "#",
    downloadCount: 156,
    isPublished: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "ESG Investing in West Africa",
    description: "Environmental, Social, and Governance considerations for African portfolios",
    author: "Pride Advisory ESG Team",
    fileUrl: "#",
    downloadCount: 89,
    isPublished: true,
    createdAt: new Date(),
  },
];

const categories = ["All", "Market Analysis", "Education", "Sector Analysis", "Research"];

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: blogPosts = fallbackPosts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const { data: whitepapers = fallbackWhitepapers, isLoading: papersLoading } = useQuery<Whitepaper[]>({
    queryKey: ["/api/whitepapers"],
  });

  const downloadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("POST", `/api/whitepapers/${id}/download`);
    },
  });

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWhitepaperDownload = (paper: Whitepaper) => {
    downloadMutation.mutate(paper.id);
    if (paper.fileUrl && paper.fileUrl !== "#") {
      window.open(paper.fileUrl, "_blank");
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getReadTime = (content: string) => {
    const words = content?.split(" ").length || 0;
    return Math.max(3, Math.ceil(words / 200));
  };

  return (
    <section id="research" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Research & Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay informed with our latest market analysis, educational content,
            and in-depth research reports.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase().replace(" ", "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {postsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`hover-elevate ${index === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
                data-testid={`card-blog-${post.id}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {index === 0 && <Badge>Featured</Badge>}
                  </div>
                  <h3 className={`font-semibold ${index === 0 ? "text-xl" : "text-lg"}`}>
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getReadTime(post.content)} min read
                      </span>
                    </div>
                    {post.category === "Market Analysis" ? (
                      <Link href="/market-analysis">
                        <Button variant="ghost" size="sm" data-testid={`button-read-more-${post.id}`}>
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="ghost" size="sm" data-testid={`button-read-more-${post.id}`}>
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Downloadable Whitepapers
          </h3>
          {papersLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {whitepapers.map((paper) => (
                <Card key={paper.id} className="hover-elevate" data-testid={`card-whitepaper-${paper.id}`}>
                  <CardContent className="flex items-start gap-4 py-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1">{paper.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {paper.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>By {paper.author}</span>
                        <span>{paper.downloadCount || 0} downloads</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="shrink-0"
                      onClick={() => handleWhitepaperDownload(paper)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
