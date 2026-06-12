import Header from "./Header";
import Footer from "./Footer";
import useScrollToTop from "@/hooks/useScrollToTop";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
