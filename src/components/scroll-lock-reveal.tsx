"use client"

import { useRef, useEffect } from "react"
import { animated, useSpringValue, to } from "@react-spring/web"
import { Camera, Image, Wifi, Palette, Crown } from "lucide-react"

const cards = [
  {
    icon: Crown,
    title: "Luxury Service",
    description: "Premium setup that elevates your event atmosphere.",
    gradient: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    icon: Camera,
    title: "Premium Experience",
    description: "Professional equipment and operators for flawless results.",
    gradient: "from-accent/15 via-accent/5 to-transparent",
  },
  {
    icon: Image,
    title: "Instant Prints",
    description: "High-quality lab prints your guests take home immediately.",
    gradient: "from-accent/10 via-accent/3 to-transparent",
  },
  {
    icon: Wifi,
    title: "Digital Gallery",
    description: "Instant online access to all photos within hours.",
    gradient: "from-accent/12 via-accent/4 to-transparent",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Personalized frames and backdrops matching your theme.",
    gradient: "from-accent/18 via-accent/5 to-transparent",
  },
]

export default function ScrollLockReveal() {
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
      <div ref={containerRef} className="h-[500vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
          <div className="absolute inset-0 texture-lines opacity-40" />

          <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium tracking-wider uppercase text-accent">
                Our Services
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
                Everything{" "}
                <span className="font-elegant italic text-accent">included.</span>
              </h2>
            </div>

            <div className="relative h-[400px] sm:h-[450px]">
              {cards.map((card, i) => {
                const segStart = i * 0.2
                const segEnd = segStart + 0.2

                const cardOpacity = to(progress, [
                  Math.max(0, segStart),
                  segStart + 0.08,
                  segEnd - 0.08,
                  Math.min(1, segEnd),
                ], [0, 1, 1, 0])

                const cardY = to(progress, [
                  Math.max(0, segStart),
                  segStart + 0.08,
                ], [80, 0])

                const cardScale = to(progress, [
                  Math.max(0, segStart),
                  segStart + 0.08,
                  segEnd - 0.08,
                  Math.min(1, segEnd),
                ], [0.9, 1, 1, 0.95])

                const Icon = card.icon

                return (
                  <animated.div
                    key={card.title}
                    style={{
                      opacity: cardOpacity,
                      y: cardY,
                      scale: cardScale,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-full max-w-[480px]">
                      <div className="relative rounded-3xl border border-border bg-surface/50 p-10 sm:p-12 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

                        <div className="relative z-10">
                          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                            <Icon className="h-8 w-8 text-accent" />
                          </div>

                          <h3 className="mb-3 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
                            {card.title}
                          </h3>

                          <p className="text-base text-text-secondary leading-relaxed max-w-[360px]">
                            {card.description}
                          </p>

                          <div className="mt-8 flex items-center gap-2">
                            <div className="h-1 w-8 rounded-full bg-accent" />
                            <span className="text-xs font-medium uppercase tracking-wider text-accent">
                              Step {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </animated.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
