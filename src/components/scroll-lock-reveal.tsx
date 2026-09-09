"use client";

import { useRef, useEffect } from "react";
import { Camera, Image, Wifi, Palette, Crown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Crown,
    title: "Luxury Service",
    description: "Premium setup that elevates your event atmosphere.",
    gradient: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    icon: Camera,
    title: "Premium Experience",
    description: "Professional equipment and operators for flawless results.",
    gradient: "from-accent/15 via-accent/5 to-transparent",
  },
  {
    icon: Image,
    title: "Instant Prints",
    description: "High-quality lab prints your guests take home immediately.",
    gradient: "from-accent/10 via-accent/3 to-transparent",
  },
  {
    icon: Wifi,
    title: "Digital Gallery",
    description: "Instant online access to all photos within hours.",
    gradient: "from-accent/12 via-accent/4 to-transparent",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Personalized frames and backdrops matching your theme.",
    gradient: "from-accent/18 via-accent/5 to-transparent",
  },
];

export default function ScrollLockReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      const segDur = 1 / cardEls.length;
      const fadeOutDur = segDur * 0.15;
      const fadeInDur = segDur * 0.15;
      const gapDur = segDur * 0.1;

      cardEls.forEach((card, i) => {
        const segStart = i * segDur;
        const segEnd = segStart + segDur;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: fadeInDur,
            ease: "power2.out",
          },
          segStart + gapDur,
        );
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: segDur - fadeInDur - fadeOutDur - gapDur,
            ease: "none",
          },
          segStart + gapDur + fadeInDur,
        );
        tl.to(
          card,
          {
            opacity: 0,
            y: -30,
            scale: 0.95,
            duration: fadeOutDur,
            ease: "power2.in",
          },
          segEnd - fadeOutDur,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[600vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
          <div className="absolute inset-0 texture-lines opacity-40" />

          <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-accent">
                Our Services
              </p>
              <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
                Everything{" "}
                <span className="font-elegant italic text-accent">
                  included.
                </span>
              </h2>
            </div>

            <div className="relative h-[400px] sm:h-[450px]">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-full max-w-[480px]">
                      <div className="relative rounded-3xl border border-border bg-surface p-10 sm:p-12 overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                        />

                        <div className="relative z-10">
                          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                            <Icon className="h-8 w-8 text-accent" />
                          </div>

                          <h3 className="mb-3 font-heading text-2xl font-normal text-text-primary">
                            {card.title}
                          </h3>

                          <p className="text-sm text-text-secondary leading-relaxed max-w-[360px]">
                            {card.description}
                          </p>

                          <div className="mt-8 flex items-center gap-2">
                            <div className="h-1 w-8 rounded-full bg-accent" />
                            <span className="text-xs font-medium uppercase tracking-wider text-accent">
                              Step {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
