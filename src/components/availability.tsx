"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animated, useSpring, useSprings, useInView } from "@react-spring/web";
import { Heart, PartyPopper, Users, GraduationCap } from "lucide-react";

const eventCards = [
  { label: "Wedding", icon: Heart },
  { label: "Ulang Tahun", icon: PartyPopper },
  { label: "Corporate", icon: Users },
  { label: "Wisuda", icon: GraduationCap },
];

const floatingCards = [
  {
    id: 1,
    rotate: -18,
    x: -180,
    y: 40,
    zIndex: 1,
    image: "https://ik.imagekit.io/wimahgallery/Gallery/mepandes.jpg",
    enterFrom: { x: -400, y: 300, rotate: -45 },
  },
  {
    id: 2,
    rotate: -9,
    x: -90,
    y: 10,
    zIndex: 2,
    image: "https://ik.imagekit.io/wimahgallery/Gallery/raka_devita.jpg",
    enterFrom: { x: -200, y: 200, rotate: -25 },
  },
  {
    id: 3,
    rotate: 0,
    x: 0,
    y: -20,
    zIndex: 5,
    image: "https://ik.imagekit.io/wimahgallery/Gallery/dipta_yulia.jpg",
    enterFrom: { x: 0, y: -400, rotate: 0 },
  },
  {
    id: 4,
    rotate: 9,
    x: 90,
    y: 10,
    zIndex: 2,
    image: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma_celeb.jpg",
    enterFrom: { x: 200, y: 200, rotate: 25 },
  },
  {
    id: 5,
    rotate: 18,
    x: 180,
    y: 40,
    zIndex: 1,
    image: "https://ik.imagekit.io/wimahgallery/Gallery/pandi_sukma.jpg",
    enterFrom: { x: 400, y: 300, rotate: 45 },
  },
];

const floatingConfigs = [
  {
    yAmplitude: 12,
    xAmplitude: 4,
    rotateAmplitude: 2,
    scaleAmplitude: 0.015,
    speed: 0.0008,
    delay: 0,
  },
  {
    yAmplitude: 10,
    xAmplitude: 3,
    rotateAmplitude: 1.5,
    scaleAmplitude: 0.01,
    speed: 0.001,
    delay: 200,
  },
  {
    yAmplitude: 14,
    xAmplitude: 5,
    rotateAmplitude: 1,
    scaleAmplitude: 0.02,
    speed: 0.0007,
    delay: 400,
  },
  {
    yAmplitude: 10,
    xAmplitude: 3,
    rotateAmplitude: 1.5,
    scaleAmplitude: 0.01,
    speed: 0.0009,
    delay: 600,
  },
  {
    yAmplitude: 12,
    xAmplitude: 4,
    rotateAmplitude: 2,
    scaleAmplitude: 0.015,
    speed: 0.0008,
    delay: 800,
  },
];

export default function Availability() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const [titleRef, titleInView] = useInView(() => ({ triggerOnce: true }));
  const [titleSpring] = useSpring(() => ({
    opacity: titleInView ? 1 : 0,
    y: titleInView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  }));

  const [springs, api] = useSprings(floatingCards.length, (i) => ({
    x: floatingCards[i].enterFrom.x,
    y: floatingCards[i].enterFrom.y,
    rotate: floatingCards[i].enterFrom.rotate,
    scale: 0.8,
    opacity: 0,
    config: { tension: 120, friction: 14, mass: 1 },
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      api.start((i) => ({
        x: floatingCards[i].x,
        y: floatingCards[i].y,
        rotate: floatingCards[i].rotate,
        scale: i === 2 ? 1.08 : 1,
        opacity: 1,
        config: { tension: 120, friction: 14, mass: 1 },
        onRest: () => {
          if (i === 2) setEntered(true);
        },
      }));
    }, 300);
    return () => clearTimeout(timer);
  }, [api]);

  useEffect(() => {
    if (!entered) return;
    startTimeRef.current = performance.now();

    function animate(time: number) {
      const elapsed = time - startTimeRef.current;
      api.start((i) => {
        const cfg = floatingConfigs[i];
        const t = elapsed + cfg.delay;
        const floatY = Math.sin(t * cfg.speed) * cfg.yAmplitude;
        const floatX = Math.cos(t * cfg.speed * 0.7) * cfg.xAmplitude;
        const floatRotate = Math.sin(t * cfg.speed * 0.5) * cfg.rotateAmplitude;
        const floatScale =
          1 + Math.sin(t * cfg.speed * 0.3) * cfg.scaleAmplitude;
        const baseScale = i === 2 ? 1.08 : 1;
        return {
          y:
            floatingCards[i].y +
            floatY +
            mousePos.y * (i === 2 ? -0.03 : -0.015),
          x:
            floatingCards[i].x + floatX + mousePos.x * (i === 2 ? 0.03 : 0.015),
          rotate: floatingCards[i].rotate + floatRotate,
          scale: (baseScale + floatScale - 1) * (1 + (i === 2 ? 0.02 : 0)),
          config: { tension: 200, friction: 30 },
        };
      });
      animFrameRef.current = requestAnimationFrame(animate);
    }
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [entered, mousePos, api]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setMousePos({
      x: (e.clientX - centerX) * 0.1,
      y: (e.clientY - centerY) * 0.1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden texture-crosshatch">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-accent/5 blur-[80px] sm:blur-[120px] lg:blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <animated.div
          ref={titleRef}
          style={titleSpring}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 fill-accent text-accent"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary tracking-tight">
            Hadir untuk berbagai{" "}
            <span className="font-elegant italic text-accent">
              bentuk perayaan.
            </span>
          </h2>
          <p className="mt-4 text-sm text-text-secondary">
            Berbasis di Gianyar, Bali
          </p>
        </animated.div>

        {/* Floating photobooth showcase */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[350px] sm:h-[400px] lg:h-[450px] flex items-center justify-center mb-20"
        >
          {springs.map((style, i) => (
            <FloatingCard key={floatingCards[i].id} style={style} index={i} />
          ))}
        </div>

        {/* Event type cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[800px] mx-auto">
          {eventCards.map((event, i) => (
            <EventCard key={event.label} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  style,
  index,
}: {
  style: ReturnType<typeof useSprings>[0][number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isCenter = index === 2;

  const hoverSpring = useSpring({
    scale: hovered ? (isCenter ? 1.12 : 1.08) : 1,
    boxShadow: hovered
      ? "0 25px 60px rgba(84, 82, 77, 0.25), 0 10px 20px rgba(84, 82, 77, 0.1)"
      : isCenter
        ? "0 20px 50px rgba(84, 82, 77, 0.18), 0 8px 16px rgba(84, 82, 77, 0.08)"
        : "0 12px 30px rgba(84, 82, 77, 0.12), 0 4px 10px rgba(84, 82, 77, 0.06)",
    config: { tension: 300, friction: 25 },
  });

  return (
    <animated.div
      style={{
        ...style,
        scale: style.scale.to((s: number) => (hovered ? s * 1.05 : s)),
        zIndex: hovered ? 10 : floatingCards[index].zIndex,
        position: "absolute",
        transformOrigin: "center bottom",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      <animated.div
        style={{
          scale: hoverSpring.scale,
          boxShadow: hoverSpring.boxShadow,
        }}
        className={`relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_12px_30px_rgba(84,82,77,0.15)] ${
          isCenter
            ? "w-[180px] sm:w-[220px] lg:w-[260px]"
            : "w-[150px] sm:w-[180px] lg:w-[220px]"
        }`}
      >
        <div className="relative aspect-[3/4] bg-surface/50">
          <img
            src={floatingCards[index].image}
            alt="Photobooth"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 right-3 h-1 rounded-full bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
          <div className="absolute bottom-3 left-3 right-3 h-1 rounded-full bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
        </div>
      </animated.div>
    </animated.div>
  );
}

function EventCard({
  event,
  index,
}: {
  event: (typeof eventCards)[number];
  index: number;
}) {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }));
  const [style] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    delay: index * 80,
    config: { tension: 280, friction: 60 },
  }));

  const Icon = event.icon;

  return (
    <animated.div
      ref={ref}
      style={style}
      className="group relative flex flex-col items-center gap-4 bg-surface/50 border border-border rounded-3xl p-6 transition-all duration-500 hover:border-accent/20 hover:bg-surface/80 hover:shadow-[0_8px_40px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98] cursor-default"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/10 transition-all duration-500 group-hover:bg-accent/15 group-hover:ring-accent/20">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <span className="font-heading text-base font-normal text-text-primary text-center">
        {event.label}
      </span>
    </animated.div>
  );
}
