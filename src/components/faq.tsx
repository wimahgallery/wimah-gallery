"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/motion/reveal";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/config";
import { useIsMobile } from "@/hooks/use-is-mobile";

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[700px] mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          <div
            className={`rounded-3xl border transition-all duration-500 ${
              openIndex === i
                ? "border-accent/20 bg-surface/60 shadow-[0_4px_24px_rgba(61,43,37,0.06)]"
                : "border-border bg-surface/20 hover:border-accent/10 hover:bg-surface/30"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 flex items-center justify-between text-left"
            >
              <span className="font-heading text-base font-medium pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-text-secondary" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-text-secondary leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function FAQMobile() {
  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-accent/4 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Pertanyaan yang{" "}
            <span className="font-elegant italic text-accent-light">sering diajukan.</span>
          </h2>
        </FadeIn>
        <FAQList />
      </div>
    </section>
  );
}

function FAQDesktop() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} id="faq" className="relative py-32 overflow-hidden texture-lines">
      <motion.div style={{ y: bgY }} className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/4 blur-[120px]" />
      <div className="absolute bottom-16 left-24 w-20 h-20 organic-blob bg-accent/4 animate-warm-pulse" style={{ animationDelay: "2.5s" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Pertanyaan yang{" "}
            <span className="font-elegant italic text-accent-light">sering diajukan.</span>
          </h2>
        </FadeIn>
        <FAQList />
      </div>
    </section>
  );
}

export function FAQ() {
  const isMobile = useIsMobile();
  return isMobile ? <FAQMobile /> : <FAQDesktop />;
}
