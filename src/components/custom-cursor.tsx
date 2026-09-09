"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches

    if (!isDesktop || !cursorRef.current) return

    const cursor = cursorRef.current
    cursor.style.display = "block"

    const pos = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" })
    const posY = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      pos(e.clientX)
      posY(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a") || target.closest("button")) {
        gsap.to(cursor, { width: 64, height: 64, duration: 0.3, ease: "power2.out" })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a") || target.closest("button")) {
        gsap.to(cursor, { width: 40, height: 40, duration: 0.3, ease: "power2.out" })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        display: "none",
        width: 40,
        height: 40,
        borderColor: "rgba(84, 82, 77, 0.3)",
        backgroundColor: "rgba(124, 132, 114, 0.06)",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference"
    />
  )
}
