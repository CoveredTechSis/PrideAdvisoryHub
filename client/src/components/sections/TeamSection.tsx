import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import maleHeadshot from "@assets/generated_images/team_member_headshot_male.png";
import femaleHeadshot from "@assets/generated_images/team_member_headshot_female.png";
import seniorHeadshot from "@assets/generated_images/senior_team_member_headshot.png";
import ceoHeadshot from "@assets/Gemini_Generated_Image_i9t3w7i9t3w7i9t3_1767797764431.png";

// todo: remove mock functionality - replace with real team data from CMS
const teamMembers = [
  {
    name: "Balogun O.A",
    title: "Chief Executive Officer",
    image: ceoHeadshot,
    credentials: ["CFA", "MBA"],
    bio: "15+ years in Nigerian capital markets. Former Head of Equities at First Bank Capital.",
    linkedin: "#",
  },
  {
    name: "Afolabi Isreal",
    title: "Chief Operating Officer",
    image: femaleHeadshot,
    credentials: ["CFA", "ACCA"],
    bio: "Expert in fixed-income and portfolio construction with deep knowledge of Nigerian bond markets.",
    linkedin: "#",
  },
  {
    name: "Emeka Nwosu",
    title: "Head of Research",
    image: maleHeadshot,
    credentials: ["CFA", "FRM"],
    bio: "Award-winning equity analyst. Former research lead at Chapel Hill Denham.",
    linkedin: "#",
  },
  {
    name: "Fatima Balogun",
    title: "Head of Client Relation",
    image: femaleHeadshot,
    credentials: ["CIPM"],
    bio: "Dedicated to delivering exceptional client experiences and portfolio transparency.",
    linkedin: "#",
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
                <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-background shadow-lg">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-2xl">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.title}</p>
                
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
