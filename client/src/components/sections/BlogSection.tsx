import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Download, ArrowRight, Search, FileText } from "lucide-react";

// todo: remove mock functionality - replace with real blog data from CMS
const blogPosts = [
  {
    id: 1,
    title: "2024 Nigerian Market Outlook: Navigating Volatility",
    excerpt: "Our comprehensive analysis of expected market trends, sector opportunities, and risk factors for Nigerian investors in the coming year.",
    category: "Market Analysis",
    readTime: 8,
    date: "Dec 15, 2024",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding FGN Bond Auctions: A Guide for New Investors",
    excerpt: "Step-by-step guide to participating in Federal Government of Nigeria bond auctions and maximizing your fixed-income returns.",
    category: "Education",
    readTime: 5,
    date: "Dec 10, 2024",
    featured: false,
  },
  {
    id: 3,
    title: "Banking Sector Analysis: Q4 2024 Results Preview",
    excerpt: "What to expect from tier-1 Nigerian banks as they report quarterly earnings, and implications for stock prices.",
    category: "Sector Analysis",
    readTime: 6,
    date: "Dec 5, 2024",
    featured: false,
  },
];

// todo: remove mock functionality
const whitepapers = [
  {
    id: 1,
    title: "Nigerian Pension Fund Investment Strategies",
    description: "Best practices for pension fund asset allocation in Nigerian markets",
    pages: 24,
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "ESG Investing in West Africa",
    description: "Environmental, Social, and Governance considerations for African portfolios",
    pages: 18,
    size: "1.8 MB",
  },
];

const categories = ["All", "Market Analysis", "Education", "Sector Analysis", "Research"];

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

        <div className="grid lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className={`hover-elevate ${post.featured ? "lg:col-span-2 lg:row-span-1" : ""}`}
              data-testid={`card-blog-${post.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.featured && <Badge>Featured</Badge>}
                </div>
                <h3 className={`font-semibold ${post.featured ? "text-xl" : "text-lg"}`}>
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Downloadable Whitepapers
          </h3>
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
                      <span>{paper.pages} pages</span>
                      <span>{paper.size}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
