"use client";

import { animated, useSpring, useInView } from "@react-spring/web";
import { packages, siteConfig } from "@/lib/config";
import { Check, MessageCircle, Star, Crown, Sparkles, Zap } from "lucide-react";

const packageIcons = [Zap, Star, Crown, Sparkles];

function PricingCard({
  pkg,
  index,
}: {
  pkg: (typeof packages)[number];
  index: number;
}) {
  const [ref, inView] = useInView(() => ({
    triggerOnce: true,
    threshold: 0.1,
  }));

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 40,
    delay: index * 100,
    config: { tension: 280, friction: 60 },
  });

  const Icon = packageIcons[index] || Zap;

  return (
    <animated.div
      ref={ref}
      style={cardSpring}
      className={`relative group rounded-3xl border p-8 transition-all duration-500 ${
        pkg.popular
          ? "border-accent bg-gradient-to-b from-accent/10 via-surface/80 to-surface/50 shadow-[0_8px_40px_rgba(124,132,114,0.12)] scale-[1.02] hover:scale-[1.03] active:scale-[0.98]"
          : "border-border bg-surface/40 hover:border-accent/20 hover:bg-surface/60 hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-background">
            <Star className="h-3 w-3 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
          pkg.popular
            ? "bg-accent/15 text-accent"
            : "bg-surface-secondary/50 text-text-secondary group-hover:bg-accent/10 group-hover:text-accent"
        } transition-colors duration-300`}>
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mb-2 font-heading text-xl font-normal text-text-primary">
          {pkg.name}
        </h3>

        {pkg.subtitle && (
          <p className="text-sm text-text-secondary">{pkg.subtitle}</p>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className={`font-heading text-3xl font-normal tracking-tight ${
            pkg.popular ? "text-accent" : "text-text-primary"
          }`}>
            {pkg.price}
          </span>
        </div>
      </div>

      <ul className="mb-8 space-y-3.5">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-text-secondary"
          >
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              pkg.popular
                ? "bg-accent/15 text-accent"
                : "bg-surface-secondary/60 text-text-secondary"
            }`}>
              <Check className="h-3 w-3" />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik dengan paket ${pkg.name} dari Wimah Gallery.`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          pkg.popular
            ? "bg-accent text-background hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.3)]"
            : "border border-border bg-background/50 text-text-primary hover:border-accent/30 hover:bg-accent/5"
        }`}
      >
        <MessageCircle className="h-4 w-4" />
        Book via WhatsApp
      </a>
    </animated.div>
  );
}

export default function Pricing() {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section id="pricing" className="relative py-20 lg:py-32 texture-diagonal">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <animated.div
          ref={ref}
          style={titleSpring}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Pricing
          </p>
          <h2 className="mb-6 font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Simple, transparent{" "}
            <span className="font-elegant italic text-accent">
              pricing
            </span>
          </h2>
          <p className="mx-auto max-w-[480px] text-base text-text-secondary leading-relaxed">
            Choose the perfect package for your event. All packages include professional setup and premium equipment.
          </p>
        </animated.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-secondary">
            Need a custom package?{" "}
            <a
              href={`${siteConfig.whatsappLink}?text=Halo! Saya ingin konsultasi paket custom dari Wimah Gallery.`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-light hover:decoration-accent/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
