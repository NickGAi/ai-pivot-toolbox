export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <section id="demo" className="pt-10 pb-16">
        <div className="wrap">
          <div className="relative p-[18px] rounded-[22px] border border-[var(--border-color)] shadow-[0_16px_60px_rgba(0,0,0,0.15)] flex flex-wrap items-center justify-between gap-4 overflow-hidden bg-[var(--card-base-bg)]">
            {/* Background gradients for the card - slightly adjusted for both modes */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100" style={{
              background: `
                radial-gradient(800px 300px at 20% 0%, rgba(124,92,255,.30), transparent 55%),
                radial-gradient(700px 280px at 90% 20%, rgba(34,211,238,.22), transparent 55%)
              `
            }} />
            
            <div className="relative z-10 max-w-xl">
              <div className="font-black text-[22px] text-foreground">Want an agency system map in 30 minutes?</div>
              <div className="text-muted-foreground mt-1.5 text-[15px]">
                Share your current stack and delivery workflow. We’ll outline a practical v1: modules, data model, and agent rollout plan.
              </div>
            </div>
            
            <div className="relative z-10 flex gap-2.5 flex-wrap">
              <a 
                id="book" 
                className="btn btn-primary"
                href="mailto:hello@aipivot.com?subject=AIPivot%20Agency%20Discovery%20Call&body=Hi%20AIPivot%2C%0A%0AWe%20run%20an%20agency%20and%20want%20a%20system%20map.%0A%0ACurrent%20stack%3A%20%5Btools%5D%0ATeam%20size%3A%20%5Bn%5D%0AServices%3A%20%5BSEO%2Fads%2Fweb%2Fcreative%5D%0A%0AThanks!"
              >
                Book a discovery call
              </a>
              <a className="btn" href="#roi">Re-check ROI</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-[18px] pb-[30px] border-t border-[var(--border-color)] text-muted-foreground text-[13px]">
        <div className="wrap">
          <div className="flex flex-wrap justify-between gap-3 mb-3.5">
            <div className="flex gap-2.5 items-center">
              <div 
                className="w-7 h-7 rounded-[10px] bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] shadow-[0_10px_26px_rgba(124,92,255,0.22)]" 
                aria-hidden="true" 
              />
              <div className="text-foreground"><strong>AIPivot</strong> <span className="text-[12px] opacity-80 text-muted-foreground">© {currentYear} All rights reserved.</span></div>
            </div>
            <div className="text-[12px] flex gap-2">
              <a href="#roi" className="hover:text-foreground">ROI</a> · 
              <a href="#replace" className="hover:text-foreground">Replace</a> · 
              <a href="#agents" className="hover:text-foreground">Agents</a> · 
              <a href="#faq" className="hover:text-foreground">FAQ</a>
            </div>
          </div>
          <div className="h-px bg-[var(--border-color)] mb-3.5"></div>
          <div className="text-[12px] opacity-80">
            Disclaimer: ROI calculator provides directional estimates only. Add Privacy Policy + Terms before launch.
          </div>
        </div>
      </footer>
    </>
  );
}
