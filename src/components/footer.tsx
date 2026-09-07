"use client"

import { animated, useSpring, useInView } from "@react-spring/web"
import { siteConfig } from "@/lib/config"
import { MessageCircle, Mail } from "lucide-react"

export default function Footer() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }))
  const spring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  })

  return (
    <footer ref={ref} className="border-t border-border bg-gradient-to-b from-surface/50 to-background py-16">
      <animated.div style={spring} className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-heading text-xl text-text-primary">{siteConfig.name}</p>
            <p className="mt-3 max-w-sm text-sm text-text-secondary leading-snug">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border transition-colors hover:border-accent/30 hover:text-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border transition-colors hover:border-accent/30 hover:text-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border transition-colors hover:border-accent/30 hover:text-accent"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-heading text-sm text-text-primary mb-4">Navigation</p>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-text-secondary transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm text-text-primary mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent">
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-text-secondary">{siteConfig.tagline}</p>
        </div>
      </animated.div>
    </footer>
  )
}
