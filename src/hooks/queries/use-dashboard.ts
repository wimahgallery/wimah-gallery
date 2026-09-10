import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"

interface CountData {
  total: number
}

export function useDashboardCounts(user: { email: string } | null) {
  const enabled = !!user

  const testimonials = useQuery<CountData>({
    queryKey: queryKeys.testimonials.dashboard,
    queryFn: async () => {
      const res = await fetch("/api/testimonials?limit=1")
      if (!res.ok) throw new Error("Failed")
      return res.json()
    },
    enabled,
  })

  const events = useQuery<CountData>({
    queryKey: queryKeys.events.dashboard,
    queryFn: async () => {
      const res = await fetch("/api/events?limit=1")
      if (!res.ok) throw new Error("Failed")
      return res.json()
    },
    enabled,
  })

  const pricing = useQuery<CountData>({
    queryKey: queryKeys.pricing.dashboard,
    queryFn: async () => {
      const res = await fetch("/api/pricing/packages?limit=1")
      if (!res.ok) throw new Error("Failed")
      return res.json()
    },
    enabled,
  })

  const faqs = useQuery<CountData>({
    queryKey: queryKeys.faqs.dashboard,
    queryFn: async () => {
      const res = await fetch("/api/faqs?limit=1")
      if (!res.ok) throw new Error("Failed")
      return res.json()
    },
    enabled,
  })

  return { testimonials, events, pricing, faqs }
}
