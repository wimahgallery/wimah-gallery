"use client"

import { useRef, useEffect } from "react"
import { animated, useSpringValue, to } from "@react-spring/web"
import Image from "next/image"
import { pinnedStoryImages } from "@/lib/config"

const storyTexts = [
  { line1: "Every celebration", line2: "begins with a moment." },
  { line1: "Moments become", line2: "memories." },
  { line1: "Memories deserve", line2: "to be shared." },
  { line1: "And remembered", line2: "forever." },
]

export default function PinnedStory() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const progress = useSpringValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const height = el.offsetHeight - window.innerHeight
      const p = height > 0 ? (window.scrollY - top) / height : 0
      progress.set(Math.max(0, Math.min(1, p)))
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [progress])

  return (
    <section className="relative">
      <div ref={containerRef} className="h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
          <div className="absolute inset-0 texture-noise opacity-30" />

          {pinnedStoryImages.map((image, i) => {
            const segStart = i * 0.25
            const segEnd = segStart + 0.25

            const opacity = to(progress, [
              Math.max(0, segStart - 0.05),
              segStart + 0.05,
              segEnd - 0.05,
              Math.min(1, segEnd + 0.05),
            ], [0, 1, 1, 0])

            const scale = to(progress, [
              Math.max(0, segStart - 0.05),
              segStart + 0.05,
              segEnd - 0.05,
              Math.min(1, segEnd + 0.05),
            ], [0.85, 1, 1, 1.1])

            const textOpacity = to(progress, [
              segStart + 0.03,
              segStart + 0.1,
              segEnd - 0.1,
              segEnd - 0.03,
            ], [0, 1, 1, 0])

            const textY = to(progress, [
              segStart + 0.03,
              segStart + 0.1,
            ], [30, 0])

            return (
              <animated.div
                key={i}
                style={{ opacity, scale }}
                className="absolute inset-0 flex items-center justify-center"
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

                  <animated.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16"
                  >
                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-light/80">
                      {image.sub}
                    </p>
                    <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {storyTexts[i].line1}
                      <br />
                      <span className="font-elegant italic text-accent-light">
                        {storyTexts[i].line2}
                      </span>
                    </h3>
                  </animated.div>
                </div>
              </animated.div>
            )
          })}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <animated.div
              style={{
                opacity: to(progress, [0, 0.05, 0.9, 1], [1, 0.6, 0.6, 0]),
              }}
              className="flex flex-col items-center"
            >
              <span className="text-xs text-text-secondary mb-2 tracking-wider uppercase">
                Scroll to explore
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  )
}
