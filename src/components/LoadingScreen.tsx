"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathBRef = useRef<SVGPathElement>(null);
  const pathJRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set initial stroke states for drawing
    const paths = [pathBRef.current, pathJRef.current];
    paths.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // 1. Draw SVG paths (starting immediately at 0s and 0.2s)
    if (pathBRef.current) {
      tl.to(pathBRef.current, {
        strokeDashoffset: 0,
        duration: 1.3,
        ease: "power2.inOut",
      }, 0);
    }
    if (pathJRef.current) {
      tl.to(pathJRef.current, {
        strokeDashoffset: 0,
        duration: 1.3,
        ease: "power2.inOut",
      }, 0.25);
    }

    // 2. Animate progress bar fill (1.8s)
    if (progressRef.current) {
      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: "power1.inOut",
      }, 0);
    }

    // 3. Fade out monogram & progress bar (0.3s)
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.35,
        ease: "power2.in",
      }, 1.9);
    }

    // 4. Vertical split curtain panels (0.75s)
    if (topCurtainRef.current) {
      tl.to(topCurtainRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: "power3.inOut",
      }, 2.05);
    }
    if (bottomCurtainRef.current) {
      tl.to(bottomCurtainRef.current, {
        yPercent: 100,
        duration: 0.75,
        ease: "power3.inOut",
      }, 2.05);
    }
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex flex-col"
    >
      {/* Top Curtain Panel (Warm Light Champagne Pearl #fbf5f2) */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[var(--bg)] border-b border-[var(--border)]/40 pointer-events-auto"
      />

      {/* Bottom Curtain Panel */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--bg)] border-t border-[var(--border)]/40 pointer-events-auto"
      />

      {/* Center content wrapper */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Monogram SVG */}
          <svg
            width="140"
            height="140"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-6 overflow-visible"
          >
            {/* 'B' Ribbon Path */}
            <path
              ref={pathBRef}
              d="M 36 65 C 36 65, 36 28, 36 28 C 36 28, 48 20, 48 36 C 48 46, 38 46, 36 46 C 36 46, 52 46, 52 60 C 52 70, 42 70, 36 70"
              stroke="var(--dark)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 'J' Ribbon Path (Interlocks and wraps under the B path) */}
            <path
              ref={pathJRef}
              d="M 48 28 C 48 28, 62 28, 62 28 M 56 28 L 56 58 C 56 68, 44 68, 38 68 C 32 68, 28 62, 28 56"
              stroke="var(--accent)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Progress Bar Container */}
          <div className="w-48 h-[2px] bg-[var(--surface)] rounded-full overflow-hidden mb-6 relative">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-[var(--accent)] origin-left scale-x-0"
            />
          </div>

          {/* Text Labels */}
          <h1 className="hidden sm:block font-display font-light text-2xl tracking-[0.25em] text-[var(--dark)] uppercase select-none">
            Binethma Jayawickrama
          </h1>
        </div>
      </div>
    </div>
  );
}
