"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 60, damping: 20, mass: 0.5 });
  const glowX = useSpring(cursorX, { stiffness: 40, damping: 15, mass: 0.8 });
  const glowY = useSpring(cursorY, { stiffness: 40, damping: 15, mass: 0.8 });
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
            width: hovering ? 56 : 10,
            height: hovering ? 56 : 10,
            opacity: hovering ? 0.7 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.3 }}
          className="rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            width: hovering ? 100 : 36,
            height: hovering ? 100 : 36,
            opacity: hovering ? 0.12 : 0.06,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 12, mass: 0.5 }}
          className="rounded-full bg-accent blur-xl -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
