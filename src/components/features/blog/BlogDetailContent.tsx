"use client"

import Link from "next/link"
import Image from "next/image"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import { ArrowLeft, Calendar, User } from "lucide-react"
import type { Blog } from "@/types"
import { formatDate } from "@/lib/utils"

export default function BlogDetailContent({ blog }: { blog: Blog }) {
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
    </div>
  )
}
