"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";

const cardData = [
  { rotate: -8, x: -60, y: -20, h: 280, w: 200, speed: 0.3 },
  { rotate: 3, x: 40, y: -40, h: 320, w: 220, speed: 0.5 },
  { rotate: -2, x: -20, y: 20, h: 260, w: 190, speed: 0.7 },
  { rotate: 8, x: 80, y: 40, h: 240, w: 170, speed: 0.4 },
];

function HeroCard({
  card,
  index,
  scrollYProgress,
}: {
  card: (typeof cardData)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const cardY = useTransform(scrollYProgress, [0, 1], [0, card.speed * -200]);
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [card.rotate, card.rotate + (index % 2 === 0 ? 3 : -3)]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 top-1/2"
      style={{
        x: `calc(-50% + ${card.x}px)`,
        y: cardY,
        rotate: cardRotate,
        marginLeft: -card.w / 2,
        marginTop: -card.h / 2,
      }}
    >
      <div
        className="rounded-[40px] bg-gradient-to-br from-surface to-surface-secondary border border-border shadow-[0_8px_48px_rgba(61,43,37,0.12)] overflow-hidden"
        style={{ height: card.h, width: card.w }}
      >
        <div className="w-full h-full bg-gradient-to-br from-accent/10 via-surface to-accent/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-accent/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </div>
            <p className="text-sm text-text-secondary font-medium">Photo</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.8], [0.03, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -64]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[120vh] flex items-center overflow-hidden texture-noise"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />

      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px]" />

      <motion.div
        style={{ y: bgTextY, opacity: bgTextOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[12vw] font-black text-text-primary leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter"
      >
        MEMORIES
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-3xl border border-accent/20 bg-accent/5 px-4 py-2 mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium tracking-wider uppercase text-accent">
                {siteConfig.tagline}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[56px] sm:text-[64px] lg:text-[72px] font-bold leading-[1.05] tracking-tight"
            >
              Make every moment
              <br />
              more{" "}
              <span className="font-elegant italic text-accent-light">
                meaningful.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 max-w-[700px] text-lg text-text-secondary leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`${siteConfig.whatsappLink}?text=Hi! I'm interested in booking Wimah Gallery for my event.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-accent px-8 py-4 text-base font-semibold text-background transition-all duration-200 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(191,67,66,0.3)]"
              >
                <MessageCircle className="h-5 w-5" />
                Book via WhatsApp
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-border px-8 py-4 text-base font-medium text-text-primary transition-all duration-200 hover:border-accent/30 hover:bg-accent/5"
              >
                View Packages
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-[500px]">
              {cardData.map((card, i) => (
                <HeroCard
                  key={i}
                  card={card}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200"
        >
          <span className="text-sm tracking-wider uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
