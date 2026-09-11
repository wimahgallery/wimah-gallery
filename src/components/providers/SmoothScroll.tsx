"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { setLenisInstance } from "@/lib/smooth-scroll"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) return

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      gestureOrientation: "vertical",
      respectReducedMotion: true,
    })

    lenis.on("scroll", ScrollTrigger.update)
    setLenisInstance(lenis)

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      setLenisInstance(null)
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return null
}
