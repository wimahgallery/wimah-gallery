"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, FadeInStagger } from "@/components/motion/reveal";
import { Check } from "lucide-react";

const benefits = [
  "Cetakan Instan", "Galeri Digital", "GIF & Boomerang", "Desain Frame Kustom",
  "Operator Ramah", "Setup Cepat", "Fun Unlimited", "Peralatan Berkualitas Tinggi",
];

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden texture-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      {/* Parallax warm glows */}
      <motion.div style={{ y: bgY }} className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]) }} className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-light/5 blur-[100px]" />

      {/* Organic decorative elements */}
      <div className="absolute top-32 right-20 w-20 h-20 organic-blob bg-accent/5 animate-warm-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: leftY }}>
            <FadeIn>
              <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
                Mengapa Pilih Kami
              </p>
              <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
                Mengapa klien{" "}
                <span className="font-elegant italic text-accent-light">menyukai kami.</span>
              </h2>
              <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-[700px]">
                Kami memperhatikan setiap detail sehingga acara Anda sempurna. Dari
                konsultasi pertama hingga cetakan terakhir, kami menghadirkan pengalaman yang
                melampaui ekspektasi.
              </p>
            </FadeIn>
          </motion.div>

          <motion.div style={{ y: rightY }}>
            <FadeInStagger className="grid grid-cols-2 gap-4" stagger={0.08}>
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="group flex items-center gap-3 rounded-3xl border border-border bg-surface/30 px-6 py-4 card-lift hover:border-accent/20"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-3xl bg-accent/15 transition-all duration-500 group-hover:bg-accent/25 group-hover:scale-110">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{benefit}</span>
                </div>
              ))}
            </FadeInStagger>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
