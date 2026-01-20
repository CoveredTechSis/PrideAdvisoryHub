import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Mail, Phone, MessageCircle, Send, CheckCircle, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BookConsultation() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    investmentType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/appointments", {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        serviceType: data.investmentType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        message: data.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Consultation Booked!",
        description: "We've received your request and will contact you shortly to confirm your appointment.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        investmentType: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const whatsappNumber = "+2349049441258";
  const whatsappMessage = encodeURIComponent("Hello, I'd like to book a consultation with Pride Advisory.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-booking-title">
              Book Your Consultation
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take the first step towards building your wealth. Schedule a free consultation 
              with our investment advisors or reach out through any of our contact channels.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    Schedule Your Appointment
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours to confirm your booking.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                          required
                          data-testid="input-booking-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          data-testid="input-booking-email"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 xxx xxx xxxx"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                          data-testid="input-booking-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investmentType">Investment Interest *</Label>
                        <Select
                          value={formData.investmentType}
                          onValueChange={(value) => handleChange("investmentType", value)}
                        >
                          <SelectTrigger data-testid="select-booking-investment">
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equity">Equity Advisory</SelectItem>
                            <SelectItem value="fixed-income">Fixed Income Advisory</SelectItem>
                            <SelectItem value="portfolio">Portfolio Management</SelectItem>
                            <SelectItem value="pension">Pension Advisory</SelectItem>
                            <SelectItem value="general">General Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleChange("preferredDate", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          data-testid="input-booking-date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) => handleChange("preferredTime", value)}
                        >
                          <SelectTrigger data-testid="select-booking-time">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">9:00 AM - 10:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM - 11:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM - 12:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM - 3:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM - 4:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM - 5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your investment goals or any specific questions..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={4}
                        data-testid="textarea-booking-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={bookingMutation.isPending}
                      data-testid="button-submit-booking"
                    >
                      {bookingMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Booking Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Contact</CardTitle>
                  <CardDescription>Prefer to reach out directly? Use any of these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md bg-green-500/10 hover:bg-green-500/20 transition-colors"
                    data-testid="link-whatsapp"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <SiWhatsapp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-muted-foreground">Chat with us instantly</div>
                    </div>
                  </a>

                  <a
                    href="tel:+2349049441258"
                    className="flex items-center gap-3 p-3 rounded-md bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                    data-testid="link-phone"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm text-muted-foreground">+234 904 944 1258</div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@prideadvisory.com"
                    className="flex items-center gap-3 p-3 rounded-md bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                    data-testid="link-email"
                  >
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">info@prideadvisory.com</div>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Follow Us</CardTitle>
                  <CardDescription>Stay updated with market insights and news.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <a
                      href="https://linkedin.com/company/prideadvisory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                      data-testid="link-linkedin"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com/prideadvisory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                      data-testid="link-twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com/prideadvisory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                      data-testid="link-instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://facebook.com/prideadvisory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                      data-testid="link-facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-500/10 border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Free Initial Consultation</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Your first consultation is completely free. No obligations, just expert advice to help you get started.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Office Hours</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
