"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { WhatsApp } from "@/components/ui/WhatsAppIcon"
import { siteConfig } from "@/lib/config"
import { smoothScrollTo } from "@/lib/smooth-scroll"
import PortfolioLightbox from "./PortfolioLightbox"
import type { PortfolioImage } from "./PortfolioLightbox"
import { Camera, Star, Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const images: PortfolioImage[] = [
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg", alt: "Dipta & Yulia" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg", alt: "Raka & Devita" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg", alt: "Mepandes" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg", alt: "Pandi & Sukma" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg", alt: "Pandi & Sukma Wedding" },
]

export default function PortfolioGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".pw")
        gsap.set(words, { opacity: 0, y: 30 })
        gsap.to(words, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: headlineRef.current, start: "top 88%", once: true },
        })
      }

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".bento-cell")
        gsap.set(items, { opacity: 0, y: 30, scale: 0.97 })
        gsap.to(items, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.06,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleOpen = useCallback((i: number) => setPreviewIndex(i), [])
  const handleClose = useCallback(() => setPreviewIndex(null), [])
  const handleNav = useCallback((i: number) => setPreviewIndex(i), [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-16 sm:py-20 lg:py-28 texture-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">

        {/* Headline */}
        <div ref={headlineRef} className="mb-10 sm:mb-14 lg:mb-16">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-accent pw">Selected Works</p>
          <h2 className="font-heading text-[28px] sm:text-[36px] lg:text-[48px] font-normal leading-[1.1] text-text-primary">
            <span className="pw block">Every event tells a</span>
            <span className="pw block font-elegant italic text-accent-light">beautiful story.</span>
          </h2>
          <div className="mt-5 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 pw">
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Instagram
            </a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); smoothScrollTo("#pricing", { offset: -64 }) }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-background px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98]">
              Lihat Harga
            </a>
            <a href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking WIMAH Photobooth untuk acara saya.`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 text-accent px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:border-accent hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]">
              <WhatsApp className="h-4 w-4" />
              Booking
            </a>
          </div>
        </div>

        {/* Bento Grid — 60:40 images:text */}
        <div ref={gridRef} className="grid grid-cols-4 sm:grid-cols-12 auto-rows-[100px] sm:auto-rows-[110px] lg:auto-rows-[120px] gap-2.5 sm:gap-3">

          {/* Row 1-3: Image 1 (big) + About box */}
          <BentoImage src={images[0].src} alt={images[0].alt} index={0}
            className="col-span-4 sm:col-span-7 row-span-3" onClick={() => handleOpen(0)} />

          <div className="bento-cell col-span-4 sm:col-span-5 row-span-3 rounded-2xl sm:rounded-3xl bg-accent flex flex-col justify-center p-5 sm:p-7 lg:p-8">
            <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-background/50 mb-2">About WIMAH</p>
            <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-normal text-background leading-snug mb-3">
              Premium photobooth experience for your special moments.
            </h3>
            <p className="text-xs sm:text-sm text-background/60 leading-relaxed mb-4">
              Kami menangkap kebahagiaan, tawa, dan momen tak terlupakan yang membuat acara Anda istimewa.
            </p>
            <a href="#about" onClick={(e) => { e.preventDefault(); smoothScrollTo("#about", { offset: -64 }) }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-background/80 font-medium hover:text-background transition-colors self-start">
              Pelajari lebih lanjut
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Row 4-5: Image 2 + Stats + Quote */}
          <BentoImage src={images[1].src} alt={images[1].alt} index={1}
            className="col-span-2 sm:col-span-4 row-span-2" onClick={() => handleOpen(1)} />

          <div className="bento-cell col-span-2 sm:col-span-4 row-span-2 rounded-2xl sm:rounded-3xl bg-surface border border-border flex flex-col items-center justify-center p-4 sm:p-5 text-center">
            <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-accent mb-2" />
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-text-primary leading-none">500+</p>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">Events Captured</p>
          </div>

          <div className="bento-cell col-span-2 sm:col-span-4 row-span-2 rounded-2xl sm:rounded-3xl bg-surface-secondary/40 border border-border flex flex-col justify-between p-4 sm:p-5">
            <Quote className="h-4 w-4 sm:h-5 sm:w-5 text-accent/30" />
            <div>
              <p className="font-elegant italic text-sm sm:text-base lg:text-lg text-text-primary leading-snug">
                &ldquo;Moment indah yang tak terlupakan, terima kasih WIMAH!&rdquo;
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-gold fill-gold" />
                ))}
              </div>
            </div>
          </div>

          {/* Row 6-7: Image 3 + Image 4 + Image 5 */}
          <BentoImage src={images[2].src} alt={images[2].alt} index={2}
            className="col-span-2 sm:col-span-4 row-span-2" onClick={() => handleOpen(2)} />

          <BentoImage src={images[3].src} alt={images[3].alt} index={3}
            className="col-span-2 sm:col-span-4 row-span-2" onClick={() => handleOpen(3)} />

          <BentoImage src={images[4].src} alt={images[4].alt} index={4}
            className="col-span-4 sm:col-span-4 row-span-2" onClick={() => handleOpen(4)} />

        </div>
      </div>

      {previewIndex !== null && (
        <PortfolioLightbox images={images} currentIndex={previewIndex} onClose={handleClose} onNavigate={handleNav} />
      )}
    </section>
  )
}

function BentoImage({
  src, alt, index, className, onClick,
}: {
  src: string; alt: string; index: number; className?: string; onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 })
    }
  }, [index])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`bento-cell relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group ${className ?? ""}`}
    >
      <Image
        src={src} alt={alt} fill sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-xs sm:text-sm font-heading text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        {alt}
      </span>
    </button>
  )
}
