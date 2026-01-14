import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Services } from "@/components/sections/Services";
import { Integrations } from "@/components/sections/Integrations";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main role="main" aria-label="Main content">
        <article itemScope itemType="https://schema.org/WebPage">
          <Hero />
          <Method />
          <Services />
          <Integrations />
          <About />
          <FAQ />
          <Contact />
        </article>
      </main>
      <Footer />
    </div>
  );
}
