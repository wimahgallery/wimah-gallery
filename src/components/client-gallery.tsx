"use client";

import { animated, useSpring, useInView, useTrail } from "@react-spring/web";
import Image from "next/image";
import { clientGalleries } from "@/lib/config";
import { ExternalLink } from "lucide-react";

export default function ClientGallery() {
  const [titleRef, titleInView] = useInView(() => ({ triggerOnce: true }));
  const [gridRef, gridInView] = useInView(() => ({
    triggerOnce: true,
    amount: 0.1,
  }));

  const titleSpring = useSpring({
    opacity: titleInView ? 1 : 0,
    y: titleInView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  });

  const cardSprings = useTrail(clientGalleries.length, {
    opacity: gridInView ? 1 : 0,
    y: gridInView ? 0 : 40,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section id="gallery" className="relative py-20 lg:py-32 texture-noise">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <animated.div
          ref={titleRef}
          style={titleSpring}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Find and download your{" "}
            <span className="italic text-accent-light">memories.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] text-base text-text-secondary leading-normal">
            Every event receives its own private online gallery.
          </p>
        </animated.div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clientGalleries.map((gallery, index) => (
            <animated.div
              key={gallery.name}
              style={cardSprings[index]}
              className="group overflow-hidden rounded-3xl border border-border bg-surface/50 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(95,101,88,0.08)] hover:border-accent/20 transition-[transform,colors] duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={gallery.src}
                  alt={gallery.name}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-heading font-normal text-text-primary">
                  {gallery.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-light">
                  {gallery.event}
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  {gallery.date} &middot; {gallery.location}
                </p>
                <button className="mt-4 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:border-accent hover:bg-accent/15 hover:text-accent">
                  View Gallery
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
}
