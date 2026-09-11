"use client"

import { useState } from "react"
import {
  Calendar,
  MapPin,
  Search,
} from "lucide-react"
import Pagination from "@/components/ui/Pagination"
import { formatDate } from "@/lib/utils"
import { useAlbumEvents } from "@/hooks/queries/use-events"

export default function AlbumContent() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [inputValue, setInputValue] = useState("")

  const { data: response, isLoading, isError } = useAlbumEvents(page, search)

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
        <div className="grid gap-3 sm:gap-4 grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl bg-[#E8E3D8]/30 overflow-hidden"
            >
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
        <div className="py-16 text-center">
          <p className="text-sm text-text-secondary">
            Gagal memuat data. Silakan coba lagi.
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-text-secondary">
            {search
              ? `Tidak ada hasil untuk "${search}"`
              : "Belum ada event."}
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 sm:mb-6 text-xs text-text-secondary">
            {total} event ditemukan
          </p>
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="group overflow-hidden rounded-2xl border border-border bg-surface hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(95,101,88,0.08)] hover:border-accent/20 transition-[transform,colors] duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-secondary/30">
                  {ev.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ev.image_url}
                      alt={ev.couple_name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-heading text-text-secondary/30">
                      {ev.couple_name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-heading font-normal text-text-primary">{ev.couple_name}</h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-accent-light">{ev.event_name}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-text-secondary">
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
                      className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-[11px] sm:text-xs font-medium text-text-primary transition-[transform,colors] duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-accent hover:bg-accent/15 hover:text-accent"
                    >
                      View Gallery
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12">
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </>
  )
}
