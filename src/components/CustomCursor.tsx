"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.4 };
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if mouse hover is supported
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let activeListeners: Array<{ el: Element; over: () => void; out: () => void }> = [];

    const bindHoverEvents = () => {
      // Unbind previous if any
      activeListeners.forEach(({ el, over, out }) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
      activeListeners = [];

      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, [data-hover="true"], select'
      );

      hoverables.forEach((el) => {
        const over = () => setIsHovered(true);
        const out = () => setIsHovered(false);
        el.addEventListener("mouseenter", over);
        el.addEventListener("mouseleave", out);
        activeListeners.push({ el, over, out });
      });
    };

    bindHoverEvents();

    // Re-bind when dynamic DOM elements are created
    const observer = new MutationObserver(() => {
      bindHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      activeListeners.forEach(({ el, over, out }) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-teal-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-sky-500 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          backgroundColor: isHovered ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
}
