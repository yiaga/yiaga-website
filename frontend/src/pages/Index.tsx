import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import AnnouncementSlider from "@/components/home/AnnouncementSlider";
import AboutSection from "@/components/home/AboutSection";
import FocusAreasSection from "@/components/home/FocusAreasSection";
import InitiativesSection from "@/components/home/InitiativesSection";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import BadgesSection from "@/components/home/BadgesSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import NewsSection from "@/components/home/NewsSection";
import BlogSection from "@/components/home/BlogSection";
import CareersSection from "@/components/home/CareersSection";
import SubscriptionSection from "@/components/shared/SubscriptionSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <AnnouncementSlider />
        <AboutSection />
        <FocusAreasSection />
        <InitiativesSection />
        <PartnersCarousel />
        <BadgesSection />
        <ResourcesSection />
        <NewsSection />
        <BlogSection />
        <CareersSection />
        <SubscriptionSection variant="muted" id="subscribe" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
