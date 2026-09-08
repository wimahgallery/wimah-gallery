"use client"

import { useRef, useEffect } from "react"
import { animated, useSpringValue, to } from "@react-spring/web"
import Image from "next/image"
import { horizontalImages } from "@/lib/config"

function getElementDocumentTop(el: HTMLElement): number {
  let top = 0
  let current: HTMLElement | null = el
  while (current) {
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  return top
}

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const progress = useSpringValue(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let ticking = false
    let cachedTop = getElementDocumentTop(el)
    let cachedHeight = el.offsetHeight

    const recalc = () => {
      cachedTop = getElementDocumentTop(el)
      cachedHeight = el.offsetHeight
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const vh = window.innerHeight
        const scrollY = window.scrollY
        const p = (vh - (cachedTop - scrollY)) / (vh + cachedHeight)
        progress.set(Math.max(0, Math.min(1, p)))
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", recalc, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", recalc)
    }
  }, [progress])

  const x = to(progress, [0, 1], ["0%", "-65%"])

  return (
    <section ref={sectionRef} className="relative h-[250vh] texture-grid">
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

          <animated.div style={{ x }} className="flex gap-6 pl-6 lg:pl-8">
            {horizontalImages.map((image, i) => {
              const cardScale = to(progress,
                [i * 0.08, Math.min(1, i * 0.08 + 0.3)],
                [0.92, 1]
              )
              const cardRotate = to(progress,
                [i * 0.08, Math.min(1, i * 0.08 + 0.15)],
                [2, 0]
              )

              return (
                <animated.div
                  key={image.id}
                  style={{ scale: cardScale, rotate: cardRotate }}
                  className="shrink-0 w-[300px] sm:w-[400px] lg:w-[520px]"
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
                </animated.div>
              )
            })}
          </animated.div>
        </div>
      </div>
    </section>
  )
}
