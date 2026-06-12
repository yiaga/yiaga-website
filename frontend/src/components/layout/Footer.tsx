import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  about: [
    { label: "Who We Are", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Blog", href: "/blogs" },
  ],
  programs: [
    { label: "Democracy", href: "/democracy" },
    { label: "Governance", href: "/governance" },
    { label: "Initiatives", href: "/initiatives" },
  ],
  resources: [
    { label: "Publications", href: "/resources" },
    { label: "Reports", href: "/resources" },
    { label: "News", href: "/news" },
    { label: "Blog", href: "/blogs" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/yiaga.org/", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/YIAGA", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/yiagaafrica", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/@YIAGA1", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/yiaga/", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-display font-bold text-2xl">Y</span>
              </div>
              <span className="font-display font-bold text-2xl">Yiaga Africa</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              Building a democratic society where citizens are empowered to participate in governance and hold leaders accountable.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 text-secondary" />
                <span>+234 (0) 903 800 7744</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 text-secondary" />
                <span>info@yiaga.org</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">About Us</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 pt-8 border-t border-primary-foreground/20">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-primary/80 py-4">
        <div className="container mx-auto px-4 text-center text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} Yiaga Africa. All rights reserved. |
          <a href="#privacy" className="hover:text-secondary ml-1">Privacy Policy</a> |
          <a href="#terms" className="hover:text-secondary ml-1">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
