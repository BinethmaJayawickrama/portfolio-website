"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Staggered reveals for headers and contents
    tl.fromTo(
      ".hero-heading-line",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    tl.fromTo(
      ".hero-text-fade",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-stat-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".hero-card-item",
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  return (
    <section
      id="home"
      className="hero-layout relative flex flex-col justify-center pb-12 overflow-hidden bg-transparent select-none text-[var(--dark)]"
    >
      <div className="w-full flex flex-col gap-10">
        
        {/* Giant Headers Info Panel */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="hero-heading-line font-display font-black text-[48px] sm:text-[64px] md:text-[80px] lg:text-[84px] xl:text-[94px] tracking-tight leading-[0.9] uppercase select-none">
            FULL STACK
          </h1>
          <h1 className="hero-heading-line font-display font-black text-[48px] sm:text-[64px] md:text-[80px] lg:text-[84px] xl:text-[94px] tracking-tight leading-[0.9] uppercase select-none text-transparent" style={{ WebkitTextStroke: "1.5px var(--dark)" }}>
            DEVELOPER
          </h1>

          <p className="hero-text-fade mt-6 text-sm sm:text-base leading-relaxed text-[var(--muted)] dark:text-[var(--muted-light)] max-w-xl font-light">
            Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-[var(--border)] pt-8 mt-4">
          <div className="hero-stat-item flex flex-col items-start gap-1">
            <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[var(--dark)]">
              +3
            </span>
            <span className="text-[9px] font-sans font-extrabold tracking-widest text-[var(--muted)] uppercase leading-tight">
              YEARS OF STUDY
            </span>
          </div>
          <div className="hero-stat-item flex flex-col items-start gap-1">
            <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[var(--dark)]">
              +10
            </span>
            <span className="text-[9px] font-sans font-extrabold tracking-widest text-[var(--muted)] uppercase leading-tight">
              COMPLETED PROJECTS
            </span>
          </div>
          <div className="hero-stat-item flex flex-col items-start gap-1">
            <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[var(--dark)]">
              +2
            </span>
            <span className="text-[9px] font-sans font-extrabold tracking-widest text-[var(--muted)] uppercase leading-tight">
              RESEARCH DOMAINS
            </span>
          </div>
        </div>

        {/* Two Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          
          {/* Card 1 */}
          <div
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="hero-card-item bg-[var(--white)]/60 dark:bg-[var(--white)]/5 border border-[var(--border)] rounded-[20px] p-6 flex flex-col justify-between h-40 cursor-pointer hover:border-[var(--accent)] hover:shadow-xs transition-all duration-300 group"
            data-cursor="link"
          >
            <div className="flex justify-end w-full">
              <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-[9px] font-sans font-extrabold tracking-wider text-[var(--muted)] uppercase">
                Focus Areas
              </span>
              <h3 className="font-display font-semibold text-lg text-[var(--dark)] italic leading-tight mt-1">
                Dynamic Interaction & Comp. Vision
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="hero-card-item bg-[var(--white)]/60 dark:bg-[var(--white)]/5 border border-[var(--border)] rounded-[20px] p-6 flex flex-col justify-between h-40 cursor-pointer hover:border-[var(--accent)] hover:shadow-xs transition-all duration-300 group"
            data-cursor="link"
          >
            <div className="flex justify-end w-full">
              <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-[9px] font-sans font-extrabold tracking-wider text-[var(--muted)] uppercase">
                Tech Stack
              </span>
              <h3 className="font-display font-semibold text-lg text-[var(--dark)] italic leading-tight mt-1">
                Next.js, Figma, Flutter, Python
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
