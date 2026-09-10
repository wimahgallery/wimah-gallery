"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const cards = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=280&fit=crop&q=60",
    rotate: -8,
    x: -60,
    y: -20,
    delay: 0.3,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=220&h=320&fit=crop&q=60",
    rotate: 3,
    x: 40,
    y: -40,
    delay: 0.5,
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=190&h=260&fit=crop&q=60",
    rotate: -2,
    x: -20,
    y: 20,
    delay: 0.7,
  },
];

function AnimatedCard({
  src,
  rotate,
  x,
  y,
  delay,
  index,
  w,
  h,
}: {
  src: string;
  rotate: number;
  x: number;
  y: number;
  delay: number;
  index: number;
  w: number;
  h: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.85, rotateZ: rotate - 10 },
      {
        opacity: 1,
        scale: 1,
        rotateZ: rotate,
        duration: 0.8,
        ease: "power2.out",
        delay,
      },
    );
  }, [rotate, delay]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -w / 2,
        marginTop: -h / 2,
        width: w,
        height: h,
        zIndex: index,
      }}
    >
      <div
        className="rounded-[28px] border border-border shadow-[0_8px_40px_rgba(95,101,88,0.15)] overflow-hidden bg-surface backdrop-blur-sm"
        style={{ transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)` }}
      >
        <Image
          src={src}
          alt="Photobooth moment"
          width={w}
          height={h}
          priority
          className="object-cover"
          sizes={`${w}px`}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      badgeRef.current,
      headlineRef.current,
      descRef.current,
      ctaRef.current,
    ].filter(Boolean) as HTMLElement[];
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      },
    );
  }, []);

  return (
    <section
      id="home"
      className="lg:min-h-screen py-24 md:py-0 flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-20 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-accent/5" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-accent/5" />
      <div className="absolute [paint-order:stroke_fill] [-webkit-text-stroke:1px_rgba(124,132,114,0.12)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20vw] font-black text-text-primary/[0.03] pointer-events-none select-none whitespace-nowrap">
        MEMORIES
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div ref={badgeRef} style={{ opacity: 0 }} />
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <h1 className="font-heading text-[32px] sm:text-[52px] md:text-[68px] lg:text-[84px] font-normal leading-[1.05] tracking-tight">
                Making every moment more{" "}
                <span className="font-elegant italic text-accent-light">
                  Memorable.
                </span>
              </h1>
            </div>
            <p
              ref={descRef}
              className="mt-5 sm:mt-6 lg:mt-8 max-w-[520px] text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed font-body"
              style={{ opacity: 0 }}
            >
              {siteConfig.description}
            </p>
            <div
              ref={ctaRef}
              className="mt-5 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{ opacity: 0 }}
            >
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-background transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Book via WhatsApp
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-accent transition-[transform,colors] duration-300 hover:border-accent hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_4px_20px_rgba(124,132,114,0.08)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                View Packages
              </Link>
            </div>
          </div>
          {/* <div className="hidden lg:flex relative items-center justify-center">
            <div className="relative w-full h-[500px]">
              {cards.map((card, i) => (
                <AnimatedCard key={i} src={card.src} rotate={card.rotate} x={card.x} y={card.y} delay={card.delay} index={i} w={200 + i * 10} h={280 + i * 20} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
