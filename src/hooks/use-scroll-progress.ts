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
  const rafRef = useRef<number>(0)
  const lastValueRef = useRef(0)

  const update = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const h = el.offsetHeight
    const p = (vh - rect.top) / (vh + h)
    const clamped = Math.max(0, Math.min(1, p))

    // Only update if changed significantly (reduces spring restarts)
    if (Math.abs(clamped - lastValueRef.current) > 0.001) {
      lastValueRef.current = clamped
      raw.set(clamped)
      api.start({ value: clamped })
    }
  }, [raw, api])

  useEffect(() => {
    let ticking = false

    function onScroll() {
      if (!ticking) {
        ticking = true
        rafRef.current = requestAnimationFrame(() => {
          update()
          ticking = false
        })
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update() // Initial call
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [update])

  return { containerRef, smooth, raw }
}
