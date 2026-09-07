"use client"

import { animated, useSpring, useInView, useTrail } from "@react-spring/web"
import { Check, Camera, Image, Wifi, Palette, Users, Zap, Heart, Award } from "lucide-react"
import { benefits } from "@/lib/config"

const benefitIcons = [Camera, Image, Wifi, Palette, Users, Zap, Heart, Award]

export default function WhyUs() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }))

  const [titleSpring] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  }))

  const trail = useTrail(benefits.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 24,
    config: { tension: 280, friction: 60 },
  })

  return (
    <section className="relative py-20 lg:py-32 texture-diagonal overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={ref}>
          <animated.div style={titleSpring} className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium tracking-wider uppercase text-accent">
              Why Choose Us
            </p>
            <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Why clients{" "}
              <span className="font-elegant italic text-accent">
                love us
              </span>
            </h2>
            <p className="mx-auto max-w-[520px] text-base text-text-secondary leading-normal">
              We deliver more than just photos. We create unforgettable experiences that your guests will remember forever.
            </p>
          </animated.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trail.map((style, i) => {
              const Icon = benefitIcons[i] || Check
              return (
                <animated.div key={benefits[i]} style={style}>
                  <div className="group relative h-full rounded-3xl border border-border bg-surface/40 p-6 transition-all duration-500 hover:border-accent/20 hover:bg-surface/60 hover:shadow-[0_8px_32px_rgba(74,53,40,0.06)] hover:scale-[1.02] active:scale-[0.98]">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-2 font-heading text-base font-semibold text-text-primary">
                      {benefits[i]}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Included</span>
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
