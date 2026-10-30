"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Download, ArrowDown, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import TextScramble from "@/components/TextScramble";
import MagneticButton from "@/components/MagneticButton";

// Lazy-load the IoT circuit canvas background to avoid any SSR overhead and preserve initial paint speed
const HeroCircuitBackground = dynamic(() => import("@/components/HeroCircuitBackground"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      ".hero-heading-line",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
    );
    tl.fromTo(
      ".hero-text-fade",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
    tl.fromTo(
      ".hero-cta-wrapper",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  const handleScrollToProjects = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#projects", { duration: 1.2 });
    } else {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="hero-layout relative flex flex-col justify-center pb-16 overflow-hidden text-[var(--dark)] rounded-3xl"
    >
      {/* ── 1. Interactive IoT/Circuit Reactive Background (Lazy Loaded) ── */}
      <HeroCircuitBackground />

      <div className="relative z-10 w-full flex flex-col gap-6 sm:gap-8 items-center lg:items-start text-center lg:text-left pt-6">

        {/* ── Animated Scramble Headline ── */}
        <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left w-full">
          <p className="hero-heading-line text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[var(--muted)] font-medium">
            Creative Software Engineer
          </p>

          <div className="hero-heading-line min-h-[72px] sm:min-h-[96px] md:min-h-[116px] flex items-center">
            <h1 className="font-display font-black uppercase tracking-tight text-[clamp(34px,6.2vw,68px)] leading-[0.98] text-[var(--dark)]">
              <TextScramble
                phrases={[
                  "Full-Stack Developer",
                  "IoT Innovator",
                  "Creative Engineer",
                ]}
                typingSpeed={35}
                pauseDuration={2600}
              />
            </h1>
          </div>
        </div>

        {/* ── Bio paragraph ── */}
        <p className="hero-text-fade text-base sm:text-lg md:text-xl leading-[1.8] text-[var(--muted)] max-w-[540px] font-sans font-light text-center lg:text-left">
          Full-Stack Developer specializing in modern web applications. Passionate about building scalable, user-focused solutions using frontend and backend technologies to create seamless digital experiences.
        </p>

        {/* ── Magnetic CTA Buttons ── */}
        <div className="hero-cta-wrapper flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full mt-4 sm:mt-6">
          
          {/* Primary CTA: View Projects (Yellow accent fill with magnetic physics) */}
          <MagneticButton
            onClick={handleScrollToProjects}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl font-sans font-semibold text-[15px] bg-[var(--accent)] text-[var(--accent-text)] hover:shadow-[0_8px_24px_rgba(250,204,21,0.35)] transition-shadow duration-300 w-full sm:w-auto"
            style={{ padding: "16px 36px" }}
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </MagneticButton>

          {/* Secondary CTA: Download CV (Surface fill, dark text, magnetic physics) */}
          <MagneticButton
            href="/cv.pdf"
            download="Binethma_Jayawickrama_CV.pdf"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl font-sans font-semibold text-[15px] bg-[var(--white)] text-[var(--dark)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--dark)]/25 transition-all duration-300 w-full sm:w-auto shadow-xs"
            style={{ padding: "16px 36px" }}
          >
            <span>Download CV</span>
            <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </MagneticButton>

        </div>

      </div>
    </section>
  );
}
