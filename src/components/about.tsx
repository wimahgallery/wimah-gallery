"use client";

import { animated, useSpring, useInView } from "@react-spring/web";
import { Users, Sparkles, Image, Crown } from "lucide-react";
import { features } from "@/lib/config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Sparkles,
  Image,
  Crown,
};

function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const [style] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 40,
    delay: index * 120,
    config: { tension: 280, friction: 60 },
  }));

  const Icon = iconMap[icon];

  return (
    <animated.div ref={ref} style={style}>
      <div className="group relative h-full bg-surface/50 border border-border rounded-3xl p-8 transition-all duration-500 hover:border-accent/20 hover:bg-surface/80 hover:shadow-[0_8px_40px_rgba(200,112,64,0.06)]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/10 transition-all duration-500 group-hover:bg-accent/15 group-hover:ring-accent/20">
            {Icon && <Icon className="h-6 w-6 text-accent" />}
          </div>
          <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
            {title}
          </h3>
          <p className="text-text-secondary leading-snug">{description}</p>
        </div>
      </div>
    </animated.div>
  );
}

export default function About() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const [titleSpring] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  }));

  return (
    <section id="services" className="relative py-20 lg:py-32 overflow-hidden texture-noise">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={ref}>
          <animated.div style={titleSpring} className="mb-20 text-center">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              More than just{" "}
              <span className="font-elegant italic text-accent-light">
                photo printing.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-[480px] text-text-secondary text-base leading-normal">
              We create experiences that guests remember long after the event
              ends.
            </p>
          </animated.div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
