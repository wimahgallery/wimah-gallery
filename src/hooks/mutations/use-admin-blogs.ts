import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"

interface UseAdminBlogsOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAdminBlogsCreate(options?: UseAdminBlogsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/blogs", { method: "POST", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
      options?.onSuccess?.()
    },
    onError: options?.onError,
  })
}

export function useAdminBlogsUpdate(options?: UseAdminBlogsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await fetch(`/api/blogs/${id}`, { method: "PATCH", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
      options?.onSuccess?.()
    },
    onError: options?.onError,
  })
}

export function useAdminBlogsDelete(options?: UseAdminBlogsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminBlogsToggleVisible(options?: UseAdminBlogsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      })
      if (!res.ok) throw new Error("Failed to toggle visibility")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminBlogsTogglePublished(options?: UseAdminBlogsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      })
      if (!res.ok) throw new Error("Failed to toggle publish status")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
      options?.onSuccess?.()
    },
  })
}

export function useAdminBlogsReorder(options?: UseAdminBlogsOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: { id: string; sort_order: number }[]) => {
      await Promise.all(
        updates.map((u) =>
          fetch(`/api/blogs/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sort_order: u.sort_order }),
          })
        )
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
      options?.onSuccess?.()
    },
  })
}
