"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, MapPin, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import Pagination from "@/components/pagination"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import { formatDate } from "@/lib/utils"
import { useAlbumnEvents } from "@/hooks/queries/use-events"
import type { Event, PaginatedResponse } from "@/types"

export default function AlbumnPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [inputValue, setInputValue] = useState("")

  const { data: response, isLoading, isError } = useAlbumnEvents(page, search)

  const events = (response?.data ?? []).filter((e) => e.visible)
  const total = response?.total ?? 0
  const totalPages = response?.totalPages ?? 1

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setPage(1)
    setSearch(inputValue)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-24">

        {/* Back + Title */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Album <span className="font-elegant italic text-accent-light">Kami</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-secondary">
            Semua event yang telah kami abadikan dalam satu gallery.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8 sm:mb-12">
          <div className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Cari nama pasangan atau event..."
                className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent transition-colors"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-light"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Results */}
        {isLoading ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl bg-surface overflow-hidden">
                <div className="aspect-[4/3] bg-surface-secondary/30" />
                <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                  <div className="h-5 w-3/4 rounded bg-surface-secondary/40" />
                  <div className="h-4 w-1/2 rounded bg-surface-secondary/30" />
                  <div className="h-3 w-2/3 rounded bg-surface-secondary/20" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">Gagal memuat data. Silakan coba lagi.</p>
          </div>
        ) : events.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">
              {search ? `Tidak ada hasil untuk "${search}"` : "Belum ada event."}
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 sm:mb-6 text-xs text-text-secondary">{total} event ditemukan</p>
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {events.map((ev) => (
                <div key={ev.id} className="group overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/20 hover:shadow-[0_8px_32px_rgba(95,101,88,0.08)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-secondary/30">
                    {ev.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ev.image_url}
                        alt={ev.couple_name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-5xl font-heading text-text-secondary/20">
                        {ev.couple_name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {ev.images_source && (
                      <a
                        href={ev.images_source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] sm:text-xs font-medium text-text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      >
                        View Gallery <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base font-heading font-normal text-text-primary">{ev.couple_name}</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-accent-light">{ev.event_name}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(ev.event_date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12">
              <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
      <Footer />
      </div>
      <FloatingWhatsApp />
    </>
  )
}
