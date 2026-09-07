"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

const words = [
  { text: "Because", special: false },
  { text: "every", special: false },
  { text: "meaningful", special: true },
  { text: "moment", special: false },
  { text: "deserves", special: false },
  { text: "to", special: false },
  { text: "be", special: false },
  { text: "remembered.", special: true },
];

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

export function FinalCTA() {
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

      <div className="relative z-10 mx-auto max-w-[700px] px-6 lg:px-8 text-center py-32 w-full">
        <p className="text-sm font-medium tracking-wider uppercase text-accent mb-8">
          Ready to Create Memories?
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
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-lg text-text-secondary leading-relaxed mb-12"
        >
          Reserve your date today and create unforgettable memories with your guests.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={`${siteConfig.whatsappLink}?text=Hi! I'd like to book Wimah Gallery for my upcoming event.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-3xl bg-accent px-8 py-4 text-base font-semibold text-background transition-all duration-200 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(191,67,66,0.35)]"
          >
            <MessageCircle className="h-5 w-5" />
            Book Your Date
          </a>
        </motion.div>
      </div>
    </section>
  );
}
