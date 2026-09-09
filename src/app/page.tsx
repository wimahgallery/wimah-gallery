"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Header } from "@/components/header";
import Hero from "@/components/hero";
import PinnedStory from "@/components/pinned-story";
import About from "@/components/about";
import TypographyStorytelling from "@/components/typography-storytelling";
import HowItWorks from "@/components/how-it-works";
import Availability from "@/components/availability";
import Portfolio from "@/components/portfolio";

import ScrollLockReveal from "@/components/scroll-lock-reveal";
import ClientGallery from "@/components/client-gallery";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) return

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      gestureOrientation: "vertical",
      respectReducedMotion: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <main className="relative">
        <div className="relative">
          <Header />
        </div>

        <div className="relative">
          <Hero />
        </div>

        <div className="relative">
          <PinnedStory />
        </div>

        <div className="relative">
          <About />
        </div>

        <div className="relative">
          <TypographyStorytelling />
        </div>

        <div className="relative">
          <HowItWorks />
        </div>

        <div className="relative">
          <Availability />
        </div>

        <div className="relative">
          <Portfolio />
        </div>



        <div className="relative">
          <ScrollLockReveal />
        </div>

        <div className="relative">
          <ClientGallery />
        </div>

        <div className="relative">
          <Pricing />
        </div>

        <div className="relative">
          <Testimonials />
        </div>

        <div className="relative">
          <FAQ />
        </div>

        <div className="relative">
          <FinalCTA />
        </div>

        <div className="relative">
          <Footer />
        </div>
      </main>
    </>
  );
}
