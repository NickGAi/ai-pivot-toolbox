import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { CookieConsent } from "@/components/CookieConsent";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/cart/CartSidebar";
import Home from "@/pages/Home";
import LocationPage from "@/pages/LocationPage";
import ServicePage from "@/pages/ServicePage";
import IndustryPage from "@/pages/IndustryPage";
import { getLocationBySlug } from "@/data/locations";
import { getServiceBySlug } from "@/data/services-data";
import { getIndustryBySlug } from "@/data/industries-data";

const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Refund = lazy(() => import("@/pages/Refund"));
const Toolbox = lazy(() => import("@/pages/Toolbox"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const NotFound = lazy(() => import("@/pages/not-found"));

const locationSlugs = [
  "ai-automation-brisbane",
  "ai-automation-sydney",
  "ai-automation-melbourne",
  "ai-automation-perth",
  "ai-automation-adelaide",
];

const serviceSlugs = [
  "ai-voice-agents",
  "workflow-automation",
  "ai-seo-australia",
  "aeo-answer-engine-optimisation",
  "geo-generative-engine-optimisation",
  "ai-chatbot-australia",
  "website-design-ai",
  "app-development-australia",
  "ai-integrations",
];

const industrySlugs = [
  "ai-for-real-estate",
  "ai-for-healthcare",
  "ai-for-legal",
  "ai-for-accounting",
  "ai-for-hospitality",
  "ai-for-construction",
  "ai-for-finance",
  "ai-for-retail",
];

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/toolbox" component={Toolbox} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/refund" component={Refund} />

        {locationSlugs.map(slug => (
          <Route key={slug} path={`/${slug}`} component={() => {
            const loc = getLocationBySlug(slug);
            if (!loc) return <NotFound />;
            return <LocationPage location={loc} />;
          }} />
        ))}

        {serviceSlugs.map(slug => (
          <Route key={slug} path={`/${slug}`} component={() => {
            const svc = getServiceBySlug(slug);
            if (!svc) return <NotFound />;
            return <ServicePage service={svc} />;
          }} />
        ))}

        {industrySlugs.map(slug => (
          <Route key={slug} path={`/${slug}`} component={() => {
            const ind = getIndustryBySlug(slug);
            if (!ind) return <NotFound />;
            return <IndustryPage industry={ind} />;
          }} />
        ))}

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Router />
            <CartSidebar />
            <CookieConsent />
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
