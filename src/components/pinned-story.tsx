"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { pinnedStoryImages } from "@/lib/config";

export function PinnedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const step1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const step4Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 1]);
  const step1Scale = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0.9, 1, 1, 1.05]);
  const step2Scale = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0.9, 1, 1, 1.05]);
  const step3Scale = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.7], [0.9, 1, 1, 1.05]);
  const step4Scale = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0.9, 1, 1, 1]);
  const step1X = useTransform(scrollYProgress, [0, 0.15], [48, 0]);
  const step2X = useTransform(scrollYProgress, [0.25, 0.35], [48, 0]);
  const step3X = useTransform(scrollYProgress, [0.45, 0.55], [48, 0]);
  const step4X = useTransform(scrollYProgress, [0.65, 0.75], [48, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.3]);
  const headlineY = useTransform(scrollYProgress, [0, 0.15], [0, -48]);

  const steps = [
    { opacity: step1Opacity, scale: step1Scale, x: step1X, ...pinnedStoryImages[0] },
    { opacity: step2Opacity, scale: step2Scale, x: step2X, ...pinnedStoryImages[1] },
    { opacity: step3Opacity, scale: step3Scale, x: step3X, ...pinnedStoryImages[2] },
    { opacity: step4Opacity, scale: step4Scale, x: step4X, ...pinnedStoryImages[3] },
  ];

  return (
    <section ref={containerRef} className="relative h-[500vh] texture-noise">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 w-full">
          <motion.div style={{ opacity: headlineOpacity, y: headlineY }} className="text-center mb-16">
            <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Cerita Kami</p>
            <h2 className="font-heading text-[40px] sm:text-[56px] lg:text-[72px] font-bold tracking-tight">
              Setiap kenangan menceritakan <span className="font-elegant italic text-accent-light">sebuah kisah.</span>
            </h2>
          </motion.div>

          <div className="relative h-[320px] flex items-center justify-center">
            {steps.map((step, i) => (
              <motion.div key={i} style={{ opacity: step.opacity, scale: step.scale, x: step.x }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="relative w-[280px] h-[200px] sm:w-[320px] sm:h-[240px] rounded-[40px] overflow-hidden border border-border shadow-[0_8px_48px_rgba(61,43,37,0.12)] mb-8">
                  <Image src={step.src} alt={step.sub} fill className="object-cover" sizes="320px" />
                </div>
                <p className="text-sm font-medium tracking-wider uppercase text-accent mb-2">{step.sub}</p>
                <p className="font-heading text-[28px] font-semibold text-text-primary">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]) }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-sm tracking-wider uppercase">Gulir ke bawah</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
