"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const words = ["Moments", "Memories", "Stories", "Forever"]

export default function TypographyStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLDivElement | null)[]>([])
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = wordRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!wordEls.length || !containerRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      })

      const wordDur = 1 / words.length
      const fadeDur = wordDur * 0.15

      wordEls.forEach((word, i) => {
        const segStart = i * wordDur
        const segEnd = segStart + wordDur

        tl.fromTo(word,
          { opacity: 0, scale: 0.85, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: fadeDur, ease: "power2.out" },
          segStart
        )
        tl.to(word,
          { opacity: 1, scale: 1, y: 0, duration: wordDur - fadeDur * 2, ease: "none" },
          segStart + fadeDur
        )
        tl.to(word,
          { opacity: 0, scale: 1.05, y: -50, duration: fadeDur, ease: "power2.in" },
          segEnd - fadeDur
        )
      })

      const lastWordEnd = 1 * wordDur

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          lastWordEnd - 0.08
        )
      }

      if (scrollHintRef.current) {
        tl.to(scrollHintRef.current,
          { opacity: 0, duration: 0.04, ease: "power2.in" },
          0.02
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
          <div className="absolute inset-0 texture-noise opacity-20" />

          <div className="relative z-10 w-full">
            <div className="relative h-[160px] sm:h-[260px] md:h-[300px] flex items-center justify-center">
              {words.map((word, i) => (
                <div
                  key={word}
                  ref={(el) => { wordRefs.current[i] = el }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <span className="font-heading text-[48px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-normal uppercase tracking-tight text-text-primary">
                    {word}
                  </span>
                </div>
              ))}
            </div>

            <div ref={subtitleRef} className="mt-6 sm:mt-8 text-center" style={{ opacity: 0 }}>
              <p className="mb-3 sm:mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
                The Journey
              </p>
              <h2 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
                From first click{" "}
                <span className="font-elegant italic text-accent">
                  to forever.
                </span>
              </h2>
            </div>

            <div ref={scrollHintRef} className="mt-10 sm:mt-16 flex justify-center">
              <div className="flex flex-col items-center">
                <span className="text-xs text-text-secondary mb-2 tracking-wider uppercase">
                  Scroll down
                </span>
                <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-accent/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
