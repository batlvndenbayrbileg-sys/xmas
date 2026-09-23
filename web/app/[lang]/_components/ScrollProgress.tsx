"use client";
import { motion, useScroll, useSpring } from "framer-motion";

// Thin accent bar that fills left→right as the page scrolls. Fixed to the very
// top, above the sticky nav. Springed so it glides rather than snaps.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-accent"
    />
  );
}
