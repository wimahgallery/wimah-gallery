"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { pinnedStoryImages } from "@/lib/config"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const storyTexts = [
  { line1: "Every celebration", line2: "begins with a moment." },
  { line1: "Moments become", line2: "memories." },
  { line1: "Memories deserve", line2: "to be shared." },
  { line1: "And remembered", line2: "forever." },
]

export default function PinnedStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[]

      const segDur = 1 / slides.length
      const fadeDur = segDur * 0.12

      slides.forEach((slide, i) => {
        const segStart = i * segDur
        const segEnd = segStart + segDur

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        })

        tl.fromTo(slide, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: fadeDur, ease: "power2.out" }, segStart)
        tl.to(slide, { opacity: 1, scale: 1, duration: segDur - fadeDur * 2, ease: "none" }, segStart + fadeDur)
        tl.to(slide, { opacity: 0, scale: 1.1, duration: fadeDur, ease: "power2.in" }, segEnd - fadeDur)
      })

      texts.forEach((text, i) => {
        const segStart = i * segDur
        const segEnd = segStart + segDur

        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        })

        textTl.fromTo(text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: fadeDur, ease: "power2.out" },
          segStart + fadeDur,
        )
        textTl.to(text,
          { opacity: 0, duration: fadeDur, ease: "power2.in" },
          segEnd - fadeDur,
        )
      })

      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0, duration: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "5% top",
            scrub: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
          <div className="absolute inset-0 texture-noise opacity-30" />

          {pinnedStoryImages.map((image, i) => (
            <div
              key={i}
              ref={(el) => { slideRefs.current[i] = el }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              <div className="relative w-full max-w-4xl px-6">
                <div className="relative overflow-hidden rounded-3xl aspect-[16/10]">
                  <Image
                    src={image.src}
                    alt={image.label}
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div
                  ref={(el) => { textRefs.current[i] = el }}
                  className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16"
                  style={{ opacity: 0 }}
                >
                  <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-light/80">
                    {image.sub}
                  </p>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-snug">
                    {storyTexts[i].line1}
                    <br />
                    <span className="font-elegant italic text-accent-light">
                      {storyTexts[i].line2}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          ))}

          <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs text-text-secondary mb-2 tracking-wider uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
