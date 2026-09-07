"use client"

import { useRef, useEffect } from "react"
import { animated, useSpring, useSpringValue, to } from "@react-spring/web"

const words = ["Moments", "Memories", "Stories", "Forever"]

export default function TypographyStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const raw = useSpringValue(0)
  const [smooth, api] = useSpring(() => ({
    value: 0,
    config: { tension: 120, friction: 30 },
  }))

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const height = el.offsetHeight - window.innerHeight
      const p = height > 0 ? (window.scrollY - top) / height : 0
      const clamped = Math.max(0, Math.min(1, p))
      raw.set(clamped)
      api.start({ value: clamped })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [raw, api])

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
          <div className="absolute inset-0 texture-noise opacity-20" />

          <div className="relative z-10 text-center">
            {words.map((word, i) => {
              const segStart = i * 0.25
              const segEnd = segStart + 0.25

              const wordOpacity = to(smooth.value, [
                Math.max(0, segStart),
                segStart + 0.08,
                segEnd - 0.08,
                Math.min(1, segEnd),
              ], [0, 1, 1, 0])

              const wordScale = to(smooth.value, [
                Math.max(0, segStart),
                segStart + 0.08,
                segEnd - 0.08,
                Math.min(1, segEnd),
              ], [0.7, 1, 1, 1.15])

              const wordY = to(smooth.value, [
                Math.max(0, segStart),
                segStart + 0.08,
                segEnd - 0.08,
                Math.min(1, segEnd),
              ], [60, 0, 0, -60])

              const blur = to(smooth.value, [
                Math.max(0, segStart),
                segStart + 0.1,
                segEnd - 0.1,
                Math.min(1, segEnd),
              ], [12, 0, 0, 12])

              return (
                <animated.div
                  key={word}
                  style={{
                    opacity: wordOpacity,
                    scale: wordScale,
                    y: wordY,
                    filter: to(blur, (v: number) => `blur(${v}px)`),
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="font-heading text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black uppercase tracking-tighter text-text-primary/5">
                    {word}
                  </span>
                </animated.div>
              )
            })}

            <animated.div
              style={{
                opacity: to(smooth.value, [0, 0.05, 0.95, 1], [1, 1, 1, 0]),
              }}
              className="relative z-20"
            >
              <p className="mb-4 text-sm font-medium tracking-wider uppercase text-accent">
                The Journey
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
                From first click{" "}
                <span className="font-elegant italic text-accent">
                  to forever.
                </span>
              </h2>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  )
}
