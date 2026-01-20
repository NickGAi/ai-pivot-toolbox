import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Method } from "@/components/sections/Method";
import { Services } from "@/components/sections/Services";
import { Integrations } from "@/components/sections/Integrations";
import { About } from "@/components/sections/About";
import { Urgency } from "@/components/sections/Urgency";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main role="main" aria-label="Main content">
        <article itemScope itemType="https://schema.org/WebPage">
          <Hero />
          <Proof />
          <Method />
          <Services />
          <Integrations />
          <About />
          <Urgency />
          <FAQ />
          <Contact />
        </article>
      </main>
      <Footer />
    </div>
  );
}
