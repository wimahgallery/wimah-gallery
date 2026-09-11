"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface CollageItemStyle {
  width: string
  height: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate?: string
}

interface PortfolioCollageItemProps {
  src: string
  alt: string
  index: number
  style: CollageItemStyle
  onClick: () => void
}

const flyDirections = [
  { x: -140, y: -100, rotation: -10, scale: 0.82 },
  { x: 120, y: -120, rotation: 8, scale: 0.85 },
  { x: -110, y: 100, rotation: 6, scale: 0.8 },
  { x: 80, y: -80, rotation: -5, scale: 0.88 },
  { x: 130, y: 110, rotation: -9, scale: 0.83 },
]

export default function PortfolioCollageItem({
  src,
  alt,
  index,
  style,
  onClick,
}: PortfolioCollageItemProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1 })
      return
    }

    const dir = flyDirections[index % flyDirections.length]

    gsap.set(el, {
      opacity: 0,
      x: dir.x,
      y: dir.y,
      rotation: dir.rotation,
      scale: dir.scale,
    })

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.15 + index * 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              y: `${3 + index * 1.5}`,
              duration: 2.8 + index * 0.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: index * 0.5,
            })
          },
        },
      })
    })

    return () => ctx.revert()
  }, [index])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="absolute overflow-visible cursor-pointer group"
      style={{
        width: style.width,
        height: style.height,
        top: style.top,
        left: style.left,
        right: style.right,
        bottom: style.bottom,
        rotate: style.rotate,
      }}
    >
      <div className="relative h-full w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-500 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)] group-hover:scale-[1.03]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-xs sm:text-sm font-heading text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          {alt}
        </span>
      </div>
    </button>
  )
}
