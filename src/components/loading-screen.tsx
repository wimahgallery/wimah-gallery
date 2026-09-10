"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import gsap from "gsap"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"waiting" | "enter" | "line" | "text" | "exit" | "done">("waiting")
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)

  const handleReady = useCallback(() => {
    setPhase("enter")
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"

    if (document.readyState === "complete") {
      handleReady()
    } else {
      window.addEventListener("load", handleReady)
      return () => window.removeEventListener("load", handleReady)
    }
  }, [handleReady])

  useEffect(() => {
    if (phase !== "enter" || !containerRef.current) return

    const tl = gsap.timeline()

    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    )
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power2.inOut" },
      "+=0.1"
    )
    .fromTo(brandRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .to(brandRef.current,
      { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" },
      "+=0.6"
    )
    .to(containerRef.current,
      { opacity: 0, duration: 0.5, ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = ""
          setPhase("done")
          onComplete()
        }
      },
      "-=0.1"
    )

    return () => { tl.kill() }
  }, [phase, onComplete])

  if (phase === "done") return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#F5F3EE", opacity: 0 }}
    >
      {/* Growing line */}
      <div className="relative mb-8 h-[2px] w-48 overflow-hidden rounded-full bg-surface">
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 w-full rounded-full origin-left"
          style={{ backgroundColor: "#7C8472", transform: "scaleX(0)" }}
        />
      </div>

      {/* Brand name */}
      <div ref={brandRef} style={{ opacity: 0 }}>
        <h1 className="font-display text-4xl font-light tracking-[0.3em] text-text-primary uppercase">
          Wimah Gallery
        </h1>
      </div>
    </div>
  )
}
