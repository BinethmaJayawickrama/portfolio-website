"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export type CursorMode = "default" | "pointer" | "card" | "text";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics-based spring trailing for organic fluid response
  const springConfig = { damping: 28, stiffness: 400, mass: 0.25 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop with fine pointer & without prefers-reduced-motion
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='card']") || target.closest(".project-card-item")) {
        setCursorMode("card");
      } else if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("[data-cursor='pointer']")
      ) {
        setCursorMode("pointer");
      } else if (
        ["P", "H1", "H2", "H3", "H4", "SPAN", "LI"].includes(target.tagName) &&
        !target.closest("a") &&
        !target.closest("button")
      ) {
        setCursorMode("text");
      } else {
        setCursorMode("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden md:block">
      {/* ── Inner Sharp Center Dot ── */}
      <motion.div
        className="fixed top-0 left-0 bg-[var(--accent)] rounded-full mix-blend-difference pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorMode === "pointer" ? 0 : cursorMode === "card" ? 0 : 6,
          height: cursorMode === "pointer" ? 0 : cursorMode === "card" ? 0 : 6,
          opacity: cursorMode === "pointer" || cursorMode === "card" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* ── Outer Fluid Following Halo Ring ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--accent)] pointer-events-none flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorMode === "card"
              ? 76
              : cursorMode === "pointer"
              ? 48
              : cursorMode === "text"
              ? 22
              : 32,
          height:
            cursorMode === "card"
              ? 76
              : cursorMode === "pointer"
              ? 48
              : cursorMode === "text"
              ? 22
              : 32,
          backgroundColor:
            cursorMode === "card"
              ? "rgba(250, 204, 21, 0.12)"
              : cursorMode === "pointer"
              ? "rgba(250, 204, 21, 0.15)"
              : "rgba(250, 204, 21, 0.04)",
          borderColor:
            cursorMode === "card"
              ? "rgba(250, 204, 21, 0.8)"
              : cursorMode === "pointer"
              ? "rgba(250, 204, 21, 0.9)"
              : "rgba(250, 204, 21, 0.4)",
          borderRadius: cursorMode === "card" ? "18px" : "9999px",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        {cursorMode === "card" && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--accent)] uppercase select-none">
            VIEW
          </span>
        )}
      </motion.div>
    </div>
  );
}
