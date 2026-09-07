"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const wordData = [
  { word: "MEMORIES", display: "Memories.", special: false },
  { word: "MOMENTS", display: "Moments.", special: false },
  { word: "STORIES", display: "Stories.", special: false },
  { word: "FOREVER", display: "forever.", special: true },
];

function TypographyWord({
  word,
  display,
  special,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  display: string;
  special: boolean;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const mid = start + 0.5 / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, mid, end - 0.05, end], [0, 1, 1, 1, index === total - 1 ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.05, mid, end - 0.05, end], [0.9, 1, 1, 1, index === total - 1 ? 1.05 : 1]);
  const y = useTransform(scrollYProgress, [start, start + 0.05, mid, end], [32, 0, 0, -24]);

  return (
    <motion.div style={{ opacity, scale, y }} className="absolute inset-0 flex items-center justify-center">
      <span className="font-heading text-[15vw] sm:text-[12vw] font-black tracking-tighter text-text-primary select-none leading-none">{word}</span>
      <span className="absolute font-heading text-[40px] sm:text-[56px] lg:text-[72px] font-bold tracking-tight text-text-primary">
        {special ? (
          <>{display.slice(0, -1)}<span className="font-elegant italic text-accent-light">.</span></>
        ) : display}
      </span>
    </motion.div>
  );
}

export function TypographyTransitions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  return (
    <section ref={containerRef} className="relative h-[300vh] texture-dots">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="relative z-10 w-full">
          {wordData.map((w, i) => (
            <TypographyWord key={w.word} word={w.word} display={w.display} special={w.special} index={i} total={wordData.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
