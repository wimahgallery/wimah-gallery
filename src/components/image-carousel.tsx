"use client"

const imagesTop = [
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
]

const imagesBottom = [
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
]

export default function ImageCarousel() {
  return (
    <section className="relative py-10 overflow-hidden bg-background">
      <div className="space-y-3">
        {/* Top carousel - scrolls right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-3 animate-marquee-right">
            {[...imagesTop, ...imagesTop].map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-[280px] sm:w-[320px] aspect-video rounded-xl overflow-hidden border border-white/10"
              >
                <img
                  src={src}
                  alt="Photobooth"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom carousel - scrolls left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-3 animate-marquee-left">
            {[...imagesBottom, ...imagesBottom].map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-[280px] sm:w-[320px] aspect-video rounded-xl overflow-hidden border border-white/10"
              >
                <img
                  src={src}
                  alt="Photobooth"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
