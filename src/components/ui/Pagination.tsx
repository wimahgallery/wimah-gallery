"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between border-t border-[rgba(84,82,77,0.08)] px-5 py-3">
      <p className="text-xs text-[#8D8A82]">
        {total} total &middot; Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-[rgba(84,82,77,0.12)] px-3 py-1.5 text-xs text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D] disabled:opacity-30"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Prev
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-[rgba(84,82,77,0.12)] px-3 py-1.5 text-xs text-[#8D8A82] transition-colors hover:bg-[#F5F3EE] hover:text-[#54524D] disabled:opacity-30"
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
