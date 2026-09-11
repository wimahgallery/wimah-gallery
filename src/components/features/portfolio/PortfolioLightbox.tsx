"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react"

export interface PortfolioImage {
  src: string
  alt: string
}

interface PortfolioLightboxProps {
  images: PortfolioImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function PortfolioLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: PortfolioLightboxProps) {
  const current = images[currentIndex]

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }, [currentIndex, images.length, onNavigate])

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, images.length, onNavigate])

  const handleDownload = useCallback(async (src: string, alt: string) => {
    const res = await fetch(src)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${alt.replace(/\s+/g, "_")}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, handlePrev, handleNext])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Download */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleDownload(current.src, current.alt)
        }}
        className="absolute top-4 right-16 sm:top-6 sm:right-20 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Download image"
      >
        <Download className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 text-sm text-white/50 font-heading">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="absolute left-2 sm:left-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-2 sm:right-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[85vw] max-h-[80vh] sm:max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={1600}
          className="max-h-[80vh] w-auto object-contain rounded-lg"
          priority
        />
        <p className="mt-3 text-center text-sm text-white/60 font-heading">
          {current.alt}
        </p>
      </div>
    </div>
  )
}
