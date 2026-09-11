"use client";

import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/smooth-scroll";

import { Header } from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import TypographyStorytelling from "@/components/typography-storytelling";
import HowItWorks from "@/components/how-it-works";
import Availability from "@/components/availability";
import PortfolioGallery from "@/components/portfolio-gallery";
import ClientGallery from "@/components/client-gallery";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import Marquee from "@/components/marquee";
import LoadingScreen from "@/components/loading-screen";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      gestureOrientation: "vertical",
      respectReducedMotion: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    setLenisInstance(lenis);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenisInstance(null);
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <ScrollProgress />
      <FloatingWhatsApp />
      <main className="relative">
        <div className="relative">
          <Header />
        </div>

        <div className="relative">
          <Hero />
        </div>

        <Marquee items={["Wedding", "Birthday", "Corporate", "Gathering", "Engagement", "Graduation"]} />
        <div className="h-2" />
        <Marquee items={["Professional", "Premium", "Unforgettable", "Moments", "Beautiful"]} reverse slow />

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
          <PortfolioGallery />
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
