"use client"

import { useRef, useEffect, useMemo, ReactNode } from "react"
import { animated, useSpringValue, to } from "@react-spring/web"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const yVal = useSpringValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const vh = window.innerHeight
      const offset = (center - vh / 2) / vh
      yVal.set(offset * speed * 100)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [yVal, speed])

  const y = useMemo(() => to(yVal, (v: number) => `${-v}px`), [yVal])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <animated.div style={{ y, willChange: "transform" }}>
        {children}
      </animated.div>
    </div>
  )
}

interface FloatingElementProps {
  children: ReactNode
  speed?: number
  rotateSpeed?: number
  className?: string
}

export function FloatingElement({ children, speed = 0.3, rotateSpeed = 0.1, className = "" }: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const yVal = useSpringValue(0)
  const rotateVal = useSpringValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const vh = window.innerHeight
      const offset = (center - vh / 2) / vh
      yVal.set(offset * speed * 60)
      rotateVal.set(offset * rotateSpeed * 15)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [yVal, rotateVal, speed, rotateSpeed])

  const y = useMemo(() => to(yVal, (v: number) => `${-v}px`), [yVal])
  const rotate = useMemo(() => to(rotateVal, (v: number) => `${-v}deg`), [rotateVal])

  return (
    <animated.div ref={ref} style={{ y, rotate, willChange: "transform" }} className={`pointer-events-none ${className}`}>
      {children}
    </animated.div>
  )
}
