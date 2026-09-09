"use client"

import { useState } from "react"
import { Plus, Trash2, Pencil, X, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { faqSchema, type FaqInput } from "@/lib/schemas"
import Pagination from "@/components/pagination"

interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
  visible: boolean
}

interface FaqsResponse {
  data: Faq[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function FaqsPage() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, isFetching } = useQuery<FaqsResponse>({
    queryKey: ["faqs", page],
    queryFn: async () => {
      const res = await fetch(`/api/faqs?page=${page}&limit=10`)
      if (!res.ok) throw new Error("Failed to load FAQs")
      return res.json()
    },
  })

  const faqs = data?.data ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0

  const form = useForm<FaqInput>({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: "", answer: "" },
  })

  function resetForm() {
    form.reset()
    setEditingId(null)
    setError("")
  }

  function openEdit(faq: Faq) {
    setEditingId(faq.id)
    form.setValue("question", faq.question)
    form.setValue("answer", faq.answer)
    setError("")
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const createMutation = useMutation({
    mutationFn: async (data: FaqInput) => {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sort_order: faqs.length }),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Failed to create")
      }
    },
    onSuccess: () => {
      setPage(1)
      queryClient.invalidateQueries({ queryKey: ["faqs"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FaqInput }) => {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Failed to update")
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }),
      })
      if (!res.ok) throw new Error("Failed to toggle visibility")
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      setPage(1)
      queryClient.invalidateQueries({ queryKey: ["faqs"] })
    },
  })

  const reorderMutation = useMutation({
    mutationFn: async (updates: { id: string; sort_order: number }[]) => {
      await Promise.all(
        updates.map((u) =>
          fetch(`/api/faqs/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sort_order: u.sort_order }),
          })
        )
      )
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  })

  async function handleSubmit(data: FaqInput) {
    setError("")
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data })
      } else {
        await createMutation.mutateAsync(data)
      }
      resetForm()
      setShowForm(false)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Network error")
    }
  }

  function handleToggleVisibility(id: string, currentVisible: boolean) {
    toggleMutation.mutate({ id, visible: !currentVisible })
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return
    deleteMutation.mutate(id)
  }

  function handleMove(id: string, direction: "up" | "down") {
    const idx = faqs.findIndex((f) => f.id === id)
    if (idx === -1) return
    const swapIdx = direction === "up" ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= faqs.length) return

    const a = faqs[idx]
    const b = faqs[swapIdx]

    reorderMutation.mutate([
      { id: a.id, sort_order: b.sort_order },
      { id: b.id, sort_order: a.sort_order },
    ])
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-[#54524D]">FAQ</h1>
          <p className="mt-1 text-sm text-[#8D8A82]">
            Manage frequently asked questions
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7C8472] px-4 py-2.5 text-sm font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558]"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add FAQ"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-6">
          <h2 className="mb-4 font-heading text-lg text-[#54524D]">
            {editingId ? "Edit FAQ" : "New FAQ"}
          </h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#54524D]">
                Question <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                {...form.register("question")}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20"
                placeholder="The question..."
              />
              {form.formState.errors.question && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.question.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#54524D]">
                Answer <span className="text-red-400">*</span>
              </label>
              <textarea
                {...form.register("answer")}
                rows={4}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20 resize-none"
                placeholder="The answer..."
              />
              {form.formState.errors.answer && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.answer.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#7C8472] px-4 py-2.5 text-sm font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558] disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : editingId ? "Update FAQ" : "Save FAQ"}
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
          Failed to load FAQs. Please try again.
        </div>
      ) : faqs.length === 0 ? (
        <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-12 text-center">
          <p className="text-sm text-[#8D8A82]">No FAQs yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.id}
              className={`rounded-xl border bg-white ${faq.visible ? "border-[rgba(84,82,77,0.12)]" : "border-[rgba(84,82,77,0.06)] opacity-60"}`}
            >
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <button
                    onClick={() => handleMove(faq.id, "up")}
                    disabled={i === 0}
                    className="rounded p-0.5 text-[#8D8A82] hover:text-[#54524D] disabled:opacity-30"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(faq.id, "down")}
                    disabled={i === faqs.length - 1}
                    className="rounded p-0.5 text-[#8D8A82] hover:text-[#54524D] disabled:opacity-30"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#54524D]">{faq.question}</p>
                  <p className="mt-1 text-sm text-[#8D8A82] leading-relaxed line-clamp-2">{faq.answer}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleVisibility(faq.id, faq.visible)}
                    title={faq.visible ? "Hide" : "Show"}
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
                  >
                    {faq.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(faq)}
                    title="Edit"
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    title="Delete"
                    className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
        </div>
      )}
    </div>
  )
}
