"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  type?: "mask" | "fade-up" | "draw-line";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, type = "fade-up", delay = 0, className = "" }: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getStyle = () => {
    return {
      transitionDelay: `${delay}ms`,
    };
  };

  if (type === "mask") {
    return (
      <div
        ref={elementRef}
        className={`mask-reveal ${isIntersecting ? "active" : ""} ${className}`}
      >
        <span className="mask-reveal-text inline-block" style={getStyle()}>
          {children}
        </span>
      </div>
    );
  }

  if (type === "draw-line") {
    return (
      <div
        ref={elementRef}
        className={`flex items-center gap-4 ${className}`}
      >
        <div style={getStyle()} className={`h-[1px] bg-rose-deep origin-left transition-transform duration-1000 ease-out ${isIntersecting ? "scale-x-100" : "scale-x-0"} w-16`} />
        <div style={{ transitionDelay: `${delay + 100}ms` }} className={`transition-all duration-700 ease-out ${isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
          {children}
        </div>
      </div>
    );
  }

  // Default: fade-up
  return (
    <div
      ref={elementRef}
      style={getStyle()}
      className={`transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
