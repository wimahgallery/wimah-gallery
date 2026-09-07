"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 40 });
  const glowX = useSpring(cursorX, { stiffness: 200, damping: 30 });
  const glowY = useSpring(cursorY, { stiffness: 200, damping: 30 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 768
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll("a, button, [data-cursor]");
      newEls.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      observer.disconnect();
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: glowX, y: glowY }}
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 12,
            height: hovering ? 64 : 12,
            opacity: hovering ? 0.8 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            width: hovering ? 120 : 40,
            height: hovering ? 120 : 40,
            opacity: hovering ? 0.15 : 0.08,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="rounded-full bg-accent blur-xl -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
