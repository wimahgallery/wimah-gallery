import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"

interface UseAdminEventsOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAdminEventsCreate(options?: UseAdminEventsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/events", { method: "POST", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      options?.onSuccess?.()
    },
    onError: options?.onError,
  })
}

export function useAdminEventsUpdate(options?: UseAdminEventsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await fetch(`/api/events/${id}`, { method: "PATCH", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      options?.onSuccess?.()
    },
    onError: options?.onError,
  })
}

export function useAdminEventsDelete(options?: UseAdminEventsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminEventsToggleVisible(options?: UseAdminEventsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      })
      if (!res.ok) throw new Error("Failed to toggle visibility")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminEventsReorder(options?: UseAdminEventsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: { id: string; sort_order: number }[]) => {
      await Promise.all(
        updates.map((u) =>
          fetch(`/api/events/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sort_order: u.sort_order }),
          })
        )
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      options?.onSuccess?.()
    },
  })
}
