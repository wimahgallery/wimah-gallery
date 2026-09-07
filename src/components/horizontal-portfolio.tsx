"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { horizontalImages } from "@/lib/config";

const row1 = horizontalImages;
const row2 = [...horizontalImages].reverse();

function CarouselCard({
  src,
  title,
  category,
}: {
  src: string;
  title: string;
  category: string;
}) {
  return (
    <div className="group relative shrink-0 w-[340px] sm:w-[420px] lg:w-[520px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] aspect-video">
        <Image
          src={src}
          alt={title}
          width={600}
          height={800}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-video"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-2 text-xs font-medium uppercase tracking-widest text-accent-light">
            {category}
          </span>
          <span className="text-lg font-semibold text-text-primary">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HorizontalPortfolio() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 texture-dots opacity-30" />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 px-6 text-center lg:px-8"
        >
          <h2 className="font-elegant text-5xl font-bold text-text-primary md:text-6xl">
            Our work{" "}
            <span className="italic text-accent-light">speaks</span> for itself.
          </h2>
        </motion.div>
      </div>

      <div className="relative space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex gap-4 animate-marquee-left w-max">
            {[...row1, ...row1].map((image, i) => (
              <CarouselCard
                key={`r1-${i}`}
                src={image.src}
                title={image.title}
                category={image.category}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="overflow-hidden"
        >
          <div className="flex gap-4 animate-marquee-right w-max">
            {[...row2, ...row2].map((image, i) => (
              <CarouselCard
                key={`r2-${i}`}
                src={image.src}
                title={image.title}
                category={image.category}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
