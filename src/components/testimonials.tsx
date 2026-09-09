"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useQuery } from "@tanstack/react-query"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: string
  message: string
  username: string
  role: string
  image_url: string | null
  visible: boolean
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div className={`h-full rounded-3xl border bg-surface p-5 sm:p-8 transition-all duration-500 ${isActive ? "border-accent/30 shadow-[0_8px_32px_rgba(124,132,114,0.12)]" : "border-border"}`}>
      <Quote className="mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-accent/40" />
      <div className="mb-3 sm:mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="h-3 w-3 sm:h-4 sm:w-4 fill-[#D4A853] text-[#D4A853]" />
        ))}
      </div>
      <p className="mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed text-text-secondary">&ldquo;{testimonial.message}&rdquo;</p>
      <div className="flex items-center gap-3">
        {testimonial.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.image_url}
            alt={testimonial.username}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-accent/10 text-xs sm:text-sm font-bold text-accent">
            {testimonial.username.split(" ").map((n) => n[0]).join("")}
          </div>
        )}
        <div>
          <p className="text-xs sm:text-sm font-medium text-text-primary">{testimonial.username}</p>
          <p className="text-[10px] sm:text-xs text-text-secondary">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const rafRef = useRef<number>(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["testimonials-public"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials?limit=50")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<{ data: Testimonial[] }>
    },
  })

  const testimonials = (response?.data ?? []).filter((t) => t.visible)

  useEffect(() => {
    if (!emblaApi) return
    function onSelect() {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setActiveIndex(emblaApi!.selectedScrollSnap())
      })
    }
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
      cancelAnimationFrame(rafRef.current)
    }
  }, [emblaApi])

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

  function scrollPrev() {
    emblaApi?.scrollPrev()
  }

  function scrollNext() {
    emblaApi?.scrollNext()
  }

  return (
    <section className="relative py-14 sm:py-20 lg:py-32 texture-wave">
      <div className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-8 sm:mb-16 text-center">
          <h2 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            What our <span className="font-elegant italic text-accent">clients say</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="relative px-2 sm:px-8">
            <div className="overflow-hidden py-4">
              <div className="flex">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="shrink-0 w-full sm:w-1/2 lg:w-1/3 px-1 sm:px-3">
                    <div className="animate-pulse rounded-3xl bg-[#E8E3D8]/30 p-5 sm:p-8 h-52 sm:h-64" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="py-12 sm:py-16 text-center">
            <p className="text-sm text-text-secondary">Failed to load. Please try again.</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="py-12 sm:py-16 text-center">
            <p className="text-sm text-text-secondary">No testimonials yet.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden px-2 sm:px-8 py-4" ref={emblaRef}>
              <div className="flex items-stretch">
                {testimonials.map((t, i) => {
                  const isActive = i === activeIndex
                  return (
                    <div
                      key={t.id}
                      className="shrink-0 w-full sm:w-1/2 lg:w-1/3 px-1 sm:px-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{
                        transform: isActive ? "scale(1)" : "scale(0.88)",
                        opacity: isActive ? 1 : 0.5,
                        filter: isActive ? "blur(0px)" : "blur(1px)",
                      }}
                    >
                      <TestimonialCard testimonial={t} isActive={isActive} />
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 z-10 flex h-7 w-7 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text-secondary backdrop-blur-sm transition-all hover:border-accent/30 hover:text-accent"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 z-10 flex h-7 w-7 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text-secondary backdrop-blur-sm transition-all hover:border-accent/30 hover:text-accent"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
