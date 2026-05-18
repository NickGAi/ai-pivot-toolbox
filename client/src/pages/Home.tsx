import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

// Below-the-fold sections: lazy loaded so they don't block initial paint
const Proof       = lazy(() => import("@/components/sections/Proof").then(m => ({ default: m.Proof })));
const LeadCapture = lazy(() => import("@/components/sections/LeadCapture").then(m => ({ default: m.LeadCapture })));
const LeadMagnet  = lazy(() => import("@/components/sections/LeadMagnet").then(m => ({ default: m.LeadMagnet })));
const Method      = lazy(() => import("@/components/sections/Method").then(m => ({ default: m.Method })));
const Services    = lazy(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const Integrations = lazy(() => import("@/components/sections/Integrations").then(m => ({ default: m.Integrations })));
const About       = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const Urgency     = lazy(() => import("@/components/sections/Urgency").then(m => ({ default: m.Urgency })));
const FAQ         = lazy(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));
const Contact     = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));
const Footer      = lazy(() => import("@/components/layout/Footer").then(m => ({ default: m.Footer })));

const BelowFoldFallback = () => <div className="min-h-[400px] bg-background" />;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main role="main" aria-label="Main content">
        <article itemScope itemType="https://schema.org/WebPage">
          <Hero />
          <Suspense fallback={<BelowFoldFallback />}>
            <Proof />
            <LeadCapture />
            <Method />
            <Services />
            <Integrations />
            <About />
            <Urgency />
            <LeadMagnet />
            <FAQ />
            <Contact />
          </Suspense>
        </article>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
