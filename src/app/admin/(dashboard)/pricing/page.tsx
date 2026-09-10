"use client"

import { useState } from "react"
import { Plus, Trash2, Pencil, X, ChevronDown, ChevronUp, Save, Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { pricingPackageSchema, type PricingPackageInput } from "@/lib/schemas"
import Pagination from "@/components/pagination"

interface PricingPackage {
  id: string
  type: string
  hours: number
  price: number
  discount: number
  discounted_price: number
  print_count_limit: number | null
  sort_order: number
  visible: boolean
  favorite: boolean
}

const TABS = [
  { key: "file_only", label: "File Only" },
  { key: "limited_print", label: "Limited Print" },
  { key: "unlimited_print", label: "Unlimited Print" },
] as const

type TabKey = (typeof TABS)[number]["key"]

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("file_only")
  const [showAdd, setShowAdd] = useState(false)
  const [showHidden, setShowHidden] = useState(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState("")
  const queryClient = useQueryClient()

  const { data, isLoading, isError, isFetching } = useQuery<{
    data: PricingPackage[]
    total: number
    page: number
    limit: number
    totalPages: number
  }>({
    queryKey: ["pricing-packages", page],
    queryFn: async () => {
      const res = await fetch(`/api/pricing/packages?page=${page}&limit=50`)
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    },
  })

  const packages = data?.data ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0

  const filteredPackages = packages.filter((p) => p.type === activeTab && (showHidden || p.visible))

  const addForm = useForm<PricingPackageInput>({
    resolver: zodResolver(pricingPackageSchema),
    defaultValues: { hours: 2, price: 0, discount: 0, print_count_limit: 0 },
  })

  const addMutation = useMutation({
    mutationFn: async (data: PricingPackageInput) => {
      const body: Record<string, unknown> = {
        type: activeTab,
        hours: data.hours,
        price: data.price,
        discount: data.discount,
        sort_order: filteredPackages.length,
      }
      if (activeTab === "limited_print") {
        body.print_count_limit = data.print_count_limit
      }
      const res = await fetch("/api/pricing/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Failed to add")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-packages"] })
      addForm.reset({ hours: 2, price: 0, discount: 0, print_count_limit: 0 })
      setShowAdd(false)
      setError("")
      setPage(1)
    },
    onError: (err: Error) => setError(err.message),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, unknown> }) => {
      const res = await fetch(`/api/pricing/packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error("Failed to update")
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pricing-packages"] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/pricing/packages/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-packages"] })
      setPage(1)
    },
  })

  function handleDeletePackage(id: string) {
    if (!confirm("Delete this package?")) return
    deleteMutation.mutate(id)
  }

  function handleMovePackage(id: string, direction: "up" | "down") {
    const idx = filteredPackages.findIndex((p) => p.id === id)
    if (idx === -1) return
    const swapIdx = direction === "up" ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= filteredPackages.length) return

    const a = filteredPackages[idx]
    const b = filteredPackages[swapIdx]

    updateMutation.mutate({ id: a.id, updates: { sort_order: b.sort_order } })
    updateMutation.mutate({ id: b.id, updates: { sort_order: a.sort_order } })
  }

  const showPrintLimit = activeTab === "limited_print"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-[#54524D]">Pricing</h1>
        <p className="mt-1 text-sm text-[#8D8A82]">
          Manage pricing packages displayed on your site
        </p>
      </div>

      <div className="flex gap-1 rounded-lg border border-[rgba(84,82,77,0.12)] bg-white p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setShowAdd(false); setError("") }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.key ? "bg-[#7C8472] text-[#F5F3EE]" : "text-[#8D8A82] hover:text-[#54524D]"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white">
        <div className="flex items-center justify-between border-b border-[rgba(84,82,77,0.08)] px-5 py-4">
          <div className="flex items-center gap-4">
            <h2 className="font-heading text-lg text-[#54524D]">Packages</h2>
            <label className="flex items-center gap-2 text-xs text-[#8D8A82]">
              <input
                type="checkbox"
                checked={showHidden}
                onChange={(e) => setShowHidden(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-[rgba(84,82,77,0.2)] accent-[#7C8472]"
              />
              Show hidden
            </label>
          </div>
          <button
            onClick={() => { setShowAdd(!showAdd); addForm.reset({ hours: 2, price: 0, discount: 0, print_count_limit: 0 }); setError("") }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#7C8472] px-3 py-1.5 text-xs font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558]"
          >
            {showAdd ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {showAdd ? "Cancel" : "Add"}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={addForm.handleSubmit((data) => addMutation.mutate(data))} className="border-b border-[rgba(84,82,77,0.08)] bg-[#F5F3EE]/50 px-5 py-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">Hours</label>
                <input
                  type="number"
                  {...addForm.register("hours", { valueAsNumber: true })}
                  min={1}
                  required
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">Price (Rp)</label>
                <input
                  type="number"
                  {...addForm.register("price", { valueAsNumber: true })}
                  min={0}
                  required
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">Discount (%)</label>
                <input
                  type="number"
                  {...addForm.register("discount", { valueAsNumber: true })}
                  min={0}
                  max={100}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
                />
              </div>
              {showPrintLimit && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#54524D]">Print Limit</label>
                  <input
                    type="number"
                    {...addForm.register("print_count_limit", { valueAsNumber: true })}
                    min={0}
                    required
                    className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="mt-3 rounded-lg bg-[#7C8472] px-4 py-2 text-xs font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558] disabled:opacity-50"
            >
              {addMutation.isPending ? "Saving..." : "Save Package"}
            </button>
          </form>
        )}

        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <div className="text-sm text-[#8D8A82]">Loading...</div>
          </div>
        ) : isError ? (
          <div className="flex h-24 items-center justify-center">
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Failed to load pricing packages. Please try again.
            </div>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="flex h-24 items-center justify-center">
            <p className="text-sm text-[#8D8A82]">No packages yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(84,82,77,0.06)]">
            {filteredPackages.map((pkg, i) => (
              <PackageRow
                key={pkg.id}
                pkg={pkg}
                showPrintLimit={showPrintLimit}
                isFirst={i === 0}
                isLast={i === filteredPackages.length - 1}
                onToggleVisible={(vis) => updateMutation.mutate({ id: pkg.id, updates: { visible: vis } })}
                onToggleFavorite={(fav) => updateMutation.mutate({ id: pkg.id, updates: { favorite: fav } })}
                onMoveUp={() => handleMovePackage(pkg.id, "up")}
                onMoveDown={() => handleMovePackage(pkg.id, "down")}
                onDelete={() => handleDeletePackage(pkg.id)}
              />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
      </div>
    </div>
  )
}

function PackageRow({
  pkg,
  showPrintLimit,
  isFirst,
  isLast,
  onToggleVisible,
  onToggleFavorite,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  pkg: PricingPackage
  showPrintLimit: boolean
  isFirst: boolean
  isLast: boolean
  onToggleVisible: (v: boolean) => void
  onToggleFavorite: (v: boolean) => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const queryClient = useQueryClient()

  const editForm = useForm<PricingPackageInput>({
    resolver: zodResolver(pricingPackageSchema),
    defaultValues: {
      hours: pkg.hours,
      price: pkg.price,
      discount: pkg.discount,
      print_count_limit: pkg.print_count_limit ?? 0,
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: PricingPackageInput) => {
      const updates: Record<string, unknown> = {
        hours: data.hours,
        price: data.price,
        discount: data.discount,
      }
      if (showPrintLimit) updates.print_count_limit = data.print_count_limit
      const res = await fetch(`/api/pricing/packages/${pkg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error("Failed to update")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-packages"] })
      setEditing(false)
    },
  })

  function handleEdit() {
    editForm.reset({
      hours: pkg.hours,
      price: pkg.price,
      discount: pkg.discount,
      print_count_limit: pkg.print_count_limit ?? 0,
    })
    setEditing(true)
  }

  if (editing) {
    return (
      <div className="border-b border-[rgba(84,82,77,0.06)] bg-[#F5F3EE]/50 px-5 py-4">
        <form onSubmit={editForm.handleSubmit((data) => updateMutation.mutate(data))}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Hours</label>
              <input
                type="number"
                {...editForm.register("hours", { valueAsNumber: true })}
                min={1}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Price (Rp)</label>
              <input
                type="number"
                {...editForm.register("price", { valueAsNumber: true })}
                min={0}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#54524D]">Discount (%)</label>
              <input
                type="number"
                {...editForm.register("discount", { valueAsNumber: true })}
                min={0}
                max={100}
                className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
              />
            </div>
            {showPrintLimit && (
              <div>
                <label className="mb-1 block text-xs font-medium text-[#54524D]">Print Limit</label>
                <input
                  type="number"
                  {...editForm.register("print_count_limit", { valueAsNumber: true })}
                  min={0}
                  className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-3 py-2 text-sm text-[#54524D] outline-none focus:border-[#7C8472]"
                />
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-1 rounded-lg bg-[#7C8472] px-3 py-1.5 text-xs font-semibold text-[#F5F3EE] hover:bg-[#5F6558] disabled:opacity-50"
            >
              <Save className="h-3 w-3" /> {updateMutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-[rgba(84,82,77,0.12)] px-3 py-1.5 text-xs text-[#8D8A82] hover:text-[#54524D]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-4 px-5 py-3 ${!pkg.visible ? "opacity-50" : ""}`}>
      <div className="flex flex-col gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="rounded p-0.5 text-[#8D8A82] hover:text-[#54524D] disabled:opacity-30"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="rounded p-0.5 text-[#8D8A82] hover:text-[#54524D] disabled:opacity-30"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium text-[#54524D]">{pkg.hours}h</span>
          {pkg.discount > 0 ? (
            <>
              <span className="text-[#8D8A82] line-through">
                Rp {pkg.price.toLocaleString("id-ID")}
              </span>
              <span className="font-semibold text-[#7C8472]">
                Rp {pkg.discounted_price.toLocaleString("id-ID")}
              </span>
              <span className="rounded-full bg-[#7C8472]/10 px-2 py-0.5 text-xs font-medium text-[#7C8472]">
                -{pkg.discount}%
              </span>
            </>
          ) : (
            <span className="text-[#8D8A82]">
              Rp {pkg.price.toLocaleString("id-ID")}
            </span>
          )}
          {showPrintLimit && pkg.print_count_limit != null && (
            <span className="text-xs text-[#8D8A82]">{pkg.print_count_limit} prints</span>
          )}
        </div>
      </div>

      <button
        onClick={() => onToggleVisible(!pkg.visible)}
        className={`rounded-lg px-2 py-1 text-xs transition-colors ${pkg.visible ? "bg-[#7C8472]/10 text-[#7C8472]" : "bg-[#DDD8CC]/50 text-[#8D8A82]"}`}
      >
        {pkg.visible ? "Shown" : "Hidden"}
      </button>

      <button
        onClick={() => onToggleFavorite(!pkg.favorite)}
        title={pkg.favorite ? "Remove favorite" : "Mark as favorite"}
        className={`rounded-lg p-1.5 transition-colors ${pkg.favorite ? "text-[#D4A853] hover:text-[#8D8A82]" : "text-[#DDD8CC] hover:text-[#D4A853]"}`}
      >
        <Star className="h-4 w-4" fill={pkg.favorite ? "currentColor" : "none"} />
      </button>

      <button
        onClick={handleEdit}
        title="Edit"
        className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D]"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        onClick={onDelete}
        title="Delete"
        className="rounded-lg p-1.5 text-[#8D8A82] transition-colors hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
