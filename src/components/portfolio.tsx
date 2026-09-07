"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioImages } from "@/lib/config";
import { ExternalLink, X } from "lucide-react";

const categories = [
  "All",
  "Wedding",
  "Corporate",
  "Birthday",
  "Graduation",
  "Engagement",
] as const;

const categoryMap: Record<string, string> = {
  All: "",
  Wedding: "Pernikahan",
  Corporate: "Korporat",
  Birthday: "Ulang Tahun",
  Graduation: "Wisuda",
  Engagement: "Lamaran",
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<
    (typeof portfolioImages)[0] | null
  >(null);

  const filteredImages =
    activeCategory === "All"
      ? portfolioImages
      : portfolioImages.filter(
          (img) => img.category === categoryMap[activeCategory]
        );

  return (
    <section id="portfolio" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 texture-lines opacity-30" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-elegant text-5xl font-bold text-text-primary md:text-6xl">
            Our <span className="italic text-accent-light">portfolio.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "border-accent bg-accent/20 text-accent-light"
                  : "border-border bg-surface/50 text-text-secondary hover:border-accent/50 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="columns-2 gap-4 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="mb-4 break-inside-avoid"
              >
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={800}
                      height={1000}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${image.aspect}`}
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="mb-2 text-xs font-medium uppercase tracking-widest text-accent-light">
                      {image.category}
                    </span>
                    <span className="text-lg font-semibold text-text-primary">
                      {image.title}
                    </span>
                    <ExternalLink className="mt-3 h-5 w-5 text-text-secondary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] max-w-[85vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={1500}
                className="rounded-2xl object-contain"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-sm text-text-primary backdrop-blur-sm">
                {selectedImage.title}
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:bg-accent hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
