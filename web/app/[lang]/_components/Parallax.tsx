"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Scroll-linked vertical parallax. As the element travels through the viewport
// its content drifts by ±`amount` px, springed for a soft, premium feel.
// MotionConfig(reducedMotion="user") neutralises the transform for a11y.
export function Parallax({
  children, amount = 40, className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const y = useSpring(yRaw, { stiffness: 130, damping: 30, mass: 0.4 });
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
