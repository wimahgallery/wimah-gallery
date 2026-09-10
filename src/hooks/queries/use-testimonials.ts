import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { Testimonial } from "@/types"

export function usePublicTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials.public,
    queryFn: async () => {
      const res = await fetch("/api/testimonials?limit=50")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<{ data: Testimonial[] }>
    },
  })
}
