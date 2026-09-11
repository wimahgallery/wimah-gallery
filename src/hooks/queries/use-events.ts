import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { Event, PaginatedResponse } from "@/types"

export function usePublicEvents() {
  return useQuery({
    queryKey: queryKeys.events.public,
    queryFn: async () => {
      const res = await fetch("/api/events?limit=50")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<{ data: Event[] }>
    },
  })
}

export function useAlbumEvents(page: number, search: string) {
  return useQuery({
    queryKey: queryKeys.events.album(page, search),
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: "12" })
      if (search) params.set("search", search)
      const res = await fetch(`/api/events?${params}`)
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<PaginatedResponse<Event>>
    },
  })
}
