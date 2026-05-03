import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { type BlogPost, type BlogSection, getRecentPosts } from "@/data/blog-data";

interface Props {
  post: BlogPost;
}

const categoryColors: Record<string, string> = {
  "GEO & AI Search": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Pricing & ROI": "bg-green-500/10 text-green-400 border-green-500/20",
  "AI Automation": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-4">{section.text}</h2>;
    case "h3":
      return <h3 className="text-xl font-bold text-foreground mt-8 mb-3">{section.text}</h3>;
    case "p":
      return <p className="text-muted-foreground leading-relaxed mb-4">{section.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2 mb-6">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3 mb-6">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "stat-block":
      return (
        <div className="grid sm:grid-cols-3 gap-4 my-8 p-6 rounded-2xl bg-card border border-border">
          {section.stats?.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">Source: {stat.source}</div>
            </div>
          ))}
        </div>
      );
    case "callout":
      return (
        <div className="my-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <p className="text-foreground font-medium leading-relaxed">{section.text}</p>
          <a href="/#contact" className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:underline">
            Book a free strategy call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ post }: Props) {
  useEffect(() => {
    document.title = post.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", post.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://aipivot.com.au/blog/${post.slug}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", post.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", post.metaDescription);
    return () => { document.title = "AI Pivot Toolbox | AI Automation Agency Australia"; };
  }, [post]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.publishDate,
    "url": `https://aipivot.com.au/blog/${post.slug}`,
    "author": {
      "@type": "Person",
      "name": "Nick Griffiths",
      "url": "https://aipivot.com.au/"
    },
    "publisher": { "@id": "https://aipivot.com.au/#organization" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://aipivot.com.au/blog/${post.slug}` }
  };

  const relatedPosts = getRecentPosts(3, post.slug);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <article>
          {/* Hero */}
          <section className="pt-32 pb-12">
            <div className="container-main px-4 sm:px-6 lg:px-8 max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Breadcrumbs crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title.substring(0, 40) + "…" }]} />
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${categoryColors[post.category] ?? "bg-primary/10 text-primary border-primary/20"}`}>
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" /> {formatDate(post.publishDate)}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">{post.excerpt}</p>
              </motion.div>
            </div>
          </section>

          {/* Content */}
          <section className="pb-20">
            <div className="container-main px-4 sm:px-6 lg:px-8 max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {post.content.map((section, i) => (
                  <RenderSection key={i} section={section} />
                ))}
              </motion.div>
            </div>
          </section>
        </article>

        {/* Author / CTA */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl shrink-0">N</div>
              <div className="flex-1">
                <p className="font-bold text-foreground">Nick Griffiths</p>
                <p className="text-sm text-muted-foreground mb-3">Founder, AI Pivot Toolbox — AI automation specialist serving Australian businesses across Brisbane, Sydney, Melbourne, Perth, and Adelaide.</p>
                <a href="/#contact" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                  Book a free strategy call <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts */}
        <section className="py-20">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-foreground">More from the blog</h2>
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related, i) => (
                <motion.div key={related.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blog/${related.slug}`}>
                    <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer flex flex-col">
                      <span className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-3 ${categoryColors[related.category] ?? "bg-primary/10 text-primary border-primary/20"}`}>
                        <Tag className="w-3 h-3" /> {related.category}
                      </span>
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex-1">{related.title}</h3>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6 border-t border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
