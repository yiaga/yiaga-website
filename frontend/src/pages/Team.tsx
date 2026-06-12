import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import heroTeam from "@/assets/youth.jpg";

// Management & Board Images
import samsonImg from "@/assets/team/Samson.jpg";
import cynthiaImg from "@/assets/team/Cynthia.jpg";

// Staff Images
import aanuImg from "@/assets/team/Aanu.jpg";
import adamuImg from "@/assets/team/Adamu.jpg";
import ahmedImg from "@/assets/team/Ahmed.jpg";
import blessingImg from "@/assets/team/Blessing.jpg";
import deborahImg from "@/assets/team/Deborah.jpg";
import ogwucheImg from "@/assets/team/Ogwuche.jpg";
import estherImg from "@/assets/team/Esther.jpg";
import gabrielImg from "@/assets/team/Gabriel.jpg";
import ganiuImg from "@/assets/team/Ganiu.jpg";
import helenImg from "@/assets/team/Helen.jpg";
import ibrahimImg from "@/assets/team/Ibrahim.jpg";
import ifeanyiImg from "@/assets/team/Ifeanyi.jpg";
import ikechukwuImg from "@/assets/team/Ikechukwu.jpg";
import josephineImg from "@/assets/team/Josephine.jpg";
import joshuaImg from "@/assets/team/Joshua.jpg";
import musaImg from "@/assets/team/Musa.jpg";
import ndukweImg from "@/assets/team/Ndukwe.jpg";
import ogbonnaImg from "@/assets/team/Ogbonna.jpg";
import sanusiImg from "@/assets/team/Sanusi.jpg";
import stephenImg from "@/assets/team/Stephen.jpg";
import toluImg from "@/assets/team/Tolu.jpg";
import toniaImg from "@/assets/team/Tonia.jpg";
import yetundeImg from "@/assets/team/Yetunde.jpg";
import rotnenImg from "@/assets/team/rotnen.jpg";

const management = [
  { name: "Samson Itodo", role: "Executive Director", image: samsonImg },
  { name: "Cynthia Mbamalu", role: "Director of Programs", image: cynthiaImg },
];

const teamList = [
  { name: "Olusegun Ogundare", role: "Research (Africa Division)", image: null },
  { name: "Safiya Bichi", role: "Senior Manager, KML", image: null },
  { name: "Arinze Ezeh", role: "Finance Manager", image: null },
  { name: "Joshua Adinze", role: "Manager, Internal Audit & Compliance", image: joshuaImg },
  { name: "Ogbonna Ugorji", role: "Head, Administration & Human Resources", image: ogbonnaImg },
  { name: "Ibrahim Faruk", role: "Program Coordinator", image: ibrahimImg },
  { name: "Samuel Oguche", role: "Center Coordinator, CLE", image: ogwucheImg },
  { name: "Yetunde Bakare", role: "Program Manager", image: yetundeImg },
  { name: "Anthonia Onda", role: "Senior Program Officer", image: toniaImg },
  { name: "Jennifer Dafwat", role: "Media & Communications Officer", image: null },
  { name: "Ikechukwu Chukwu", role: "Senior IT Officer", image: ikechukwuImg },
  { name: "Ndukwe Onugu", role: "Senior IT Officer", image: ndukweImg },
  { name: "Olaniyan Sanusi", role: "Program Officer", image: sanusiImg },
  { name: "Tolulope Famoroti", role: "Program Officer", image: toluImg },
  { name: "Prince Gabriel", role: "Program Officer", image: gabrielImg },
  { name: "Tumininu Daniel Ndukwe", role: "Program Officer", image: null },
  { name: "Aanuoluwapo Kukoyi", role: "Program Officer", image: aanuImg },
  { name: "Rotnen Lepgak", role: "M&E Officer", image: rotnenImg },
  { name: "Ahmed Ibrahim", role: "Finance Officer", image: ahmedImg },
  { name: "Stephen Momoh", role: "Digital Design Officer", image: stephenImg },
  { name: "Emmanuel Chukwuebuka Opara", role: "Digital Design Officer", image: null },
  { name: "Josephine Gowal", role: "Front Desk/Administrative Officer", image: josephineImg },
  { name: "Esther Ocheikwu", role: "Administrative Assistant", image: estherImg },
  { name: "Solomon Yakubu", role: "Program Assistant, Media & Communication", image: null },
  { name: "Debbie Popoola", role: "Finance Assistant", image: deborahImg },
  { name: "Ifeanyi Mkpume", role: "Communications Assistant", image: ifeanyiImg },
  { name: "Ibrahim Seray Jah", role: "Intern, KML", image: null },
  { name: "Victor Itopa John", role: "Intern, Finance", image: null },
  { name: "Irene Osabuiohien", role: "Intern (NYSC)", image: null },
  { name: "Adamu Isah", role: "Office Assistant", image: adamuImg },
  { name: "Musa Mohammed", role: "Office Assistant", image: musaImg },
  { name: "Kareem Ganiyu", role: "Office Assistant", image: ganiuImg },
  { name: "Helen Genesis", role: "Office Support Staff", image: helenImg },
  { name: "Blessing Bulus", role: "Office Support Staff", image: blessingImg },
  { name: "Joshua Jangson", role: "Office Support Staff", image: null },
];

const TeamMemberCard = ({ member, large = false }: { member: any, large?: boolean }) => {
  const imageUrl = member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=500`;
  
  return (
    <div className="group bg-card rounded-2xl p-4 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col h-full">
      <div className={cn(
        "relative overflow-hidden rounded-xl mb-4 shadow-sm group-hover:shadow-md transition-all duration-300",
        large ? "aspect-[4/5] w-full" : "aspect-[4/5] w-full"
      )}>
        <img 
          src={imageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="mt-auto">
        <h3 className={cn(
          "font-display font-bold text-foreground mb-1",
          large ? "text-xl" : "text-lg"
        )}>
          {member.name}
        </h3>
        <p className="text-primary font-medium text-xs">
          {member.role}
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Our Team"
        title="Impact"
        titleHighlight="Drivers"
        description="Meet the passionate professionals at Yiaga Africa working to strengthen democracy and governance."
        backgroundImage={heroTeam} 
      />

      {/* Management */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Management
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Executive
              <span className="text-gradient"> Leadership</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {management.map((member) => (
              <div key={member.name} className="w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                <TeamMemberCard member={member} large />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Roster */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Team List
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Our
              <span className="text-gradient"> Staff</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamList.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Team;
