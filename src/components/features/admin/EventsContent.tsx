"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Plus, Trash2, Pencil, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { eventSchema, type EventInput } from "@/lib/schemas"
import Pagination from "@/components/ui/Pagination"
import { queryKeys } from "@/hooks/keys"
import {
  useAdminEventsCreate,
  useAdminEventsUpdate,
  useAdminEventsDelete,
  useAdminEventsToggleVisible,
  useAdminEventsReorder,
} from "@/hooks/mutations/use-admin-events"
import type { Event, PaginatedResponse } from "@/types"

export default function EventsContent() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formError, setFormError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading, isError } = useQuery<PaginatedResponse<Event>>({
    queryKey: queryKeys.events.list(page),
    queryFn: async () => {
      const res = await fetch(`/api/events?page=${page}&limit=10`)
      if (!res.ok) throw new Error("Failed to fetch events")
      return res.json()
    },
  })

  const events = data?.data ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0

  const createMutation = useAdminEventsCreate({
    onSuccess: () => { setPage(1); resetForm() },
    onError: (err) => setFormError(err.message),
  })

  const updateMutation = useAdminEventsUpdate({
    onSuccess: resetForm,
    onError: (err) => setFormError(err.message),
  })

  const deleteMutation = useAdminEventsDelete({
    onSuccess: () => setPage(1),
  })

  const toggleVisibleMutation = useAdminEventsToggleVisible()
  const reorderMutation = useAdminEventsReorder()

  const { register, handleSubmit, reset, setValue } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
  })

  function resetForm() {
    reset()
    setEditingId(null)
    setFormError("")
    setShowForm(false)
    setImageFile(null)
    setImagePreview(null)
    setExistingImageUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function openEdit(ev: Event) {
    setEditingId(ev.id)
    setValue("couple_name", ev.couple_name)
    setValue("event_name", ev.event_name)
    setValue("event_date", ev.event_date)
    setValue("location", ev.location)
    setValue("images_source", ev.images_source ?? "")
    setExistingImageUrl(ev.image_url)
    setImageFile(null)
    setImagePreview(null)
    setFormError("")
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image must be under 5MB")
      return
    }

    setImageFile(file)
    setFormError("")

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

  function onSubmit(data: EventInput) {
    setFormError("")

    const formData = new FormData()
    formData.append("couple_name", data.couple_name)
    formData.append("event_name", data.event_name)
    formData.append("event_date", data.event_date)
    formData.append("location", data.location)
    formData.append("images_source", data.images_source ?? "")
    if (imageFile) formData.append("image", imageFile)

    if (editingId) {
      if (!imageFile && !existingImageUrl) {
        formData.append("removeImage", "true")
      }
      updateMutation.mutate({ id: editingId, formData })
    } else {
      formData.append("sort_order", String(events.length))
      createMutation.mutate(formData)
    }
  }

  function handleToggleVisible(id: string, visible: boolean) {
    toggleVisibleMutation.mutate({ id, visible })
  }

  function handleMove(id: string, direction: "up" | "down") {
    const idx = events.findIndex((e) => e.id === id)
    if (idx === -1) return
    const swapIdx = direction === "up" ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= events.length) return

    const a = events[idx]
    const b = events[swapIdx]

    reorderMutation.mutate([
      { id: a.id, sort_order: b.sort_order },
      { id: b.id, sort_order: a.sort_order },
    ])
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return
    deleteMutation.mutate(id)
  }

  const submitting = createMutation.isPending || updateMutation.isPending
  const currentImage = imagePreview || existingImageUrl

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-[#54524D]">Events</h1>
        <p className="mt-1 text-sm text-[#8D8A82]">
          Manage events and their image sources
        </p>
      </div>

      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-5 space-y-4">
          <h2 className="font-heading text-lg text-[#54524D]">
            {editingId ? "Edit Event" : "New Event"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Couple Name</label>
              <input
                type="text"
                {...register("couple_name")}
                placeholder="Rina & Budi"
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Event Name</label>
              <input
                type="text"
                {...register("event_name")}
                placeholder="Wedding Reception"
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Event Date</label>
              <input
                type="date"
                {...register("event_date")}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Location</label>
              <input
                type="text"
                {...register("location")}
                placeholder="The Ritz-Carlton Bali"
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#54524D]">Images Source (URL)</label>
            <input
              type="url"
              {...register("images_source")}
              placeholder="https://drive.google.com/..."
              className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#54524D]">Event Image</label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] file:mr-2 file:rounded file:border-0 file:bg-[#7C8472]/10 file:px-2 file:py-0.5 file:text-xs file:font-medium file:text-[#7C8472]"
                />
                <p className="mt-1 text-xs text-[#8D8A82]">Max 5MB. Recommended: square ratio for best display.</p>
              </div>
              {currentImage && (
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[rgba(84,82,77,0.12)]">
                  <img src={currentImage} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#7C8472] px-4 py-2 text-xs font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558] disabled:opacity-50"
            >
              {submitting ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-[rgba(84,82,77,0.12)] px-4 py-2 text-xs text-[#8D8A82] hover:text-[#54524D]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white">
        <div className="flex items-center justify-between border-b border-[rgba(84,82,77,0.08)] px-5 py-4">
          <h2 className="font-heading text-lg text-[#54524D]">All Events</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#7C8472] px-3 py-1.5 text-xs font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558]"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <div className="text-sm text-[#8D8A82]">Loading...</div>
          </div>
        ) : isError ? (
          <div className="flex h-24 items-center justify-center">
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Failed to load events. Please try again.
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-24 items-center justify-center">
            <p className="text-sm text-[#8D8A82]">No events yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(84,82,77,0.06)]">
            {events.map((ev, i) => (
              <div key={ev.id} className={`flex items-center gap-4 px-5 py-3 ${!ev.visible ? "opacity-50" : ""}`}>
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => handleMove(ev.id, "up")}
                    disabled={i === 0}
                    className="rounded p-0.5 text-[#8D8A82] hover:text-[#54524D] disabled:opacity-30"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(ev.id, "down")}
                    disabled={i === events.length - 1}
                    className="rounded p-0.5 text-[#8D8A82] hover:text-[#54524D] disabled:opacity-30"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                {ev.image_url && (
                  <img
                    src={ev.image_url}
                    alt={ev.couple_name}
                    className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#54524D]">
                    {ev.couple_name}
                  </p>
                  <p className="text-xs text-[#8D8A82]">
                    {ev.event_name} — {ev.location}
                  </p>
                  <p className="text-xs text-[#8D8A82]">
                    {new Date(ev.event_date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {ev.images_source && (
                  <a
                    href={ev.images_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open images"
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#7C8472]"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                <button
                  onClick={() => handleToggleVisible(ev.id, !ev.visible)}
                  className={`rounded-lg px-2 py-1 text-xs transition-colors ${ev.visible ? "bg-[#7C8472]/10 text-[#7C8472]" : "bg-[#DDD8CC]/50 text-[#8D8A82]"}`}
                >
                  {ev.visible ? "Shown" : "Hidden"}
                </button>

                <button
                  onClick={() => openEdit(ev)}
                  title="Edit"
                  className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleDelete(ev.id)}
                  title="Delete"
                  className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="border-t border-[rgba(84,82,77,0.08)] px-5 py-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
