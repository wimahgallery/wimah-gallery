"use client"

import { useRef, useEffect } from "react"
import { siteConfig } from "@/lib/config"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const allWords = [
  { text: "Because", italic: false },
  { text: "every", italic: false },
  { text: "meaningful", italic: false },
  { text: "moment", italic: false },
  { text: "deserves", italic: true },
  { text: "to", italic: true },
  { text: "be", italic: true },
  { text: "remembered", italic: true },
]

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })

      tl.fromTo(bgRef.current,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1.1, duration: 0.8, ease: "power2.out" },
        0
      )

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: "power2.out" },
        0
      )

      wordsRef.current.forEach((word, i) => {
        if (!word) return
        tl.fromTo(word,
          { opacity: 0.1, y: 24, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3, ease: "power2.out" },
          0.05 + i * 0.07
        )
      })

      tl.fromTo(paraRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.6
      )

      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
        0.75
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32">
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-gradient-to-b from-surface/40 via-accent/10 to-surface/30"
        />
        <div className="absolute inset-0 texture-lines opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-6 lg:px-8 text-center">
        <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-accent">
          Ready to Create Memories?
        </p>

        <h2 className="mb-8 font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-normal leading-tight text-text-primary">
          {allWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el }}
              className={`inline-block mr-[0.3em] ${word.italic ? "font-elegant italic text-accent" : ""}`}
            >
              {word.text}
            </span>
          ))}
        </h2>

        <div ref={lineRef} className="mx-auto mb-12 h-px w-24 origin-left bg-accent/40" />

        <p
          ref={paraRef}
          className="mx-auto mb-12 max-w-[480px] text-base text-text-secondary leading-relaxed"
        >
          Reserve your date today and create unforgettable memories with your
          guests.
        </p>

        <a
          ref={ctaRef}
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-semibold text-background transition-[transform,colors] duration-300 hover:bg-accent-light hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_4px_24px_rgba(124,132,114,0.3)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Book Your Date
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
