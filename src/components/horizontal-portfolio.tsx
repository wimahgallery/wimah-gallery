"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const horizontalItems = [
  { id: 1, category: "Wedding", title: "Sarah & Michael", color: "from-accent/20 to-surface", aspect: "aspect-[3/4]" },
  { id: 2, category: "Corporate", title: "Annual Gala Night", color: "from-surface-secondary to-accent/10", aspect: "aspect-[4/3]" },
  { id: 3, category: "Birthday", title: "Angela's Sweet 17", color: "from-accent/15 to-surface-secondary", aspect: "aspect-[3/4]" },
  { id: 4, category: "Graduation", title: "Class of 2026", color: "from-accent/10 to-surface", aspect: "aspect-[4/3]" },
  { id: 5, category: "Wedding", title: "Dewi & Raka", color: "from-surface to-accent/15", aspect: "aspect-[3/4]" },
  { id: 6, category: "Corporate", title: "Product Launch", color: "from-accent/5 to-surface-secondary", aspect: "aspect-[4/3]" },
  { id: 7, category: "Wedding", title: "Rina & David", color: "from-surface-secondary via-accent/10 to-surface", aspect: "aspect-[3/4]" },
  { id: 8, category: "Birthday", title: "Baby Shower Joy", color: "from-accent/15 to-surface", aspect: "aspect-[4/3]" },
];

export function HorizontalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.6]);

  return (
    <section ref={containerRef} className="relative h-[300vh] texture-dots">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

        <motion.div style={{ opacity: headerOpacity }} className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 mb-8">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-3">Portfolio</p>
          <h2 className="font-heading text-[40px] font-bold tracking-tight">
            Our <span className="font-elegant italic text-accent-light">work speaks.</span>
          </h2>
        </motion.div>

        <motion.div style={{ x }} className="relative z-10 flex gap-6 pl-6 lg:pl-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]">
          {horizontalItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] ${item.aspect} rounded-3xl overflow-hidden border border-border group cursor-pointer`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`relative w-full h-full bg-gradient-to-br ${item.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-accent/20 group-hover:text-accent/40 transition-all duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <p className="text-sm font-medium tracking-wider uppercase text-accent mb-1">{item.category}</p>
                  <p className="text-base font-semibold text-text-primary">{item.title}</p>
                </div>
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
