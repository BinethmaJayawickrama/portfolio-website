"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

interface ToolItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const toolsData: ToolItem[] = [
  {
    name: "Next.js",
    category: "React Framework",
    icon: (
      <svg className="w-8 h-8 text-[var(--dark)]" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 170c44.183 0 80-35.817 80-80S134.183 10 90 10 10 45.817 10 90s35.817 80 80 80z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="6" />
        <path d="M125 130L78.6 65H68v50h8V74.8l40.4 56.4c3.2-3.8 6-8.1 8-11.2z" fill="currentColor" />
        <rect x="114" y="65" width="8" height="50" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Figma",
    category: "Design Tool",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 45C30 20.147 50.147 0 75 0C99.853 0 120 20.147 120 45C120 69.853 99.853 90 75 90C50.147 90 30 69.853 30 45Z" fill="#F24E1E" fillOpacity="0.85" />
        <path d="M30 135C30 110.147 50.147 90 75 90C75 90 120 90 120 90L120 135C120 159.853 99.853 180 75 180C50.147 180 30 159.853 30 135Z" fill="#0ACF83" fillOpacity="0.85" />
        <path d="M30 135C30 135 30 90 30 90C54.853 90 75 110.147 75 135C75 159.853 54.853 180 30 180C30 180 30 135 30 135Z" fill="#1ABCFE" fillOpacity="0.85" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "ML & Scripting",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M51.9 2C26.5 2 28.2 13 28.2 13l.1 11.4h23.9v3.4H18.5S2 26.2 2 51.5c0 25.3 14.1 24.3 14.1 24.3h8.4V64.3c0-14.8 12.1-23.7 23.7-23.7h23.7V18.7S73.5 2 51.9 2z" fill="#3776AB" />
        <path d="M54.1 106c25.4 0 23.7-11 23.7-11l-.1-11.4H53.8v-3.4h33.7s16.5 1.6 16.5-23.7c0-25.3-14.1-24.3-14.1-24.3h-8.4v11.5c0 14.8-12.1 23.7-23.7 23.7H44.1V89.3s-3.7 16.7 10 16.7z" fill="#FFD343" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Database & Auth",
    icon: (
      <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M68.8 6.4L18.4 68.8C15.2 72.8 18 78.8 23.2 78.8H60L51.2 113.6L101.6 51.2C104.8 47.2 102 41.2 96.8 41.2H60L68.8 6.4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Flutter",
    category: "Mobile SDK",
    icon: (
      <svg className="w-8 h-8 text-sky-400" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M72.8 12L12 72.8L38.4 99.2L120 18L72.8 12Z" fill="currentColor" />
        <path d="M72.8 66L46.4 92.4L72.8 118.8L120 71.6L72.8 66Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Git",
    category: "Version Control",
    icon: (
      <svg className="w-8 h-8 text-orange-500" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M112.8 54L66 7.2C62.8 4 57.2 4 54 7.2L7.2 54C4 57.2 4 62.8 7.2 66L54 112.8C57.2 116 62.8 116 66 112.8L112.8 66C116 62.8 116 57.2 112.8 54ZM78 60C78 66.8 72.8 72 66 72C62.8 72 60 70.8 57.6 68.8L48.8 77.6C44 82.4 36.4 82.4 31.6 77.6C26.8 72.8 26.8 65.2 31.6 60.4L54 38C57.2 34.8 62.8 34.8 66 38C69.2 41.2 69.2 46.8 66 50L59.2 56.8C60.4 55.6 62.4 54.8 64.4 54.8C68.4 54.8 72 58.4 72 62.4C72 63.6 71.6 64.8 70.8 65.6C72.8 65.6 78 60 78 60Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    category: "AI Assistant",
    icon: (
      <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M102 54C102 42.8 92.8 33.6 81.6 33.6C80.8 33.6 80 33.6 79.2 34C75.6 24.8 66.8 18.8 56.8 18.8C47.2 18.8 38.8 24.4 34.8 33.2C33.6 32.8 32.8 32.4 31.6 32.4C20.4 32.4 11.2 41.6 11.2 52.8C11.2 57.6 12.8 62 16 65.6C12.4 69.2 10 74.4 10 80C10 91.2 19.2 100.4 30.4 100.4C32 100.4 33.6 100 35.2 99.6C39.2 107.2 47.2 112 56.8 112C66.8 112 75.2 106.8 79.2 98.4C80.4 98.8 81.6 99.2 82.8 99.2C94 99.2 103.2 90 103.2 78.8C103.2 74 101.6 69.6 98.4 66C100.8 62.4 102 58.4 102 54ZM56.8 29.2C64.4 29.2 71.2 34.4 72.8 42C72 42.4 71.2 42.8 70.4 43.6L54.4 52.8L45.2 48L56.8 29.2ZM24.4 45.6C26.8 42.4 30.8 40.4 35.2 40.4C36.4 40.4 37.6 40.8 38.8 41.2V59.6L24.4 51.6V45.6ZM30.4 87.2C26.4 87.2 22.8 84.8 21.6 80.8C21.6 80.8 21.6 80.4 21.6 80C22.4 79.2 23.6 78.8 24.8 78L40.8 68.8L40.8 87.2H30.4ZM56.8 98.4C51.6 98.4 46.8 95.6 44 91.2C44.8 90.8 45.6 90.4 46.4 89.6L62.4 80.4L71.6 85.2L56.8 98.4ZM92.4 71.6C90 74.8 86 76.8 81.6 76.8C80.4 76.8 79.2 76.4 78 76V57.6L92.4 65.6V71.6ZM82.8 49.6C86.8 49.6 90.4 52 91.6 56C90.8 56.8 89.6 57.2 88.4 58L72.4 67.2L72.4 48.8H82.8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Notion",
    category: "Productivity Tool",
    icon: (
      <svg className="w-8 h-8 text-[var(--dark)]" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10C13.6 10 10 13.6 10 18V102C10 106.4 13.6 110 18 110H102C106.4 110 110 106.4 110 102V18C110 13.6 106.4 10 102 10H18ZM22 24H98C100.2 24 102 25.8 102 28V92C102 94.2 100.2 96 98 96H22C19.8 96 18 94.2 18 92V28C18 25.8 19.8 24 22 24ZM32 36C30.4 36 29 37.4 29 39V81C29 82.6 30.4 84 32 84C33.6 84 35 82.6 35 81V55L69 82.6C70.6 83.8 72.8 83.4 73.8 81.8C74.6 80.6 74.6 79 73.8 78L49 57.8L77 39.8C78.4 38.8 78.8 36.8 77.8 35.4C76.8 34 74.8 33.6 73.4 34.6L45 53V39C45 37.4 43.6 36 42 36H32Z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Skills() {
  useEffect(() => {
    // Reveal grid cells
    gsap.fromTo(
      ".tool-grid-cell",
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tools-section-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="tools"
      className="py-8 bg-transparent text-[var(--dark)] select-none"
    >
      <div className="w-full space-y-12 tools-section-trigger">
        
        {/* Typographic Heading */}
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase">
            LANGUAGES /
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase text-transparent" style={{ WebkitTextStroke: "1.5px var(--dark)" }}>
            TOOLS
          </h2>
        </div>

        {/* 2-Column (Desktop) / 3-Column (Tablet) / 1-Column (Mobile) Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-3 mt-8">
          {toolsData.map((tool, idx) => (
            <div
              key={idx}
              className="tool-grid-cell bg-[var(--white)]/60 dark:bg-[var(--white)]/5 border border-[var(--border)] rounded-[20px] p-5 flex items-center gap-5 hover:border-[var(--accent)] hover:bg-[var(--surface)]/20 transition-all duration-300 group"
              data-cursor="link"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-[14px] shrink-0 bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                {tool.icon}
              </div>

              {/* Tool Details */}
              <div className="text-left space-y-0.5">
                <h3 className="font-display font-semibold text-lg text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-[11px] font-sans font-light text-[var(--muted)] dark:text-[var(--muted-light)] leading-none">
                  {tool.category}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
