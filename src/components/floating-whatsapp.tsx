"use client"

import { useEffect, useState } from "react"
import { WhatsApp } from "@/components/whatsapp-icon"
import { siteConfig } from "@/lib/config"

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <a
      href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_32px_rgba(37,211,102,0.5)] active:scale-95 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  )
}
