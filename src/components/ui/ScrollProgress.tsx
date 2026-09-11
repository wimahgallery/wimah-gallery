"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    let docHeight = 0

    function recalcHeight() {
      docHeight = document.documentElement.scrollHeight - window.innerHeight
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!barRef.current) {
          ticking = false
          return
        }
        if (docHeight === 0) recalcHeight()
        const scrollTop = window.scrollY
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
        barRef.current.style.transform = `scaleX(${scrollPercent})`
        ticking = false
      })
    }

    const handleResize = () => {
      recalcHeight()
    }

    recalcHeight()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-50 h-[3px] origin-left will-change-transform"
      style={{
        backgroundColor: "#7C8472",
        width: "100%",
        transform: "scaleX(0)",
      }}
    />
  )
}
