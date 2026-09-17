import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import BlogDetailContent from "@/components/features/blog/BlogDetailContent"
import type { Blog } from "@/types"

async function getBlog(slug: string): Promise<Blog | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .eq("visible", true)
    .single()

  if (error || !data) return null
  return data as Blog
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return { title: "Blog Not Found" }

  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: "article",
      images: blog.cover_image_url ? [{ url: blog.cover_image_url, width: 1200, height: 630, alt: blog.title }] : [],
    },
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  return <BlogDetailContent blog={blog} />
}
