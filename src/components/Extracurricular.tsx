"use client";

import { useEffect } from "react";
import { Award, Compass, Star, Users, Volleyball } from "lucide-react";
import { gsap } from "gsap";

const activities = [
  { name: "IEEE Computer Society Member", role: "2024 - Present", icon: Star, color: "bg-[var(--surface)]/50 border-[var(--border)] text-[var(--accent-deep)]" },
  { name: "RACIIT Active Member", role: "2024 - Present", icon: Users, color: "bg-[var(--surface)]/50 border-[var(--border)] text-[var(--accent-deep)]" },
  { name: "University Carrom Team", role: "Athlete", icon: Award, color: "bg-[var(--surface)]/50 border-[var(--border)] text-[var(--accent-deep)]" },
  { name: "School Volleyball Representative", role: "Athlete", icon: Volleyball, color: "bg-[var(--surface)]/50 border-[var(--border)] text-[var(--accent-deep)]" },
  { name: "Science Society Presentations", role: "Active Organizer", icon: Compass, color: "bg-[var(--surface)]/50 border-[var(--border)] text-[var(--accent-deep)]" }
];

export default function Extracurricular() {

  useEffect(() => {
    // Heading Reveal
    gsap.fromTo(
      ".extra-reveal-line span",
      { y: "100%" },
      {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".extra-heading-trigger",
          start: "top 80%",
        },
      }
    );

    // Staggered cell reveals
    gsap.fromTo(
      ".extra-cell-item",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".extra-grid-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="extracurricular"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[var(--surface)]/10 to-[var(--bg)] transition-colors duration-500 text-[var(--dark)]"
    >
      <div className="container mx-auto px-6 max-w-6xl z-10 relative border-x border-[var(--border)]/20 dark:border-white/5 py-12">
        {/* Header */}
        <div className="extra-heading-trigger text-center mb-12 space-y-4">
          <div className="overflow-hidden h-6 flex justify-center">
            <span className="text-2xs font-sans font-extrabold tracking-widest text-[var(--accent)] uppercase block select-none">
              Active Spaces
            </span>
          </div>
          
          <div className="overflow-hidden extra-reveal-line h-12 sm:h-14 flex justify-center">
            <h2 className="font-display font-light italic text-4xl sm:text-5xl text-[var(--accent-deep)] dark:text-white leading-tight select-none">
              Extracurricular Activities
            </h2>
          </div>
        </div>

        {/* Aligned 2-tier architectural grid blocks */}
        <div className="extra-grid-trigger space-y-4 max-w-4xl mx-auto">
          {/* Row 1: 3 Column split cell matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--border)]/20 dark:border-white/5 rounded-3xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--border)]/20 dark:divide-white/5">
            {activities.slice(0, 3).map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.name}
                  className="extra-cell-item opacity-0 flex items-center gap-4 p-6 hover:bg-[var(--surface)]/30 dark:hover:bg-white/[0.03] transition-colors duration-300 select-none cursor-default"
                >
                  <div className="p-2.5 rounded-xl bg-[var(--surface)]/60 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-4.5 h-4.5 text-[var(--accent-deep)] dark:text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--dark)] leading-snug">{act.name}</h3>
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-[var(--muted)] mt-1">{act.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: 2 Column split cell matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--border)]/20 dark:border-white/5 rounded-3xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--border)]/20 dark:divide-white/5">
            {activities.slice(3).map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.name}
                  className="extra-cell-item opacity-0 flex items-center gap-4 p-6 hover:bg-[var(--surface)]/30 dark:hover:bg-white/[0.03] transition-colors duration-300 select-none cursor-default"
                >
                  <div className="p-2.5 rounded-xl bg-[var(--surface)]/60 dark:bg-white/10 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-4.5 h-4.5 text-[var(--accent-deep)] dark:text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--dark)] leading-snug">{act.name}</h3>
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-[var(--muted)] mt-1">{act.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
