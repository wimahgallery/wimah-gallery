"use client"

import { animated, to } from "@react-spring/web"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

const words = ["Moments", "Memories", "Stories", "Forever"]

export default function TypographyStorytelling() {
  const { containerRef, smooth } = useScrollProgress()

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
          <div className="absolute inset-0 texture-noise opacity-20" />

          <div className="relative z-10 w-full">
            {/* Giant words that cross-fade */}
            <div className="relative h-[200px] sm:h-[260px] md:h-[300px] flex items-center justify-center">
              {words.map((word, i) => {
                const segStart = i * 0.25
                const segEnd = segStart + 0.25

                const wordOpacity = to(smooth.value, [
                  Math.max(0, segStart),
                  segStart + 0.1,
                  segEnd - 0.1,
                  Math.min(1, segEnd),
                ], [0, 1, 1, 0])

                const wordScale = to(smooth.value, [
                  Math.max(0, segStart),
                  segStart + 0.1,
                  segEnd - 0.1,
                  Math.min(1, segEnd),
                ], [0.85, 1, 1, 1.05])

                const wordY = to(smooth.value, [
                  Math.max(0, segStart),
                  segStart + 0.1,
                  segEnd - 0.1,
                  Math.min(1, segEnd),
                ], [50, 0, 0, -50])

                return (
                  <animated.div
                    key={word}
                    style={{
                      opacity: wordOpacity,
                      scale: wordScale,
                      y: wordY,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="font-heading text-[64px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-normal uppercase tracking-tight text-text-primary">
                      {word}
                    </span>
                  </animated.div>
                )
              })}
            </div>

            {/* Subtitle */}
            <animated.div
              style={{
                opacity: to(smooth.value, [0, 0.05, 0.95, 1], [1, 1, 1, 0]),
              }}
              className="mt-8 text-center"
            >
              <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
                The Journey
              </p>
              <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
                From first click{" "}
                <span className="font-elegant italic text-accent">
                  to forever.
                </span>
              </h2>
            </animated.div>

            {/* Scroll hint */}
            <animated.div
              style={{
                opacity: to(smooth.value, [0, 0.05, 0.9, 1], [0.8, 0.4, 0.4, 0]),
              }}
              className="mt-16 flex justify-center"
            >
              <div className="flex flex-col items-center">
                <span className="text-xs text-text-secondary mb-2 tracking-wider uppercase">
                  Scroll down
                </span>
                <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  )
}
