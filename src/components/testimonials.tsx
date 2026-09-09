"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { testimonials } from "@/lib/config"
import { Star, Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

function TestimonialCard({ testimonial, index }: { testimonial: (typeof testimonials)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      gsap.fromTo(ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: index * 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-surface/50 p-8 transition-[transform,colors] duration-300 hover:border-accent/30 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)]">
      <Quote className="mb-4 h-8 w-8 text-accent/40" />
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="mb-6 text-text-secondary leading-snug">&ldquo;{testimonial.review}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
          {testimonial.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{testimonial.name}</p>
          <p className="text-xs text-text-secondary">{testimonial.event}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 90%", once: true },
        }
      )
    }, titleRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 texture-wave">
      <div className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={titleRef} className="mb-20 text-center">
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            What our <span className="font-elegant italic text-accent">clients say</span>
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
