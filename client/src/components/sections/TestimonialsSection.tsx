import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

// todo: remove mock functionality - replace with real testimonials from CMS
const testimonials = [
  {
    quote: "Pride Advisory transformed our approach to investment. Their research-driven strategies helped us achieve a 32% return in just 18 months while maintaining a balanced risk profile.",
    name: "Chief Ade Ogunbiyi",
    title: "CEO, Ogunbiyi Holdings",
    metric: "+32% Returns",
    period: "18 months",
  },
  {
    quote: "The transparency and professionalism of the Pride team is unmatched. They provide clear explanations of their investment thesis and keep us informed every step of the way.",
    name: "Mrs. Ngozi Eze",
    title: "Family Office Manager",
    metric: "₦2.5B AUM",
    period: "3 years",
  },
  {
    quote: "As a pension fund, we needed a partner who understands regulatory requirements and risk management. Pride Advisory exceeded our expectations on both fronts.",
    name: "Mr. Ibrahim Musa",
    title: "Trustee, Workers Pension Fund",
    metric: "15% Annual",
    period: "5 years",
  },
  {
    quote: "Their fixed-income expertise helped us navigate the challenging rate environment. We've consistently outperformed the bond index with their guidance.",
    name: "Dr. Fatima Ahmed",
    title: "Treasurer, University Endowment",
    metric: "+3.5% Alpha",
    period: "2 years",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Client Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from the institutions and individuals who trust Pride Advisory
            with their investment portfolios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-testimonial-${index}`}>
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {testimonial.name.split(" ").slice(-1)[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-success font-mono">
                      {testimonial.metric}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.period}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
