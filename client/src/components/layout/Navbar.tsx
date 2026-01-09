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
    { href: "#services", label: "Services" },
    { href: "#method", label: "Method" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"
    )}>
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AI</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">AIPivot</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="#contact" className="hidden sm:inline-flex btn btn-primary">
              Free Consultation
            </a>
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container-main py-4 flex flex-col gap-4">
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
