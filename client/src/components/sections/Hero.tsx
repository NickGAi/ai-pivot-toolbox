import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

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
              Transforming Real Estate with AI
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              <span className="text-foreground">Powering </span>
              <span className="gradient-text">UI/UX & AI</span>
              <br />
              <span className="text-foreground">for Real Estate</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              AI solutions that wow your customers, grow your sales, slash your overheads, 
              and transform the way you do business in real estate.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="btn btn-primary text-lg px-8 py-4">
                Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#method" className="btn btn-outline text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { value: "500+", label: "Real Estate Clients" },
              { value: "24/7", label: "AI Availability" },
              { value: "10x", label: "Faster Response" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
