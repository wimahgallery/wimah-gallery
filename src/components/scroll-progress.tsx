"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
      barRef.current.style.transform = `scaleX(${scrollPercent})`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-50 h-[3px] origin-left will-change-transform"
      style={{
        backgroundColor: "#7C8472",
        width: "100%",
        transform: "scaleX(0)",
        transition: "transform 0.1s linear",
      }}
    />
  )
}
