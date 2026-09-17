"use client"

import Link from "next/link"
import Image from "next/image"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react"
import type { Blog } from "@/types"
import { formatDate } from "@/lib/utils"

function RelatedCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-[0_8px_40px_rgba(124,132,114,0.1)] active:scale-[0.98]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-secondary/30">
        {blog.cover_image_url ? (
          <Image
            src={blog.cover_image_url}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
            <span className="text-4xl font-heading text-accent/15">W</span>
          </div>
        )}
        {blog.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase text-text-primary backdrop-blur-sm shadow-sm">
              {blog.category}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-sm sm:text-base font-normal leading-snug text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
          {blog.title}
        </h3>
        {blog.excerpt && (
          <p className="mt-1.5 text-xs text-text-secondary line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
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

export default function BlogDetailContent({
  blog,
  relatedBlogs = [],
}: {
  blog: Blog
  relatedBlogs?: Blog[]
}) {
  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      ImageExtension.configure({ inline: false, allowBase64: true }),
    ],
    content: blog.content || "",
    editable: false,
  })

  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-[780px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-24">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent mb-8 sm:mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Semua Artikel
        </Link>

        {/* Header */}
        <header className="mb-8 sm:mb-12">
          {blog.category && (
            <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] sm:text-xs font-medium tracking-wide uppercase text-accent mb-4">
              {blog.category}
            </span>
          )}
          <h1 className="font-heading text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-[1.15] text-text-primary">
            {blog.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
            </div>
          </div>
          {blog.excerpt && (
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {blog.cover_image_url && (
          <div className="relative mb-8 sm:mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={blog.cover_image_url}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 780px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        {editor && (
          <div className="blog-content">
            <EditorContent editor={editor} />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Lihat Semua Artikel
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-border bg-surface/30">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-xl sm:text-2xl font-normal text-text-primary">
                Artikel Lainnya
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-light"
              >
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {relatedBlogs.map((related) => (
                <RelatedCard key={related.id} blog={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
