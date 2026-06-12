"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X, Calendar, Code, CheckCircle, ExternalLink, Github, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const techIconMap: Record<string, string> = {
  "Python": "python",
  "Python 3.12": "python",
  "React.js": "react",
  "Next.js": "nextdotjs",
  "TypeScript": "typescript",
  "JavaScript": "javascript",
  "Flutter": "flutter",
  "Dart": "dart",
  "Firebase": "firebase",
  "Supabase": "supabase",
  "PostgreSQL": "postgresql",
  "Tailwind CSS": "tailwindcss",
  "OpenCV": "opencv",
  "FastAPI": "fastapi",
  "Git": "git",
  "Android SDK": "android",
  "Material 3": "materialdesign",
  "Node.js": "nodedotjs",
  "MongoDB": "mongodb",
  "Docker": "docker",
  "WebSockets": "socketdotio",
  "IoT Sensors": "esphome",
  "Embedded Systems": "raspberrypi",
  "Data Analytics": "apacheecharts",
  "Machine Learning": "tensorflow",
  "Database Management": "postgresql",
  "Web Development": "html5",
  "Mobile Development": "flutter",
  "ESP32": "esphome",
  "MediaPipe": "google",
  "NumPy": "numpy",
  "REST APIs": "fastapi",
  "Stripe": "stripe",
};


interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  challenges: string[];
  results: string[];
  tech: string[];
  link: string;
  website?: string;
  emoji: string;
  gradient: string;
  challengesLabel?: string;
  resultsLabel?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Adorix",
    category: "AI & Interactive Sales",
    tagline: "AI-Powered Conversational Sales Kiosk (2025–2026)",
    description: "An AI-powered sales kiosk that synchronizes video presence tracking with speech interfaces and interactive recommendations.",
    longDescription: "Adorix redefines interactive retail kiosks by combining edge computer vision and real-time Conversational AI. Built to operate in offline/low-latency environments, it detects customer engagement levels through facial presence tracking, welcomes them via synthesize-speech, and navigates product catalogues through structured voice dialogue. The backend synchronizes video inputs with FastAPI endpoints to serve low-latency interactions.",
    challengesLabel: "Key Features",
    challenges: [
      "Optimizing Mediapipe landmark detection to run at 30fps on low-power kiosk hardware.",
      "Achieving sub-500ms voice-to-text response latency over WebSockets.",
      "Designing a state-management machine that resolves interrupted conversations gracefully."
    ],
    results: [
      "Built a functional prototype running facial presence sweeps with zero frame drops.",
      "Reduced speech latency to 420ms by implementing streaming audio pipelines.",
      "Implemented a Supabase sync backend mapping metrics on customer interest profiles."
    ],
    tech: ["Python", "OpenCV", "FastAPI", "React.js", "Tailwind CSS", "WebSockets", "Supabase"],
    link: "https://github.com/ADORIX000",
    website: "https://adorixit.com/",
    emoji: "🤖",
    gradient: "from-red-500/20 to-orange-500/20 border-red-500/30",
  },
  {
    id: "02",
    title: "Smart Cattle Breeding & Heat Detection Management System",
    category: "IoT Systems",
    tagline: "IoT-Enabled Cattle Breeding Management Platform (2026, ongoing)",
    description: "An IoT-enabled cattle breeding management platform designed to improve reproductive efficiency in dairy and livestock farms.",
    longDescription: "Developed an IoT-enabled cattle breeding management platform designed to improve reproductive efficiency in dairy and livestock farms. The system maintains comprehensive cattle profiles, tracks breeding and health records, monitors real-time sensor data, and assists farmers in identifying heat (estrus) periods for timely artificial insemination. The platform combines farm management features with data-driven monitoring to support better breeding decisions and herd productivity.",
    challengesLabel: "Key Features",
    resultsLabel: "Key Deliverables & Results",
    challenges: [
      "Individual cattle profile management.",
      "Breeding and artificial insemination tracking.",
      "Health and vaccination record management.",
      "IoT-based heat detection and activity monitoring.",
      "Historical data collection and analytics.",
      "Farmer-friendly dashboard and reporting system."
    ],
    results: [],
    tech: ["IoT Sensors", "Embedded Systems", "Database Management", "Web Development", "Mobile Development", "Data Analytics", "Machine Learning"],
    link: "",
    emoji: "🐄",
    gradient: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  },
  {
    id: "03",
    title: "ApexFled",
    category: "Full-Stack E-Commerce",
    tagline: "Premium Digital E-Commerce Platform (2026)",
    description: "High-performance digital account storefront utilizing microservice APIs, state sync, and secure transactional databases.",
    longDescription: "ApexFled is a full-featured digital storefront optimized for speed, reliability, and security. Utilizing Next.js Server Components, it fetches catalogue configurations dynamically with low server response times. The platform supports secure user profiles, Stripe checkout transactions, and PostgreSQL schemas with real-time stock sync.",
    challengesLabel: "Key Features",
    challenges: [
      "Implementing optimistic state updates for immediate cart interactions.",
      "Restructuring database queries to prevent deadlock situations during flash sales.",
      "Optimizing image rendering configurations to achieve maximum Lighthouse performance metrics."
    ],
    results: [
      "Achieved sub-1.2s page load speed, scoring a 98/100 on mobile performance checks.",
      "Designed secure database triggers in PostgreSQL mapping inventory locks on transaction starts.",
      "Built a custom dashboard tracking revenue summaries and transactional logs."
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST APIs"],
    link: "https://github.com/SithikaWeerasinghe/digital-account-store",
    website: "https://www.apexfled.com/",
    emoji: "🛍️",
    gradient: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  },
  {
    id: "04",
    title: "WordSearch App",
    category: "Mobile Systems",
    tagline: "Interactive Puzzle Game (2026)",
    description: "Custom mobile word search game built using Google's Dart system and Material 3 design directives for fluid rendering.",
    longDescription: "WordSearch is an elegant, responsive mobile puzzle game built in Flutter. Adhering strictly to Material 3 guidelines, the interface automatically shifts colors to harmonize with themes. It features a custom grid-drawing canvas that maps touch vectors to letter paths, complete with smooth particle animations.",
    challengesLabel: "Key Features",
    challenges: [
      "Calculating touch coordinate intersections on irregular screen aspect ratios.",
      "Building an offline dictionary index that validates 10,000+ words within milliseconds.",
      "Designing responsive layouts that scale gracefully from compact phones to tablets."
    ],
    results: [
      "Developed a custom-gesture grid tracking letter-swipes at 60fps.",
      "Created dynamic theme support shifting color variables in real-time.",
      "Packaged and verified target compilations on Android platforms."
    ],
    tech: ["Flutter", "Dart", "Material 3", "Android SDK", "Git"],
    link: "https://github.com/BinethmaJayawickrama/word_search_app",
    emoji: "🧩",
    gradient: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  },
  {
    id: "05",
    title: "Vision Sync",
    category: "AI & Computer Vision",
    tagline: "AI Gesture Brightness Controller (2026)",
    description: "Computer vision mapping utilities converting hand geometry coordinates into active Windows system adjustments in real time.",
    longDescription: "Vision Brightness Sync is a hands-free computer control utility. Running a lightweight background camera capture loop, it maps hand gesture geometry vectors from MediaPipe's hand-tracker to control Windows system brightness, allowing contactless system management.",
    challengesLabel: "Key Features",
    challenges: [
      "Reducing camera feed processing overhead to prevent high CPU usage states.",
      "Mitigating brightness jitter by implementing moving average filters on coordinate vectors.",
      "Ensuring gesture recognition remains accurate in dim-light conditions."
    ],
    results: [
      "Reduced CPU overhead to less than 4% on modern hardware.",
      "Created smooth brightness steps using double exponential smoothing filters.",
      "Developed a system tray menu for easy startup configuration."
    ],
    tech: ["Python 3.12", "MediaPipe", "OpenCV", "NumPy", "screen-brightness-control"],
    link: "https://github.com/BinethmaJayawickrama/vision-brightness-sync",
    emoji: "👁️",
    gradient: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Reveal project list items
    gsap.fromTo(
      ".project-row-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="projects" className="py-8 bg-transparent text-[var(--dark)] select-none">
      <div className="w-full space-y-12 projects-trigger">
        
        {/* Typographic Heading */}
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase">
            RECENT
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase text-transparent" style={{ WebkitTextStroke: "1.5px var(--dark)" }}>
            PROJECTS
          </h2>
        </div>

        {/* Vertical List of Rows */}
        <div className="flex flex-col w-full border-t border-[var(--border)] mt-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ paddingTop: "32px", paddingBottom: "32px" }}
              className="project-row-item py-16 sm:py-24 border-b border-[var(--border)] flex items-center justify-between gap-6 cursor-pointer group hover:bg-[var(--surface)]/25 transition-all duration-500 ease-out px-2 sm:px-4"
              data-cursor="card"
            >
              <div className="flex-1 min-w-0 text-left space-y-1">
                <h3 className="font-display font-semibold text-lg sm:text-xl md:text-2xl italic text-[var(--dark)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-[13px] font-sans font-light text-[var(--muted)] dark:text-[var(--muted-light)] leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Dynamic Arrow Button */}
              <div className="w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--surface)]/30 flex items-center justify-center text-[var(--muted)] group-hover:text-white group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:rotate-45 transition-all duration-500 shadow-sm shrink-0">
                <ArrowUpRight className="w-4.5 h-4.5" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Centered rectangle modal — rendered in a portal to escape stacking context */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-5">

              {/* Blurred backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Modal card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ type: "spring", damping: 30, stiffness: 280 }}
                className="relative w-[95vw] max-w-5xl h-[95vh] bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden"
              >
                {/* ── Header ── */}
                <div className="relative px-10 sm:px-16 pt-12 pb-20 shrink-0 flex items-center justify-center">
                  <h4 className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase text-[var(--dark)] text-center max-w-[80%]">
                    {selectedProject.title}
                  </h4>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute right-10 sm:right-16 top-12 p-2.5 rounded-full border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--dark)] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* ── Scrollable body ── */}
                <div className="overflow-y-auto flex-1 px-12 sm:px-24 pt-40 pb-16 flex flex-col gap-8 sm:gap-10 lg:gap-12">

                  {/* Overview */}
                  <div className="space-y-5 flex flex-col items-center px-4 sm:px-8">
                    <p className="text-[var(--dark)] text-[16px] sm:text-[17px] font-light leading-[1.8] opacity-85 text-justify max-w-3xl">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Engineering Challenges */}
                  <div className="space-y-8 flex flex-col items-start px-4 sm:px-8 max-w-3xl mx-auto w-full">
                    <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                      <h5 className="text-[12px] font-sans font-extrabold tracking-[0.2em] uppercase text-[var(--dark)] text-left">
                        {selectedProject.challengesLabel ?? "Engineering Challenges"}
                      </h5>
                    </div>
                    <ul className="space-y-5 pl-2 w-full flex flex-col items-start">
                      {selectedProject.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex gap-4 text-[15px] sm:text-[16px] text-[var(--dark)] font-light opacity-80 leading-[1.9] text-left">
                          <span className="text-[var(--accent)] font-bold shrink-0 mt-0.5">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>



                  {/* Tech Stack */}
                  <div className="space-y-8 flex flex-col items-center">
                    <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                      <h5 className="text-[12px] font-sans font-extrabold tracking-[0.2em] uppercase text-[var(--dark)] text-center">
                        Technologies
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {selectedProject.tech.map((t) => {
                        const slug = techIconMap[t];
                        return slug ? (
                          <span
                            key={t}
                            title={t}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-sm transition-all duration-200"
                          >
                            <img
                              src={`https://cdn.simpleicons.org/${slug}`}
                              alt={t}
                              className="w-6 h-6 tech-icon"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          </span>
                        ) : (
                          <span
                            key={t}
                            title={t}
                            className="inline-flex items-center px-3 py-2 text-[10px] font-bold rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--dark)] uppercase tracking-wider"
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* ── Footer ── */}
                <div className="border-t border-[var(--border)] px-10 sm:px-16 py-8 flex justify-end items-center shrink-0 bg-[var(--surface)]/40">
                  <div className="flex items-center gap-4">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View GitHub Repository"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--dark)] hover:bg-[var(--dark)] hover:text-[var(--bg)] text-[var(--dark)] transition-all duration-200"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {selectedProject.website && (
                      <a
                        href={selectedProject.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit Live Website"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--dark)] hover:bg-[var(--dark)] hover:text-[var(--bg)] text-[var(--dark)] transition-all duration-200"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {!selectedProject.link && !selectedProject.website && (
                      <span className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] text-[12px] font-medium cursor-not-allowed select-none">
                        Private Repository
                      </span>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
