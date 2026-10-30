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
  const countRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathBRef = useRef<SVGPathElement>(null);
  const pathJRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

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

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // 1. Draw SVG monogram initials (0s -> 0.9s)
    if (pathBRef.current) {
      tl.to(
        pathBRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.95,
          ease: "power2.inOut",
        },
        0
      );
    }
    if (pathJRef.current) {
      tl.to(
        pathJRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.95,
          ease: "power2.inOut",
        },
        0.15
      );
    }

    // 2. Animate progress bar & counter (1.2s)
    if (progressRef.current) {
      tl.to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 1.25,
          ease: "power2.inOut",
        },
        0
      );
    }

    if (countRef.current) {
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.25,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = `${Math.floor(counterObj.val)}%`;
            }
          },
        },
        0
      );
    }

    // 3. Fade out monogram & progress (0.25s)
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.96,
          duration: 0.28,
          ease: "power2.in",
        },
        1.3
      );
    }

    // 4. Split curtain panels reveal (0.55s)
    if (topCurtainRef.current) {
      tl.to(
        topCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        },
        1.45
      );
    }
    if (bottomCurtainRef.current) {
      tl.to(
        bottomCurtainRef.current,
        {
          yPercent: 100,
          duration: 0.6,
          ease: "power3.inOut",
        },
        1.45
      );
    }
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex flex-col"
    >
      {/* Top Curtain Panel */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[var(--bg)] border-b border-[var(--border)]/40 pointer-events-auto shadow-2xl"
      />

      {/* Bottom Curtain Panel */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--bg)] border-t border-[var(--border)]/40 pointer-events-auto shadow-2xl"
      />

      {/* Center content wrapper */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Luminous Glow behind initials */}
          <div className="absolute w-36 h-36 bg-[var(--accent)]/15 blur-2xl rounded-full -top-4 pointer-events-none" />

          {/* Monogram SVG */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-5 overflow-visible relative z-10"
          >
            {/* 'B' Ribbon Path */}
            <path
              ref={pathBRef}
              d="M 36 65 C 36 65, 36 28, 36 28 C 36 28, 48 20, 48 36 C 48 46, 38 46, 36 46 C 36 46, 52 46, 52 60 C 52 70, 42 70, 36 70"
              stroke="var(--dark)"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 'J' Ribbon Path (Interlocks and wraps under the B path) */}
            <path
              ref={pathJRef}
              d="M 48 28 C 48 28, 62 28, 62 28 M 56 28 L 56 58 C 56 68, 44 68, 38 68 C 32 68, 28 62, 28 56"
              stroke="var(--accent)"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Progress Bar & Percentage */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-40 h-[2px] bg-[var(--border)] rounded-full overflow-hidden relative">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full w-full bg-[var(--accent)] origin-left scale-x-0"
              />
            </div>
            <span
              ref={countRef}
              className="text-[11px] font-mono font-medium text-[var(--muted)] w-8 text-right"
            >
              0%
            </span>
          </div>

          {/* Text Labels */}
          <h1 className="font-display font-medium text-xs tracking-[0.3em] text-[var(--muted)] uppercase select-none">
            Binethma Jayawickrama
          </h1>
        </div>
      </div>
    </div>
  );
}
