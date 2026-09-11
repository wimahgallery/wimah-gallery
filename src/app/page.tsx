"use client";

import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/smooth-scroll";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/hero/HeroSection";
import About from "@/components/features/about/AboutSection";
import TypographyStorytelling from "@/components/features/typography-storytelling/StorytellingSection";
import HowItWorks from "@/components/features/how-it-works/HowItWorksSection";
import Availability from "@/components/features/availability/AvailabilitySection";
import PortfolioGallery from "@/components/features/portfolio/PortfolioSection";
import ClientGallery from "@/components/features/client-gallery/ClientGallerySection";
import Pricing from "@/components/features/pricing/PricingSection";
import Testimonials from "@/components/features/testimonials/TestimonialsSection";
import FAQ from "@/components/features/faq/FaqSection";
import FinalCTA from "@/components/features/final-cta/FinalCTASection";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWhatsApp from "@/components/features/loading/FloatingWhatsApp";
import Marquee from "@/components/ui/Marquee";
import LoadingScreen from "@/components/features/loading/LoadingScreen";

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
