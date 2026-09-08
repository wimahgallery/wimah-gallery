"use client"

import { useEffect, useRef, useMemo } from "react"
import { useSpringValue } from "@react-spring/web"

function getElementDocumentTop(el: HTMLElement): number {
  let top = 0
  let current: HTMLElement | null = el
  while (current) {
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  return top
}

export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const progress = useSpringValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false
    let cachedTop = getElementDocumentTop(el)
    let cachedHeight = el.offsetHeight

    const recalc = () => {
      cachedTop = getElementDocumentTop(el)
      cachedHeight = el.offsetHeight
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const vh = window.innerHeight
        const scrollY = window.scrollY
        const p = (vh - (cachedTop - scrollY)) / (vh + cachedHeight)
        progress.set(Math.max(0, Math.min(1, p)))
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", recalc, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", recalc)
    }
  }, [progress])

  const smooth = useMemo(() => ({
    value: progress,
  }), [progress])

  return { containerRef, smooth, raw: progress }
}
