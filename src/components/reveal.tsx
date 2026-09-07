"use client";

import { useRef, useEffect, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  type = "up",
  duration = 3,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: "up" | "fade" | "scale" | "left" | "right";
  duration?: 1 | 2 | 3 | 4;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? Array.from(el.querySelectorAll("[data-reveal-child]"))
      : [el];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-80px 0px", threshold: 0.1 },
    );

    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [stagger]);

  if (stagger) {
    return (
      <div ref={ref} className={className}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                data-reveal-child
                className={`reveal reveal-up dur-${duration}`}
                data-delay={i + 1}
              >
                {child}
              </div>
            ))
          : <div data-reveal-child className={`reveal reveal-up dur-${duration}`} data-delay="1">{children}</div>
        }
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`reveal reveal-${type} dur-${duration} ${className}`}
      data-delay={delay}
    >
      {children}
    </div>
  );
}
