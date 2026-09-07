"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { clientGalleries } from "@/lib/config";
import { ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ClientGallery() {
  return (
    <section id="gallery" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 texture-lines opacity-30" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-elegant text-5xl font-bold text-text-primary md:text-6xl">
            Find and download your{" "}
            <span className="italic text-accent-light">memories.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Every event receives its own private online gallery.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {clientGalleries.map((gallery) => (
            <motion.div
              key={gallery.name}
              variants={cardVariants}
              className="group overflow-hidden rounded-3xl border border-border bg-surface/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={gallery.src}
                  alt={gallery.name}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-text-primary">
                  {gallery.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-light">
                  {gallery.event}
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  {gallery.date} &middot; {gallery.location}
                </p>
                <button className="mt-4 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent hover:bg-accent/20 hover:text-accent-light">
                  View Gallery
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
