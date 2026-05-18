import { ArrowRight, Play } from "lucide-react";

const logosRow1 = [
  "Real Estate", "Healthcare", "Professional Services", "Finance", "Retail",
  "Manufacturing", "Hospitality", "Legal", "Education", "Technology"
];

const logosRow2 = [
  "Consulting", "Insurance", "Logistics", "Construction", "Automotive",
  "Telecommunications", "Accounting", "Marketing", "Recruitment", "Property Management"
];

export function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center pt-20"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      <div className="container-main relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-hero-fade-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8" role="status">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span itemProp="description">AI Automation & SEO Agency, Australia Wide</span>
            </div>

            <h1 
              id="hero-heading" 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.0] tracking-tight uppercase"
              itemProp="headline"
            >
              Your competitors are already showing up on{" "}
              <span className="gradient-text">ChatGPT & Google.</span>{" "}
              You're not. Let's fix that in 60 days.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed" itemProp="text">
              When someone asks ChatGPT, Perplexity or Google who's the best in your industry — is your business the answer? If not, you're handing those leads to your competition every single day.
            </p>

            <p className="text-sm sm:text-base text-primary font-semibold max-w-xl mx-auto mb-8 sm:mb-10">
              ★★★★★ Guaranteed results for Australian businesses in 60 days or less
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a 
                href="#contact" 
                className="btn btn-primary text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center"
                data-testid="hero-cta-consultation"
                aria-label="Book your free AI growth map call"
              >
                Book Your Free Growth Map Call
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
              <a 
                href="#method" 
                className="btn btn-outline text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center"
                data-testid="hero-cta-method"
                aria-label="Learn about our AI implementation method"
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                See How It Works
              </a>
            </div>
          </div>

          {/* Logo Marquee */}
          <div className="animate-hero-fade-in mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-border overflow-hidden">
            <p className="text-sm text-muted-foreground mb-6 sm:mb-8 uppercase tracking-wider">
              Trusted Across Industries
            </p>
            
            {/* Mobile: Wrapped grid */}
            <div className="flex flex-wrap justify-center gap-3 sm:hidden">
              {[...logosRow1, ...logosRow2.slice(0, 4)].map((logo, i) => (
                <div key={i} className="text-xs font-bold text-foreground/40 px-2 py-1">
                  {logo}
                </div>
              ))}
            </div>

            {/* Desktop: Scrolling marquee */}
            <div className="hidden sm:block">
              <div className="relative overflow-hidden mb-6">
                <div className="flex animate-marquee-left whitespace-nowrap">
                  {[...logosRow1, ...logosRow1].map((logo, i) => (
                    <div key={i} className="mx-8 text-xl font-bold text-foreground/40 hover:text-foreground/70 transition-colors flex-shrink-0">
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee-right whitespace-nowrap">
                  {[...logosRow2, ...logosRow2].map((logo, i) => (
                    <div key={i} className="mx-8 text-xl font-bold text-foreground/40 hover:text-foreground/70 transition-colors flex-shrink-0">
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
