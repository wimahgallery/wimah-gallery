"use client"

import { useRef, useEffect } from "react"
import { animated, useSpring, useSpringValue, to } from "@react-spring/web"
import { steps } from "@/lib/config"

export default function HowItWorks() {
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

  const lineHeight = to(smooth.value, [0.05, 0.85], ["0%", "100%"])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/3 blur-[160px] pointer-events-none" />

      <div ref={containerRef} className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-medium tracking-wider uppercase text-accent">
            How It Works
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
            From inquiry{" "}
            <span className="font-elegant italic text-accent">
              to celebration.
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <div className="absolute inset-0 bg-border" />
            <animated.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent/60 to-accent"
            />
          </div>

          {/* Timeline line - Mobile */}
          <div className="lg:hidden absolute left-[29px] top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-border" />
            <animated.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent/60 to-accent"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => {
              const stepStart = 0.05 + (i / steps.length) * 0.8
              const stepOpacity = to(smooth.value, [
                Math.max(0, stepStart - 0.05),
                stepStart + 0.05,
              ], [0, 1])
              const stepY = to(smooth.value, [
                Math.max(0, stepStart - 0.05),
                stepStart + 0.05,
              ], [40, 0])
              const stepScale = to(smooth.value, [
                Math.max(0, stepStart - 0.05),
                stepStart + 0.05,
              ], [0.9, 1])
              const isLeft = i % 2 === 0

              return (
                <animated.div
                  key={step.number}
                  style={{ opacity: stepOpacity, y: stepY, scale: stepScale }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                    i < steps.length - 1 ? "lg:mb-20" : ""
                  }`}
                >
                  <div className={`hidden lg:block ${isLeft ? "text-right" : "text-left"}`}>
                    {isLeft ? (
                      <DesktopStep step={step} />
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_20px_rgba(200,112,64,0.15)]">
                      <span className="text-lg font-heading font-bold text-accent">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className={`hidden lg:block ${isLeft ? "" : "text-left"}`}>
                    {!isLeft ? (
                      <DesktopStep step={step} />
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="lg:hidden flex items-start gap-6 py-4">
                    <div className="shrink-0 w-14 h-14 rounded-full border-2 border-accent bg-background flex items-center justify-center z-10 shadow-[0_0_16px_rgba(200,112,64,0.12)]">
                      <span className="text-sm font-heading font-bold text-accent">
                        {step.number}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </animated.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function DesktopStep({ step }: { step: (typeof steps)[number] }) {
  return (
    <div>
      <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">
        {step.title}
      </h3>
      <p className="text-text-secondary leading-relaxed max-w-[320px] inline-block">
        {step.description}
      </p>
    </div>
  )
}
