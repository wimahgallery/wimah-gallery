"use client"

import { useEffect, useRef, useCallback } from "react"
import { useSpringValue, useSpring } from "@react-spring/web"

export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const raw = useSpringValue(0)
  const [smooth, api] = useSpring(() => ({
    value: 0,
    config: { tension: 120, friction: 30 },
  }))

  const update = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const h = el.offsetHeight
    const p = (vh - rect.top) / (vh + h)
    const clamped = Math.max(0, Math.min(1, p))
    raw.set(clamped)
    api.start({ value: clamped })
  }, [raw, api])

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [update])

  return { containerRef, smooth, raw }
}
