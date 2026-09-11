"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { usePublicEvents } from "@/hooks/queries/use-events"

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
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl bg-[#E8E3D8]/30 overflow-hidden">
                <div className="aspect-[4/3] bg-[#E8E3D8]/40" />
                <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                  <div className="h-5 w-3/4 rounded bg-[#E8E3D8]/50" />
                  <div className="h-4 w-1/2 rounded bg-[#E8E3D8]/40" />
                  <div className="h-3 w-2/3 rounded bg-[#E8E3D8]/30" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-12 sm:py-16 text-center">
            <p className="text-sm text-text-secondary">Failed to load. Please try again.</p>
          </div>
        ) : events.length === 0 ? (
          <div className="py-12 sm:py-16 text-center">
            <p className="text-sm text-text-secondary">No events yet.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((ev) => (
              <div data-card key={ev.id} className="group overflow-hidden rounded-3xl border border-border bg-surface hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(95,101,88,0.08)] hover:border-accent/20 transition-[transform,colors] duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-secondary/30">
                  {ev.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ev.image_url}
                      alt={ev.couple_name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-heading text-text-secondary/30">
                      {ev.couple_name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-heading font-normal text-text-primary">{ev.couple_name}</h3>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-accent-light">{ev.event_name}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(ev.event_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </span>
                  </div>
                  {ev.images_source && (
                    <a
                      href={ev.images_source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 sm:mt-4 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs sm:text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:border-accent hover:bg-accent/15 hover:text-accent"
                    >
                      View Gallery<ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {allEvents.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/albumn"
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
