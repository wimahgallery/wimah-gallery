"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FadeIn } from "@/components/motion/reveal";
import { ZoomIn, X } from "lucide-react";

const categories = ["All", "Wedding", "Corporate", "Birthday", "Graduation", "Engagement"];

const portfolioItems = [
  { id: 1, category: "Wedding", title: "Sarah & Michael", color: "from-accent/20 to-surface" },
  { id: 2, category: "Corporate", title: "Annual Gala Night", color: "from-surface-secondary to-accent/10" },
  { id: 3, category: "Birthday", title: "Angela's Sweet 17", color: "from-accent/15 to-surface-secondary" },
  { id: 4, category: "Wedding", title: "Dewi & Raka", color: "from-surface to-accent/10" },
  { id: 5, category: "Graduation", title: "Class of 2026", color: "from-accent/10 to-surface" },
  { id: 6, category: "Engagement", title: "Luna & Andre", color: "from-surface-secondary to-accent/15" },
  { id: 7, category: "Corporate", title: "Product Launch", color: "from-accent/5 to-surface-secondary" },
  { id: 8, category: "Wedding", title: "Rina & David", color: "from-surface to-accent/20" },
  { id: 9, category: "Birthday", title: "Baby Shower Joy", color: "from-accent/15 to-surface" },
];

function FloatingCard({ item, onClick }: { item: (typeof portfolioItems)[number]; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), { stiffness: 200, damping: 30 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="mb-4 break-inside-avoid cursor-pointer group aspect-[4/3]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative w-full h-full min-h-[250px] overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${item.color} transition-all duration-200 hover:border-accent/20 hover:shadow-[0_8px_48px_rgba(61,43,37,0.12)]`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-accent/20 group-hover:text-accent/40 transition-all duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-1">{item.category}</p>
          <p className="text-base font-medium text-text-primary">{item.title}</p>
        </div>
        <div className="absolute top-4 right-4 h-10 w-10 rounded-3xl bg-text-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100">
          <ZoomIn className="h-5 w-5 text-text-primary" />
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden texture-dots">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-12">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Portfolio</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Our <span className="font-elegant italic text-accent-light">work speaks.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-3xl px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-accent text-background shadow-[0_4px_24px_rgba(191,67,66,0.2)]"
                    : "border border-border text-text-secondary hover:border-accent/30 hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <FloatingCard key={item.id} item={item} onClick={() => setLightbox(item.id)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/80 backdrop-blur-xl p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 right-6 h-12 w-12 rounded-3xl border border-border bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-surface transition-colors duration-200"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[700px] aspect-[4/3] rounded-[40px] bg-surface border border-border flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-accent/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                <p className="text-text-secondary text-sm">{portfolioItems.find((p) => p.id === lightbox)?.title}</p>
                <p className="text-text-secondary/60 text-sm mt-1">{portfolioItems.find((p) => p.id === lightbox)?.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
