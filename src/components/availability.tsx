"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, PartyPopper, Users, Sparkles, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const eventCards = [
  { label: "Wedding", icon: Heart },
  { label: "Birthday", icon: PartyPopper },
  { label: "Corporate", icon: Users },
  { label: "Gathering", icon: Sparkles },
  { label: "Engagement", icon: Star },
]

const floatingCards = [
  { id: 1, rotate: -18, x: -180, y: 40, zIndex: 1, image: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg", enterFrom: { x: -400, y: 300, rotate: -45 } },
  { id: 2, rotate: -9, x: -90, y: 10, zIndex: 2, image: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg", enterFrom: { x: -200, y: 200, rotate: -25 } },
  { id: 3, rotate: 0, x: 0, y: -20, zIndex: 5, image: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg", enterFrom: { x: 0, y: -400, rotate: 0 } },
  { id: 4, rotate: 9, x: 90, y: 10, zIndex: 2, image: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg", enterFrom: { x: 200, y: 200, rotate: 25 } },
  { id: 5, rotate: 18, x: 180, y: 40, zIndex: 1, image: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg", enterFrom: { x: 400, y: 300, rotate: 45 } },
]

const floatingConfigs = [
  { yAmplitude: 12, xAmplitude: 4, rotateAmplitude: 2, scaleAmplitude: 0.015, speed: 0.0008, delay: 0 },
  { yAmplitude: 10, xAmplitude: 3, rotateAmplitude: 1.5, scaleAmplitude: 0.01, speed: 0.001, delay: 200 },
  { yAmplitude: 14, xAmplitude: 5, rotateAmplitude: 1, scaleAmplitude: 0.02, speed: 0.0007, delay: 400 },
  { yAmplitude: 10, xAmplitude: 3, rotateAmplitude: 1.5, scaleAmplitude: 0.01, speed: 0.0009, delay: 600 },
  { yAmplitude: 12, xAmplitude: 4, rotateAmplitude: 2, scaleAmplitude: 0.015, speed: 0.0008, delay: 800 },
]

export default function Availability() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const isVisibleRef = useRef(false)
  const [entered, setEntered] = useState(false)

  // Title entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: titleRef.current, start: "top 90%", once: true } }
      )
    }, titleRef)
    return () => ctx.revert()
  }, [])

  // Card entrance
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!cards.length) return

    cards.forEach((card, i) => {
      gsap.set(card, { x: floatingCards[i].enterFrom.x, y: floatingCards[i].enterFrom.y, rotation: floatingCards[i].enterFrom.rotate, scale: 0.8, opacity: 0 })
    })

    const timer = setTimeout(() => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: floatingCards[i].x,
          y: floatingCards[i].y,
          rotation: floatingCards[i].rotate,
          scale: i === 2 ? 1.08 : 1,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: i * 0.1,
          onComplete: () => {
            if (i === 2) setEntered(true)
          },
        })
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Floating animation loop
  useEffect(() => {
    const section = containerRef.current?.closest("section")
    if (!section) return

    let running = false
    startTimeRef.current = performance.now()

    const animate = (time: number) => {
      if (!isVisibleRef.current || !entered) {
        running = false
        return
      }
      const elapsed = time - startTimeRef.current
      const mp = mousePosRef.current

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const cfg = floatingConfigs[i]
        const t = elapsed + cfg.delay
        const targetY = floatingCards[i].y + Math.sin(t * cfg.speed) * cfg.yAmplitude + mp.y * (i === 2 ? -0.03 : -0.015)
        const targetX = floatingCards[i].x + Math.cos(t * cfg.speed * 0.7) * cfg.xAmplitude + mp.x * (i === 2 ? 0.03 : 0.015)
        const targetRot = floatingCards[i].rotate + Math.sin(t * cfg.speed * 0.5) * cfg.rotateAmplitude
        const targetScale = (1 + Math.sin(t * cfg.speed * 0.3) * cfg.scaleAmplitude + (i === 2 ? 0.08 : 0))

        gsap.to(card, {
          x: targetX,
          y: targetY,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          ease: "none",
          overwrite: "auto",
        })
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !running && entered) {
          running = true
          startTimeRef.current = performance.now()
          animFrameRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0 }
    )
    observer.observe(section)

    if (isVisibleRef.current && entered) {
      running = true
      animFrameRef.current = requestAnimationFrame(animate)
    }

    return () => {
      running = false
      observer.disconnect()
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [entered])

  // Cache bounding rect for mousemove
  const cachedRect = useRef({ x: 0, y: 0, w: 0, h: 0 })

  useEffect(() => {
    const updateRect = () => {
      if (!containerRef.current) return
      const r = containerRef.current.getBoundingClientRect()
      cachedRect.current = { x: r.left, y: r.top, w: r.width, h: r.height }
    }
    updateRect()
    window.addEventListener("scroll", updateRect, { passive: true })
    window.addEventListener("resize", updateRect, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateRect)
      window.removeEventListener("resize", updateRect)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cachedRect.current
    if (rect.w === 0) return
    mousePosRef.current = {
      x: (e.clientX - (rect.x + rect.w / 2)) * 0.1,
      y: (e.clientY - (rect.y + rect.h / 2)) * 0.1,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = { x: 0, y: 0 }
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-accent/5 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-0 right-0 overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="shrink-0 font-heading text-[48px] sm:text-[64px] lg:text-[80px] font-normal uppercase text-accent/15">
                Wedding&nbsp;&nbsp;Birthday&nbsp;&nbsp;Corporate&nbsp;&nbsp;Gathering&nbsp;&nbsp;Engagement&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:inline absolute top-[55%] left-0 right-0 overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="shrink-0 font-heading text-[48px] sm:text-[64px] lg:text-[80px] font-normal uppercase text-accent/15">
                Wedding&nbsp;&nbsp;Birthday&nbsp;&nbsp;Corporate&nbsp;&nbsp;Gathering&nbsp;&nbsp;Engagement&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-accent text-accent" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            Hadir untuk berbagai <span className="font-elegant italic text-accent">bentuk perayaan.</span>
          </h2>
        </div>

        <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative h-[350px] sm:h-[400px] lg:h-[450px] flex items-center justify-center mb-20">
          {floatingCards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className="absolute cursor-pointer"
              style={{ zIndex: card.zIndex, transformOrigin: "center bottom", willChange: "transform" }}
            >
              <div className={`relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_12px_30px_rgba(84,82,77,0.15)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(84,82,77,0.25)] ${
                i === 2 ? "w-[180px] sm:w-[220px] lg:w-[260px]" : "w-[150px] sm:w-[180px] lg:w-[220px]"
              }`}>
                <div className="relative aspect-[3/4] bg-surface/50">
                  <Image src={card.image} alt="Photobooth" fill sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 260px" className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 right-3 h-1 rounded-full bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
                  <div className="absolute bottom-3 left-3 right-3 h-1 rounded-full bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[800px] mx-auto">
          {eventCards.map((event, i) => {
            const Icon = event.icon
            return (
              <EventCard key={event.label} event={event} index={i} Icon={Icon} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function EventCard({ event, index, Icon }: { event: (typeof eventCards)[number]; index: number; Icon: typeof Heart }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      gsap.fromTo(ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: index * 0.08, scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="group relative flex flex-col items-center gap-4 bg-surface/50 border border-border rounded-3xl p-6 transition-[transform,colors] duration-500 hover:border-accent/20 hover:bg-surface/80 hover:shadow-[0_8px_40px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98] cursor-default">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/10 transition-colors duration-500 group-hover:bg-accent/15 group-hover:ring-accent/20">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <span className="font-heading text-base font-normal text-text-primary text-center">{event.label}</span>
    </div>
  )
}
