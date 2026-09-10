import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { FaqInput } from "@/lib/schemas"

interface UseAdminFaqsOptions {
  onSuccess?: () => void
}

export function useAdminFaqsCreate(options?: UseAdminFaqsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data, sortOrder }: { data: FaqInput; sortOrder: number }) => {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sort_order: sortOrder }),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Failed to create")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminFaqsUpdate(options?: UseAdminFaqsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FaqInput }) => {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Failed to update")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminFaqsToggleVisible(options?: UseAdminFaqsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      })
      if (!res.ok) throw new Error("Failed to toggle visibility")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminFaqsDelete(options?: UseAdminFaqsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminFaqsReorder(options?: UseAdminFaqsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: { id: string; sort_order: number }[]) => {
      await Promise.all(
        updates.map((u) =>
          fetch(`/api/faqs/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sort_order: u.sort_order }),
          })
        )
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all })
      options?.onSuccess?.()
    },
  })
}
