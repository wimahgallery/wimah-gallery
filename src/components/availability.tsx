"use client";

import { animated, useSpring, useInView } from "@react-spring/web";
import {
  Heart,
  PartyPopper,
  Users,
  GraduationCap,
  Star,
  Armchair,
} from "lucide-react";

const events = [
  { label: "Wedding", icon: Heart },
  { label: "Ulang Tahun", icon: PartyPopper },
  { label: "Corporate", icon: Users },
  { label: "Wisuda", icon: GraduationCap },
  { label: "Gathering", icon: Armchair },
];

export default function Availability() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const [titleStyle] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  }));

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-accent/5 blur-[80px] sm:blur-[120px] lg:blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <animated.div
          ref={ref}
          style={titleStyle}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            Hadir untuk berbagai{" "}
            <span className="font-elegant italic text-accent">
              bentuk perayaan.
            </span>
          </h2>
          <p className="mt-4 text-sm text-text-secondary">
            Berbasis di Gianyar, Bali
          </p>
        </animated.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-[800px] mx-auto">
          {events.map((event, i) => (
            <EventCard key={event.label} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
}: {
  event: (typeof events)[number];
  index: number;
}) {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const [style] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    delay: index * 80,
    config: { tension: 280, friction: 60 },
  }));

  const Icon = event.icon;

  return (
    <animated.div
      ref={ref}
      style={style}
      className="group relative flex flex-col flex-none grow items-center gap-4 bg-surface/50 border border-border rounded-3xl p-6 transition-all duration-500 hover:border-accent/20 hover:bg-surface/80 hover:shadow-[0_8px_40px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98] cursor-default"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/10 transition-all duration-500 group-hover:bg-accent/15 group-hover:ring-accent/20">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <span className="font-heading text-base font-normal text-text-primary text-center">
        {event.label}
      </span>
    </animated.div>
  );
}
