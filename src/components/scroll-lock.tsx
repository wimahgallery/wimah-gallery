"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Printer, Image, Crown } from "lucide-react";

const cardData = [
  { icon: Crown, title: "Pengalaman Premium", description: "Setiap detail dikurasi untuk keeleganan dan kepuasan.", color: "from-accent/20 to-surface" },
  { icon: Printer, title: "Cetakan Instan", description: "Cetakan kualitas lab dalam hitungan detik yang tamu Anda hargai selamanya.", color: "from-surface-secondary to-accent/10" },
  { icon: Image, title: "Galeri Digital", description: "Setiap momen tertangkap, terorganisir, dan dikirimkan secara online.", color: "from-accent/15 to-surface" },
  { icon: Camera, title: "Layanan Luxury", description: "Operator profesional, setup premium, pengalaman tak terlupakan.", color: "from-surface to-accent/20" },
];

function ScrollLockCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: (typeof cardData)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const cardStart = index * 0.22;
  const cardEnd = cardStart + 0.22;
  const cardCenter = cardStart + 0.11;
  const opacity = useTransform(scrollYProgress, [Math.max(0, cardStart - 0.05), cardStart + 0.03, cardCenter, cardEnd - 0.03, Math.min(1, cardEnd + 0.05)], [0, 1, 1, 1, index === total - 1 ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [Math.max(0, cardStart - 0.05), cardStart + 0.03, cardCenter, cardEnd - 0.03, Math.min(1, cardEnd + 0.05)], [0.9, 1, 1, 1, index === total - 1 ? 1 : 0.95]);
  const y = useTransform(scrollYProgress, [Math.max(0, cardStart - 0.05), cardStart + 0.03], [64, 0]);
  const Icon = card.icon;

  return (
    <motion.div style={{ opacity, scale, y }} className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-[700px] rounded-3xl border border-border bg-surface/80 p-8 sm:p-12 text-center shadow-[0_8px_48px_rgba(61,43,37,0.12)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 border border-accent/10 mx-auto mb-8">
          <Icon className="h-8 w-8 text-accent" />
        </div>
        <h3 className="font-heading text-[28px] font-bold mb-4">{card.title}</h3>
        <p className="text-text-secondary leading-relaxed text-lg">{card.description}</p>
      </div>
    </motion.div>
  );
}

function DotIndicator({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const dotOpacity = useTransform(scrollYProgress, [index * 0.22 + 0.03, index * 0.22 + 0.11, index * 0.22 + 0.19], [0.3, 1, 0.3]);
  return <motion.div style={{ opacity: dotOpacity }} className="h-2 w-2 rounded-full bg-accent" />;
}

export function ScrollLock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section ref={containerRef} className="relative h-[400vh] texture-noise">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Keunggulan Wimah</p>
            <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
              Dirancang untuk <span className="font-elegant italic text-accent-light">kesempurnaan.</span>
            </h2>
          </div>

          <div className="relative h-[320px] sm:h-[380px] flex items-center justify-center">
            {cardData.map((card, i) => (
              <ScrollLockCard key={card.title} card={card} index={i} total={cardData.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {cardData.map((_, i) => (
              <DotIndicator key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
