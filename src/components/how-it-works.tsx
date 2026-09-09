"use client"

import { useRef, useEffect } from "react"
import { steps } from "@/lib/config"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1, ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 80%",
              scrub: 0.3,
            },
          }
        )
      }

      const stepEls = stepRefs.current.filter(Boolean) as HTMLDivElement[]
      stepEls.forEach((step) => {
        gsap.fromTo(step,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-accent/5 pointer-events-none" />

      <div className="relative mx-auto max-w-[800px] px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
            How It Works
          </p>
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            From inquiry{" "}
            <span className="font-elegant italic text-accent">
              to celebration.
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent/60 to-accent origin-top"
              style={{ height: "100%", transform: "scaleY(0)" }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el }}
              className={`relative flex items-start gap-6 ${
                i < steps.length - 1 ? "pb-10 lg:pb-12" : ""
              }`}
              style={{ opacity: 0 }}
            >
              <div className="relative z-10 shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_20px_rgba(124,132,114,0.12)]">
                <span className="font-heading text-base font-normal text-accent">
                  {step.number}
                </span>
              </div>

              <div className="pt-2.5">
                <h3 className="font-heading text-xl font-normal text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
