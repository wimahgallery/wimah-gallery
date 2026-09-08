"use client";

import { useRef, useEffect } from "react";
import { animated, useSpring, useSpringValue, to } from "@react-spring/web";
import { steps } from "@/lib/config";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const raw = useSpringValue(0);
  const [smooth, api] = useSpring(() => ({
    value: 0,
    config: { tension: 120, friction: 30 },
  }));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      const p = (vh - rect.top) / (vh + h);
      const clamped = Math.max(0, Math.min(1, p));
      raw.set(clamped);
      api.start({ value: clamped });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [raw, api]);

  const lineHeight = to(smooth.value, [0, 0.8], ["0%", "100%"]);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-accent/5 pointer-events-none" />

      <div
        ref={containerRef}
        className="relative mx-auto max-w-[800px] px-6 lg:px-8"
      >
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
            How It Works
          </p>
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            From inquiry{" "}
            <span className="font-elegant italic text-accent">
              to celebration.
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border">
            <animated.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent/60 to-accent"
            />
          </div>

          {steps.map((step, i) => {
            const stepStart = 0.1 + (i / steps.length) * 0.7;
            const stepEnd = stepStart + 0.15;
            const stepOpacity = to(smooth.value, [stepStart, stepEnd], [0, 1]);
            const stepY = to(smooth.value, [stepStart, stepEnd], [20, 0]);

            return (
              <animated.div
                key={step.number}
                style={{ opacity: stepOpacity, y: stepY }}
                className={`relative flex items-start gap-6 ${
                  i < steps.length - 1 ? "pb-10 lg:pb-12" : ""
                }`}
              >
                <div className="relative z-10 shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_20px_rgba(124,132,114,0.12)]">
                  <span className="font-heading text-base font-normal text-accent">
                    {step.number}
                  </span>
                </div>

                <div className="pt-2.5">
                  <h3 className="font-heading text-xl font-normal text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </animated.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
