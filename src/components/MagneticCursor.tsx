"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "text" | "card" | "image" | "link">("default");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Precision springs for responsive trail following
  const springConfig = { damping: 32, stiffness: 450, mass: 0.3 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
      } else {
        document.body.classList.add("custom-cursor-active");
      }
    };

    if (window.innerWidth < 768 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("resize", handleResize);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (element) {
        const isProjectCard = element.closest(".project-card-item") || element.closest("[data-cursor='card']");
        const isMedia = element.tagName === "IMG" || element.closest("[data-cursor='image']");
        const isAnchor = element.closest("a") || element.closest('[data-cursor="link"]');
        const isHoverable =
          element.closest("button") ||
          element.closest('[role="button"]') ||
          element.closest('[data-hover="true"]') ||
          element.tagName === "INPUT" ||
          element.tagName === "SELECT" ||
          element.tagName === "TEXTAREA";

        const isText =
          ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "LI"].includes(element.tagName) &&
          !element.closest("a") &&
          !element.closest("button") &&
          !element.closest('[role="button"]');

        if (isProjectCard) {
          setCursorType("card");
        } else if (isAnchor) {
          setCursorType("link");
        } else if (isHoverable) {
          setCursorType("hover");
        } else if (isMedia) {
          setCursorType("image");
        } else if (isText) {
          setCursorType("text");
        } else {
          setCursorType("default");
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // --- MAGNETIC BUTTONS PHYSICS ---
    let magneticElements: HTMLElement[] = [];
    const bindMagneticEvents = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        '[data-magnetic="true"], .magnetic-btn, nav button, footer a, footer button'
      );
      magneticElements = Array.from(elements);

      magneticElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-magnetic-speed") || "0.24");

        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;

          const clampVal = 9;
          const pullX = Math.max(-clampVal, Math.min(clampVal, distanceX * speed));
          const pullY = Math.max(-clampVal, Math.min(clampVal, distanceY * speed));

          el.style.transform = `translate(${pullX}px, ${pullY}px)`;
          el.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
        };

        const onMouseLeave = () => {
          el.style.transform = "translate(0px, 0px)";
          el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        };

        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);

        (el as any)._magneticMove = onMouseMove;
        (el as any)._magneticLeave = onMouseLeave;
      });
    };

    bindMagneticEvents();

    const observer = new MutationObserver(() => {
      magneticElements.forEach((el) => {
        if ((el as any)._magneticMove) el.removeEventListener("mousemove", (el as any)._magneticMove);
        if ((el as any)._magneticLeave) el.removeEventListener("mouseleave", (el as any)._magneticLeave);
      });
      bindMagneticEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      magneticElements.forEach((el) => {
        if ((el as any)._magneticMove) el.removeEventListener("mousemove", (el as any)._magneticMove);
        if ((el as any)._magneticLeave) el.removeEventListener("mouseleave", (el as any)._magneticLeave);
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
      {/* Inner Dot: precise pointer. Color-inverts via mix-blend. */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "text" ? 2 : cursorType === "hover" ? 0 : 8,
          height: cursorType === "text" ? 16 : cursorType === "hover" ? 0 : 8,
          borderRadius: cursorType === "text" ? "1px" : "9999px",
          opacity: cursorType === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Outer Ring: spring trail. Color-inverts. Includes Coordinate Telemetry & custom glyphs. */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center border border-white mix-blend-difference bg-white/5"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorType === "hover"
              ? 64
              : cursorType === "text"
              ? 16
              : cursorType === "card"
              ? 80
              : cursorType === "image"
              ? 48
              : cursorType === "link"
              ? 54
              : 44,
          height:
            cursorType === "hover"
              ? 64
              : cursorType === "text"
              ? 16
              : cursorType === "card"
              ? 80
              : cursorType === "image"
              ? 48
              : cursorType === "link"
              ? 54
              : 44,
          borderRadius: cursorType === "card" ? "14px" : "9999px",
          backgroundColor: cursorType === "hover" ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.03)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 26 }}
      >
        {/* Float Coordinates Telemetry for CAD structural look */}
        {cursorType === "default" && (
          <span className="absolute left-6 top-6 text-[7px] font-mono text-white/50 select-none pointer-events-none tracking-widest uppercase">
            X:{coords.x} Y:{coords.y}
          </span>
        )}

        {/* Diagonal Arrow Glyph for Outbound Links */}
        {cursorType === "link" && (
          <span className="text-[12px] font-sans font-semibold text-white select-none leading-none">
            ↗
          </span>
        )}

        {/* View card indicator */}
        {cursorType === "card" && (
          <span className="text-[8px] font-sans font-extrabold uppercase tracking-widest text-white select-none">
            View →
          </span>
        )}
      </motion.div>
    </>
  );
}
