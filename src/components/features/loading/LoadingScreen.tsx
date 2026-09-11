"use client";

import { useState, useEffect, useRef } from "react";

import gsap from "gsap";
import { useSelectedLayoutSegment } from "next/navigation";

export default function LoadingScreen() {
  const segment = useSelectedLayoutSegment();
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    document.body.style.overflow = "hidden";
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: isMobile ? 0.3 : 0.4, ease: "power2.out" },
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: isMobile ? 0.6 : 1, ease: "power2.inOut" },
        "+=0.1",
      )
      .fromTo(
        brandRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.4 : 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      )
      .to(
        brandRef.current,
        {
          opacity: 0,
          y: -10,
          duration: isMobile ? 0.2 : 0.4,
          ease: "power2.in",
        },
        isMobile ? "+=0.3" : "+=0.6",
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: isMobile ? 0.3 : 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setVisible(false);
          },
        },
        "-=0.1",
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (segment === "admin") return;

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#F5F3EE" }}
    >
      {/* Growing line */}
      <div className="relative mb-6 sm:mb-8 h-[2px] w-28 sm:w-48 overflow-hidden rounded-full bg-surface">
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 w-full rounded-full origin-left"
          style={{ backgroundColor: "#7C8472", transform: "scaleX(0)" }}
        />
      </div>

      {/* Brand name */}
      <div ref={brandRef} style={{ opacity: 0 }}>
        <h1 className="font-display text-2xl sm:text-4xl font-light tracking-[0.15em] sm:tracking-[0.3em] text-text-primary uppercase">
          Wimah Gallery
        </h1>
      </div>
    </div>
  );
}
