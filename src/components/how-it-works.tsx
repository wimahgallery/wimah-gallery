"use client";

import { animated, useSpring, useInView, useTrail } from "@react-spring/web";
import { steps } from "@/lib/config";

function StepConnector() {
  return (
    <div className="hidden lg:flex absolute top-10 left-[calc(50%+52px)] w-[calc(100%-44px)] items-center">
      <div className="w-full h-px bg-gradient-to-r from-border via-accent/15 to-border" />
    </div>
  );
}

export default function HowItWorks() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));

  const [titleSpring] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  }));

  const trail = useTrail(steps.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/3 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={ref}>
          <animated.div style={titleSpring} className="mb-20 text-center">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              How it{" "}
              <span className="font-elegant italic text-accent-light">
                works.
              </span>
            </h2>
          </animated.div>

          {/* Desktop */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6 relative">
            {trail.map((style, i) => (
              <animated.div key={steps[i].number} style={style} className="relative">
                {i < steps.length - 1 && <StepConnector />}
                <div className="flex flex-col items-center text-center px-2">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface border border-border">
                    <span className="text-4xl font-heading font-black text-accent/25">
                      {steps[i].number}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {steps[i].title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-snug max-w-[180px]">
                    {steps[i].description}
                  </p>
                </div>
              </animated.div>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col gap-0 relative">
            <div className="absolute left-[29px] top-12 bottom-12 w-px bg-gradient-to-b from-border via-accent/15 to-border" />
            {trail.map((style, i) => (
              <animated.div key={steps[i].number} style={style}>
                <div className="flex items-start gap-6 py-6 relative">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center z-10">
                    <span className="font-heading text-xs font-bold text-accent tracking-wider">
                      {steps[i].number}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
                      {steps[i].title}
                    </h3>
                    <p className="text-text-secondary leading-snug">
                      {steps[i].description}
                    </p>
                  </div>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
