import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import maleHeadshot from "@assets/generated_images/team_member_headshot_male.png";
import femaleHeadshot from "@assets/generated_images/team_member_headshot_female.png";
import seniorHeadshot from "@assets/generated_images/senior_team_member_headshot.png";
import ceoHeadshot from "@assets/Gemini_Generated_Image_i9t3w7i9t3w7i9t3_1767797764431.png";
import cooHeadshot from "@assets/image_1767826565647.png";
import analystHeadshot from "@assets/image_1767826890248.png";

// todo: remove mock functionality - replace with real team data from CMS
const teamMembers = [
  {
    name: "Balogun O.A",
    title: "Chief Executive Officer",
    image: ceoHeadshot,
    credentials: ["CFA", "MBA"],
    bio: "15+ years in Nigerian capital markets. Former Head of Equities at First Bank Capital.",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
  },
  {
    name: "Afolabi Isreal",
    title: "Chief Operating Officer",
    image: cooHeadshot,
    credentials: ["CFA", "ACCA"],
    bio: "Expert in fixed-income and portfolio construction with deep knowledge of Nigerian bond markets.",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
  },
  {
    name: "Kazeem Fawas",
    title: "Head of Analyst",
    image: analystHeadshot,
    credentials: ["CFA", "FRM"],
    bio: "Award-winning equity analyst.",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
  },
  {
    name: "Fatima Balogun",
    title: "Head of Client Relation",
    image: femaleHeadshot,
    credentials: ["CIPM"],
    bio: "Dedicated to delivering exceptional client experiences and portfolio transparency.",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground">
            Experienced professionals with deep expertise in Nigerian capital markets,
            committed to helping you achieve your investment goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover-elevate text-center" data-testid={`card-team-${index}`}>
              <CardContent className="pt-8 pb-6">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-background shadow-lg">
                  <AvatarImage src={member.image} alt={member.name} className="object-cover object-top" />
                  <AvatarFallback className="text-2xl">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-lg font-semibold mb-3">{member.name}</h3>
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {member.credentials.map((cred, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {cred}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {member.bio}
                </p>
                
                <div className="flex justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    data-testid={`button-linkedin-${index}`}
                  >
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    data-testid={`button-facebook-${index}`}
                  >
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                      <SiFacebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    data-testid={`button-instagram-${index}`}
                  >
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                      <SiInstagram className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    data-testid={`button-twitter-${index}`}
                  >
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <SiX className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
