"use client"

import { useRef, useEffect, ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!innerRef.current || !ref.current) return
      gsap.to(innerRef.current, {
        y: `${speed * -50}px`,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef}>
        {children}
      </div>
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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      gsap.to(ref.current, {
        y: `${speed * -30}px`,
        rotation: rotateSpeed * -8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [speed, rotateSpeed])

  return (
    <div ref={ref} className={`pointer-events-none ${className}`}>
      {children}
    </div>
  )
}
