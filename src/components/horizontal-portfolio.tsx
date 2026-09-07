"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { horizontalImages } from "@/lib/config";
import { useIsMobile } from "@/hooks/use-is-mobile";

function HorizontalPortfolioMobile() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 mb-8">
        <p className="text-sm font-medium tracking-wider uppercase text-accent mb-3">Portofolio</p>
        <h2 className="font-heading text-[32px] font-bold tracking-tight">
          Karya kami <span className="font-elegant italic text-accent-light">berbicara.</span>
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto px-6 snap-x snap-mandatory scrollbar-hide pb-4">
        {horizontalImages.map((item) => (
          <div
            key={item.id}
            className={`shrink-0 w-[260px] ${item.aspect} rounded-3xl overflow-hidden border border-border relative snap-center`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover"
              sizes="260px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function HorizontalPortfolioDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.6]);

  return (
    <section ref={containerRef} className="relative h-[300vh] texture-dots">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

        <motion.div style={{ opacity: headerOpacity }} className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 mb-8">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-3">Portofolio</p>
          <h2 className="font-heading text-[40px] font-bold tracking-tight">
            Karya kami <span className="font-elegant italic text-accent-light">berbicara.</span>
          </h2>
        </motion.div>

        <motion.div style={{ x }} className="relative z-10 flex gap-6 pl-6 lg:pl-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]">
          {horizontalImages.map((item, i) => (
            <motion.div
              key={item.id}
              className={`shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] ${item.aspect} rounded-3xl overflow-hidden border border-border group cursor-pointer relative`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-800 group-hover:scale-105"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm font-medium tracking-wider uppercase text-accent-light mb-1">{item.category}</p>
                <p className="text-base font-semibold text-white">{item.title}</p>
              </div>
            </motion.div>
          ))}
          <div className="shrink-0 w-16" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 mt-8">
          <div className="h-px bg-border w-full max-w-xs mx-auto overflow-hidden rounded-3xl">
            <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-full bg-accent/30 origin-left" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HorizontalPortfolio() {
  const isMobile = useIsMobile();
  return isMobile ? <HorizontalPortfolioMobile /> : <HorizontalPortfolioDesktop />;
}
