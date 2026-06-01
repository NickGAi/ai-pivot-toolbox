import React from "react";
import { renderToString } from "react-dom/server";
import { Router, Switch, Route } from "wouter";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";

import Home from "@/pages/Home";
import LocationPage from "@/pages/LocationPage";
import ServicePage from "@/pages/ServicePage";
import IndustryPage from "@/pages/IndustryPage";
import Blog from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPostPage";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Refund from "@/pages/Refund";
import Toolbox from "@/pages/Toolbox";
import Checkout from "@/pages/Checkout";
import VsMarketingAgency from "@/pages/VsMarketingAgency";
import StrategyCall from "@/pages/StrategyCall";
import RealEstateFunnel from "@/pages/RealEstateFunnel";
import Pipeline from "@/pages/Pipeline";

import { getLocationBySlug } from "@/data/locations";
import { getServiceBySlug } from "@/data/services-data";
import { getIndustryBySlug } from "@/data/industries-data";
import { getBlogPostBySlug } from "@/data/blog-data";

const locationSlugs = [
  "ai-automation-brisbane",
  "ai-automation-sydney",
  "ai-automation-melbourne",
  "ai-automation-perth",
  "ai-automation-adelaide",
  "ai-automation-gold-coast",
  "ai-automation-canberra",
  "ai-automation-newcastle",
  "ai-automation-hobart",
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

function ServerRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/toolbox" component={Toolbox} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/refund" component={Refund} />
      <Route path="/blog" component={Blog} />
      <Route path="/ai-pivot-vs-marketing-agency" component={VsMarketingAgency} />
      <Route path="/free-strategy-call" component={StrategyCall} />
      <Route path="/book" component={StrategyCall} />
      <Route path="/real-estate-pipeline-growth-map" component={RealEstateFunnel} />
      <Route path="/pipeline" component={Pipeline} />

      <Route path="/blog/:slug" component={({ params }) => {
        const post = getBlogPostBySlug(params.slug);
        if (!post) return null;
        return <BlogPostPage post={post} />;
      }} />

      {locationSlugs.map(slug => (
        <Route key={slug} path={`/${slug}`} component={() => {
          const loc = getLocationBySlug(slug);
          if (!loc) return null;
          return <LocationPage location={loc} />;
        }} />
      ))}

      {serviceSlugs.map(slug => (
        <Route key={slug} path={`/${slug}`} component={() => {
          const svc = getServiceBySlug(slug);
          if (!svc) return null;
          return <ServicePage service={svc} />;
        }} />
      ))}

      {industrySlugs.map(slug => (
        <Route key={slug} path={`/${slug}`} component={() => {
          const ind = getIndustryBySlug(slug);
          if (!ind) return null;
          return <IndustryPage industry={ind} />;
        }} />
      ))}
    </Switch>
  );
}

export function render(urlPath: string): string {
  const hook = () => [urlPath, (_to: string) => {}] as [string, (_to: string) => void];
  const ssrQueryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return renderToString(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={ssrQueryClient}>
        <TooltipProvider>
          <CartProvider>
            <Router hook={hook}>
              <ServerRoutes />
            </Router>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
