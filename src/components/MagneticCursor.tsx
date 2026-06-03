"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "text" | "card" | "image">("default");
  const [isOverDark, setIsOverDark] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for smooth lag (lerp feel but high responsiveness)
  const springConfig = { damping: 40, stiffness: 350, mass: 0.4 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on devices that do not support hover or screens < 768px
    const handleResize = () => {
      if (window.innerWidth < 768 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
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
      if (!isVisible) setIsVisible(true);

      // Detect background theme (dark vs light sections)
      const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (element) {
        const isDark = !!element.closest("#contact") || 
                       !!element.closest("#footer") || 
                       !!element.closest(".bg-charcoal") || 
                       !!element.closest(".bg-charcoal-mid");
        setIsOverDark(isDark);

        // Check hover target classification
        const isProjectCard = element.closest(".project-card-item") || element.closest("[data-cursor='card']");
        const isMedia = element.tagName === "IMG" || element.closest("[data-cursor='image']");
        const isHoverable = element.closest("a") || 
                            element.closest("button") || 
                            element.closest('[role="button"]') || 
                            element.closest('[data-hover="true"]') ||
                            element.tagName === "INPUT" || 
                            element.tagName === "SELECT";
        
        const isText = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "TEXTAREA"].includes(element.tagName) && 
                       !element.closest("a") && 
                       !element.closest("button") && 
                       !element.closest('[role="button"]');

        if (isProjectCard) {
          setCursorType("card");
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
      const elements = document.querySelectorAll<HTMLElement>('[data-magnetic="true"], .magnetic-btn, nav button, footer a');
      magneticElements = Array.from(elements);

      magneticElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-magnetic-speed") || "0.2"); // magnetic scale: 6px pull

        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;

          // Pull the element towards the cursor by a max of 6px
          const clampVal = 6;
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

  // Compute color values based on state & dark/light background
  const dotColor = isOverDark ? "bg-white" : "bg-rose-deep";
  const ringColor = isOverDark ? "rgba(255, 255, 255, 0.7)" : "var(--color-rose-deep)";
  const textColor = isOverDark ? "text-charcoal" : "text-rose-dark";
  const textBgColor = isOverDark ? "bg-white/90" : "bg-rose-soft/20";

  return (
    <>
      {/* Inner Dot (follows coordinates instantly) */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center ${dotColor} ${isOverDark ? "mix-blend-difference" : ""}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "text" ? 1.5 : cursorType === "hover" ? 0 : 6,
          height: cursorType === "text" ? 14 : cursorType === "hover" ? 0 : 6,
          borderRadius: cursorType === "text" ? "1px" : "9999px",
          opacity: cursorType === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Ring (spring lag physics) */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center border ${isOverDark ? "mix-blend-difference" : ""}`}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: ringColor,
          borderWidth: cursorType === "text" ? "1.5px" : "1.5px",
        }}
        animate={{
          width: cursorType === "hover" ? 64 : cursorType === "text" ? 16 : cursorType === "card" ? 60 : cursorType === "image" ? 40 : 40,
          height: cursorType === "hover" ? 64 : cursorType === "text" ? 16 : cursorType === "card" ? 60 : cursorType === "image" ? 40 : 40,
          borderRadius: cursorType === "card" ? "12px" : "9999px",
          backgroundColor: cursorType === "hover" ? "rgba(249, 228, 236, 0.2)" : "rgba(249, 228, 236, 0.0)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        {cursorType === "card" && (
          <span className={`text-[9px] font-sans font-extrabold uppercase tracking-widest ${textColor} select-none`}>
            View
          </span>
        )}
        {cursorType === "image" && (
          <span className={`text-[12px] font-light ${textColor} select-none`}>
            +
          </span>
        )}
      </motion.div>
    </>
  );
}
