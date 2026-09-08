"use client"

import { useRef, useEffect } from "react"
import { animated, useSpringValue, to } from "@react-spring/web"
import { siteConfig } from "@/lib/config"
import { ArrowRight } from "lucide-react"

const headlineWords = ["Because", "every", "meaningful", "moment"]
const italicWords = ["deserves", "to", "be", "remembered"]

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const progress = useSpringValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false
    let cachedHeight = el.offsetHeight

    const onResize = () => {
      cachedHeight = el.offsetHeight
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const p = (vh - rect.top) / (vh + cachedHeight)
        progress.set(Math.max(0, Math.min(1, p)))
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [progress])

  const bgScale = to(progress, [0, 1], [1, 1.15])
  const bgOpacity = to(progress, [0, 0.3], [0.3, 1])

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <animated.div
            style={{ scale: bgScale, opacity: bgOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-surface/40 via-accent/8 to-surface/30"
          />
          <div className="absolute inset-0 texture-lines opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5" />

          <div className="relative z-10 mx-auto max-w-[900px] px-6 lg:px-8 text-center">
            <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Ready to Create Memories?
            </p>

            <h2 className="mb-8 font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-normal leading-tight text-text-primary">
              {headlineWords.map((word, i) => {
                const wordStart = 0.05 + i * 0.06
                const wordOpacity = to(progress, [
                  wordStart,
                  wordStart + 0.08,
                ], [0, 1])
                const wordY = to(progress, [
                  wordStart,
                  wordStart + 0.08,
                ], [20, 0])

                return (
                  <animated.span
                    key={i}
                    style={{ opacity: wordOpacity, y: wordY }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </animated.span>
                )
              })}
              <br />
              {italicWords.map((word, i) => {
                const wordStart = 0.3 + i * 0.06
                const wordOpacity = to(progress, [
                  wordStart,
                  wordStart + 0.08,
                ], [0, 1])
                const wordY = to(progress, [
                  wordStart,
                  wordStart + 0.08,
                ], [20, 0])

                return (
                  <animated.span
                    key={i}
                    style={{ opacity: wordOpacity, y: wordY }}
                    className="inline-block font-elegant italic text-accent mr-[0.3em]"
                  >
                    {word}
                  </animated.span>
                )
              })}
            </h2>

            <animated.p
              style={{
                opacity: to(progress, [0.5, 0.6], [0, 1]),
                y: to(progress, [0.5, 0.6], [30, 0]),
              }}
              className="mx-auto mb-12 max-w-[480px] text-base text-text-secondary leading-relaxed"
            >
              Reserve your date today and create unforgettable memories with your
              guests.
            </animated.p>

            <animated.a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                opacity: to(progress, [0.6, 0.7], [0, 1]),
                y: to(progress, [0.6, 0.7], [30, 0]),
                scale: to(progress, [0.6, 0.7], [0.9, 1]),
              }}
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-semibold text-background transition-[transform,colors] duration-300 hover:bg-accent-light hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_4px_24px_rgba(124,132,114,0.3)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Book Your Date
              <ArrowRight className="h-5 w-5" />
            </animated.a>
          </div>
        </div>
      </div>
    </section>
  )
}
