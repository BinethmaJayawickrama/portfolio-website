"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  pulsePhase: number;
  isChip: boolean;
}

interface Pulse {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
}

export default function HeroCircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = { x: -2000, y: -2000, radius: 150 };
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    const isDarkTheme = () => document.documentElement.classList.contains("dark");

    const setupDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    const initNodes = () => {
      nodes.length = 0;
      // Balanced density: approx 1 node per 18,000 px^2 (capped for 60fps)
      const count = Math.min(Math.max(Math.floor((width * height) / 16000), 24), 55);

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseRadius: Math.random() > 0.85 ? 3 : 1.8,
          radius: 1.8,
          pulsePhase: Math.random() * Math.PI * 2,
          isChip: Math.random() > 0.9,
        });
      }
    };

    setupDimensions();
    initNodes();

    // Pulse spawn timer
    let lastPulseTime = 0;

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkTheme();
      const nodeColor = dark ? "rgba(250, 204, 21, 0.75)" : "rgba(30, 41, 59, 0.65)";
      const chipColor = dark ? "rgba(250, 204, 21, 0.9)" : "rgba(234, 179, 8, 0.9)";
      const traceBaseAlpha = dark ? 0.12 : 0.08;
      const connectionDistance = 140;

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Mouse interaction (repel gently and glow)
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            node.x -= Math.cos(angle) * force * 1.2;
            node.y -= Math.sin(angle) * force * 1.2;
            node.radius = node.baseRadius + force * 2.5;
          } else if (node.radius > node.baseRadius) {
            node.radius -= 0.05;
          }
        }

        // Draw node
        ctx.beginPath();
        if (node.isChip) {
          // Square microchip node for IoT flavor
          const size = node.radius * 2.4;
          ctx.rect(node.x - size / 2, node.y - size / 2, size, size);
          ctx.fillStyle = chipColor;
          ctx.fill();
        } else {
          // Circular solder pad node
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      // Draw circuit traces (connecting lines)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * traceBaseAlpha;

            // Check if near mouse for amplified trace glow
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const mouseDist = Math.hypot(mouse.x - midX, mouse.y - midY);
            const mouseBoost = mouseDist < mouse.radius ? (1 - mouseDist / mouse.radius) * 0.35 : 0;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);

            // Circuit-style routing (occasional orthogonal bend)
            if ((i + j) % 3 === 0) {
              const bendX = n1.x + dx * 0.5;
              const bendY = n1.y;
              ctx.lineTo(bendX, bendY);
              ctx.lineTo(n2.x, n2.y);
            } else {
              ctx.lineTo(n2.x, n2.y);
            }

            ctx.strokeStyle = dark
              ? `rgba(250, 204, 21, ${alpha + mouseBoost})`
              : `rgba(15, 23, 42, ${alpha + mouseBoost * 0.5})`;
            ctx.lineWidth = mouseBoost > 0 ? 1.2 : 0.75;
            ctx.stroke();

            // Spawn intermittent circuit telemetry pulses
            if (!prefersReducedMotion && time - lastPulseTime > 800 && Math.random() < 0.015) {
              lastPulseTime = time;
              pulses.push({
                startX: n1.x,
                startY: n1.y,
                targetX: n2.x,
                targetY: n2.y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.015,
                color: dark ? "#facc15" : "#eab308",
              });
            }
          }
        }
      }

      // Draw & animate telemetry pulses
      if (!prefersReducedMotion) {
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1) {
            pulses.splice(p, 1);
            continue;
          }

          const curX = pulse.startX + (pulse.targetX - pulse.startX) * pulse.progress;
          const curY = pulse.startY + (pulse.targetY - pulse.startY) * pulse.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Viewport IntersectionObserver to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const handleResize = () => {
      setupDimensions();
      initNodes();
      if (prefersReducedMotion) {
        render(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    if (prefersReducedMotion) {
      render(0);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle radial fade to keep content readable */}
      <div className="absolute inset-0 bg-radial-to-c from-transparent via-[var(--bg)]/40 to-[var(--bg)] pointer-events-none" />
    </div>
  );
}
