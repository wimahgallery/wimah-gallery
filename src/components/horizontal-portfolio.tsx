"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { horizontalImages } from "@/lib/config"

gsap.registerPlugin(ScrollTrigger)

const row1 = horizontalImages
const row2 = [...horizontalImages].reverse()

function CarouselCard({ src, title, category }: { src: string; title: string; category: string }) {
  return (
    <div className="group relative shrink-0 w-[340px] sm:w-[420px] lg:w-[520px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
      <div className="relative overflow-hidden rounded-3xl border border-border aspect-video">
        <Image src={src} alt={title} width={600} height={800} className="w-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-video" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-2 text-xs font-medium uppercase tracking-widest text-accent-light">{category}</span>
          <span className="text-lg font-semibold text-white">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default function HorizontalPortfolio() {
  const titleRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: titleRef.current, start: "top 90%", once: true } }
        )
      }
      if (row1Ref.current) {
        gsap.fromTo(row1Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: row1Ref.current, start: "top 90%", once: true } }
        )
      }
      if (row2Ref.current) {
        gsap.fromTo(row2Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: row2Ref.current, start: "top 90%", once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={titleRef} className="mb-16 px-6 text-center lg:px-8">
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Our work <span className="italic text-accent-light">speaks</span> for itself.
          </h2>
        </div>
      </div>
      <div className="relative space-y-4">
        <div ref={row1Ref} className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-left w-max">
            {[...row1, ...row1].map((image, i) => (
              <CarouselCard key={`r1-${i}`} src={image.src} title={image.title} category={image.category} />
            ))}
          </div>
        </div>
        <div ref={row2Ref} className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-right w-max">
            {[...row2, ...row2].map((image, i) => (
              <CarouselCard key={`r2-${i}`} src={image.src} title={image.title} category={image.category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
