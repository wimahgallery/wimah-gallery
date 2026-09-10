import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"

interface UseAdminTestimonialsOptions {
  onSuccess?: () => void
}

export function useAdminTestimonialsCreate(options?: UseAdminTestimonialsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/testimonials", { method: "POST", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminTestimonialsUpdate(options?: UseAdminTestimonialsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await fetch(`/api/testimonials/${id}`, { method: "PATCH", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminTestimonialsToggleVisible(options?: UseAdminTestimonialsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      })
      if (!res.ok) throw new Error("Failed to update visibility")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminTestimonialsDelete(options?: UseAdminTestimonialsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all })
      options?.onSuccess?.()
    },
  })
}
