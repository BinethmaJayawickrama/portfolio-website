"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  magneticStrength?: number; // Distance multiplier (default: 0.35)
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  download,
  target,
  rel,
  style,
  magneticStrength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Motion values for raw mouse displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for organic magnetic snap
  const springConfig = { damping: 14, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Inner content shifts slightly less for 3D parallax depth via reactive transforms
  const innerX = useTransform(smoothX, (val) => val * 0.35);
  const innerY = useTransform(smoothY, (val) => val * 0.35);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Center coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * magneticStrength;
    const deltaY = (clientY - centerY) * magneticStrength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Content = (
    <motion.div
      style={{
        x: innerX,
        y: innerY,
      }}
      className="w-full h-full flex items-center justify-center gap-2 pointer-events-none"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="inline-block"
      >
        <a
          href={href}
          download={download}
          target={target}
          rel={rel}
          onClick={onClick}
          style={style}
          className={className}
        >
          {Content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="inline-block"
    >
      <button
        type="button"
        onClick={onClick}
        style={style}
        className={className}
      >
        {Content}
      </button>
    </motion.div>
  );
}
