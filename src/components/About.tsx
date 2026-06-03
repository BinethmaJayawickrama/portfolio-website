"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Trophy, Database, Calendar } from "lucide-react";

const stats = [
  { label: "Projects", target: 5, suffix: "+", icon: Sparkles, color: "text-rose-dark bg-rose-soft/60" },
  { label: "Tech Stacks", target: 8, suffix: "+", icon: Database, color: "text-lavender-deep bg-lavender-soft/65" },
  { label: "References", target: 2, suffix: "", icon: Trophy, color: "text-rose-dark bg-rose-soft/60" },
  { label: "Active Since", target: 2024, suffix: "", icon: Calendar, color: "text-lavender-deep bg-lavender-soft/65" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      // 1. Heading Mask Reveal Animation
      gsap.fromTo(
        ".about-reveal-line span",
        { y: "100%" },
        {
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading-trigger",
            start: "top 80%",
          },
        }
      );

      // 2. Paragraph sentence staggered reveals
      gsap.fromTo(
        ".about-paragraph",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-heading-trigger",
            start: "top 75%",
          },
        }
      );

      // 3. Stat Cards scale-in and count-up animation
      gsap.fromTo(
        ".about-stat-card",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".about-stats-trigger",
            start: "top 80%",
          },
        }
      );

      const statNumbers = document.querySelectorAll(".about-stat-num");
      statNumbers.forEach((el) => {
        const targetVal = parseInt(el.getAttribute("data-target") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString() + suffix;
          },
        });
      });

      // 4. Slowly rotate SVG ring decoration
      gsap.to(".about-rotator", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-20 relative overflow-hidden bg-sand text-slate-800"
    >
      {/* Background soft lighting blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-rose-soft/25 rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-lavender-soft/20 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Biography and Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="about-heading-trigger space-y-3">
              <span className="text-2xs font-sans font-extrabold tracking-widest text-rose-deep uppercase">Identity Index</span>
              
              {/* Mask reveal headers */}
              <div className="overflow-hidden about-reveal-line h-12 sm:h-14">
                <span className="font-display font-light italic text-4xl sm:text-5xl text-rose-dark leading-none block select-none">
                  My Story & Passion
                </span>
              </div>
            </div>

            {/* Paragraph Line Reveals */}
            <div className="space-y-4 text-slate-650 font-sans leading-relaxed text-sm sm:text-base font-light">
              <p className="about-paragraph opacity-0">
                As a Computer Science undergraduate at Informatics Institute of Technology (IIT) Sri Lanka, affiliated with the University of Westminster UK, I bridge software systems and creative design.
              </p>
              <p className="about-paragraph opacity-0">
                My projects range from building AI-driven hardware kiosks (Adorix) to engineering smart agricultural tracking systems (Smart Tail Pod). I thrive in dynamic spaces where hardware telemetry meets high-end responsive web interfaces.
              </p>
            </div>

            {/* Stats grid */}
            <div className="about-stats-trigger grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="about-stat-card bg-white/55 border border-rose-deep/10 p-5 rounded-[24px] shadow-3xs hover:shadow-2xs hover:bg-white/85 hover:-translate-y-1.5 transition-all duration-400 select-none flex flex-col justify-between h-36 relative overflow-hidden group"
                  >
                    <div className={`p-2 w-8 h-8 rounded-xl flex items-center justify-center ${stat.color} transition-colors group-hover:bg-rose-mid/30`}>
                      <Icon className="w-4 h-4 text-rose-dark" />
                    </div>
                    <div>
                      {/* GSAP counts this up */}
                      <span
                        className="about-stat-num font-display text-2xl sm:text-3xl font-semibold italic text-slate-800"
                        data-target={stat.target}
                        data-suffix={stat.suffix}
                      >
                        0
                      </span>
                      <p className="text-[10px] font-sans font-extrabold text-slate-400 tracking-wider uppercase mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Large Watermark and Rotator SVG */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[300px] lg:h-[450px]">
            {/* Watermark "01" */}
            <div className="absolute font-display text-[15rem] lg:text-[18rem] font-light italic text-rose-soft/50 pointer-events-none select-none z-0">
              01
            </div>

            {/* Rotating SVG Ring */}
            <div className="about-rotator w-64 h-64 sm:w-80 h-80 rounded-full border border-dashed border-rose-deep/15 flex items-center justify-center z-10 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-4/5 h-4/5 text-rose-deep/10 overflow-visible"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 6"
                />
                {/* Diagonal ticks */}
                <line x1="50" y1="5" x2="50" y2="15" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="85" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="0.5" />
                <line x1="85" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
