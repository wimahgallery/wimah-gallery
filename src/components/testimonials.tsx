"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/motion/reveal";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/config";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
  };

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden texture-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      {/* Parallax warm glows */}
      <motion.div style={{ y: bgY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[140px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]) }} className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-accent-light/4 blur-[100px]" />

      {/* Organic decorative elements */}
      <div className="absolute top-40 left-20 w-16 h-16 organic-blob bg-accent/5 animate-warm-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Testimoni</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Apa kata klien kami{" "}
            <span className="font-elegant italic text-accent-light">tentang kami.</span>
          </h2>
        </FadeIn>

        <motion.div style={{ y: cardY }} className="max-w-[700px] mx-auto">
          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <div className="relative rounded-3xl border border-border bg-surface/50 p-8 sm:p-12 text-center shadow-[0_8px_40px_rgba(61,43,37,0.08)]">
                  {/* Warm decorative corner glow */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-accent/5 blur-3xl" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-accent-light/5 blur-3xl" />

                  <Quote className="absolute top-6 left-8 h-8 w-8 text-accent/10" />
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl text-text-primary leading-relaxed mb-8 relative">
                    &ldquo;{t.review}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-heading text-base font-semibold">{t.name}</p>
                    <p className="text-sm text-accent">{t.event}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-all duration-500 hover:border-accent/30 hover:text-accent hover:scale-110"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-3xl transition-all duration-500 ${
                    i === current ? "w-8 bg-accent" : "w-2 bg-border hover:bg-accent/30"
                  }`}
                  aria-label={`Ke testimoni ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-all duration-500 hover:border-accent/30 hover:text-accent hover:scale-110"
              aria-label="Testimoni berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
