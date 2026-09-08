"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { WhatsApp } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/config";

const imagesTop = [
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
    width: "w-[120px] sm:w-[140px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
    width: "w-[200px] sm:w-[240px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
    width: "w-[140px] sm:w-[160px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
    width: "w-[110px] sm:w-[130px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
    width: "w-[180px] sm:w-[220px]",
  },
];

const imagesBottom = [
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
    width: "w-[190px] sm:w-[230px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
    width: "w-[130px] sm:w-[150px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
    width: "w-[120px] sm:w-[140px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
    width: "w-[160px] sm:w-[180px]",
  },
  {
    src: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
    width: "w-[210px] sm:w-[250px]",
  },
];

export default function Portfolio() {
  const [emblaRefTop] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });
  const [emblaRefBottom] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 texture-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-accent/5" />

      {/* Title */}
      <div className="relative">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Our <span className="italic text-accent-light">portfolio.</span>
          </h2>
        </div>
      </div>

      {/* Social media + Pricing CTA - Top */}
      <div className="relative mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          Instagram
        </a>
        <a
          href={siteConfig.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" />
          </svg>
          TikTok
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-full bg-accent text-background px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98]"
        >
          Lihat Harga
        </a>
      </div>

      {/* Carousel - Top (smooth scroll right) */}
      <div className="relative mb-3 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" />
        <div className="overflow-hidden" ref={emblaRefTop}>
          <div className="flex gap-2.5 items-center animate-slide-right">
            {[...imagesTop, ...imagesTop, ...imagesTop, ...imagesTop].map(
              (img, i) => (
                <div
                  key={i}
                  className={`shrink-0 h-52 ${img.width} rounded-lg overflow-hidden border border-white/10 relative`}
                >
                   <Image
                     src={img.src}
                     alt="Photobooth"
                     fill
                     sizes="(max-width: 640px) 200px, 240px"
                     className="object-cover"
                   />
                 </div>
               ),
             )}
           </div>
         </div>
       </div>

       {/* Carousel - Bottom (smooth scroll left) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" />
        <div className="overflow-hidden" ref={emblaRefBottom}>
          <div className="flex gap-2.5 items-center animate-slide-left">
            {[
              ...imagesBottom,
              ...imagesBottom,
              ...imagesBottom,
              ...imagesBottom,
            ].map((img, i) => (
              <div
                key={i}
                className={`shrink-0 h-52 ${img.width} rounded-lg overflow-hidden border border-white/10 relative`}
              >
                 <Image
                   src={img.src}
                   alt="Photobooth"
                   fill
                   sizes="(max-width: 640px) 210px, 250px"
                   className="object-cover"
                 />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social media + Pricing CTA - Bottom */}
      <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <a
          href={siteConfig.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
          Facebook
        </a>
        <a
          href={siteConfig.threads}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.776-.963-1.393-1.813-1.8-.203 1.352-.656 2.446-1.353 3.258-.94 1.095-2.159 1.564-3.484 1.498-1.044-.052-1.925-.458-2.607-1.197-.564-.61-.887-1.412-.91-2.266-.022-.85.263-1.67.807-2.333.697-.85 1.752-1.358 3.054-1.484.846-.082 1.658-.045 2.425.11-.14-.777-.464-1.397-.97-1.856-.648-.586-1.512-.88-2.573-.876l.013-.164c1.14-.006 2.158.324 3.02.985.78.6 1.294 1.446 1.535 2.521.842-.266 1.638-.393 2.372-.381 1.143.02 2.152.357 2.995 1.002 1.138.87 1.82 2.155 2.015 3.777.208 1.724-.235 3.27-1.315 4.593C18.162 22.557 15.616 23.976 12.186 24zM12.01 14.5c-.026.564.137 1.035.488 1.402.386.402.96.612 1.706.626.847.016 1.613-.3 2.28-1.08.445-.52.763-1.19.947-1.995-.853-.39-1.762-.533-2.713-.425-1.134.13-2.067.562-2.708 1.472z" />
          </svg>
          Threads
        </a>
        <a
          href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent text-background px-6 py-2.5 text-sm font-medium transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <WhatsApp className="h-4 w-4" />
          Booking Sekarang
        </a>
      </div>
    </section>
  );
}
