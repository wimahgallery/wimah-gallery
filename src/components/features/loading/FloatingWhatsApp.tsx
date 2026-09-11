"use client"

import { useEffect, useState, useRef } from "react"
import { WhatsApp } from "@/components/ui/WhatsAppIcon"
import { siteConfig } from "@/lib/config"

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const wasAbove = useRef(true)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const isAbove = window.scrollY <= 300
        if (wasAbove.current !== isAbove) {
          wasAbove.current = isAbove
          setVisible(!isAbove)
        }
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <a
      href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking WIMAH Photobooth untuk acara saya.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-[0_4px_24px_rgba(124,132,114,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_32px_rgba(124,132,114,0.5)] active:scale-95 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  )
}
