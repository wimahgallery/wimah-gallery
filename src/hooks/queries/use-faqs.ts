import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { Faq } from "@/types"

export function usePublicFaqs() {
  return useQuery({
    queryKey: queryKeys.faqs.public,
    queryFn: async () => {
      const res = await fetch("/api/faqs?limit=50")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<{ data: Faq[] }>
    },
  })
}
