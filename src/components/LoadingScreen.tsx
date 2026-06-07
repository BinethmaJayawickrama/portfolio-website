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
  const circleRef = useRef<SVGCircleElement>(null);
  const pathBRef = useRef<SVGPathElement>(null);
  const pathJRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set initial stroke states for drawing
    const paths = [circleRef.current, pathBRef.current, pathJRef.current];
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

    // 1. Draw SVG paths (1.4s)
    if (circleRef.current) {
      tl.to(circleRef.current, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.inOut",
      }, 0);
    }
    if (pathBRef.current) {
      tl.to(pathBRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0.2);
    }
    if (pathJRef.current) {
      tl.to(pathJRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0.4);
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
        className="absolute top-0 left-0 w-full h-1/2 bg-[#fbf5f2] border-b border-[#e8d0cb]/40 pointer-events-auto"
      />

      {/* Bottom Curtain Panel */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#fbf5f2] border-t border-[#e8d0cb]/40 pointer-events-auto"
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
            {/* Outward Ring */}
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              stroke="#d25a47"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 'B' Path */}
            <path
              ref={pathBRef}
              d="M 38 30 L 38 70 M 38 30 H 48 C 55 30, 55 48, 38 48 H 45 C 53 48, 53 70, 38 70 Z"
              stroke="#e8d0cb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 'J' Path */}
            <path
              ref={pathJRef}
              d="M 54 30 H 64 M 59 30 L 59 62 C 59 70, 48 70, 48 62"
              stroke="#7e2d20"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Progress Bar Container */}
          <div className="w-48 h-[2px] bg-[#f6e6e1] rounded-full overflow-hidden mb-6 relative">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-[#d25a47] origin-left scale-x-0"
            />
          </div>

          {/* Text Labels */}
          <h1 className="font-display font-light text-2xl tracking-[0.25em] text-[#7e2d20] uppercase select-none">
            Binethma Jayawickrama
          </h1>
          <p className="text-[9px] font-sans tracking-[0.4em] text-[#8e7a76] uppercase mt-2 select-none">
            Creative Developer Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
