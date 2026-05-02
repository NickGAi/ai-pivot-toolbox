import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone, Search, Target, Zap, MessageCircle, FileText,
  Layers, PenTool, Monitor, Code, Star, BarChart2,
  ShoppingCart, Check, ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { tools, categories, Tool } from "@/data/tools";

const iconMap: Record<string, React.ElementType> = {
  phone: Phone,
  search: Search,
  target: Target,
  zap: Zap,
  "message-circle": MessageCircle,
  "file-text": FileText,
  layers: Layers,
  "pen-tool": PenTool,
  monitor: Monitor,
  code: Code,
  star: Star,
  "bar-chart-2": BarChart2,
};

function ToolCard({ tool }: { tool: Tool }) {
  const { addItem, items } = useCart();
  const Icon = iconMap[tool.icon] ?? Zap;
  const inCart = items.some((i) => i.tool.id === tool.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
      data-testid={`tool-card-${tool.id}`}
    >
      {tool.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
            {tool.badge}
          </span>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          {tool.category}
        </p>
        <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-1">
          {tool.name}
        </h3>
        <p className="text-primary text-sm font-semibold mb-3">{tool.tagline}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
          {tool.description}
        </p>

        <ul className="space-y-2 mb-6">
          {tool.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-5 flex items-end justify-between gap-4">
          <div>
            {tool.agencyPrice && (
              <p className="text-xs text-muted-foreground line-through mb-0.5">
                Agencies charge ${tool.agencyPrice.toLocaleString()}
              </p>
            )}
            <p className="text-2xl font-bold text-foreground">
              ${tool.price.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-xs">
              {tool.billing === "monthly" ? "per month" : "one-time"}
            </p>
          </div>

          <button
            onClick={() => addItem(tool)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              inCart
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
            }`}
            data-testid={`add-to-cart-${tool.id}`}
            aria-label={`${inCart ? "Added" : "Add"} ${tool.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Toolbox() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { totalItems, openCart } = useCart();

  const filtered = activeCategory === "All"
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  useEffect(() => {
    document.title = "AI Toolbox | AI Pivot Toolbox — Browse & Buy AI Tools";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container-main px-4 sm:px-6 lg:px-8">

          <motion.div
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI Tools Built for Australian Businesses
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              The AI Pivot <span className="gradient-text">Toolbox</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Pick the AI tools your business needs. Add them to your cart, get a custom quote, and we'll have you live within days — not months.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-sm">
              <span className="text-primary font-semibold">Solo AI operator = no agency overhead</span>
              <span className="hidden sm:inline text-muted-foreground">·</span>
              <span className="text-muted-foreground">40–60% below standard agency rates</span>
              <span className="hidden sm:inline text-muted-foreground">·</span>
              <span className="text-muted-foreground">Same results. Direct access. Faster turnaround.</span>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {totalItems > 0 && (
              <button
                onClick={openCart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                data-testid="view-cart-button"
              >
                <ShoppingCart className="w-4 h-4" />
                View Cart ({totalItems})
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <motion.div
            className="mt-16 rounded-3xl bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/20 p-8 sm:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Not sure what you need?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Book a free 30-minute strategy session and we'll map out exactly which tools will give your business the biggest ROI.
            </p>
            <a
              href="/#contact"
              className="btn btn-primary text-base px-8 py-4 inline-flex items-center"
              data-testid="toolbox-cta"
            >
              Get Your Free Strategy Session
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
