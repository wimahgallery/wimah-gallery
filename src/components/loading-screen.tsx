"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"enter" | "line" | "text" | "exit">("enter")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 100)
    const t2 = setTimeout(() => setPhase("text"), 1200)
    const t3 = setTimeout(() => setPhase("exit"), 2000)
    const t4 = setTimeout(() => onComplete(), 2800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#faf6f1" }}
    >
      {/* Growing line */}
      <div className="relative mb-8 h-[2px] w-48 overflow-hidden rounded-full bg-surface-secondary">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            backgroundColor: "#c87040",
            width: phase === "line" || phase === "text" || phase === "exit" ? "100%" : "0%",
          }}
        />
      </div>

      {/* Brand name */}
      <div
        className="transition-opacity duration-700"
        style={{
          opacity: phase === "text" || phase === "exit" ? 1 : 0,
        }}
      >
        <h1 className="font-display text-4xl font-light tracking-[0.3em] text-text-primary uppercase">
          Wimah Gallery
        </h1>
      </div>

      {/* Exit fade overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-800"
        style={{
          backgroundColor: "#faf6f1",
          opacity: phase === "exit" ? 1 : 0,
        }}
      />
    </div>
  )
}
