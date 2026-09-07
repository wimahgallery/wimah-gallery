"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, FadeInStagger } from "@/components/motion/reveal";
import { Users, Sparkles, Image, Crown } from "lucide-react";

const features = [
  { icon: Users, title: "Tim Profesional", description: "Operator terlatih yang memastikan setiap momen terabadikan dengan sempurna." },
  { icon: Sparkles, title: "Cetakan Kualitas Lab", description: "Cetakan jernih menggunakan peralatan dan kertas kualitas profesional." },
  { icon: Image, title: "Galeri Digital Instan", description: "Akses foto Anda secara online dalam hitungan jam — bagikan dan unduh kapan saja." },
  { icon: Crown, title: "Pengalaman Acara Elegan", description: "Setup premium yang meningkatkan suasana acara dan pengalaman tamu Anda." },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 overflow-hidden texture-dots">
      {/* Parallax warm glows */}
      <motion.div style={{ y: bgY, scale: glowScale, opacity: glowOpacity }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-accent/8 blur-[140px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]) }} className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-light/5 blur-[100px]" />

      {/* Organic decorative blob */}
      <div className="absolute top-20 left-10 w-32 h-32 organic-blob bg-accent/5 animate-warm-pulse" />
      <div className="absolute bottom-20 right-16 w-24 h-24 organic-blob bg-accent/8 animate-warm-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
            Pengalaman Kami
          </p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Lebih dari sekadar{" "}
            <span className="font-elegant italic text-accent-light">cetak foto.</span>
          </h2>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            Kami menciptakan pengalaman yangikenang tamu jauh setelah acara berakhir.
          </p>
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-3xl border border-border bg-surface/50 p-8 card-lift hover:border-accent/20"
            >
              {/* Warm corner glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 border border-accent/10 transition-all duration-500 group-hover:bg-accent/15 group-hover:border-accent/20 group-hover:scale-110">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="relative font-heading text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="relative text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
