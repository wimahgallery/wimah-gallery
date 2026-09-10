import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { PricingPackageInput } from "@/lib/schemas"

interface UseAdminPricingOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAdminPricingAdd(
  activeTab: string,
  filteredCount: number,
  options?: UseAdminPricingOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: PricingPackageInput) => {
      const body: Record<string, unknown> = {
        type: activeTab,
        hours: data.hours,
        price: data.price,
        discount: data.discount,
        sort_order: filteredCount,
      }
      if (activeTab === "limited_print") {
        body.print_count_limit = data.print_count_limit
      }
      const res = await fetch("/api/pricing/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Failed to add")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricing.all })
      options?.onSuccess?.()
    },
    onError: options?.onError,
  })
}

export function useAdminPricingUpdate(options?: UseAdminPricingOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, unknown> }) => {
      const res = await fetch(`/api/pricing/packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error("Failed to update")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricing.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminPricingDelete(options?: UseAdminPricingOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/pricing/packages/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricing.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminPricingEdit(
  pkgId: string,
  showPrintLimit: boolean,
  options?: UseAdminPricingOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: PricingPackageInput) => {
      const updates: Record<string, unknown> = {
        hours: data.hours,
        price: data.price,
        discount: data.discount,
      }
      if (showPrintLimit) updates.print_count_limit = data.print_count_limit
      const res = await fetch(`/api/pricing/packages/${pkgId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error("Failed to update")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricing.all })
      options?.onSuccess?.()
    },
  })
}
