"use client";

export default function Marquee({
  items,
  reverse = false,
  slow = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden bg-accent-dark py-3 sm:py-4 ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""} ${slow ? "marquee-slow" : ""} -skew-x-3`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 whitespace-nowrap pr-4 font-heading text-[14px] sm:text-[16px] lg:text-[20px] font-normal uppercase tracking-[0.15em] text-background/40"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
