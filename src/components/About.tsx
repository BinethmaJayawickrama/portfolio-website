"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Trophy, Database, Calendar } from "lucide-react";
import { gsap } from "gsap";

const stats = [
  { label: "Projects", target: 5, suffix: "+", icon: Sparkles, color: "text-[var(--accent-deep)] dark:text-white bg-[var(--surface)] dark:bg-white/10" },
  { label: "Tech Stacks", target: 8, suffix: "+", icon: Database, color: "text-[var(--accent)] dark:text-[var(--muted-light)] bg-[var(--surface)] dark:bg-white/10" },
  { label: "References", target: 2, suffix: "", icon: Trophy, color: "text-[var(--accent-deep)] dark:text-white bg-[var(--surface)] dark:bg-white/10" },
  { label: "Active Since", target: 2024, suffix: "", icon: Calendar, color: "text-[var(--accent)] dark:text-[var(--muted-light)] bg-[var(--surface)] dark:bg-white/10" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Heading Reveal
    gsap.fromTo(
      ".about-reveal-line span",
      { y: "105%" },
      {
        y: "0%",
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
      { opacity: 0, y: 15 },
      {
        opacity: 0.8,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-heading-trigger",
          start: "top 75%",
        },
      }
    );

    // 3. Stat Cells border tracer and scale triggers
    gsap.fromTo(
      ".about-stat-cell",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
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
        duration: 2.0,
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
      duration: 32,
      repeat: -1,
      ease: "none",
    });

    // 5. Scroll-linked Parallax on the graphic container
    if (containerRef.current && visualRef.current) {
      gsap.fromTo(
        visualRef.current,
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[var(--bg)] to-[var(--surface)]/20 transition-colors duration-500 text-[var(--dark)]"
    >
      <div className="container mx-auto px-6 max-w-6xl z-10 relative border-x border-[var(--border)]/20 dark:border-white/5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Biography and Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="about-heading-trigger space-y-3">
              <span className="text-2xs font-sans font-extrabold tracking-widest text-[var(--accent)] uppercase">Identity Index</span>
              
              {/* Mask reveal headers */}
              <div className="overflow-hidden about-reveal-line h-12 sm:h-14">
                <span className="font-display font-light italic text-4xl sm:text-5xl text-[var(--accent-deep)] dark:text-white leading-none block select-none">
                  My Story & Passion
                </span>
              </div>
            </div>

            {/* Paragraph Line Reveals */}
            <div className="space-y-4 text-[var(--muted)] dark:text-[var(--muted-light)] font-sans leading-relaxed text-sm sm:text-base font-light">
              <p className="about-paragraph opacity-0">
                As a Computer Science undergraduate at Informatics Institute of Technology (IIT) Sri Lanka, affiliated with the University of Westminster UK, I bridge software systems and creative design.
              </p>
              <p className="about-paragraph opacity-0">
                My projects range from building AI-driven hardware kiosks (Adorix) to engineering smart agricultural tracking systems (Smart Tail Pod). I thrive in dynamic spaces where hardware telemetry meets high-end responsive web interfaces.
              </p>
            </div>

            {/* Aligned cell matrix stats block */}
            <div className="about-stats-trigger pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-[var(--border)]/25 dark:border-white/5 rounded-3xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-[var(--border)]/25 dark:divide-white/5">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="about-stat-cell opacity-0 p-5 bg-[var(--white)]/20 dark:bg-white/[0.02] select-none flex flex-col justify-between h-36 relative overflow-hidden group hover:bg-[var(--white)]/40 dark:hover:bg-white/[0.05] transition-colors duration-300"
                    >
                      <div className={`p-2 w-8 h-8 rounded-xl flex items-center justify-center ${stat.color} transition-colors`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        {/* GSAP counts this up */}
                        <span
                          className="about-stat-num block font-display text-2xl sm:text-3xl font-semibold italic text-[var(--dark)]"
                          data-target={stat.target}
                          data-suffix={stat.suffix}
                        >
                          0
                        </span>
                        <p className="text-[9px] font-sans font-extrabold text-[var(--muted)] tracking-wider uppercase mt-1">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Parallax Watermark & Ring */}
          <div ref={visualRef} className="lg:col-span-5 flex justify-center items-center relative h-[300px] lg:h-[450px] select-none pointer-events-none">
            {/* Watermark "02" */}
            <div className="absolute font-display text-[15rem] lg:text-[18rem] font-light italic text-[var(--surface)]/50 dark:text-white/5 pointer-events-none select-none z-0">
              02
            </div>

            {/* Rotating SVG Ring */}
            <div className="about-rotator w-64 h-64 sm:w-80 h-80 rounded-full border border-dashed border-[var(--border)]/30 dark:border-white/10 flex items-center justify-center z-10 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-4/5 h-4/5 text-[var(--accent)]/15 dark:text-white/5 overflow-visible"
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
