"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches

    if (!isDesktop) return

    if (!visibleRef.current && cursorRef.current) {
      visibleRef.current = true
      cursorRef.current.style.display = "block"
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function animate() {
      currentX.current = lerp(currentX.current, targetX.current, 0.15)
      currentY.current = lerp(currentY.current, targetY.current, 0.15)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY
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
      cancelAnimationFrame(rafRef.current)
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
        willChange: "transform",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference transition-[width,height] duration-300 ease-out"
    />
  )
}
