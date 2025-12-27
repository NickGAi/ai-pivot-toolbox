import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Agents } from "@/components/sections/Agents";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ROICalculator />
        <Features />
        <HowItWorks />
        <Agents />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
