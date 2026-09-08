"use client";

import { animated, useSpring, useInView, useTrail } from "@react-spring/web";
import { Check, Camera, Image, Wifi, Palette, Users, Zap, Heart } from "lucide-react";
import { commitments } from "@/lib/config";

const commitmentIcons = [Camera, Image, Wifi, Palette, Users, Zap, Heart, Check];

export default function About() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const [titleSpring] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  }));

  const trail = useTrail(commitments.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 24,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section id="services" className="relative py-20 lg:py-32 overflow-hidden texture-noise">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={ref}>
          <animated.div style={titleSpring} className="mb-16 text-center">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Our Commitment
            </p>
            <h2 className="mb-6 font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
              Komitmen kami{" "}
              <span className="font-elegant italic text-accent">
                untuk Anda
              </span>
            </h2>
            <p className="mx-auto max-w-[480px] text-base text-text-secondary leading-relaxed">
              Kami memberikan lebih dari sekadar foto. Kami menciptakan pengalaman yang tak terlupakan untuk momen spesial Anda.
            </p>
          </animated.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trail.map((style, i) => {
              const Icon = commitmentIcons[i] || Check;
              return (
                <animated.div key={commitments[i].title} style={style}>
                  <div className="group relative h-full rounded-3xl border border-border bg-surface/40 p-6 transition-[transform,colors] duration-500 hover:border-accent/20 hover:bg-surface/60 hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98]">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-normal text-text-primary">
                      {commitments[i].title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {commitments[i].description}
                    </p>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
