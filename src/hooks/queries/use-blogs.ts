import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/keys"
import type { Blog, PaginatedResponse } from "@/types"

export function usePublicBlogs() {
  return useQuery<PaginatedResponse<Blog>>({
    queryKey: queryKeys.blogs.public,
    queryFn: async () => {
      const res = await fetch("/api/blogs?limit=50&published=true")
      if (!res.ok) throw new Error("Failed to fetch blogs")
      return res.json()
    },
  })
}

export function useBlogBySlug(slug: string) {
  return useQuery<Blog | null>({
    queryKey: [...queryKeys.blogs.public, slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogs?limit=1&published=true`)
      if (!res.ok) throw new Error("Failed to fetch blog")
      const data = await res.json()
      return data.data?.find((b: Blog) => b.slug === slug) ?? null
    },
    enabled: !!slug,
  })
}
