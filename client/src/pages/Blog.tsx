import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blogPosts } from "@/data/blog-data";

const categoryColors: Record<string, string> = {
  "GEO & AI Search": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Pricing & ROI": "bg-green-500/10 text-green-400 border-green-500/20",
  "AI Automation": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  useEffect(() => {
    document.title = "AI Automation Blog Australia | AI Pivot Toolbox";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Expert insights on AI automation, GEO, AEO, and AI SEO for Australian businesses. Practical guides, pricing breakdowns, and industry research.");
    return () => { document.title = "AI Pivot Toolbox | AI Automation Agency Australia"; };
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AI Pivot Toolbox — AI Automation Blog",
    "url": "https://aipivot.com.au/blog",
    "description": "Expert insights on AI automation, GEO, AEO, and AI SEO for Australian businesses.",
    "publisher": { "@id": "https://aipivot.com.au/#organization" },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://aipivot.com.au/blog/${post.slug}`,
      "datePublished": post.publishDate,
      "description": post.excerpt,
    }))
  };

  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section className="pt-32 pb-16">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Breadcrumbs crumbs={[{ label: "Blog" }]} />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">AI Automation Blog</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Practical guides on AI automation, GEO, AEO, and AI SEO for Australian businesses. No fluff — just what works.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured post */}
        <section className="pb-16">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link href={`/blog/${featured.slug}`} data-testid="blog-featured">
                <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${categoryColors[featured.category] ?? "bg-primary/10 text-primary border-primary/20"}`}>
                      <Tag className="w-3 h-3" /> {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(featured.publishDate)}</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Featured</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* All posts grid */}
        <section className="pb-24">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}`} data-testid={`blog-post-${post.slug}`}>
                    <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${categoryColors[post.category] ?? "bg-primary/10 text-primary border-primary/20"}`}>
                          <Tag className="w-3 h-3" /> {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex-1">{post.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-muted-foreground">{formatDate(post.publishDate)}</span>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card border-t border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to start automating?</h2>
            <p className="text-muted-foreground mb-8">Book a free strategy call — we'll identify your highest-value automation opportunities and show you what's possible.</p>
            <a href="/#contact" className="btn btn-primary text-lg px-8 py-4">
              Book a Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
