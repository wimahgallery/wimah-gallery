"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/motion/reveal";
import { ZoomIn, X } from "lucide-react";
import { portfolioImages } from "@/lib/config";

const categories = ["Semua", "Pernikahan", "Korporat", "Ulang Tahun", "Wisuda", "Lamaran"];

function FloatingCard({ item, onClick }: { item: (typeof portfolioImages)[number]; onClick: () => void }) {
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
      className="mb-4 break-inside-avoid cursor-pointer group"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`relative w-full overflow-hidden rounded-3xl border border-border transition-all duration-300 hover:border-accent/20 hover:shadow-[0_8px_48px_rgba(61,43,37,0.12)] ${item.aspect}`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-800 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium tracking-wider uppercase text-accent-light mb-1">{item.category}</p>
          <p className="text-base font-medium text-white">{item.title}</p>
        </div>
        <div className="absolute top-4 right-4 h-10 w-10 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <ZoomIn className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = activeCategory === "Semua" ? portfolioImages : portfolioImages.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden texture-dots">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-12">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Portofolio</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Karya kami <span className="font-elegant italic text-accent-light">berbicara.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-3xl px-6 py-3 text-sm font-medium transition-all duration-300 ${
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
              className="absolute top-6 right-6 h-12 w-12 rounded-3xl border border-border bg-surface/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-surface transition-colors duration-300"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[900px] rounded-[40px] overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox !== null && (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={portfolioImages.find((p) => p.id === lightbox)?.src || ""}
                    alt={portfolioImages.find((p) => p.id === lightbox)?.title || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 900px) 100vw, 900px"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
