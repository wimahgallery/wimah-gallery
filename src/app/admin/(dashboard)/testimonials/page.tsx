"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2, Upload, Plus, X, Eye, EyeOff, Pencil } from "lucide-react"
import { testimonialSchema, type TestimonialInput } from "@/lib/schemas"
import Pagination from "@/components/pagination"

interface Testimonial {
  id: string
  message: string
  username: string
  role: string
  image_url: string | null
  visible: boolean
  created_at: string
}

export default function TestimonialsPage() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, isFetching } = useQuery<{
    data: Testimonial[]
    total: number
    page: number
    limit: number
    totalPages: number
  }>({
    queryKey: ["testimonials", page],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?page=${page}&limit=10`)
      if (!res.ok) throw new Error("Failed to fetch")
      const json = await res.json()
      return json
    },
  })

  const testimonials = data?.data ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/testimonials", { method: "POST", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create")
      }
    },
    onSuccess: () => {
      setPage(1)
      queryClient.invalidateQueries({ queryKey: ["testimonials"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await fetch(`/api/testimonials/${id}`, { method: "PATCH", body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] })
    },
  })

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      })
      if (!res.ok) throw new Error("Failed to update visibility")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      setPage(1)
      queryClient.invalidateQueries({ queryKey: ["testimonials"] })
    },
  })

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { message: "", username: "", role: "", visible: true },
  })

  const visibleValue = watch("visible")

  function resetForm() {
    reset({ message: "", username: "", role: "", visible: true })
    setImageFile(null)
    setImagePreview(null)
    setExistingImageUrl(null)
    setEditingId(null)
    setError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id)
    reset({ message: t.message, username: t.username, role: t.role, visible: t.visible })
    setExistingImageUrl(t.image_url)
    setImageFile(null)
    setImagePreview(null)
    setError("")
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB")
      return
    }

    setImageFile(file)
    setExistingImageUrl(null)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  function removeImage() {
    setImageFile(null)
    setImagePreview(null)
    setExistingImageUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function onSubmit(data: TestimonialInput) {
    setError("")

    try {
      if (editingId) {
        const body = new FormData()
        body.append("message", data.message)
        body.append("username", data.username)
        body.append("role", data.role)
        body.append("visible", String(data.visible))
        if (imageFile) body.append("image", imageFile)
        if (!imageFile && !existingImageUrl) body.append("removeImage", "true")
        await updateMutation.mutateAsync({ id: editingId, formData: body })
      } else {
        const formData = new FormData()
        formData.append("message", data.message)
        formData.append("username", data.username)
        formData.append("role", data.role)
        formData.append("visible", String(data.visible))
        if (imageFile) formData.append("image", imageFile)
        await createMutation.mutateAsync(formData)
      }

      resetForm()
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error")
    }
  }

  function handleToggleVisibility(id: string, currentVisible: boolean) {
    toggleVisibilityMutation.mutate({ id, visible: !currentVisible })
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return
    deleteMutation.mutate(id)
  }

  const currentImage = imagePreview || existingImageUrl

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-[#54524D]">Testimonials</h1>
          <p className="mt-1 text-sm text-[#8D8A82]">
            Manage client testimonials displayed on your site
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7C8472] px-4 py-2.5 text-sm font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558]"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-6">
          <h2 className="mb-4 font-heading text-lg text-[#54524D]">
            {editingId ? "Edit Testimonial" : "New Testimonial"}
          </h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#54524D]">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20 resize-none"
                placeholder="What the client said..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#54524D]">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("username")}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20"
                  placeholder="Angela & David"
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#54524D]">
                  Role / Event <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("role")}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20"
                  placeholder="Wedding, Corporate Event..."
                />
                {errors.role && (
                  <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#54524D]">
                Photo
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[rgba(84,82,77,0.2)] bg-[#F5F3EE] px-4 py-3 transition-colors hover:border-[#7C8472]"
              >
                <Upload className="h-4 w-4 text-[#8D8A82]" />
                <span className="text-sm text-[#8D8A82]">
                  {imageFile ? imageFile.name : "Click to upload (max 5MB)"}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {currentImage && (
                <div className="relative mt-3 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentImage}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-[#54524D]">Show on website</label>
              <button
                type="button"
                onClick={() => setValue("visible", !visibleValue)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${visibleValue ? "bg-[#7C8472]" : "bg-[#DDD8CC]"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visibleValue ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="w-full rounded-lg bg-[#7C8472] px-4 py-2.5 text-sm font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558] disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingId
                  ? "Update Testimonial"
                  : "Save Testimonial"}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="text-sm text-[#8D8A82]">Loading...</div>
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load testimonials. Please try again.
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-12 text-center">
          <p className="text-sm text-[#8D8A82]">No testimonials yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-xl border bg-white p-5 ${t.visible ? "border-[rgba(84,82,77,0.12)]" : "border-[rgba(84,82,77,0.06)] opacity-60"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {t.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.image_url}
                      alt={t.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C8472]/10 text-xs font-bold text-[#7C8472]">
                      {t.username.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-[#54524D]">{t.username}</p>
                    <p className="text-xs text-[#8D8A82]">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleVisibility(t.id, t.visible)}
                    title={t.visible ? "Hide from website" : "Show on website"}
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
                  >
                    {t.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(t)}
                    title="Edit"
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    title="Delete"
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-[#8D8A82] leading-relaxed">&ldquo;{t.message}&rdquo;</p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-4">
          <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
        </div>
      )}
    </div>
  )
}
