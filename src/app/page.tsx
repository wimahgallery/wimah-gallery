"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WhyUs } from "@/components/why-us";
import { HowItWorks } from "@/components/how-it-works";
import { PinnedStory } from "@/components/pinned-story";
import { TypographyTransitions } from "@/components/typography-transitions";
import { ScrollLock } from "@/components/scroll-lock";
import { HorizontalPortfolio } from "@/components/horizontal-portfolio";
import { Portfolio } from "@/components/portfolio";
import { ClientGallery } from "@/components/client-gallery";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <PinnedStory />
        <WhyUs />
        <HowItWorks />
        <TypographyTransitions />
        <HorizontalPortfolio />
        <ScrollLock />
        <Portfolio />
        <ClientGallery />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
