"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Pagination from "@/components/ui/Pagination"
import EventCard from "@/components/ui/EventCard"
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
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
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
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
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
