"use client";

import { useState } from "react";
import { animated, useSpring, useInView, useTrail } from "@react-spring/web";
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

  const [titleRef, titleInView] = useInView(() => ({ triggerOnce: true }));
  const [filtersRef, filtersInView] = useInView(() => ({ triggerOnce: true }));
  const [gridRef, gridInView] = useInView(() => ({
    triggerOnce: true,
    amount: 0.1,
  }));

  const titleSpring = useSpring({
    opacity: titleInView ? 1 : 0,
    y: titleInView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  });

  const filtersSpring = useSpring({
    opacity: filtersInView ? 1 : 0,
    y: filtersInView ? 0 : 20,
    config: { tension: 280, friction: 60 },
  });

  const cardSprings = useTrail(portfolioImages.length, {
    opacity: gridInView ? 1 : 0,
    scale: gridInView ? 1 : 0.9,
    config: { tension: 280, friction: 60 },
  });

  const lightboxSpring = useSpring({
    opacity: selectedImage ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  const lightboxImageSpring = useSpring({
    scale: selectedImage ? 1 : 0.8,
    opacity: selectedImage ? 1 : 0,
    config: { tension: 280, friction: 60 },
  });

  const filteredImages =
    activeCategory === "All"
      ? portfolioImages
      : portfolioImages.filter(
          (img) => img.category === categoryMap[activeCategory]
        );

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 texture-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <animated.div
          ref={titleRef}
          style={titleSpring}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Our <span className="italic text-accent-light">portfolio.</span>
          </h2>
        </animated.div>

        <animated.div
          ref={filtersRef}
          style={filtersSpring}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                activeCategory === cat
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-surface/50 text-text-secondary hover:border-accent/50 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </animated.div>

        <div ref={gridRef} className="columns-2 gap-4 lg:columns-3">
          {portfolioImages.map((image, index) => (
            <animated.div
              key={image.id}
              style={cardSprings[index]}
              className="mb-4 break-inside-avoid"
            >
              <div
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-border hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(95,101,88,0.08)] hover:border-accent/20 transition-all duration-300 ${
                  filteredImages.some((fi) => fi.id === image.id)
                    ? "block"
                    : "hidden"
                }`}
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
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-2 text-xs font-medium uppercase tracking-widest text-accent-light">
                    {image.category}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {image.title}
                  </span>
                  <ExternalLink className="mt-3 h-5 w-5 text-white/80" />
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <animated.div
          style={lightboxSpring}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <animated.div
            style={lightboxImageSpring}
            className="relative max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={1500}
              className="rounded-3xl object-contain"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {selectedImage.title}
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-accent hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </animated.div>
        </animated.div>
      )}
    </section>
  );
}
