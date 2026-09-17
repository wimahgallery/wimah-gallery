"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, ArrowRight } from "lucide-react"
import { usePublicBlogs } from "@/hooks/queries/use-blogs"
import type { Blog } from "@/types"
import { formatDate } from "@/lib/utils"

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-[0_8px_40px_rgba(124,132,114,0.1)] active:scale-[0.98]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-secondary/30">
        {blog.cover_image_url ? (
          <Image
            src={blog.cover_image_url}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
            <span className="text-5xl font-heading text-accent/15">W</span>
          </div>
        )}
        {/* Category badge */}
        {blog.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase text-text-primary backdrop-blur-sm shadow-sm">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-heading text-[15px] sm:text-base lg:text-lg font-normal leading-snug text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="mt-2 text-xs sm:text-[13px] text-text-secondary line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Meta + Read more */}
        <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary/70">
            <span className="font-medium">{blog.author}</span>
            <span>·</span>
            <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Baca
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogListContent() {
  const [search, setSearch] = useState("")
  const [inputValue, setInputValue] = useState("")

  const { data: response, isLoading, isError } = usePublicBlogs()

  const blogs = (response?.data ?? []).filter((b) => b.visible && b.published)
  const filteredBlogs = search
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.category?.toLowerCase().includes(search.toLowerCase())
      )
    : blogs

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(inputValue)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-24">
        {/* Back + Title */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Blog{" "}
            <span className="font-elegant italic text-accent-light">
              WIMAH
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-secondary max-w-[480px]">
            Tips, cerita, dan informasi seputar photobooth untuk acara Anda.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8 sm:mb-12">
          <div className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Cari artikel..."
                className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent transition-colors"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors duration-300 hover:bg-accent-light"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Results */}
        {isLoading ? (
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-surface overflow-hidden"
              >
                <div className="aspect-[16/10] bg-surface-secondary/40" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-surface-secondary/50" />
                  <div className="h-4 w-full rounded bg-surface-secondary/30" />
                  <div className="h-3 w-1/2 rounded bg-surface-secondary/30" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">
              Gagal memuat blog. Silakan coba lagi.
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">
              {search
                ? `Tidak ada hasil untuk "${search}"`
                : "Belum ada artikel blog."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
