"use client";

import Image from "next/image";

const imagesCol1 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
];

const imagesCol2 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
];

const imagesCol3 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
];

const imagesCol4 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
];

const imagesCol5 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
];

const imagesCol6 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
];

const imagesCol7 = [
  "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
  "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
];

function ScrollColumn({
  images,
  direction,
  className = "",
}: {
  images: string[];
  direction: "up" | "down";
  className?: string;
}) {
  const animClass = direction === "up" ? "animate-masonry-up" : "animate-masonry-down";

  return (
    <div className={`relative overflow-hidden flex-1 min-w-0 ${className}`}>
      <div className={`flex flex-col gap-1.5 ${animClass}`}>
        {[...images, ...images].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Photobooth"
            width={400}
            height={300}
            className="w-full rounded-md object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default function MasonryGallery() {
  return (
    <section className="relative overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Moving masonry columns */}
      <div className="max-h-[500px] flex gap-1.5">
        <ScrollColumn images={imagesCol1} direction="up" />
        <ScrollColumn images={imagesCol2} direction="down" />
        <ScrollColumn images={imagesCol3} direction="up" className="hidden sm:block" />
        <ScrollColumn images={imagesCol4} direction="down" className="hidden sm:block" />
        <ScrollColumn images={imagesCol5} direction="up" className="hidden md:block" />
        <ScrollColumn images={imagesCol6} direction="down" className="hidden md:block" />
        <ScrollColumn images={imagesCol7} direction="up" className="hidden lg:block" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
