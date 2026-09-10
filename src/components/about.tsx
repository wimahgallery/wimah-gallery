"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Camera,
  Palette,
  MessageSquare,
  Images,
  Check,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { commitments } from "@/lib/config";
import Marquee from "@/components/marquee";

gsap.registerPlugin(ScrollTrigger);

const commitmentIcons = [
  Users,
  Camera,
  Palette,
  MessageSquare,
  Images,
  Check,
  RefreshCw,
  ShieldCheck,
];

const marqueeItems = [
  "Hadir untuk Setiap Kebutuhan",
  "Memberikan yang Terbaik",
  "Di Setiap Momen",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleEl = sectionRef.current?.querySelector("[data-title]");
      const cards = sectionRef.current?.querySelectorAll("[data-card]");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: titleEl, start: "top 90%", once: true },
          },
        );
      }
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: cards[0], start: "top 90%", once: true },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="relative py-14 sm:py-20 lg:py-32 overflow-hidden texture-noise"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-accent/5 pointer-events-none" />

      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
      >
        <div data-title className="mb-10 sm:mb-16 text-center">
          <p className="mb-3 sm:mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Our Commitment
          </p>
          <h2 className="mb-4 sm:mb-6 font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            Komitmen kami{" "}
            <span className="font-elegant italic text-accent">untuk Anda</span>
          </h2>
          <p className="mx-auto max-w-[480px] text-sm sm:text-base text-text-secondary leading-relaxed">
            Kami memberikan lebih dari sekadar foto. Kami menciptakan pengalaman
            yang tak terlupakan untuk momen spesial Anda.
          </p>
        </div>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item, i) => {
            const Icon = commitmentIcons[i] || Check;
            return (
              <div data-card key={item.title}>
                <div className="group relative h-full rounded-3xl border border-border bg-surface p-5 sm:p-6 transition-[transform,colors] duration-500 hover:border-accent/20 hover:bg-surface-secondary hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98]">
                  <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-sm sm:text-base font-normal text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
