"use client"

import { siteConfig } from "@/lib/config"
import { Mail } from "lucide-react"
import { WhatsApp } from "@/components/whatsapp-icon"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-surface bg-linear-to-b from-surface/50 to-background py-10 sm:py-16">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="flex size-16 sm:size-20 lg:size-24 items-center justify-center">
                <Image width={1024} height={1024} src="/wimah.png" alt="Wimah Gallery" className="h-full w-full object-contain invert" />
              </div>
            </div>
            <p className="max-w-sm text-xs sm:text-sm text-text-secondary leading-snug">{siteConfig.description}</p>
            <div className="mt-4 sm:mt-6 flex gap-2.5 sm:gap-3">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-3xl border border-border transition-[transform,colors] duration-300 hover:border-accent/30 hover:text-accent hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-3xl border border-border transition-[transform,colors] duration-300 hover:border-accent/30 hover:text-accent hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-3xl border border-border transition-[transform,colors] duration-300 hover:border-accent/30 hover:text-accent hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href={siteConfig.threads} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-3xl border border-border transition-[transform,colors] duration-300 hover:border-accent/30 hover:text-accent hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.776-.963-1.393-1.813-1.8-.203 1.352-.656 2.446-1.353 3.258-.94 1.095-2.159 1.564-3.484 1.498-1.044-.052-1.925-.458-2.607-1.197-.564-.61-.887-1.412-.91-2.266-.022-.85.263-1.67.807-2.333.697-.85 1.752-1.358 3.054-1.484.846-.082 1.658-.045 2.425.11-.14-.777-.464-1.397-.97-1.856-.648-.586-1.512-.88-2.573-.876l.013-.164c1.14-.006 2.158.324 3.02.985.78.6 1.294 1.446 1.535 2.521.842-.266 1.638-.393 2.372-.381 1.143.02 2.152.357 2.995 1.002 1.138.87 1.82 2.155 2.015 3.777.208 1.724-.235 3.27-1.315 4.593C18.162 22.557 15.616 23.976 12.186 24z" /></svg>
              </a>
              <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-3xl border border-border transition-[transform,colors] duration-300 hover:border-accent/30 hover:text-accent hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-accent/10">
                <WhatsApp className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-text-primary mb-3 sm:mb-4">Navigasi</p>
            <ul className="space-y-1.5 sm:space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs sm:text-sm text-text-secondary transition-colors duration-300 hover:text-accent hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-text-primary mb-3 sm:mb-4">Kontak</p>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary transition-colors duration-300 hover:text-accent hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"><WhatsApp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />WhatsApp</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary transition-colors duration-300 hover:text-accent hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"><Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{siteConfig.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 border-t border-border pt-6 sm:pt-8 text-center">
          <p className="text-[11px] sm:text-xs text-text-secondary">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-1 text-[11px] sm:text-xs text-text-secondary">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
