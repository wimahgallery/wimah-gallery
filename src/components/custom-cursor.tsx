"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches

    if (!isDesktop) return

    if (!visibleRef.current && cursorRef.current) {
      visibleRef.current = true
      cursorRef.current.style.display = "block"
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (cursorRef.current && (target.closest("a") || target.closest("button"))) {
        cursorRef.current.style.width = "64px"
        cursorRef.current.style.height = "64px"
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (cursorRef.current && (target.closest("a") || target.closest("button"))) {
        cursorRef.current.style.width = "40px"
        cursorRef.current.style.height = "40px"
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
        width: "40px",
        height: "40px",
        borderColor: "rgba(84, 82, 77, 0.3)",
        backgroundColor: "rgba(124, 132, 114, 0.06)",
      }}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference transition-[width,height] duration-300 ease-out"
    />
  )
}
