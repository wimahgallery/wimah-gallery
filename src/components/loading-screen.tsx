"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = prev < 60 ? 8 : prev < 85 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          {/* Background warm glows */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-light/4 blur-[100px]" />

          {/* Organic blobs */}
          <div className="absolute top-20 left-20 w-16 h-16 organic-blob bg-accent/4 animate-warm-pulse" />
          <div className="absolute bottom-24 right-24 w-12 h-12 organic-blob bg-accent/5 animate-warm-pulse" style={{ animationDelay: "1s" }} />

          <div className="relative flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-accent/10 border border-accent/15">
                <span className="font-heading text-2xl font-bold text-accent">W</span>
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-2xl font-bold tracking-tight text-text-primary mb-2"
            >
              Wimah Gallery
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-text-secondary tracking-wider uppercase mb-10"
            >
              Pengalaman Photobooth Premium
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 h-[3px] bg-border rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full origin-left"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-4 text-xs font-medium text-text-secondary/60 tabular-nums"
            >
              {progress}%
            </motion.span>
          </div>

          {/* Curtain overlay that fades */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={progress >= 100 ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-background pointer-events-none"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
