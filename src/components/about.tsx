"use client";

import { FadeIn, FadeInStagger } from "@/components/motion/reveal";
import { Users, Sparkles, Image, Crown } from "lucide-react";

const features = [
  { icon: Users, title: "Professional Team", description: "Trained operators who ensure every moment is captured perfectly." },
  { icon: Sparkles, title: "Lab Quality Prints", description: "Crystal-clear prints using professional-grade equipment and paper." },
  { icon: Image, title: "Instant Digital Gallery", description: "Access your photos online within hours — share and download anytime." },
  { icon: Crown, title: "Elegant Event Experience", description: "Premium setup that elevates your event's atmosphere and guest experience." },
];

export function About() {
  return (
    <section id="services" className="relative py-32 overflow-hidden texture-dots">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
            The Experience
          </p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            More than just{" "}
            <span className="font-elegant italic text-accent-light">photo printing.</span>
          </h2>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            We create experiences that guests remember long after the event ends.
          </p>
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-200 hover:border-accent/20 hover:bg-surface hover:shadow-[0_4px_24px_rgba(61,43,37,0.08)] hover:-translate-y-1"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 border border-accent/10 transition-all duration-200 group-hover:bg-accent/15 group-hover:border-accent/20">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
