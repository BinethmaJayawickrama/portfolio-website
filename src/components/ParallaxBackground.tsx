"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function ParallaxBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 120, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDesktop(window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 40;
      const offsetY = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* ── Top-right ambient accent glow with subtle mouse parallax ── */}
      <motion.div
        style={{
          x: isDesktop ? smoothX : 0,
          y: isDesktop ? smoothY : 0,
        }}
        className="absolute -top-[15%] right-[5%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/6 blur-[140px]"
      />

      {/* ── Bottom-left ambient secondary glow ── */}
      <motion.div
        style={{
          x: isDesktop ? smoothX : 0,
          y: isDesktop ? smoothY : 0,
        }}
        className="absolute top-[45%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[var(--dark)]/4 dark:bg-[var(--accent)]/4 blur-[160px]"
      />
    </div>
  );
}
