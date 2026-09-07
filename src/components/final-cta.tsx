"use client"

import { animated, useSpring, useInView } from "@react-spring/web"
import { siteConfig } from "@/lib/config"
import { ArrowRight } from "lucide-react"

export default function FinalCta() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }))
  const spring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 40,
    config: { tension: 280, friction: 60 },
  })

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-32 texture-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[800px] px-6 lg:px-8 text-center">
        <animated.div style={spring}>
          <h2 className="mb-8 font-heading text-[32px] sm:text-[44px] lg:text-[56px] font-bold leading-tight text-text-primary">
            Because every meaningful moment{" "}
            <span className="font-elegant italic text-accent-light">
              deserves to be remembered
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-[480px] text-base text-text-secondary leading-normal">
            Reserve your date today and create unforgettable memories with your
            guests.
          </p>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-background transition-colors duration-300 hover:bg-accent-light"
          >
            Book Your Date
            <ArrowRight className="h-5 w-5" />
          </a>
        </animated.div>
      </div>
    </section>
  )
}
