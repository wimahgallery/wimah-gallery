"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease },
};

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

function FloatingCard({
  src,
  rotate,
  x,
  y,
  delay,
  index,
}: {
  src: string;
  rotate: number;
  x: number;
  y: number;
  delay: number;
  index: number;
}) {
  const w = 200 + index * 10;
  const h = 280 + index * 20;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.5, ease, delay }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -w / 2,
        marginTop: -h / 2,
        width: w,
        height: h,
        zIndex: index,
        willChange: "transform, opacity",
      }}
    >
      <div
        className="rounded-[28px] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden"
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
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-accent/5 blur-[80px] lg:blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-accent/3 blur-[60px] lg:blur-[120px]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20vw] font-black text-white/[0.03] pointer-events-none select-none whitespace-nowrap">
        MEMORIES
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 mb-6 lg:mb-8">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium tracking-wider uppercase text-accent">
                  Premium Photobooth Experience
                </span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
            >
              <h1 className="font-heading text-[40px] sm:text-[56px] lg:text-[80px] font-bold leading-[1.05] tracking-tight">
                Make every moment
                <br />
                more{" "}
                <span className="font-elegant italic text-accent-light">
                  meaningful.
                </span>
              </h1>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <p className="mt-6 lg:mt-8 max-w-[700px] text-base lg:text-lg text-text-secondary leading-relaxed">
                {siteConfig.description}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.25 }}
            >
              <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-background transition-all duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(166,106,69,0.3)]"
                >
                  Book via WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
                >
                  View Packages
                </a>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex relative items-center justify-center">
            <div className="relative w-full h-[500px]">
              {cards.map((card, i) => (
                <FloatingCard
                  key={i}
                  src={card.src}
                  rotate={card.rotate}
                  x={card.x}
                  y={card.y}
                  delay={card.delay}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
