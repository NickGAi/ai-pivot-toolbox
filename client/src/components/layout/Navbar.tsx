import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#method", label: "Method" },
    { href: "#services", label: "Services" },
    { href: "#integrations", label: "Integrations" },
    { href: "#about", label: "About" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}
      role="banner"
    >
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a 
            href="#" 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            aria-label="AIPivot - AI Automation Agency Australia - Home"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base sm:text-lg" aria-hidden="true">AI</span>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-foreground" itemProp="name">AIPivot</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <nav className="flex items-center gap-8" role="navigation" aria-label="Main navigation">
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
            <a 
              href="#contact" 
              className="btn btn-primary"
              data-testid="nav-cta-consultation"
            >
              Free Consultation
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:hidden">
            <ThemeToggle />
            <button 
              className="p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-testid="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-background border-t border-border">
          <nav className="container-main py-4 flex flex-col gap-4" role="navigation" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-foreground font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary mt-2" onClick={() => setMobileOpen(false)}>
              Free Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
