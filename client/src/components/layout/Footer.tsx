export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AI</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">AIPivot</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8 text-muted-foreground">
            <a href="#method" className="hover:text-foreground transition-colors">Method</a>
            <a href="#products" className="hover:text-foreground transition-colors">Products</a>
            <a href="#integrations" className="hover:text-foreground transition-colors">Integrations</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
          </nav>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            © {currentYear} AIPivot. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
