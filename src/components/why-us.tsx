"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, Camera, Image, Wifi, Palette, Users, Zap, Heart } from "lucide-react"
import { commitments } from "@/lib/config"

gsap.registerPlugin(ScrollTrigger)

const commitmentIcons = [Camera, Image, Wifi, Palette, Users, Zap, Heart]

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleEl = sectionRef.current?.querySelector("[data-title]")
      const cards = sectionRef.current?.querySelectorAll("[data-card]")
      if (titleEl) {
        gsap.fromTo(titleEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: titleEl, start: "top 90%", once: true } }
        )
      }
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: cards[0], start: "top 90%", once: true } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 texture-diagonal overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 pointer-events-none" />
      <div ref={sectionRef} className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div data-title className="mb-16 text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">Our Commitment</p>
          <h2 className="mb-6 font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            Komitmen kami <span className="font-elegant italic text-accent">untuk Anda</span>
          </h2>
          <p className="mx-auto max-w-[480px] text-base text-text-secondary leading-relaxed">
            Kami memberikan lebih dari sekadar foto. Kami menciptakan pengalaman yang tak terlupakan untuk momen spesial Anda.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item, i) => {
            const Icon = commitmentIcons[i] || Check
            return (
              <div data-card key={item.title}>
                <div className="group relative h-full rounded-3xl border border-border bg-surface/40 p-6 transition-[transform,colors] duration-500 hover:border-accent/20 hover:bg-surface/60 hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98]">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-normal text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
