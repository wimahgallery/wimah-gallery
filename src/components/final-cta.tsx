"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useIsMobile } from "@/hooks/use-is-mobile";

const words = [
  { text: "Karena", special: false },
  { text: "setiap", special: false },
  { text: "moment", special: true },
  { text: "yang", special: false },
  { text: "bermakna", special: false },
  { text: "layak", special: false },
  { text: "untuk", special: false },
  { text: "dikenang.", special: true },
];

function FinalCTAMobile() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-[700px] px-6 lg:px-8 text-center py-32 w-full">
        <p className="text-sm font-medium tracking-wider uppercase text-accent mb-8">
          Siap Menciptakan Kenangan?
        </p>
        <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight leading-tight mb-8">
          {words.map((word, i) => (
            <span key={i} className={`mr-[0.3em] inline-block ${word.special ? "font-elegant italic text-accent-light" : ""}`}>
              {word.text}
            </span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-lg text-text-secondary leading-relaxed mb-12"
        >
          Reservasi tanggal Anda hari ini dan ciptakan kenangan tak terlupakan bersama tamu Anda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={`${siteConfig.whatsappLink}?text=Halo! Saya ingin booking Wimah Gallery untuk acara saya.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-3xl bg-accent px-8 py-4 text-base font-semibold text-background transition-all duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(191,67,66,0.35)]"
          >
            <MessageCircle className="h-5 w-5" />
            Reservasi Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function WordByWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: (typeof words)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const wordStart = index / total;
  const wordEnd = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [Math.max(0, wordStart - 0.1), wordStart + 0.05, wordEnd], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [Math.max(0, wordStart - 0.1), wordStart + 0.05], [16, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
      className={`mr-[0.3em] ${word.special ? "font-elegant italic text-accent-light" : ""}`}
    >
      {word.text}
      {index < total - 1 && " "}
    </motion.span>
  );
}

function FinalCTADesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden texture-noise">
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <motion.div style={{ scale: bgScale }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute top-24 left-20 w-20 h-20 organic-blob bg-accent/5 animate-warm-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 right-16 w-28 h-28 organic-blob bg-accent-light/4 animate-warm-pulse" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto max-w-[700px] px-6 lg:px-8 text-center py-32 w-full">
        <p className="text-sm font-medium tracking-wider uppercase text-accent mb-8">
          Siap Menciptakan Kenangan?
        </p>

        <h2 className="font-heading text-[40px] sm:text-[56px] lg:text-[72px] font-bold tracking-tight leading-tight mb-8">
          {words.map((word, i) => (
            <WordByWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-lg text-text-secondary leading-relaxed mb-12"
        >
          Reservasi tanggal Anda hari ini dan ciptakan kenangan tak terlupakan bersama tamu Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={`${siteConfig.whatsappLink}?text=Halo! Saya ingin booking Wimah Gallery untuk acara saya.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-3xl bg-accent px-8 py-4 text-base font-semibold text-background transition-all duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(191,67,66,0.35)]"
          >
            <MessageCircle className="h-5 w-5" />
            Reservasi Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const isMobile = useIsMobile();
  return isMobile ? <FinalCTAMobile /> : <FinalCTADesktop />;
}
