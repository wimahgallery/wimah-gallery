"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Camera,
  Heart,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { smoothScrollTo } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

const editorialPhotos = [
  {
    color: "bg-[#7C8472]",
    caption: "Sesi persiapan sebelum acara dimulai",
    aspect: "aspect-[4/5]",
    rotate: "-rotate-2",
  },
  {
    color: "bg-[#5F6558]",
    caption: "Di balik lensa, setiap detail diperhatikan",
    aspect: "aspect-[3/4]",
    rotate: "rotate-1",
  },
  {
    color: "bg-[#9AA391]",
    caption: "Moments of joy, captured in real time",
    aspect: "aspect-[4/5]",
    rotate: "-rotate-1",
  },
  {
    color: "bg-[#D4A853]",
    caption: "Senyum yang kami ciptakan setiap hari",
    aspect: "aspect-[3/4]",
    rotate: "rotate-2",
  },
];



const milestones = [
  {
    year: "2020",
    title: "Langkah Pertama",
    description:
      "Dimulai dari satu photobooth di pesta pernikahan teman di Gianyar. Dari situ, kami belajar bahwa senyum yang tercipta saat melihat foto instan adalah sesuatu yang tak ternilai.",
  },
  {
    year: "2021",
    title: "Tumbuh Bersama Kepercayaan",
    description:
      "Melayani 50+ event di seluruh Bali. Kami memperkenalkan sistem galeri digital instan dan mulai membangun reputasi sebagai photobooth premium yang bisa diandalkan.",
  },
  {
    year: "2022",
    title: "Evolusi Teknologi",
    description:
      "Upgrade ke kamera mirrorless, printer tercepat 15 detik, dan sistem photobooth modern. Kami mulai melayani wedding besar, corporate gala, dan event internasional.",
  },
  {
    year: "2023",
    title: "Tim yang Solid",
    description:
      "Bertumbuh dari satu orang menjadi tim empat orang yang berdedikasi. Setiap anggota membawa keahlian unik — dari fotografi hingga desain, dari teknis hingga pengalaman klien.",
  },
  {
    year: "2024",
    title: "Premium Experience",
    description:
      "Menciptakan konsep premium yang lengkap — dari custom template hingga boomerang, dari GIF interaktif hingga setup elegan yang meningkatkan suasana setiap acara.",
  },
];

const philosophy = [
  {
    icon: Camera,
    title: "Craft",
    subtitle: "Kesempurnaan dalam Detail",
    description:
      "Setiap foto yang kami hasilkan melalui proses yang hati-hati — dari pencahayaan, komposisi, hingga color grading. Kami tidak puas dengan 'cukup bagus'.",
  },
  {
    icon: Heart,
    title: "Heart",
    subtitle: "Koneksi yang Tulus",
    description:
      "Kami tidak sekadar mengoperasikan mesin. Kami berinteraksi, menghangatkan suasana, dan memastikan setiap tamu merasa istimewa saat berdiri di depan lensa kami.",
  },
  {
    icon: Sparkles,
    title: "Soul",
    subtitle: "Cerita di Balik Setiap Klik",
    description:
      "Kami memahami bahwa di balik setiap foto ada cerita — cinta, kebahagiaan, kebanggaan. Misi kami adalah menjaga cerita itu hidup selamanya.",
  },
];

function EditorialImage({
  photo,
  side,
}: {
  photo: (typeof editorialPhotos)[number];
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          x: side === "left" ? -40 : 40,
          rotate: side === "left" ? -3 : 3,
        },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [side]);

  return (
    <div ref={ref} className="relative" style={{ opacity: 0 }}>
      <div
        className={`relative ${photo.color} ${photo.aspect} ${photo.rotate} rounded-2xl sm:rounded-3xl overflow-hidden transition-[transform,box-shadow] duration-500 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-white/15 select-none">
            WIMAH
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <p className="mt-3 text-[10px] sm:text-[11px] text-text-secondary italic text-center sm:text-left">
        {photo.caption}
      </p>
    </div>
  );
}



export default function AboutPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const storyHeadingRef = useRef<HTMLHeadingElement>(null);
  const storyP1Ref = useRef<HTMLParagraphElement>(null);
  const storyP2Ref = useRef<HTMLParagraphElement>(null);
  const storyP3Ref = useRef<HTMLParagraphElement>(null);
  const storyP4Ref = useRef<HTMLParagraphElement>(null);
  const storyP5Ref = useRef<HTMLParagraphElement>(null);
  const timelineHeadingRef = useRef<HTMLHeadingElement>(null);
  const timelineItemsRef = useRef<(HTMLElement | null)[]>([]);
  const philosophyHeadingRef = useRef<HTMLHeadingElement>(null);
  const philosophyCardsRef = useRef<(HTMLElement | null)[]>([]);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      const heroItems = [
        heroSubRef.current,
        heroTitleRef.current,
        heroTaglineRef.current,
      ].filter(Boolean) as HTMLElement[];
      gsap.fromTo(
        heroItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Story heading
      if (storyHeadingRef.current) {
        gsap.fromTo(
          storyHeadingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyHeadingRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Story paragraphs
      const paras = [storyP1Ref, storyP2Ref, storyP3Ref, storyP4Ref, storyP5Ref]
        .map((r) => r.current)
        .filter(Boolean) as HTMLElement[];
      if (paras.length) {
        gsap.fromTo(
          paras,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paras[0],
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Timeline heading
      if (timelineHeadingRef.current) {
        gsap.fromTo(
          timelineHeadingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineHeadingRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Timeline items
      const tlItems = timelineItemsRef.current.filter(Boolean) as HTMLElement[];
      if (tlItems.length) {
        gsap.fromTo(
          tlItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tlItems[0],
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Philosophy heading
      if (philosophyHeadingRef.current) {
        gsap.fromTo(
          philosophyHeadingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyHeadingRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Philosophy cards
      const philCards = philosophyCardsRef.current.filter(
        Boolean,
      ) as HTMLElement[];
      if (philCards.length) {
        gsap.fromTo(
          philCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philCards[0],
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Quote
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#3a3830] via-[#4a473e] to-[#2e2c26]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 texture-noise opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] rounded-full bg-[#D4A853]/[0.06] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute [paint-order:stroke_fill] [-webkit-text-stroke:1px_rgba(212,168,83,0.08)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[25vw] font-black text-white/[0.03] pointer-events-none select-none whitespace-nowrap"
          aria-hidden="true"
        >
          STORY
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 w-full text-center">
          <p
            ref={heroSubRef}
            className="mb-4 sm:mb-6 text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase text-[#D4A853]/80"
            style={{ opacity: 0 }}
          >
            Est. 2020 &mdash; Gianyar, Bali
          </p>
          <h1
            ref={heroTitleRef}
            className="font-heading text-[36px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-normal leading-[1.05] tracking-tight text-white"
            style={{ opacity: 0 }}
          >
            Our{" "}
            <span className="font-elegant italic text-[#D4A853]">Story</span>
          </h1>
          <p
            ref={heroTaglineRef}
            className="mt-6 sm:mt-8 max-w-[520px] mx-auto text-sm sm:text-base text-white/50 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Menciptakan pengalaman fotografi premium yang menghadirkan senyum
            di wajah setiap orang — satu momen pada satu waktu.
          </p>
        </div>
      </section>

      {/* ═══════════ STORY (editorial layout) ═══════════ */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <h2
            ref={storyHeadingRef}
            className="font-heading text-[28px] sm:text-[40px] lg:text-[52px] font-normal text-text-primary text-center leading-tight mb-12 sm:mb-20"
          >
            Dimulai dari sebuah{" "}
            <span className="font-elegant italic text-accent">passion</span>,
            <br className="hidden sm:block" /> bukan sekadar bisnis.
          </h2>

          {/* Row 1: Text + Image */}
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_400px] items-center mb-16 sm:mb-24">
            <div className="space-y-5 sm:space-y-6">
              <p
                ref={storyP1Ref}
                className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed"
                style={{ opacity: 0 }}
              >
                Wimah Photobooth lahir dari kecintaan terhadap momen-momen kecil
                yang sering terlupakan — tawa renyah di hari pernikahan, pelukan
                hangat di ulang tahun, dan kebanggaan di hari wisuda. Kami
                percaya bahwa setiap perayaan layak diabadikan dengan cara yang
                istimewa.
              </p>
              <p
                ref={storyP2Ref}
                className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed"
                style={{ opacity: 0 }}
              >
                Berawal dari sebuah photobooth sederhana di pesta pernikahan
                teman di Gianyar, kami menyadari bahwa senyum yang tercipta saat
                seseorang melihat foto instan mereka adalah sesuatu yang tak
                ternilai. Dari situlah mimpi kami dimulai.
              </p>
            </div>
            <EditorialImage photo={editorialPhotos[0]} side="right" />
          </div>

          {/* Row 2: Image + Text */}
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[400px_1fr] items-center mb-16 sm:mb-24">
            <EditorialImage photo={editorialPhotos[1]} side="left" />
            <div className="space-y-5 sm:space-y-6">
              <p
                ref={storyP3Ref}
                className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed"
                style={{ opacity: 0 }}
              >
                Setiap setup yang kami bangun, setiap desain template yang kami
                buat, adalah cerminan dari dedikasi kami terhadap seni dan
                keindahan. Kami tidak pernah memperlakukan setiap acara sama
                — karena setiap cerita memiliki keunikannya sendiri.
              </p>
              <p
                ref={storyP4Ref}
                className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed"
                style={{ opacity: 0 }}
              >
                Kami terus belajar dan berevolusi. Teknologi terus berubah,
                tren terus bergulir, tetapi satu hal yang tetap sama — keinginan
                kami untuk membuat setiap orang yang berdiri di depan lensa kami
                merasa spesial.
              </p>
            </div>
          </div>

          {/* Quote */}
          <blockquote
            ref={quoteRef}
            className="my-16 sm:my-20 lg:my-24 border-l-2 border-[#D4A853]/40 pl-6 sm:pl-8 max-w-[700px] mx-auto"
            style={{ opacity: 0 }}
          >
            <p className="font-elegant italic text-lg sm:text-xl lg:text-2xl text-text-primary leading-relaxed">
              &ldquo;Kami tidak menjual foto. Kami menjual kenangan yang bisa
              Anda pegang, sentuh, dan bagikan selamanya.&rdquo;
            </p>
            <cite className="mt-3 sm:mt-4 block text-xs sm:text-sm text-text-secondary not-italic">
              &mdash; Ketut Wimah, Founder
            </cite>
          </blockquote>

          {/* Row 3: Text + Image */}
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_400px] items-center mb-16 sm:mb-24">
            <div className="space-y-5 sm:space-y-6">
              <p
                ref={storyP5Ref}
                className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed"
                style={{ opacity: 0 }}
              >
                Hari ini, Wimah Photobooth telah menjadi bagian dari ratusan
                perayaan di seluruh Bali. Dari pernikahan intim di sawah
                hingga gala dinner korporat, dari ulang tahun anak hingga
                wisuda universitas — kami hadir untuk menciptakan momen yang
                tak terlupakan.
              </p>
            </div>
            <EditorialImage photo={editorialPhotos[2]} side="right" />
          </div>

          {/* Row 4: Image + Text */}
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[400px_1fr] items-center">
            <EditorialImage photo={editorialPhotos[3]} side="left" />
            <div className="space-y-5 sm:space-y-6">
              <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                Kami terus berevolusi, menghadirkan teknologi terkini dengan
                sentuhan personal yang membuat setiap acara menjadi unik. Dari
                custom template hingga GIF interaktif, dari boomerang hingga
                galeri digital instan — kami menghadirkan pengalaman yang
                melampaui ekspektasi.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                Dan ini baru permulaan. Perjalanan kami masih jauh dari
                selesai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DIVIDER ═══════════ */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ═══════════ TIMELINE ═══════════ */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-surface/10 to-background"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <div ref={timelineHeadingRef} className="mb-12 sm:mb-16 text-center">
            <p className="mb-3 sm:mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Perjalanan Kami
            </p>
            <h2 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
              Dari mimpi hingga{" "}
              <span className="font-elegant italic text-accent-light">
                kenyataan.
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-border"
              aria-hidden="true"
            />

            <div className="space-y-8 sm:space-y-10">
              {milestones.map((m, i) => (
                <article
                  key={m.year}
                  ref={(el) => {
                    timelineItemsRef.current[i] = el;
                  }}
                  className="relative flex gap-5 sm:gap-8"
                  style={{ opacity: 0 }}
                >
                  <div className="relative z-10 shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <span className="font-heading text-xs sm:text-sm font-normal text-accent">
                      {m.year.slice(-2)}
                    </span>
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <p className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-accent mb-1">
                      {m.year}
                    </p>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-text-primary mb-2">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DIVIDER ═══════════ */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ═══════════ PHILOSOPHY ═══════════ */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div ref={philosophyHeadingRef} className="mb-10 sm:mb-16 text-center">
            <p className="mb-3 sm:mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Filosofi Kami
            </p>
            <h2 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
              Tiga pilar yang{" "}
              <span className="font-elegant italic text-accent">membimbing</span>{" "}
              setiap langkah.
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {philosophy.map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  ref={(el) => {
                    philosophyCardsRef.current[i] = el;
                  }}
                  className="group rounded-2xl sm:rounded-3xl border border-border bg-surface p-6 sm:p-8 text-center transition-[transform,colors] duration-500 hover:border-accent/20 hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)] hover:scale-[1.02]"
                  style={{ opacity: 0 }}
                >
                  <div className="mx-auto mb-4 sm:mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <p className="mb-1 text-[10px] sm:text-xs font-medium tracking-wider uppercase text-accent/60">
                    {item.subtitle}
                  </p>
                  <h3 className="font-heading text-xl sm:text-2xl font-normal text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-accent/10 to-surface/30" />
          <div className="absolute inset-0 texture-lines opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
        </div>

        <div
          ref={ctaRef}
          className="relative z-10 mx-auto max-w-[700px] px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="mb-4 sm:mb-6 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Siap menciptakan kenangan?
          </p>
          <h2 className="mb-6 sm:mb-8 font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal leading-tight text-text-primary">
            Mari kita{" "}
            <span className="font-elegant italic text-accent">ceritakan</span>{" "}
            kisah Anda.
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 max-w-[480px] text-sm sm:text-base text-text-secondary leading-relaxed">
            Hubungi kami hari ini dan mari bersama-sama menciptakan momen yang
            akan Anda kenang selamanya.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={`${siteConfig.whatsappLink}?text=${encodeURIComponent(siteConfig.whatsappBookingMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-background transition-[transform,colors] duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Book via WhatsApp
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <Link
              href="/#pricing"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#pricing", { offset: -64 });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-accent transition-[transform,colors] duration-300 hover:border-accent hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Lihat Harga
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
