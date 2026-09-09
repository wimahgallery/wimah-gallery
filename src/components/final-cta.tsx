"use client"

import { useRef, useEffect } from "react"
import { siteConfig } from "@/lib/config"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const headlineWords = ["Because", "every", "meaningful", "moment"]
const italicWords = ["deserves", "to", "be", "remembered"]

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { scale: 1, opacity: 0.3 },
          {
            scale: 1.15, opacity: 1, ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          }
        )
      }

      if (headlineRef.current) {
        const spans = headlineRef.current.querySelectorAll("span[data-word]")
        gsap.fromTo(spans,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, stagger: 0.06, ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "50% top",
              scrub: 0.5,
            },
          }
        )
      }

      if (paraRef.current) {
        gsap.fromTo(paraRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "40% top",
              end: "60% top",
              scrub: 0.5,
            },
          }
        )
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "50% top",
              end: "70% top",
              scrub: 0.5,
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div
            ref={bgRef}
            className="absolute inset-0 bg-gradient-to-b from-surface/40 via-accent/8 to-surface/30"
            style={{ opacity: 0.3 }}
          />
          <div className="absolute inset-0 texture-lines opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5" />

          <div className="relative z-10 mx-auto max-w-[900px] px-6 lg:px-8 text-center">
            <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Ready to Create Memories?
            </p>

            <h2 ref={headlineRef} className="mb-8 font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-normal leading-tight text-text-primary">
              {headlineWords.map((word, i) => (
                <span key={i} data-word className="inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
              <br />
              {italicWords.map((word, i) => (
                <span key={i} data-word className="inline-block font-elegant italic text-accent mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h2>

            <p
              ref={paraRef}
              className="mx-auto mb-12 max-w-[480px] text-base text-text-secondary leading-relaxed"
              style={{ opacity: 0 }}
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
              style={{ opacity: 0 }}
            >
              Book Your Date
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
