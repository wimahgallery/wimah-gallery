"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WhatsApp } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/lib/config";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import PortfolioLightbox from "./PortfolioLightbox";
import type { PortfolioImage } from "./PortfolioLightbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images: PortfolioImage[] = [
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
    alt: "Dipta & Yulia",
    description: "Wedding Reception",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
    alt: "Raka & Devita",
    description: "Pawiwahan",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
    alt: "Keluarga Dayu Ardiati",
    description: "Reception Mepandes",
  },

  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
    alt: "Pandi & Sukma",
    description: "Wedding Reception",
  },
];

export default function PortfolioGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setPrevEnabled(emblaApi.canScrollPrev());
      setNextEnabled(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".pw");
        gsap.set(words, { opacity: 0, y: 30 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      if (carouselWrapRef.current) {
        gsap.fromTo(
          carouselWrapRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: carouselWrapRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [emblaRef, carouselWrapRef]);

  const handleOpen = useCallback((i: number) => setPreviewIndex(i), []);
  const handleClose = useCallback(() => setPreviewIndex(null), []);
  const handleNav = useCallback((i: number) => setPreviewIndex(i), []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 texture-dots"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="mb-10 sm:mb-14 lg:mb-16">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-accent pw">
            Selected Works
          </p>
          <h2 className="font-heading text-[28px] sm:text-[36px] lg:text-[48px] font-normal leading-[1.1] text-text-primary">
            <span className="pw block">Every event tells a</span>
            <span className="pw block font-elegant italic text-accent-light">
              beautiful story.
            </span>
          </h2>
          <div className="mt-5 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 pw">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Instagram
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#pricing", { offset: -64 });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-background px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Lihat Harga
            </a>
            <a
              href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking WIMAH Photobooth untuk acara saya.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 text-accent px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:border-accent hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <WhatsApp className="h-4 w-4" />
              Booking
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 sm:-mx-6 lg:mx-0" ref={carouselWrapRef}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 px-1.5">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative flex-none w-[88vw] sm:w-screen lg:w-[30vw] cursor-pointer group"
                  onClick={() => handleOpen(i)}
                >
                  <div className="relative h-[70vh] sm:h-[60vh] lg:h-[450px] overflow-hidden rounded-2xl bg-surface-secondary/30">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="font-heading text-base sm:text-lg lg:text-xl font-normal text-white leading-snug">
                        {img.alt}
                      </h3>
                      {img.description && (
                        <p className="mt-1 text-xs sm:text-sm text-white/70">
                          {img.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-2 pointer-events-none">
            <button
              type="button"
              onClick={scrollPrev}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-text-primary shadow-lg backdrop-blur-sm transition-[colors,transform] duration-300 hover:bg-white hover:scale-105 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-text-primary shadow-lg backdrop-blur-sm transition-[colors,transform] duration-300 hover:bg-white hover:scale-105 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-accent"
                    : "w-2 bg-border hover:bg-accent/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {previewIndex !== null && (
        <PortfolioLightbox
          images={images}
          currentIndex={previewIndex}
          onClose={handleClose}
          onNavigate={handleNav}
        />
      )}
    </section>
  );
}
