"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, MonitorPlay, Smartphone, Eye, Database, Network, PenTool, Wrench, Globe, Layout, Share2, Layers, Binary, SearchCode, Server, Settings } from "lucide-react";
import { gsap } from "gsap";

type SkillIcon = 
  | { type: "simple", slug: string; name: string }
  | { type: "lucide", icon: React.ReactNode; name: string };

interface SkillCategory {
  id: string;
  title: string;
  mainIcon: React.ReactNode;
  skills: SkillIcon[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    mainIcon: <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "python", name: "Python" },
      { type: "simple", slug: "openjdk", name: "Java" },
      { type: "simple", slug: "javascript", name: "JavaScript" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    mainIcon: <Layout className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "html5", name: "HTML5" },
      { type: "simple", slug: "css3", name: "CSS3" },
      { type: "simple", slug: "javascript", name: "JavaScript" },
      { type: "simple", slug: "react", name: "React.js" },
      { type: "simple", slug: "nextdotjs", name: "Next.js" },
      { type: "lucide", icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10" />, name: "Responsive Design" }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    mainIcon: <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "flutter", name: "Flutter" }
    ]
  },
  {
    id: "cv",
    title: "Computer Vision & Image Processing",
    mainIcon: <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "opencv", name: "OpenCV" }
    ]
  },
  {
    id: "database",
    title: "Database Management",
    mainIcon: <Database className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "mysql", name: "MySQL" },
      { type: "lucide", icon: <Server className="w-8 h-8 sm:w-10 sm:h-10" />, name: "SQL" }
    ]
  },
  {
    id: "networking",
    title: "Networking",
    mainIcon: <Network className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "lucide", icon: <Share2 className="w-8 h-8 sm:w-10 sm:h-10" />, name: "IP Addressing" },
      { type: "lucide", icon: <Settings className="w-8 h-8 sm:w-10 sm:h-10" />, name: "Configuration" },
      { type: "lucide", icon: <Binary className="w-8 h-8 sm:w-10 sm:h-10" />, name: "Fundamentals" }
    ]
  },
  {
    id: "design",
    title: "UI/UX & Design Tools",
    mainIcon: <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "figma", name: "Figma" }
    ]
  },
  {
    id: "tools",
    title: "Development Tools & Platforms",
    mainIcon: <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />,
    skills: [
      { type: "simple", slug: "git", name: "Git" },
      { type: "simple", slug: "github", name: "GitHub" },
      { type: "simple", slug: "vercel", name: "Vercel" },
      { type: "lucide", icon: <SearchCode className="w-8 h-8 sm:w-10 sm:h-10" />, name: "Version Control" },
      { type: "lucide", icon: <Layers className="w-8 h-8 sm:w-10 sm:h-10" />, name: "Deployment" }
    ]
  }
];

export default function Skills() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    // Reveal rows on scroll
    gsap.fromTo(
      ".skill-row-anim",
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section-trigger",
          start: "top 85%",
        },
      }
    );
  }, []);

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="tools" className="py-12 sm:py-20 bg-transparent text-[var(--dark)] select-none">
      <div className="w-full space-y-16 skills-section-trigger max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Typographic Heading */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1 pl-0 lg:pl-10">
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase">
            TECHNOLOGIES
          </h2>
        </div>

        {/* 1-Column List of Rectangles */}
        <div className="flex flex-col gap-6 mt-24 w-full">
          {skillCategories.map((category) => {
            const isActive = activeCardId === category.id;

            return (
              <div
                key={category.id}
                onClick={() => toggleCard(category.id)}
                className={`skill-row-anim group relative h-[100px] sm:h-[120px] rounded-[24px] overflow-hidden cursor-pointer transition-all duration-500 border ${
                  isActive 
                    ? "bg-[var(--surface)]/80 border-[var(--accent)] shadow-xl" 
                    : "bg-[var(--white)]/60 dark:bg-[var(--white)]/5 border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg"
                }`}
              >
                <AnimatePresence initial={false} mode="wait">
                  {!isActive ? (
                    /* FRONT STATE: Category Name (Horizontal layout) */
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center px-4 sm:px-8"
                    >
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--dark)] tracking-tight text-center w-full">
                        {category.title}
                      </h3>
                    </motion.div>
                  ) : (
                    /* REVEAL STATE: Tool Icons Grid inside the rectangle */
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center px-8 bg-[var(--surface)]"
                    >
                      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                        {category.skills.map((skill, idx) => (
                          <div 
                            key={idx} 
                            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 group/icon"
                            title={skill.name}
                          >
                            {skill.type === "simple" ? (
                              <img
                                src={`https://cdn.simpleicons.org/${skill.slug}`}
                                alt={skill.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 tech-icon drop-shadow-sm transition-transform duration-300"
                              />
                            ) : (
                              <div className="text-[var(--dark)] group-hover/icon:text-[var(--accent)] transition-colors duration-300">
                                {skill.icon}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
