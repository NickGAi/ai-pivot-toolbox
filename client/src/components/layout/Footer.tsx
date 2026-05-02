import { Link } from "wouter";
import { Logo } from "@/components/ui/Logo";

const locationLinks = [
  { label: "AI Automation Brisbane", href: "/ai-automation-brisbane" },
  { label: "AI Automation Sydney", href: "/ai-automation-sydney" },
  { label: "AI Automation Melbourne", href: "/ai-automation-melbourne" },
  { label: "AI Automation Perth", href: "/ai-automation-perth" },
  { label: "AI Automation Adelaide", href: "/ai-automation-adelaide" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border" role="contentinfo" aria-label="Site footer">
      <div className="container-main">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <Link 
              href="/"
              className="flex items-center mx-auto md:mx-0"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <Logo size="md" />
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-muted-foreground" role="navigation" aria-label="Footer navigation">
              <a href="/#method" className="hover:text-foreground transition-colors text-sm">Method</a>
              <a href="/#services" className="hover:text-foreground transition-colors text-sm">Services</a>
              <a href="/#integrations" className="hover:text-foreground transition-colors text-sm">Integrations</a>
              <a href="/#about" className="hover:text-foreground transition-colors text-sm">About</a>
              <a href="/#faq" className="hover:text-foreground transition-colors text-sm">FAQ</a>
              <Link href="/toolbox" className="hover:text-foreground transition-colors text-sm">Toolbox</Link>
            </nav>

            <div className="text-muted-foreground text-sm text-center md:text-right">
              <p>© {currentYear} AI Pivot Toolbox. All rights reserved.</p>
              <p className="mt-1">AI Automation Agency Australia | Brisbane, QLD</p>
              <p className="mt-1">
                <a href="mailto:nick@aipivot.com.au" className="hover:text-foreground transition-colors">
                  nick@aipivot.com.au
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-muted-foreground" role="navigation" aria-label="Location pages">
              {locationLinks.map(link => (
                <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-border pt-6">
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground" role="navigation" aria-label="Legal navigation">
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
