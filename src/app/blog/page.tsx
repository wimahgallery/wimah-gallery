import type { Metadata } from "next"
import BlogListContent from "@/components/features/blog/BlogListContent"

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, cerita, dan informasi seputar photobooth dari WIMAH Photobooth Bali.",
}

export default function BlogPage() {
  return <BlogListContent />
}
