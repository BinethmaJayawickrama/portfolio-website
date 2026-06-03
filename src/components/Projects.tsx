"use client";

import { useEffect, useRef } from "react";
import { Github, ArrowUpRight, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  link: string;
  emoji: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Adorix",
    category: "AI & Interactive Sales",
    tagline: "AI-Powered Conversational Sales Kiosk (2025–2026)",
    description: "An AI-powered sales kiosk that synchronizes video presence tracking with speech interfaces and interactive recommendations.",
    tech: ["Python", "OpenCV", "FastAPI", "React.js", "Tailwind CSS", "WebSockets", "Supabase"],
    link: "https://github.com/ADORIX000",
    emoji: "🤖",
    gradient: "from-rose-lightest to-rose-soft/45",
  },
  {
    id: "02",
    title: "Smart Tail Pod",
    category: "IoT Systems",
    tagline: "IoT Cattle Heat Detection System (2026, ongoing)",
    description: "An smart IoT agricultural system running telemetry sweeps to flag health and cattle heat markers using hardware sensors.",
    tech: ["ESP32", "IoT Sensors", "Python", "React.js", "Firebase", "JavaScript"],
    link: "",
    emoji: "🐄",
    gradient: "from-rose-soft to-rose-mid/30",
  },
  {
    id: "03",
    title: "ApexFled",
    category: "Full-Stack E-Commerce",
    tagline: "Premium Digital E-Commerce Platform (2026)",
    description: "High-performance digital account storefront utilizing microservice APIs, state sync, and secure transactional databases.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST APIs"],
    link: "https://github.com/SithikaWeerasinghe/digital-account-store",
    emoji: "🛍️",
    gradient: "from-lavender-soft to-lavender-mid/30",
  },
  {
    id: "04",
    title: "WordSearch App",
    category: "Mobile Systems",
    tagline: "Interactive Puzzle Game (2026)",
    description: "Custom mobile word search game built using Google's Dart system and Material 3 design directives for fluid rendering.",
    tech: ["Flutter", "Dart", "Material 3", "Android SDK", "Git"],
    link: "https://github.com/BinethmaJayawickrama/word_search_app",
    emoji: "🧩",
    gradient: "from-mint-soft to-mint-mid/20",
  },
  {
    id: "05",
    title: "Vision Brightness Sync",
    category: "AI & Computer Vision",
    tagline: "AI Gesture Brightness Controller (2026)",
    description: "Computer vision mapping utilities converting hand geometry coordinates into active Windows system adjustments in real time.",
    tech: ["Python 3.12", "MediaPipe", "OpenCV", "NumPy", "screen-brightness-control"],
    link: "https://github.com/BinethmaJayawickrama/vision-brightness-sync",
    emoji: "👁️",
    gradient: "from-cream to-sand/40",
  },
];

export default function Projects() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    // Apply horizontal pinning only on desktop devices
    if (
      gsap &&
      ScrollTrigger &&
      window.matchMedia("(min-width: 1024px)").matches
    ) {
      gsap.registerPlugin(ScrollTrigger);

      const scrollContainer = scrollContainerRef.current;
      const scrollSection = scrollSectionRef.current;

      if (scrollContainer && scrollSection) {
        const totalScrollWidth = scrollContainer.scrollWidth - window.innerWidth;

        // Main horizontal scroll timeline
        const pinAnim = gsap.to(scrollContainer, {
          x: -totalScrollWidth - 64, // offset padding
          ease: "none",
          scrollTrigger: {
            trigger: scrollSection,
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: () => `+=${scrollContainer.scrollWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self: any) => {
              const progress = self.progress;

              // 1. Update left fixed scroll progress bar
              const progressBar = document.querySelector(".projects-progress-fill") as HTMLElement;
              if (progressBar) {
                progressBar.style.height = `${progress * 100}%`;
              }

              // 2. Update fixed index counter value
              const activeIndex = Math.min(4, Math.floor(progress * 5.05));
              const counterVal = document.querySelector(".projects-counter-val") as HTMLElement;
              if (counterVal) {
                counterVal.innerText = `0${activeIndex + 1} / 05`;
              }
            },
          },
        });

        // 3. Staggered card fade and slide-up entrance
        gsap.fromTo(
          ".project-card-item",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scrollSection,
              start: "top 70%",
            },
          }
        );

        return () => {
          pinAnim.scrollTrigger?.kill();
        };
      }
    }
  }, []);

  return (
    <div
      ref={scrollSectionRef}
      id="projects"
      className="relative lg:h-[220vh] bg-cream projects-reel-trigger border-t border-rose-deep/5"
    >
      {/* Sticky wrapper for horizontal scrolling view */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:w-screen lg:overflow-hidden flex flex-col justify-center py-20 lg:py-0">
        
        {/* Top Header Row */}
        <div className="container mx-auto px-6 max-w-6xl mb-8 sm:mb-12">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="text-2xs font-sans font-extrabold tracking-widest text-rose-deep uppercase">Portfolio Index</span>
              <h2 className="font-display font-light italic text-4xl sm:text-5xl text-rose-dark leading-tight select-none">
                Featured Projects
              </h2>
            </div>
            
            {/* Scroll/Drag Hint (top right) */}
            <div className="hidden lg:flex items-center gap-2.5 text-2xs font-sans font-extrabold text-slate-400 tracking-widest uppercase select-none animate-float">
              <span>Scroll to scan</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>
        </div>

        {/* Outer view track: horizontal in desktop, vertical stack in mobile */}
        <div className="overflow-x-auto lg:overflow-x-hidden no-scrollbar px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:px-24 w-full lg:w-max pb-6">
            
            {/* Left Fixed Panel (rendered in horizontal row but behaves as sticky visual marker) */}
            <div className="hidden lg:flex flex-col items-center justify-between h-[450px] w-36 shrink-0 border-r border-rose-deep/10 pr-12 select-none">
              <div className="text-left w-full">
                <span className="font-display text-5xl font-light italic text-rose-soft">02</span>
                <p className="text-[10px] font-sans font-extrabold tracking-widest text-slate-400 uppercase mt-2">Projects</p>
              </div>

              {/* Progress counter and vertical bar */}
              <div className="flex flex-col items-center">
                <span className="projects-counter-val font-display text-lg font-light italic text-rose-dark">
                  01 / 05
                </span>
                <div className="w-[1.5px] h-28 bg-rose-deep/10 my-4 relative rounded-full overflow-hidden">
                  <div className="projects-progress-fill absolute top-0 left-0 w-full bg-rose-deep h-0 transition-all duration-100 ease-out" />
                </div>
              </div>
            </div>

            {/* Cards collection wrapper */}
            <div
              ref={scrollContainerRef}
              className="flex flex-col lg:flex-row gap-8 lg:px-12 w-full lg:w-auto"
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  data-tilt
                  data-tilt-max="12"
                  data-tilt-perspective="1000"
                  data-tilt-glare="true"
                  data-tilt-max-glare="0.15"
                  className="project-card-item w-full sm:w-[380px] lg:w-[420px] aspect-[4/5] relative rounded-[32px] bg-white border border-rose-deep/10 p-8 flex flex-col justify-between overflow-hidden shadow-3xs hover:shadow-2xs transition-shadow duration-300 pointer-events-auto select-none cursor-default group"
                  data-cursor="card"
                >
                  {/* Gloss glare overlay (handled by vanilla-tilt dynamically, but styled here) */}
                  <div className="absolute inset-0 pointer-events-none z-10" />

                  {/* 20rem Giant Background Number */}
                  <div className="absolute right-4 top-2 font-display text-[16rem] sm:text-[18rem] font-light italic text-rose-deep/5 pointer-events-none select-none z-0 group-hover:-translate-y-2 transition-transform duration-500">
                    {project.id}
                  </div>

                  {/* Top info and link */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-rose-deep/10 flex items-center justify-center text-4xl shadow-3xs group-hover:scale-105 transition-transform animate-float">
                        {project.emoji}
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-extrabold tracking-widest text-slate-400 uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-rose-deep/10 hover:bg-rose-soft/40 text-rose-dark transition-all duration-300 z-20 cursor-pointer"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="p-3 rounded-full border border-rose-deep/5 text-slate-300 z-20 select-none">
                        <Github className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline details */}
                  <div className="mt-8 z-10 text-left">
                    <span className="text-[9px] font-sans font-extrabold tracking-wider text-rose-deep uppercase mb-1.5 block">
                      {project.tagline}
                    </span>
                    <h3 className="font-display text-2xl font-light text-slate-800 italic leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-light mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badging */}
                  <div className="flex flex-wrap gap-1.5 pt-6 border-t border-rose-deep/5 z-10">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-[8.5px] font-extrabold rounded-full bg-rose-soft/30 border border-rose-deep/5 text-rose-dark uppercase hover:bg-rose-soft/60 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
