"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      badgeRef.current,
      headlineRef.current,
      descRef.current,
      ctaRef.current,
    ].filter(Boolean) as HTMLElement[];
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      },
    );
  }, []);

  return (
    <section
      id="home"
      className="lg:min-h-screen pt-10 md:py-0 flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-20 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-accent/5" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-accent/5" />
      <div className="absolute [paint-order:stroke_fill] [-webkit-text-stroke:1px_rgba(124,132,114,0.12)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20vw] font-black text-text-primary/[0.03] pointer-events-none select-none whitespace-nowrap">
        MEMORIES
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 items-center">
          <div className={"space-y-8 "}>
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Gianyar, Bali • Premium Photobooth
              </span>
            </div>
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <h1 className="font-heading text-[32px] sm:text-[52px] md:text-[68px] lg:text-[84px] font-normal leading-[1.05] tracking-tight">
                Making every moment more{" "}
                <span className="font-elegant italic text-accent-light">
                  Memorable.
                </span>
              </h1>
            </div>
            <p
              ref={descRef}
              className="mt-5 sm:mt-6 lg:mt-8 max-w-[520px] text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed font-body"
              style={{ opacity: 0 }}
            >
              {siteConfig.description}
            </p>
            <div
              ref={ctaRef}
              className="mt-5 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{ opacity: 0 }}
            >
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking WIMAH Photobooth untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-background transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Book via WhatsApp
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#pricing", { offset: -64 });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-accent transition-[transform,colors] duration-300 hover:border-accent hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_4px_20px_rgba(124,132,114,0.08)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
