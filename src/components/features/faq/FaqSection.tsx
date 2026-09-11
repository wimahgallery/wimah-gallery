"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { guarantees } from "@/lib/config";
import { Plus, Minus, Shield } from "lucide-react";
import { WhatsApp } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/lib/config";
import { usePublicFaqs } from "@/hooks/queries/use-faqs";
import type { Faq } from "@/types";

gsap.registerPlugin(ScrollTrigger);

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div ref={ref}>
      <div
        className={`border-b transition-colors duration-300 ${isOpen ? "border-accent/30" : "border-border"}`}
      >
        <button
          onClick={onClick}
          className="flex w-full items-center gap-3 sm:gap-4 py-4 sm:py-5 text-left transition-colors duration-300 group active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
        >
          <div
            className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${isOpen ? "bg-accent text-background" : "bg-accent/10 text-accent group-hover:bg-accent/15"}`}
          >
            {isOpen ? (
              <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </div>
          <span
            className={`flex-1 font-heading text-sm sm:text-base font-normal transition-colors duration-300 ${isOpen ? "text-accent" : "text-text-primary group-hover:text-accent"}`}
          >
            {question}
          </span>
        </button>
        <div
          ref={contentRef}
          style={{ height: 0, opacity: 0, overflow: "hidden" }}
        >
          <div className="pl-10 sm:pl-12 pr-3 sm:pr-4 pb-4 sm:pb-5">
            <p className="text-xs sm:text-sm text-text-secondary leading-normal">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuaranteeCard({
  item,
  index,
}: {
  item: (typeof guarantees)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3 sm:p-4 transition-colors duration-300 hover:border-accent/20 hover:bg-surface"
    >
      <div className="shrink-0 mt-0.5 h-2 w-2 rounded-full bg-accent" />
      <div>
        <p className="font-heading text-xs sm:text-sm font-normal text-text-primary mb-1">
          {item.title}
        </p>
        <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = usePublicFaqs();

  const faqs = (response?.data ?? []).filter((f) => f.visible);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" className="relative py-14 sm:py-20 lg:py-32 texture-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div ref={titleRef}>
            <div className="lg:sticky lg:top-32">
              <p className="mb-3 sm:mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
                FAQ WIMAH PHOTOBOOTH
              </p>
              <h2 className="mb-4 sm:mb-6 font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
                Pertanyaan{" "}
                <span className="font-elegant italic text-accent">umum</span>
              </h2>
              <p className="mb-6 sm:mb-8 text-sm sm:text-base text-text-secondary leading-relaxed">
                Semua yang perlu Anda ketahui tentang layanan photobooth kami.
              </p>
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya punya pertanyaan tentang layanan WIMAH Photobooth.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-text-primary transition-[transform,colors] duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <WhatsApp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                Ask us on WhatsApp
              </a>
            </div>
          </div>
          <div>
            <div className="rounded-3xl border border-border bg-surface p-1.5 sm:p-2">
              {isLoading ? (
                <div className="space-y-2 sm:space-y-3 p-3 sm:p-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse h-14 sm:h-16 rounded-2xl bg-[#E8E3D8]/30"
                    />
                  ))}
                </div>
              ) : isError ? (
                <div className="py-10 sm:py-12 text-center">
                  <p className="text-sm text-text-secondary">
                    Failed to load. Please try again.
                  </p>
                </div>
              ) : faqs.length === 0 ? (
                <div className="py-10 sm:py-12 text-center">
                  <p className="text-sm text-text-secondary">No FAQs yet.</p>
                </div>
              ) : (
                faqs.map((faq, i) => (
                  <FaqItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    index={i}
                  />
                ))
              )}
            </div>
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-accent/10">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                <h3 className="font-heading text-base sm:text-xl font-normal text-text-primary">
                  GARANSI WIMAH PHOTOBOOTH
                </h3>
              </div>
              <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                {guarantees.map((item, i) => (
                  <GuaranteeCard key={item.title} item={item} index={i} />
                ))}
              </div>
            </div>
            <div className="mt-8 sm:mt-10 text-center">
              <p className="font-heading text-base sm:text-lg font-normal text-text-primary">
                Your Moment, Your Memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
