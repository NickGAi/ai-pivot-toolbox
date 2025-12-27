import { Link } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 border-b border-transparent transition-all duration-200",
      scrolled ? "bg-[#070A12]/80 backdrop-blur-md border-white/10" : "bg-transparent"
    )}>
      <div className="wrap">
        <div className="flex items-center justify-between py-3.5 gap-3.5">
          <div className="flex gap-2.5 items-center font-extrabold tracking-wide text-lg">
            <div 
              className="w-[34px] h-[34px] rounded-xl bg-gradient-to-br from-[hsl(252,100%,68%)] to-[hsl(186,83%,53%)] shadow-[0_10px_26px_rgba(124,92,255,0.22)]" 
              aria-hidden="true" 
            />
            <div>AIPivot</div>
            <span className="hidden sm:inline-flex pill">
              <span className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_0_4px_rgba(52,211,153,0.12)]"></span>
              Built for agencies
            </span>
          </div>
          
          <nav className="hidden md:flex gap-6 items-center text-muted text-sm font-medium">
            <a href="#roi" className="hover:text-white transition-colors">ROI</a>
            <a href="#replace" className="hover:text-white transition-colors">Replace</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          
          <div className="flex gap-2.5 items-center">
            <a className="btn btn-small hidden sm:flex" href="#demo">View demo</a>
            <a className="btn btn-primary btn-small" href="#book">Book a call</a>
          </div>
        </div>
      </div>
    </header>
  );
}
