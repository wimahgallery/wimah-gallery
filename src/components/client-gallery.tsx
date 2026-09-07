"use client";

import { FadeIn } from "@/components/motion/reveal";
import { ExternalLink } from "lucide-react";
import { clientGalleries } from "@/lib/config";

export function ClientGallery() {
  return (
    <section id="gallery" className="relative py-32 overflow-hidden texture-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Client Gallery</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Find and download your{" "}
            <span className="font-elegant italic text-accent-light">memories.</span>
          </h2>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            Every event receives its own private online gallery.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientGalleries.map((gallery, i) => (
            <FadeIn key={gallery.name} delay={i * 0.1}>
              <div className="group relative rounded-3xl border border-border bg-surface/50 overflow-hidden transition-all duration-200 hover:border-accent/20 hover:shadow-[0_4px_24px_rgba(61,43,37,0.08)] hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent/10 via-surface to-accent/5 flex items-center justify-center border-b border-border">
                  <svg className="w-12 h-12 text-accent/20 group-hover:text-accent/40 transition-all duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-base font-semibold mb-1">{gallery.name}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{gallery.event}</p>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <span>{gallery.date}</span>
                    <span className="h-1 w-1 rounded-full bg-text-secondary/30" />
                    <span>{gallery.location}</span>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-light">
                    View Gallery
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
