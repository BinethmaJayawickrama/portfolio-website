"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Cpu, Smartphone, Wrench, Shield, Compass, Heart } from "lucide-react";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "mobile" | "tools";
  tooltip: string;
  x: string; // Left offset % for desktop tag cloud
  y: string; // Top offset % for desktop tag cloud
  icon: any;
}

const skillsData: SkillItem[] = [
  { name: "Python", category: "backend", tooltip: "Python 3.12 · 3 years · 5 projects", x: "12%", y: "15%", icon: Terminal },
  { name: "Java", category: "backend", tooltip: "Java SE · 2.5 years · 3 projects", x: "42%", y: "10%", icon: Terminal },
  { name: "JavaScript", category: "frontend", tooltip: "JavaScript ES6+ · 3 years · 8 projects", x: "28%", y: "24%", icon: Cpu },
  { name: "TypeScript", category: "frontend", tooltip: "TypeScript · 2 years · 4 projects", x: "62%", y: "16%", icon: Cpu },
  { name: "React.js", category: "frontend", tooltip: "React 19 · 2.5 years · 6 projects", x: "78%", y: "12%", icon: Cpu },
  { name: "Next.js", category: "frontend", tooltip: "Next.js 16 · 2 years · 4 projects", x: "84%", y: "35%", icon: Cpu },
  { name: "Tailwind CSS", category: "frontend", tooltip: "Tailwind v4 · 3 years · 10 projects", x: "50%", y: "38%", icon: Cpu },
  { name: "Flutter", category: "mobile", tooltip: "Flutter Cross-Platform · 1.5 years · 2 projects", x: "18%", y: "45%", icon: Smartphone },
  { name: "Android SDK", category: "mobile", tooltip: "Android Native · 1 year · 1 project", x: "8%", y: "70%", icon: Smartphone },
  { name: "OpenCV", category: "backend", tooltip: "Computer Vision · 1.5 years · 2 projects", x: "68%", y: "48%", icon: Compass },
  { name: "MediaPipe", category: "backend", tooltip: "Pose Estimation · 1 year · 1 project", x: "88%", y: "65%", icon: Compass },
  { name: "FastAPI", category: "backend", tooltip: "Async Microservices · 2 years · 3 projects", x: "32%", y: "55%", icon: Terminal },
  { name: "Supabase", category: "tools", tooltip: "Supabase BaaS · 2 years · 4 projects", x: "52%", y: "65%", icon: Wrench },
  { name: "Firebase", category: "tools", tooltip: "Firebase Suite · 2 years · 3 projects", x: "20%", y: "76%", icon: Wrench },
  { name: "Git", category: "tools", tooltip: "Version Control · 4 years · 15 projects", x: "40%", y: "82%", icon: Wrench },
  { name: "Figma", category: "tools", tooltip: "UI/UX Layouts · 2.5 years · 8 projects", x: "65%", y: "80%", icon: Wrench },
  { name: "ESP32 / IoT", category: "mobile", tooltip: "Hardware Telemetry · 2 years · 2 projects", x: "78%", y: "82%", icon: Smartphone },
];

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      // 1. Heading Mask Reveal
      gsap.fromTo(
        ".skills-reveal-line span",
        { y: "100%" },
        {
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-heading-trigger",
            start: "top 80%",
          },
        }
      );

      // 2. Skills cloud tag fly-in stagger (elastic ease)
      const items = gsap.utils.toArray(".skill-pill-item");
      items.forEach((item: any, idx: number) => {
        // Calculate random offscreen trajectory
        const angle = Math.random() * Math.PI * 2;
        const distance = 500 + Math.random() * 200;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;

        gsap.fromTo(
          item,
          { x: startX, y: startY, opacity: 0, scale: 0.5 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.6,
            delay: idx * 0.03,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
            onComplete: () => {
              // Settle node into gentle, unique vertical drift
              gsap.to(item, {
                y: `+=${Math.random() > 0.5 ? 12 : -12}`,
                duration: 4 + Math.random() * 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          }
        );
      });
    }
  }, []);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-rose-soft/70 border-rose-deep/15 text-rose-dark shadow-rose-deep/3";
      case "backend":
        return "bg-lavender-soft/70 border-lavender-deep/15 text-lavender-deep shadow-lavender-deep/3";
      case "mobile":
        return "bg-mint-soft/75 border-mint-mid/20 text-emerald-800 shadow-emerald-500/3";
      case "tools":
        return "bg-sand/75 border-muted/20 text-muted shadow-slate-400/3";
      default:
        return "";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 relative overflow-hidden bg-white text-slate-800"
    >
      {/* Centered Watermark background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h3 className="font-display font-light text-[12vw] tracking-[0.1em] text-rose-soft/40 uppercase">
          Skills
        </h3>
      </div>

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Header */}
        <div className="skills-heading-trigger text-center mb-16 space-y-4">
          <span className="text-2xs font-sans font-extrabold tracking-widest text-rose-deep uppercase">Capabilities Index</span>
          <div className="overflow-hidden skills-reveal-line h-12 sm:h-14 flex justify-center">
            <span className="font-display font-light italic text-4xl sm:text-5xl text-rose-dark leading-none block select-none">
              Skills & Expertise
            </span>
          </div>
          <p className="text-slate-500 max-w-md mx-auto text-xs sm:text-sm font-light">
            Interactive skill cloud. Hover over tags to trace category lines and view telemetry metrics.
          </p>
        </div>

        {/* 1. Desktop Cloud Orbital Layout */}
        <div className="relative w-full h-[540px] hidden md:block select-none overflow-visible">
          {skillsData.map((skill) => {
            const Icon = skill.icon;
            const isDimmed = hoveredCategory && hoveredCategory !== skill.category;
            const isHighlighted = hoveredCategory === skill.category;
            const isHoveredNode = hoveredSkill && hoveredSkill.name === skill.name;

            return (
              <div
                key={skill.name}
                className="absolute skill-pill-item cursor-pointer origin-center will-change-transform"
                style={{ left: skill.x, top: skill.y }}
                onMouseEnter={() => {
                  setHoveredCategory(skill.category);
                  setHoveredSkill(skill);
                }}
                onMouseLeave={() => {
                  setHoveredCategory(null);
                  setHoveredSkill(null);
                }}
              >
                <div
                  className={`px-5 py-3 rounded-full border flex items-center gap-2 group transition-all duration-400 ${getCategoryStyles(
                    skill.category
                  )}`}
                  style={{
                    opacity: isDimmed ? 0.3 : 1,
                    transform: isHoveredNode ? "scale(1.15)" : "scale(1)",
                    boxShadow: isHighlighted ? "0 4px 20px -2px rgba(201, 122, 154, 0.15)" : "",
                  }}
                  data-hover="true"
                >
                  <Icon className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-sans font-extrabold tracking-widest uppercase">
                    {skill.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Dynamic Tooltip overlay floating near hovered node */}
          {hoveredSkill && (
            <div
              className="absolute pointer-events-none z-30 transition-all duration-200"
              style={{
                left: `calc(${hoveredSkill.x} + 40px)`,
                top: `calc(${hoveredSkill.y} - 35px)`,
              }}
            >
              <div className="bg-charcoal text-white text-[10px] font-sans font-semibold tracking-wider px-3.5 py-2 rounded-xl shadow-md border border-white/5 animate-fade-in uppercase">
                {hoveredSkill.tooltip}
              </div>
            </div>
          )}
        </div>

        {/* 2. Mobile 2-Column Tag Grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {skillsData.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className={`px-4 py-3 rounded-2xl border flex items-center gap-2 ${getCategoryStyles(
                  skill.category
                )}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-sans font-extrabold tracking-wider uppercase">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
