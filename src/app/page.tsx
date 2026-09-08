"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { Header } from "@/components/header";
import Hero from "@/components/hero";
import PinnedStory from "@/components/pinned-story";
import About from "@/components/about";
import TypographyStorytelling from "@/components/typography-storytelling";
import HowItWorks from "@/components/how-it-works";
import Availability from "@/components/availability";
import Portfolio from "@/components/portfolio";
import HorizontalScroll from "@/components/horizontal-scroll";
import ScrollLockReveal from "@/components/scroll-lock-reveal";
import ClientGallery from "@/components/client-gallery";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";
import MasonryGallery from "@/components/masonry-gallery";
import Footer from "@/components/footer";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)",
    ).matches;
    if (!isDesktop) return;

    const lenis = new Lenis();
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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
          <HorizontalScroll />
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
