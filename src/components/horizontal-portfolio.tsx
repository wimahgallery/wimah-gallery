"use client";

import { animated, useSpring, useInView } from "@react-spring/web";
import Image from "next/image";
import { horizontalImages } from "@/lib/config";

const row1 = horizontalImages;
const row2 = [...horizontalImages].reverse();

function CarouselCard({
  src,
  title,
  category,
}: {
  src: string;
  title: string;
  category: string;
}) {
  return (
    <div className="group relative shrink-0 w-[340px] sm:w-[420px] lg:w-[520px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] aspect-video">
        <Image
          src={src}
          alt={title}
          width={600}
          height={800}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-video"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-2 text-xs font-medium uppercase tracking-widest text-accent-light">
            {category}
          </span>
          <span className="text-lg font-semibold text-text-primary">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HorizontalPortfolio() {
  const [titleRef, titleInView] = useInView(() => ({ triggerOnce: true }));
  const [row1Ref, row1InView] = useInView(() => ({ triggerOnce: true }));
  const [row2Ref, row2InView] = useInView(() => ({ triggerOnce: true }));

  const titleSpring = useSpring({
    opacity: titleInView ? 1 : 0,
    y: titleInView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  });

  const row1Spring = useSpring({
    opacity: row1InView ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  const row2Spring = useSpring({
    opacity: row2InView ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 " />

      <div className="relative mx-auto max-w-[1200px]">
        <animated.div
          ref={titleRef}
          style={titleSpring}
          className="mb-16 px-6 text-center lg:px-8"
        >
          <h2 className="font-elegant text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary">
            Our work{" "}
            <span className="italic text-accent-light">speaks</span> for itself.
          </h2>
        </animated.div>
      </div>

      <div className="relative space-y-4">
        <animated.div ref={row1Ref} style={row1Spring} className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-left w-max">
            {[...row1, ...row1].map((image, i) => (
              <CarouselCard
                key={`r1-${i}`}
                src={image.src}
                title={image.title}
                category={image.category}
              />
            ))}
          </div>
        </animated.div>

        <animated.div ref={row2Ref} style={row2Spring} className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-right w-max">
            {[...row2, ...row2].map((image, i) => (
              <CarouselCard
                key={`r2-${i}`}
                src={image.src}
                title={image.title}
                category={image.category}
              />
            ))}
          </div>
        </animated.div>
      </div>
    </section>
  );
}
