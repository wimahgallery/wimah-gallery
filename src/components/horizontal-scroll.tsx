"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { horizontalImages } from "@/lib/config"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!track || !sectionRef.current) return

      const totalScroll = track.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      tl.to(track, {
        x: -totalScroll,
        ease: "none",
      }, 0)

      cards.forEach((card, i) => {
        tl.fromTo(card,
          { scale: 0.92, rotate: 2, opacity: 0.7 },
          { scale: 1, rotate: 0, opacity: 1, ease: "power2.out" },
          i * 0.06
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative texture-grid">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="relative z-10 w-full">
          <div className="mb-12 px-6 lg:px-8 max-w-[1200px] mx-auto">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Portfolio
            </p>
            <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
              Our work{" "}
              <span className="font-elegant italic text-accent-light">speaks</span> for itself.
            </h2>
          </div>

          <div ref={trackRef} className="flex gap-6 pl-6 lg:pl-8">
            {horizontalImages.map((image, i) => (
              <div
                key={image.id}
                ref={(el) => { cardRefs.current[i] = el }}
                className="shrink-0 w-[300px] sm:w-[400px] lg:w-[520px]"
                style={{ opacity: 0 }}
              >
                <div className="group relative overflow-hidden rounded-3xl border border-border">
                  <div className="relative aspect-video">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-accent-light/70">
                        {image.category}
                      </span>
                      <span className="text-lg font-heading font-normal text-white">
                        {image.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
