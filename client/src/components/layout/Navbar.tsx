import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, ShoppingCart, Wrench, ChevronDown, LayoutGrid, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";
import { ContactCallbackModal } from "@/components/ContactCallbackModal";

const toolboxItems = [
  { href: "/toolbox", label: "AI Toolbox", description: "Browse & build your quote", icon: LayoutGrid },
  { href: "/real-estate-pipeline-growth-map", label: "Real Estate Growth Map", description: "Free pipeline audit for agents", icon: MapPin },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const toolboxRef = useRef<HTMLDivElement>(null);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolboxRef.current && !toolboxRef.current.contains(e.target as Node)) {
        setToolboxOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#services", label: "Services" },
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

            <div
              ref={toolboxRef}
              className="relative"
              onMouseEnter={() => setToolboxOpen(true)}
              onMouseLeave={() => setToolboxOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-semibold text-sm"
                onClick={() => setToolboxOpen(!toolboxOpen)}
                aria-expanded={toolboxOpen}
                data-testid="nav-link-toolbox"
              >
                <Wrench className="w-4 h-4" />
                Toolbox
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolboxOpen ? "rotate-180" : ""}`} />
              </button>

              {toolboxOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-background border border-border rounded-2xl shadow-xl shadow-black/20 overflow-hidden min-w-[260px]">
                    {toolboxItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 px-4 py-3.5 hover:bg-muted transition-colors group"
                          onClick={() => setToolboxOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{item.label}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">{item.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

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

            <button
              onClick={() => setCallbackOpen(true)}
              className="flex items-center gap-1.5 font-semibold text-sm px-4 py-2 rounded-full transition-opacity hover:opacity-90 text-[#141413]"
              style={{ background: "#84cc16" }}
              data-testid="nav-cta-callback"
              aria-label="Request a call back"
            >
              <Phone className="w-3.5 h-3.5" />
              Talk to Us
            </button>

            <a
              href="/#contact"
              className="btn btn-primary"
              data-testid="nav-cta-consultation"
              aria-label="Book your free AI growth map call"
            >
              Book Your Free Growth Map Call
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
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 mt-1">
                <Wrench className="w-3.5 h-3.5" /> Toolbox
              </p>
              {toolboxItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-muted transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={() => { setMobileOpen(false); setCallbackOpen(true); }}
              className="flex items-center justify-center gap-2 w-full font-semibold px-5 py-3 rounded-full transition-opacity hover:opacity-90 text-[#141413]"
              style={{ background: "#84cc16" }}
              data-testid="nav-cta-callback-mobile"
            >
              <Phone className="w-4 h-4" />
              Talk to Us
            </button>

            <a href="/#contact" className="btn btn-primary mt-1" onClick={() => setMobileOpen(false)}
              aria-label="Book your free AI growth map call"
            >
              Book Your Free Growth Map Call
            </a>
          </nav>
        </div>
      )}

      <ContactCallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </header>
  );
}
