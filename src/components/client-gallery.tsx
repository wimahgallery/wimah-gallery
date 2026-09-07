"use client";

import { FadeIn } from "@/components/motion/reveal";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { clientGalleries } from "@/lib/config";

export function ClientGallery() {
  return (
    <section id="gallery" className="relative py-32 overflow-hidden texture-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Galeri Klien</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Temukan dan unduh{" "}
            <span className="font-elegant italic text-accent-light">kenangan Anda.</span>
          </h2>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            Setiap acara mendapatkan galeri online pribadi tersendiri.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientGalleries.map((gallery, i) => (
            <FadeIn key={gallery.name} delay={i * 0.1}>
              <div className="group relative rounded-3xl border border-border bg-surface/50 overflow-hidden transition-all duration-300 hover:border-accent/20 hover:shadow-[0_4px_24px_rgba(61,43,37,0.08)] hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={gallery.src}
                    alt={gallery.name}
                    fill
                    className="object-cover transition-transform duration-800 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-base font-semibold mb-1">{gallery.name}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{gallery.event}</p>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <span>{gallery.date}</span>
                    <span className="h-1 w-1 rounded-full bg-text-secondary/30" />
                    <span>{gallery.location}</span>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300 hover:text-accent-light">
                    Lihat Galeri
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
