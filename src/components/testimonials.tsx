"use client"

import { animated, useSpring, useInView } from "@react-spring/web"
import { testimonials } from "@/lib/config"
import { Star, Quote } from "lucide-react"

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
}) {
  const [ref, inView] = useInView(() => ({ triggerOnce: true, threshold: 0.1 }))

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 40,
    delay: index * 100,
    config: { tension: 280, friction: 60 },
  })

  return (
    <animated.div
      ref={ref}
      style={cardSpring}
      className="rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-300 hover:border-accent/30 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(74,53,40,0.06)]"
    >
      <Quote className="mb-4 h-8 w-8 text-accent/40" />

      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>

      <p className="mb-6 text-text-secondary leading-snug">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            {testimonial.name}
          </p>
          <p className="text-xs text-text-secondary">
            {testimonial.event}
          </p>
        </div>
      </div>
    </animated.div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }))
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  })

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 texture-wave">
      <div className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <animated.div ref={ref} style={titleSpring} className="mb-20 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
            What our{" "}
            <span className="font-elegant italic text-accent-light">
              clients say
            </span>
          </h2>
        </animated.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
