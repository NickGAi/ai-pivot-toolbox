import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border" role="contentinfo" aria-label="Site footer">
      <div className="container-main">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link 
              href="/"
              className="flex items-center gap-3"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">AI</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground" itemProp="name">AIPivot</span>
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-muted-foreground" role="navigation" aria-label="Footer navigation">
              <a href="/#method" className="hover:text-foreground transition-colors">Method</a>
              <a href="/#products" className="hover:text-foreground transition-colors">Products</a>
              <a href="/#integrations" className="hover:text-foreground transition-colors">Integrations</a>
              <a href="/#about" className="hover:text-foreground transition-colors">About</a>
              <a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a>
            </nav>

            <div className="text-muted-foreground text-sm text-center">
              <p>© {currentYear} AIPivot. All rights reserved.</p>
              <p className="mt-1">AI Automation Agency Australia | Brisbane, Queensland</p>
            </div>
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
