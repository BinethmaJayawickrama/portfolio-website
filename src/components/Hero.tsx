"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      ".hero-heading-line",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
    );
    tl.fromTo(
      ".hero-text-fade",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
    tl.fromTo(
      ".hero-cta",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  return (
    <section
      id="home"
      className="hero-layout relative flex flex-col justify-center pb-16 overflow-hidden text-[var(--dark)]"
    >
      <div className="w-full flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">


        {/* ── Main Heading ── */}
        <div className="flex flex-col gap-0 items-center lg:items-start text-center lg:text-left w-full">
          <h1 className="hero-heading-line font-display font-black uppercase leading-[0.88] tracking-tight text-[clamp(52px,9vw,88px)] text-[var(--dark)]">
            FULL-STACK
          </h1>
          <h1
            className="hero-heading-line font-display font-black uppercase leading-[0.88] tracking-tight text-[clamp(52px,9vw,88px)] text-transparent select-none"
            style={{ WebkitTextStroke: "1.5px var(--dark)" }}
          >
            DEVELOPER
          </h1>
        </div>


        {/* ── Bio paragraph ── */}
        <p className="hero-text-fade text-lg sm:text-xl md:text-2xl leading-relaxed text-[var(--muted)] max-w-[420px] mx-auto lg:mx-0 font-sans font-light text-justify lg:text-left">
          Full-Stack Developer specializing in modern web applications. Passionate about building scalable, user-focused solutions using frontend and backend technologies to create seamless digital experiences.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">

          {/* Primary — yellow accent fill */}
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="hero-cta inline-flex items-center justify-center rounded-md font-sans font-bold text-[15px] bg-[var(--accent)] text-[var(--accent-text)] hover:opacity-90 transition-opacity duration-200 w-full sm:w-auto"
            style={{ padding: "20px 52px" }}
          >
            View Work
          </button>

          {/* Secondary — white fill */}
          <a
            href="/cv.pdf"
            download
            className="hero-cta inline-flex items-center justify-center rounded-md font-sans font-bold text-[15px] bg-white text-black border border-neutral-200 dark:border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-100 transition-all duration-200 w-full sm:w-auto"
            style={{ padding: "20px 52px" }}
          >
            Download Resume
          </a>

        </div>

      </div>
    </section>
  );
}
