import { motion } from "framer-motion";
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8" role="status">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span itemProp="description">AI Automation &amp; SEO Agency — Brisbane, Australia</span>
            </div>

            <h1 
              id="hero-heading" 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.0] tracking-tight uppercase"
              itemProp="headline"
            >
              Finally. A guaranteed way to get your business found on{" "}
              <span className="gradient-text">Google & AI Search</span>{" "}
              in 60 days or less.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed" itemProp="text">
              A shockingly effective new method that puts Brisbane businesses in front of customers on Google, ChatGPT, Perplexity and every AI search engine — for the most profitable terms in your industry.
            </p>

            <p className="text-sm sm:text-base text-primary font-semibold max-w-xl mx-auto mb-8 sm:mb-10">
              ★★★★★ Trusted by Australian businesses across 10+ industries
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a 
                href="#contact" 
                className="btn btn-primary text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center"
                data-testid="hero-cta-consultation"
                aria-label="Claim your free AI growth strategy session"
              >
                Claim Your Free Strategy Session
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
          </motion.div>

          {/* Logo Marquee */}
          <motion.div 
            className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-border overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground mb-6 sm:mb-8 uppercase tracking-wider">
              Trusted Across Industries
            </p>
            
            {/* Mobile: Wrapped grid */}
            <div className="flex flex-wrap justify-center gap-3 sm:hidden">
              {[...logosRow1, ...logosRow2.slice(0, 4)].map((logo, i) => (
                <div 
                  key={i} 
                  className="text-xs font-bold text-white/70 px-2 py-1"
                >
                  {logo}
                </div>
              ))}
            </div>

            {/* Desktop: Scrolling marquee */}
            <div className="hidden sm:block">
              {/* Row 1 - Moving Left */}
              <div className="relative overflow-hidden mb-6">
                <div className="flex animate-marquee-left whitespace-nowrap">
                  {[...logosRow1, ...logosRow1].map((logo, i) => (
                    <div 
                      key={i} 
                      className="mx-8 text-xl font-bold text-white/70 hover:text-white transition-colors flex-shrink-0"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 - Moving Right */}
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee-right whitespace-nowrap">
                  {[...logosRow2, ...logosRow2].map((logo, i) => (
                    <div 
                      key={i} 
                      className="mx-8 text-xl font-bold text-white/70 hover:text-white transition-colors flex-shrink-0"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
