import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { PricingPackage } from "@/types"

export function usePublicPricing() {
  return useQuery({
    queryKey: queryKeys.pricing.public,
    queryFn: async () => {
      const res = await fetch("/api/pricing/packages?limit=50")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<{ data: PricingPackage[] }>
    },
  })
}
