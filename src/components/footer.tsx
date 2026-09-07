"use client";

import { FadeIn } from "@/components/motion/reveal";
import { MessageCircle, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-accent/3 blur-[100px]" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8 py-16">
        <FadeIn>
          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            <div className="md:col-span-2">
              <a href="#home" className="inline-flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-accent/10 border border-accent/15">
                  <span className="font-heading text-sm font-bold text-accent">W</span>
                </div>
                <span className="font-heading text-base font-semibold tracking-tight">
                  {siteConfig.name}
                </span>
              </a>
              <p className="max-w-sm text-sm text-text-secondary leading-relaxed mt-4">
                Pengalaman photobooth premium untuk pernikahan, acara korporat, dan perayaan.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-accent" aria-label="Instagram">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-accent" aria-label="TikTok">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" /></svg>
                </a>
                <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-accent" aria-label="WhatsApp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-text-primary">Navigasi</h3>
              <ul className="space-y-3">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-text-primary">Kontak</h3>
              <ul className="space-y-3">
                <li>
                  <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-secondary transition-colors duration-300 hover:text-accent">
                    <MessageCircle className="h-5 w-5 shrink-0" />WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-text-secondary transition-colors duration-300 hover:text-accent">
                    <Mail className="h-5 w-5 shrink-0" />{siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">&copy; {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi.</p>
          <p className="text-sm text-text-secondary">Dibuat dengan penuh kasih untuk momen tak terlupakan.</p>
        </div>
      </div>
    </footer>
  );
}
