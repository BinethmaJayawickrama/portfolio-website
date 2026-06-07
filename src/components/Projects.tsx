"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X, Calendar, Code, CheckCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

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
    longDescription: "Adorix redefines interactive retail kiosks by combining edge computer vision and real-time Conversational AI. Built to operate in offline/low-latency environments, it detects customer engagement levels through facial presence tracking, welcomes them via synthesize-speech, and navigates product catalogues through structured voice dialogue. The backend synchronizes video inputs with FastAPI endpoints to serve low-latency interactions.",
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
    emoji: "🤖",
    gradient: "from-red-500/20 to-orange-500/20 border-red-500/30",
  },
  {
    id: "02",
    title: "Smart Tail Pod",
    category: "IoT Systems",
    tagline: "IoT Cattle Heat Detection System (2026, ongoing)",
    description: "An smart IoT agricultural system running telemetry sweeps to flag health and cattle heat markers using hardware sensors.",
    longDescription: "The Smart Tail Pod is an agricultural-tech wearable designed to monitor livestock health metrics in real-time. Attaching a lightweight sensor to the animal's tail, the pod sweeps temperature, movement speed, and tail position telemetry. This data is transmitted to an ESP32 edge receiver and processed to flag active heat cycles, improving breeding rates for dairy farms.",
    challenges: [
      "Optimizing ESP32 deep-sleep modes to ensure a battery lifespan of over 6 months.",
      "Filtering out false positive movements caused by mathematical low-pass filters.",
      "Establishing reliable long-range radio (LoRa) connections in rural, high-interference environments."
    ],
    results: [
      "Configured ESP32 telemetry cycles reducing power consumption by 65%.",
      "Achieved a 92% cycle detection accuracy during initial testing stages.",
      "Created a web dashboard displaying real-time livestock telemetry charts."
    ],
    tech: ["ESP32", "IoT Sensors", "Python", "React.js", "Firebase", "JavaScript"],
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
              className="project-row-item py-6 border-b border-[var(--border)] flex items-center justify-between gap-6 cursor-pointer group hover:bg-[var(--surface)]/20 transition-all duration-300 px-2 sm:px-4"
              data-cursor="card"
            >
              <div className="flex items-center gap-5 sm:gap-6 flex-1 min-w-0">
                {/* Horizontal thumbnail image box */}
                <div className={`w-[90px] h-[95px] sm:w-[130px] sm:h-[135px] rounded-[18px] shrink-0 bg-gradient-to-br ${project.gradient} border flex items-center justify-center relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-500`}>
                  <span className="text-3xl sm:text-5xl group-hover:rotate-6 transition-transform duration-500">
                    {project.emoji}
                  </span>
                  
                  {/* Glass highlight glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Project Details */}
                <div className="flex-1 min-w-0 text-left space-y-1 sm:space-y-2">
                  <span className="text-[9px] font-sans font-extrabold tracking-widest text-[var(--muted)] uppercase">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-lg sm:text-2xl italic text-[var(--dark)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-sans font-light text-[var(--muted)] dark:text-[var(--muted-light)] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Arrow Up Right Button */}
              <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:rotate-45 transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-4.5 h-4.5" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study sliding panel */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[var(--bg)]/80 dark:bg-[#0c0e12]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative w-full max-w-xl h-full bg-[var(--bg)] border-l border-[var(--border)] p-8 sm:p-12 overflow-y-auto shadow-2xl z-10 flex flex-col justify-between"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--dark)] transition-colors cursor-pointer"
                aria-label="Close Case Study"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-8 mt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center text-5xl shadow-inner border select-none`}>
                    {selectedProject.emoji}
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-extrabold tracking-widest text-[var(--accent)] uppercase">
                      {selectedProject.category}
                    </span>
                    <h4 className="font-display text-3xl font-light text-[var(--dark)] italic leading-tight">
                      {selectedProject.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[var(--accent)] font-sans text-xs font-semibold tracking-wide border-b border-[var(--border)] pb-4">
                  {selectedProject.tagline}
                </p>

                <div className="space-y-4">
                  <h5 className="text-[9px] font-sans font-extrabold tracking-widest uppercase text-[var(--muted)]">
                    Overview
                  </h5>
                  <p className="text-[var(--muted)] dark:text-[var(--muted-light)] text-sm font-light leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[9px] font-sans font-extrabold tracking-widest uppercase text-[var(--muted)]">
                    Engineering Challenges
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedProject.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-[var(--muted)] dark:text-[var(--muted-light)] font-light">
                        <Code className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[9px] font-sans font-extrabold tracking-widest uppercase text-[var(--muted)]">
                    Key Deliverables & Results
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-[var(--muted)] dark:text-[var(--muted-light)] font-light">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[9px] font-sans font-extrabold tracking-widest uppercase text-[var(--muted)]">
                    Technology Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-[9px] font-extrabold rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--dark)] uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6 mt-12 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-sans font-extrabold text-[var(--muted)] tracking-wider uppercase select-none">
                  <Calendar className="w-4 h-4" />
                  <span>Case Study 2026</span>
                </div>

                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[var(--dark)] hover:bg-[var(--accent)] text-[var(--bg)] text-xs font-semibold flex items-center gap-2 group hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                    data-hover="true"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="px-6 py-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] text-xs font-medium cursor-not-allowed select-none">
                    Private Repository
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
