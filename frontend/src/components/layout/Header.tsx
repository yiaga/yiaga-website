import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoWhite from "@/assets/logo-white.jpg";

const navItems = [
  { label: "About", href: "/about" },
  {
    label: "Focus Areas",
    href: "#",
    subItems: [
      { label: "Democracy", href: "/democracy" },
      { label: "Governance", href: "/governance" },
    ]
  },
  { label: "Our Initiatives", href: "/initiatives" },
  { label: "Resources", href: "/resources" },
  {
    label: "News & Blogs",
    href: "#",
    subItems: [
      { label: "News", href: "/news" },
      { label: "Blogs", href: "/blogs" },
    ]
  },
  {
    label: "Opportunities",
    href: "#",
    subItems: [
      { label: "Careers", href: "/careers" },
      { label: "Call for Application", href: "/call-for-applications" },
    ]
  },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        shouldShowTransparent
          ? "bg-transparent py-5"
          : "bg-background/95 backdrop-blur-md shadow-md py-3"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <img
                src={shouldShowTransparent ? logoWhite : "/logo.png"}
                alt="Yiaga Africa Logo"
                className="h-10 w-auto transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.subItems && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.subItems ? (
                  <button
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1",
                      shouldShowTransparent
                        ? "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1",
                      shouldShowTransparent
                        ? "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {item.subItems && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-lg shadow-lg py-2 min-w-[180px]">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/get-involved">
              <Button variant={shouldShowTransparent ? "hero" : "default"} size={shouldShowTransparent ? "lg" : "default"}>
                Get Involved
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={cn("w-6 h-6", shouldShowTransparent ? "text-primary-foreground" : "text-foreground")} />
            ) : (
              <Menu className={cn("w-6 h-6", shouldShowTransparent ? "text-primary-foreground" : "text-foreground")} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-lg py-4 animate-slide-up">
            <div className="container mx-auto px-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <>
                      <div className="px-4 py-3 text-foreground font-medium">{item.label}</div>
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="px-8 py-2 text-muted-foreground hover:text-primary transition-colors block"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="px-4 py-3 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors font-medium block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/get-involved" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full mt-4">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
