"use client";

import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
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
import { ScrollProgress } from "@/components/scroll-progress";
import { LoadingScreen } from "@/components/loading-screen";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isReady]);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <CustomCursor />
            <ScrollProgress />
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
