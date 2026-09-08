"use client"

import { useEffect, useRef, useMemo } from "react"
import { useSpringValue } from "@react-spring/web"

export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const progress = useSpringValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false
    let cachedHeight = el.offsetHeight

    const onResize = () => {
      cachedHeight = el.offsetHeight
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const p = (vh - rect.top) / (vh + cachedHeight)
        progress.set(Math.max(0, Math.min(1, p)))
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [progress])

  const smooth = useMemo(() => ({
    value: progress,
  }), [progress])

  return { containerRef, smooth, raw: progress }
}
