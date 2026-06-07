"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

interface ExperienceItem {
  year: string;
  role: string;
  institution: string;
  description: string;
}

const experienceData: ExperienceItem[] = [
  {
    year: "2024 – Present",
    role: "BSc (Hons) Computer Science",
    institution: "IIT Sri Lanka / University of Westminster, London",
    description: "Academic pathway specializing in software engineering, full-stack architectures, IoT sensor telemetry, and computer vision models.",
  },
  {
    year: "2025 – 2026",
    role: "Lead Creative Developer & Hardware Integrator",
    institution: "Adorix Kiosk & Smart Tail Pod Systems",
    description: "Co-engineered facial presence sweep pipelines in OpenCV, reduced WebSocket sound streaming latency to 420ms, and structured ESP32 telemetry cycles to reduce consumption by 65%.",
  },
  {
    year: "2023",
    role: "G.C.E. Advanced Level",
    institution: "Kalutara Balika Vidyalaya",
    description: "Completed qualifications under the physical sciences stream (Combined Mathematics, Physics, Chemistry).",
  },
  {
    year: "2020",
    role: "G.C.E. Ordinary Level",
    institution: "Ananda Balika Vidyalaya, Colombo 10",
    description: "Secondary educational foundation completed with high distinctions.",
  },
];

export default function Education() {
  useEffect(() => {
    // Reveal experience rows
    gsap.fromTo(
      ".experience-row-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="experience"
      className="py-8 bg-transparent text-[var(--dark)] select-none"
    >
      <div className="w-full space-y-12 experience-trigger">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase">
            MY
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase text-transparent" style={{ WebkitTextStroke: "1.5px var(--dark)" }}>
            EXPERIENCE
          </h2>
        </div>

        {/* Experience List Rows */}
        <div className="flex flex-col w-full border-t border-[var(--border)] mt-8">
          {experienceData.map((item, idx) => (
            <div
              key={idx}
              className="experience-row-item py-6 border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 hover:bg-[var(--surface)]/20 transition-all duration-300 px-2 sm:px-4 group"
            >
              {/* Left Side: Arrow and Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:rotate-45 transition-all duration-300 shrink-0 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                
                <div className="flex-1 min-w-0 text-left space-y-1">
                  <h3 className="font-display font-semibold text-lg sm:text-xl italic text-[var(--dark)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-[10px] font-sans font-extrabold text-[var(--accent)] uppercase tracking-widest leading-none">
                    {item.institution}
                  </p>
                  <p className="text-xs sm:text-[13px] font-sans font-light text-[var(--muted)] dark:text-[var(--muted-light)] leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Date Range */}
              <div className="flex items-center shrink-0 md:text-right pl-12 md:pl-0">
                <span className="px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[10px] font-extrabold tracking-wider text-[var(--dark)] uppercase">
                  {item.year}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
