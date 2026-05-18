import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, ShoppingCart, Wrench } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#method", label: "Method" },
    { href: "/#services", label: "Services" },
    { href: "/#integrations", label: "Integrations" },
    { href: "/#about", label: "About" },
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
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label="AI Pivot Toolbox - AI Automation Agency Australia - Home"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <Logo size="md" />
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-auto">
            <nav className="flex items-center gap-6" role="navigation" aria-label="Main navigation">
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

            <Link
              href="/toolbox"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-semibold text-sm"
              data-testid="nav-link-toolbox"
            >
              <Wrench className="w-4 h-4" />
              Toolbox
            </Link>

            <ThemeToggle />

            <button
              onClick={openCart}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Open quote${totalItems > 0 ? `, ${totalItems} items` : ""}`}
              data-testid="nav-cart-button"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <a
              href="/#contact"
              className="btn btn-primary"
              data-testid="nav-cta-consultation"
              aria-label="Book your free AI growth map call"
            >
              Book a Free Growth Map Call
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <button
              onClick={openCart}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Open quote${totalItems > 0 ? `, ${totalItems} items` : ""}`}
              data-testid="nav-cart-button-mobile"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
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
            <Link
              href="/toolbox"
              className="flex items-center gap-2 text-primary font-semibold py-2"
              onClick={() => setMobileOpen(false)}
            >
              <Wrench className="w-4 h-4" />
              AI Toolbox
            </Link>
            <a href="/#contact" className="btn btn-primary mt-2" onClick={() => setMobileOpen(false)}
              aria-label="Book your free AI growth map call"
            >
              Book a Free Growth Map Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
