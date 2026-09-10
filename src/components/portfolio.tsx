"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { WhatsApp } from "@/components/whatsapp-icon"
import { siteConfig } from "@/lib/config"
import { smoothScrollTo } from "@/lib/smooth-scroll"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState, useCallback } from "react"
import { X, Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg", alt: "Dipta & Yulia" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg", alt: "Raka & Devita" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg", alt: "Mepandes" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg", alt: "Pandi & Sukma" },
  { src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg", alt: "Pandi & Sukma Wedding" },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null)

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleDownload = useCallback(async (src: string, alt: string) => {
    const res = await fetch(src)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${alt.replace(/\s+/g, "_")}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  useEffect(() => {
    if (preview) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [preview])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-14 sm:py-20 lg:py-28 texture-dots overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">

        {/* Text */}
        <div ref={textRef} className="text-center lg:text-left lg:mb-12">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-accent">Our Work</p>
          <h2 className="mb-5 font-heading text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-tight text-text-primary">
            Every event tells a{" "}
            <span className="font-elegant italic text-accent-light">beautiful story.</span>
          </h2>
          <p className="mb-8 mx-auto max-w-[420px] text-sm sm:text-base text-text-secondary leading-relaxed lg:mx-0">
            From weddings to corporate galas, we capture the joy, laughter, and
            unforgettable moments that make your event truly special.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="relative mt-10 lg:mt-0">
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 sm:gap-5">
              {images.map((img, i) => (
                <div key={i} className="shrink-0 w-[30%] sm:w-[220px] lg:w-[260px]">
                  <button
                    type="button"
                    onClick={() => setPreview(img)}
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 cursor-pointer w-full"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 220px, 260px"
                        className="object-cover"
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-5">
            {images.map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-accent/25" />
            ))}
          </div>
        </div>

      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleDownload(preview.src, preview.alt)
            }}
            className="absolute top-4 right-16 sm:top-6 sm:right-20 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Download className="h-5 w-5" />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={preview.src}
              alt={preview.alt}
              width={1200}
              height={1600}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
            />
            <p className="mt-3 text-center text-sm text-white/70 font-heading">{preview.alt}</p>
          </div>
        </div>
      )}
    </section>
  )
}
