"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePublicEvents } from "@/hooks/queries/use-events"
import EventCard from "@/components/ui/EventCard"

gsap.registerPlugin(ScrollTrigger)

export default function ClientGallery() {
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const { data: response, isLoading, isError } = usePublicEvents()

  const allEvents = (response?.data ?? []).filter((e) => e.visible)
  const events = allEvents.slice(0, 4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: titleRef.current, start: "top 90%", once: true } }
        )
      }
      const cards = gridRef.current?.querySelectorAll("[data-card]")
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true } }
        )
      }
    })

    return () => ctx.revert()
  }, [events.length])

  return (
    <section id="gallery" className="relative py-14 sm:py-20 lg:py-32 texture-noise">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-10 sm:mb-16 text-center">
          <h2 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Find and download your <span className="italic text-accent-light">memories.</span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-[480px] text-sm sm:text-base text-text-secondary leading-normal">Every event receives its own private online gallery.</p>
        </div>

        {isLoading ? (
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-[#E8E3D8]/30 overflow-hidden">
                <div className="aspect-[4/3] bg-[#E8E3D8]/40" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-[#E8E3D8]/50" />
                  <div className="h-3 w-1/2 rounded bg-[#E8E3D8]/40" />
                  <div className="h-3 w-2/3 rounded bg-[#E8E3D8]/30" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-12 text-center">
            <p className="text-sm text-text-secondary">Failed to load. Please try again.</p>
          </div>
        ) : events.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-text-secondary">No events yet.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {events.map((ev) => (
              <div data-card key={ev.id}>
                <EventCard event={ev} />
              </div>
            ))}
          </div>
        )}

        {allEvents.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/album"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 text-accent px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:border-accent hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
