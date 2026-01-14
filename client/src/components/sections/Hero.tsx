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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Transforming Businesses with AI
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              <span className="text-foreground">Powering </span>
              <span className="gradient-text">Businesses</span>
              <span className="text-foreground"> with </span>
              <span className="gradient-text">AI Solutions</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
              AI solutions that wow your customers, grow your sales, slash your overheads, 
              and transform the way you do business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <a href="#contact" className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
                Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#method" className="btn btn-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Logo Marquee */}
          <motion.div 
            className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider">
              Trusted Across Industries
            </p>
            
            {/* Row 1 - Moving Left */}
            <div className="relative overflow-hidden mb-6">
              <div className="flex animate-marquee-left whitespace-nowrap">
                {[...logosRow1, ...logosRow1].map((logo, i) => (
                  <div 
                    key={i} 
                    className="mx-4 sm:mx-8 text-sm sm:text-xl font-bold text-white/70 hover:text-white transition-colors flex-shrink-0"
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
                    className="mx-4 sm:mx-8 text-sm sm:text-xl font-bold text-white/70 hover:text-white transition-colors flex-shrink-0"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
