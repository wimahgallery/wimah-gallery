"use client";

import { FadeIn, FadeInStagger } from "@/components/motion/reveal";
import { Check } from "lucide-react";

const benefits = [
  "Instant Prints", "Digital Gallery", "GIF & Boomerang", "Custom Frame Design",
  "Friendly Operator", "Fast Setup", "Unlimited Fun", "High Quality Equipment",
];

export function WhyUs() {
  return (
    <section className="relative py-32 overflow-hidden texture-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
              Why Choose Us
            </p>
            <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
              Why clients{" "}
              <span className="font-elegant italic text-accent-light">love us.</span>
            </h2>
            <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-[700px]">
              We obsess over every detail so your event is flawless. From the first
              consultation to the final print, we deliver an experience that exceeds expectations.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 gap-4" stagger={0.08}>
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-3xl border border-border bg-surface/30 px-6 py-4 transition-all duration-200 hover:border-accent/20 hover:bg-surface/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-3xl bg-accent/15">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-text-primary">{benefit}</span>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
