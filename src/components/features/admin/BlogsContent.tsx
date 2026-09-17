"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import {
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  X,
  ExternalLink,
  FileText,
  ImageIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useAdminBlogsCreate,
  useAdminBlogsUpdate,
  useAdminBlogsDelete,
  useAdminBlogsToggleVisible,
  useAdminBlogsTogglePublished,
  useAdminBlogsReorder,
} from "@/hooks/mutations/use-admin-blogs"
import { queryKeys } from "@/hooks/keys"
import { blogSchema, type BlogInput } from "@/lib/schemas"
import type { Blog, PaginatedResponse } from "@/types"
import TiptapEditor from "./TiptapEditor"
import Pagination from "@/components/ui/Pagination"

const categories = [
  "Wedding",
  "Birthday",
  "Corporate",
  "Tips",
  "News",
  "Tutorial",
  "Other",
]

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export default function BlogsContent() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formError, setFormError] = useState("")
  const [page, setPage] = useState(1)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null)
  const [editorContent, setEditorContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: response, isLoading } = useQuery<PaginatedResponse<Blog>>({
    queryKey: queryKeys.blogs.list(page),
    queryFn: async () => {
      const res = await fetch(`/api/blogs?page=${page}&limit=10`)
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    },
  })

  const createMutation = useAdminBlogsCreate()
  const updateMutation = useAdminBlogsUpdate()
  const deleteMutation = useAdminBlogsDelete()
  const toggleVisibleMutation = useAdminBlogsToggleVisible()
  const togglePublishedMutation = useAdminBlogsTogglePublished()
  const reorderMutation = useAdminBlogsReorder()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogInput>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "WIMAH",
      category: "",
      published: false,
    },
  })

  const watchTitle = watch("title")

  useEffect(() => {
    if (watchTitle) {
      setValue("slug", generateSlug(watchTitle))
    }
  }, [watchTitle, setValue])

  const blogs = response?.data ?? []
  const totalPages = response?.totalPages ?? 0

  function resetForm() {
    reset()
    setEditingId(null)
    setFormError("")
    setShowForm(false)
    setCoverFile(null)
    setCoverPreview(null)
    setExistingCoverUrl(null)
    setEditorContent("")
  }

  function openEdit(blog: Blog) {
    setEditingId(blog.id)
    setValue("title", blog.title)
    setValue("slug", blog.slug)
    setValue("excerpt", blog.excerpt || "")
    setValue("author", blog.author)
    setValue("category", blog.category || "")
    setValue("published", blog.published)
    setEditorContent(blog.content ? JSON.stringify(blog.content) : "")
    setExistingCoverUrl(blog.cover_image_url)
    setCoverFile(null)
    setCoverPreview(null)
    setShowForm(true)
    setFormError("")
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image must be less than 5MB")
      return
    }
    setCoverFile(file)
    setExistingCoverUrl(null)
    const reader = new FileReader()
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function removeCover() {
    setCoverFile(null)
    setCoverPreview(null)
    setExistingCoverUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function onSubmit(data: BlogInput) {
    setFormError("")
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("slug", editingId ? (watch("slug") || data.slug) : generateSlug(data.title))
    formData.append("excerpt", data.excerpt || "")
    formData.append("content", editorContent)
    formData.append("author", data.author)
    formData.append("category", data.category || "")
    formData.append("published", String(data.published))

    if (coverFile) {
      formData.append("cover_image", coverFile)
    }

    if (editingId && !existingCoverUrl && !coverFile) {
      formData.append("removeCoverImage", "true")
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, formData })
      } else {
        formData.append("sort_order", String(blogs.length))
        await createMutation.mutateAsync(formData)
      }
      resetForm()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    await deleteMutation.mutateAsync(id)
  }

  async function handleToggleVisible(id: string, current: boolean) {
    await toggleVisibleMutation.mutateAsync({ id, visible: !current })
  }

  async function handleTogglePublished(id: string, current: boolean) {
    await togglePublishedMutation.mutateAsync({ id, published: !current })
  }

  async function handleReorder(id: string, direction: "up" | "down") {
    const idx = blogs.findIndex((b) => b.id === id)
    if (idx === -1) return
    const swapIdx = direction === "up" ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= blogs.length) return

    const updates = [
      { id: blogs[idx].id, sort_order: blogs[swapIdx].sort_order },
      { id: blogs[swapIdx].id, sort_order: blogs[idx].sort_order },
    ]
    await reorderMutation.mutateAsync(updates)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-normal text-[#54524D]">
            Blog Posts
          </h1>
          <p className="mt-1 text-sm text-[#8D8A82]">
            Manage your blog articles and content.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(!showForm)
          }}
          className="flex items-center gap-2 rounded-lg bg-[#7C8472] px-4 py-2 text-xs font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558]"
        >
          <Plus className="h-4 w-4" />
          Add Blog Post
        </button>
      </div>

      {formError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      {showForm && (
        <div className="mb-6 rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-normal text-[#54524D]">
              {editingId ? "Edit Blog Post" : "New Blog Post"}
            </h2>
            <button
              onClick={resetForm}
              className="rounded-lg p-1.5 text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">
                  Title *
                </label>
                <input
                  {...register("title")}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] focus:border-[#7C8472] focus:outline-none"
                  placeholder="Blog post title"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">
                  Slug *
                </label>
                <input
                  {...register("slug")}
                  disabled
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-[#FAFAF8] px-3 py-2 text-sm text-[#54524D] focus:border-[#7C8472] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="blog-post-title"
                />
                {errors.slug && (
                  <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">
                Excerpt
              </label>
              <textarea
                {...register("excerpt")}
                rows={2}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] focus:border-[#7C8472] focus:outline-none"
                placeholder="Short description for previews..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">
                  Author
                </label>
                <input
                  {...register("author")}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] focus:border-[#7C8472] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] focus:border-[#7C8472] focus:outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("published")}
                    className="h-4 w-4 rounded border-[rgba(84,82,77,0.12)] text-[#7C8472] focus:ring-[#7C8472]"
                  />
                  <span className="text-xs font-medium text-[#54524D]">Published</span>
                </label>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">
                Cover Image
              </label>
              {(coverPreview || existingCoverUrl) ? (
                <div className="relative inline-block">
                <Image
                  src={coverPreview || existingCoverUrl || ""}
                  alt="Cover preview"
                  width={280}
                  height={160}
                  unoptimized
                  className="h-40 w-full max-w-[280px] rounded-xl object-cover border border-[rgba(84,82,77,0.12)]"
                />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="mt-2">
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-1.5 text-xs text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]">
                      <Pencil className="h-3 w-3" />
                      Change image
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[rgba(84,82,77,0.15)] bg-[#FAFAF8] px-4 py-8 transition-colors hover:border-[#7C8472]/40 hover:bg-[#7C8472]/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C8472]/10">
                    <ImageIcon className="h-5 w-5 text-[#7C8472]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#54524D]">
                      Click to upload cover image
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8D8A82]">
                      JPG, PNG or WebP. Max 5MB.
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">
                Content
              </label>
              <TiptapEditor
                content={editorContent}
                onChange={setEditorContent}
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-[rgba(84,82,77,0.12)] px-4 py-2 text-xs text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="rounded-lg bg-[#7C8472] px-4 py-2 text-xs font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558] disabled:opacity-50"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-[#8D8A82]">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#8D8A82]">
            No blog posts yet. Add your first one above.
          </div>
        ) : (
          <div className="divide-y divide-[rgba(84,82,77,0.06)]">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[#FAFAF8] ${
                  !blog.visible ? "opacity-50" : ""
                }`}
              >
                {blog.cover_image_url ? (
                  <Image
                    src={blog.cover_image_url}
                    alt={blog.title}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F5F3EE]">
                    <FileText className="h-5 w-5 text-[#8D8A82]" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#54524D]">
                    {blog.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[#8D8A82]">
                    <span>{blog.author}</span>
                    {blog.category && (
                      <>
                        <span>·</span>
                        <span>{blog.category}</span>
                      </>
                    )}
                    <span>·</span>
                    <span
                      className={`font-medium ${
                        blog.published ? "text-[#7C8472]" : "text-[#8D8A82]"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleReorder(blog.id, "up")}
                    className="rounded p-1 text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
                    title="Move up"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleReorder(blog.id, "down")}
                    className="rounded p-1 text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
                    title="Move down"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleTogglePublished(blog.id, blog.published)}
                    className={`rounded px-2 py-1 text-[10px] font-medium ${
                      blog.published
                        ? "bg-[#7C8472]/10 text-[#7C8472]"
                        : "bg-[#8D8A82]/10 text-[#8D8A82]"
                    }`}
                    title={blog.published ? "Unpublish" : "Publish"}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </button>

                  <button
                    onClick={() => handleToggleVisible(blog.id, blog.visible)}
                    className="rounded p-1 text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
                    title={blog.visible ? "Hide" : "Show"}
                  >
                    {blog.visible ? (
                      <Eye className="h-3.5 w-3.5" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {blog.published && (
                    <a
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded p-1 text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
                      title="View"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => openEdit(blog)}
                    className="rounded p-1 text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="rounded p-1 text-[#8D8A82] hover:bg-red-50 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination page={page} totalPages={totalPages} total={response?.total ?? 0} onPageChange={setPage} />
        </div>
      )}
    </div>
  )
}
