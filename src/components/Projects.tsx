"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Folder,
  FolderOpen,
  ArrowUpRight,
  X,
  Github,
  Globe,
  Lock,
  Layers,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  folderCategory: "web" | "iot" | "mobile" | "ai";
  tagline: string;
  description: string;
  longDescription: string;
  challenges: string[];
  results: string[];
  tech: string[];
  link: string;
  website?: string;
  emoji: string;
  folderColor: string;
  accentBorder: string;
  challengesLabel?: string;
  resultsLabel?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Adorix",
    category: "AI & Interactive Sales",
    folderCategory: "ai",
    tagline: "AI-Powered Conversational Sales Kiosk (2025–2026)",
    description:
      "An AI-powered sales kiosk that synchronizes video presence tracking with speech interfaces and interactive recommendations.",
    longDescription:
      "Adorix redefines interactive retail kiosks by combining edge computer vision and real-time Conversational AI. Built to operate in offline/low-latency environments, it detects customer engagement levels through facial presence tracking, welcomes them via synthesize-speech, and navigates product catalogues through structured voice dialogue. The backend synchronizes video inputs with FastAPI endpoints to serve low-latency interactions.",
    challengesLabel: "Key Features",
    challenges: [
      "Optimizing Mediapipe landmark detection to run at 30fps on low-power kiosk hardware.",
      "Achieving sub-500ms voice-to-text response latency over WebSockets.",
      "Designing a state-management machine that resolves interrupted conversations gracefully.",
    ],
    results: [
      "Built a functional prototype running facial presence sweeps with zero frame drops.",
      "Reduced speech latency to 420ms by implementing streaming audio pipelines.",
      "Implemented a Supabase sync backend mapping metrics on customer interest profiles.",
    ],
    tech: ["Python", "OpenCV", "FastAPI", "React.js", "Tailwind CSS", "WebSockets", "Supabase"],
    link: "https://github.com/BinethmaJayawickrama",
    website: "https://adorixit.com/",
    emoji: "🤖",
    folderColor: "from-amber-500/20 to-yellow-500/10",
    accentBorder: "group-hover:border-amber-400/80",
  },
  {
    id: "02",
    title: "Smart Cattle Breeding & Heat Detection",
    category: "IoT Systems",
    folderCategory: "iot",
    tagline: "IoT-Enabled Cattle Breeding Management Platform (2026, ongoing)",
    description:
      "An IoT-enabled cattle breeding management platform designed to improve reproductive efficiency in dairy and livestock farms.",
    longDescription:
      "Developed an IoT-enabled cattle breeding management platform designed to improve reproductive efficiency in dairy and livestock farms. The system maintains comprehensive cattle profiles, tracks breeding and health records, monitors real-time sensor data, and assists farmers in identifying heat (estrus) periods for timely artificial insemination. The platform combines farm management features with data-driven monitoring to support better breeding decisions and herd productivity.",
    challengesLabel: "Key Features",
    resultsLabel: "Key Deliverables & Results",
    challenges: [
      "Individual cattle profile management.",
      "Breeding and artificial insemination tracking.",
      "Health and vaccination record management.",
      "IoT-based heat detection and activity monitoring.",
      "Historical data collection and analytics.",
      "Farmer-friendly dashboard and reporting system.",
    ],
    results: [],
    tech: [
      "IoT Sensors",
      "Embedded Systems",
      "Database Management",
      "Web Development",
      "Mobile Development",
      "Data Analytics",
      "Machine Learning",
    ],
    link: "",
    emoji: "🐄",
    folderColor: "from-emerald-500/20 to-teal-500/10",
    accentBorder: "group-hover:border-emerald-400/80",
  },
  {
    id: "03",
    title: "ApexFled",
    category: "Full-Stack E-Commerce",
    folderCategory: "web",
    tagline: "Premium Digital E-Commerce Platform (2026)",
    description:
      "High-performance digital account storefront utilizing microservice APIs, state sync, and secure transactional databases.",
    longDescription:
      "ApexFled is a full-featured digital storefront optimized for speed, reliability, and security. Utilizing Next.js Server Components, it fetches catalogue configurations dynamically with low server response times. The platform supports secure user profiles, Stripe checkout transactions, and PostgreSQL schemas with real-time stock sync.",
    challengesLabel: "Key Features",
    challenges: [
      "Implementing optimistic state updates for immediate cart interactions.",
      "Restructuring database queries to prevent deadlock situations during flash sales.",
      "Optimizing image rendering configurations to achieve maximum Lighthouse performance metrics.",
    ],
    results: [
      "Achieved sub-1.2s page load speed, scoring a 98/100 on mobile performance checks.",
      "Designed secure database triggers in PostgreSQL mapping inventory locks on transaction starts.",
      "Built a custom dashboard tracking revenue summaries and transactional logs.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST APIs"],
    link: "https://github.com/SithikaWeerasinghe/digital-account-store",
    website: "https://www.apexfled.com/",
    emoji: "🛍️",
    folderColor: "from-blue-500/20 to-cyan-500/10",
    accentBorder: "group-hover:border-blue-400/80",
  },
  {
    id: "04",
    title: "WordSearch App",
    category: "Mobile Systems",
    folderCategory: "mobile",
    tagline: "Interactive Puzzle Game (2026)",
    description:
      "Custom mobile word search game built using Google's Dart system and Material 3 design directives for fluid rendering.",
    longDescription:
      "WordSearch is an elegant, responsive mobile puzzle game built in Flutter. Adhering strictly to Material 3 guidelines, the interface automatically shifts colors to harmonize with themes. It features a custom grid-drawing canvas that maps touch vectors to letter paths, complete with smooth particle animations.",
    challengesLabel: "Key Features",
    challenges: [
      "Calculating touch coordinate intersections on irregular screen aspect ratios.",
      "Building an offline dictionary index that validates 10,000+ words within milliseconds.",
      "Designing responsive layouts that scale gracefully from compact phones to tablets.",
    ],
    results: [
      "Developed a custom-gesture grid tracking letter-swipes at 60fps.",
      "Created dynamic theme support shifting color variables in real-time.",
      "Packaged and verified target compilations on Android platforms.",
    ],
    tech: ["Flutter", "Dart", "Material 3", "Android SDK", "Git"],
    link: "https://github.com/BinethmaJayawickrama/word_search_app",
    emoji: "🧩",
    folderColor: "from-purple-500/20 to-pink-500/10",
    accentBorder: "group-hover:border-purple-400/80",
  },
  {
    id: "05",
    title: "TeamFlow",
    category: "Productivity & Workspace",
    folderCategory: "web",
    tagline: "Role-Based Project & Task Management Platform (2026)",
    description:
      "A collaborative workspace tool featuring dynamic role-based dashboards, secure JWT authorization, task tracking, and real-time alerts.",
    longDescription:
      "TeamFlow is a production-ready project management application designed to align teams, automate project telemetry, and centralize documentation. Built using Next.js on the frontend and Express.js on the backend, it offers tailored workspaces for Admins, Project Managers, and Team Collaborators. It features a project-wide reports directory, live task checklists, interactive Kanban workflows, and a real-time event system driven by Socket.io.",
    challengesLabel: "Key Features",
    challenges: [
      "Securing route configurations with dynamic JWT credentials and React RouteGuard constraints.",
      "Configuring Prisma ORM with connection pooling via PgBouncer for low-latency queries.",
      "Establishing instant socket notifications for project managers when deliverables are completed.",
    ],
    results: [
      "Completed a multi-tier role dashboard with zero permission boundary leaks.",
      "Reduced database query overhead by implementing consolidated relation-includes in backend services.",
      "Deployed frontend to Vercel and API servers to Railway with automated git webhook builds.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "WebSockets"],
    link: "https://github.com/BinethmaJayawickrama/TeamFlow-Project-",
    website: "https://team-flow-project-sigma.vercel.app",
    emoji: "📋",
    folderColor: "from-rose-500/20 to-orange-500/10",
    accentBorder: "group-hover:border-rose-400/80",
  },
  {
    id: "06",
    title: "Vision Sync",
    category: "AI & Computer Vision",
    folderCategory: "ai",
    tagline: "AI Gesture Brightness Controller (2026)",
    description:
      "Computer vision mapping utilities converting hand geometry coordinates into active Windows system adjustments in real time.",
    longDescription:
      "Vision Brightness Sync is a hands-free computer control utility. Running a lightweight background camera capture loop, it maps hand gesture geometry vectors from MediaPipe's hand-tracker to control Windows system brightness, allowing contactless system management.",
    challengesLabel: "Key Features",
    challenges: [
      "Reducing camera feed processing overhead to prevent high CPU usage states.",
      "Mitigating brightness jitter by implementing moving average filters on coordinate vectors.",
      "Ensuring gesture recognition remains accurate in dim-light conditions.",
    ],
    results: [
      "Reduced CPU overhead to less than 4% on modern hardware.",
      "Created smooth brightness steps using double exponential smoothing filters.",
      "Developed a system tray menu for easy startup configuration.",
    ],
    tech: ["Python", "OpenCV", "FastAPI", "NumPy"],
    link: "https://github.com/BinethmaJayawickrama/vision-brightness-sync",
    emoji: "👁️",
    folderColor: "from-cyan-500/20 to-teal-500/10",
    accentBorder: "group-hover:border-cyan-400/80",
  },
];

const categoryTabs = [
  { id: "all", label: "All Folders" },
  { id: "web", label: "Web / Full-Stack" },
  { id: "iot", label: "IoT Systems" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI & Vision" },
] as const;

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (selectedProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.folderCategory === activeTab);

  return (
    <section id="projects" className="py-8 bg-transparent text-[var(--dark)] select-none">
      <div className="w-full space-y-10">
        
        {/* ── Section Title & Heading ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--muted)]">
            <Folder className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Interactive Archive &bull; Touch Folder To Open Project</span>
          </div>

          <div className="flex flex-col gap-0 items-center lg:items-start text-center lg:text-left w-full">
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5rem] tracking-tight leading-[0.9] uppercase text-[var(--dark)]">
              FEATURED
            </h2>
            <h2
              className="font-display font-black text-5xl sm:text-6xl md:text-[5rem] tracking-tight leading-[0.9] uppercase text-transparent select-none"
              style={{ WebkitTextStroke: "1.5px var(--dark)" }}
            >
              PROJECTS
            </h2>
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 pb-4">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[var(--dark)] font-bold shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--dark)] bg-[var(--surface)]/50 border border-[var(--border)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-active-pill"
                    className="absolute inset-0 bg-[var(--accent)] rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Animated Folders Grid Showcase ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <PhysicalAnimatedFolder
                key={project.id}
                project={project}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── Complete Project Dossier Modal (Portal) ── */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <ProjectDossierModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Physical Animated Folder Component
// Has 3 layers:
// 1. Back Folder Cover with Top Tab
// 2. Inner Document Sheet that pulls UP on hover/touch
// 3. Front Flap that swings OPEN forward (rotateX) on hover/touch
// ─────────────────────────────────────────────────────────────────────────────
interface PhysicalAnimatedFolderProps {
  project: Project;
  onOpen: () => void;
}

function PhysicalAnimatedFolder({ project, onOpen }: PhysicalAnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full select-none"
    >
      <div
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        data-cursor="card"
        className="group relative cursor-pointer flex flex-col w-full pt-8 pb-2"
        style={{ perspective: "1000px" }}
      >
        
        {/* ──────────────────────────────────────────────────────────── */}
        {/* LAYER 1: BACK FOLDER PLATE & TOP TAB                         */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="relative w-full rounded-2xl bg-[var(--surface)] dark:bg-neutral-800/90 border border-[var(--border)] shadow-md overflow-visible">
          
          {/* Manila / Cyber Asymmetric Tab on Top */}
          <div className="absolute -top-7 left-4 h-8 px-5 rounded-t-xl bg-[var(--surface)] dark:bg-neutral-800/90 border-t border-l border-r border-[var(--border)] flex items-center gap-2 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300 shadow-xs z-0">
            <span className="text-xs">{project.emoji}</span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--dark)] group-hover:text-[var(--accent-text)]">
              {project.id} // {project.title.slice(0, 14)}
            </span>
          </div>

          {/* Right edge file index stamp */}
          <div className="absolute -top-6 right-5 text-[10px] font-mono tracking-widest uppercase text-[var(--muted)] hidden sm:block">
            {project.category}
          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* LAYER 2: INNER PROJECT DOCUMENT SHEET                        */}
          {/* Slides UP and reveals contents when hovered or touched       */}
          {/* ──────────────────────────────────────────────────────────── */}
          <motion.div
            animate={{
              y: isHovered ? -46 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="absolute inset-x-3 sm:inset-x-4 top-3 bottom-5 rounded-xl bg-[var(--white)] dark:bg-neutral-900 border border-[var(--border)] shadow-lg z-10 px-5 pt-4 pb-4 flex flex-col justify-between overflow-hidden"
          >
            {/* Document Header lines */}
            <div className="space-y-1.5 border-b border-[var(--border)]/70 pb-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[var(--accent-hover)] font-bold uppercase tracking-wider">
                  <FileText className="w-3 h-3" />
                  <span>Dossier #{project.id} Preview</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] font-mono text-[var(--muted)] line-clamp-1">
                {project.tagline}
              </p>
            </div>

            {/* Document Body Snippet */}
            <div className="my-2">
              <p className="text-xs font-sans text-[var(--muted)] leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Document Bottom Action */}
            <div className="flex items-center justify-between pt-2 border-t border-dashed border-[var(--border)]/70 text-[10px] font-mono">
              <span className="text-[var(--muted)]">Status: Ready to Inspect</span>
              <span className="inline-flex items-center gap-1 text-[var(--accent-hover)] font-bold group-hover:translate-x-1 transition-transform">
                <span>View Full Project</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* LAYER 3: FRONT FOLDER FLAP                                   */}
          {/* Swings forward (rotateX: -36deg) on touch / hover to open!  */}
          {/* ──────────────────────────────────────────────────────────── */}
          <motion.div
            animate={{
              rotateX: isHovered ? -34 : 0,
              y: isHovered ? 6 : 0,
              boxShadow: isHovered
                ? "0 24px 38px -10px rgba(0,0,0,0.22)"
                : "0 8px 16px -4px rgba(0,0,0,0.06)",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className={`relative w-full rounded-2xl bg-gradient-to-b from-[var(--white)] via-[var(--surface)] to-[var(--surface)] dark:from-neutral-850 dark:via-neutral-900 dark:to-neutral-900 border border-[var(--border)] ${project.accentBorder} p-6 sm:p-7 z-20 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between overflow-hidden transition-colors duration-300`}
          >
            {/* Folder Front Cutout Notch Header */}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{project.emoji}</span>
                  <h3 className="font-display font-black text-2xl sm:text-[26px] tracking-tight text-[var(--dark)] group-hover:text-[var(--accent-hover)] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  {project.category}
                </p>
              </div>

              {/* Folder Open Interactive Badge */}
              <div className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-text)] group-hover:border-[var(--accent)] flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                {isHovered ? (
                  <FolderOpen className="w-4 h-4 transition-transform scale-110" />
                ) : (
                  <Folder className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Folder Horizontal Crease Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-3 relative">
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[8px] font-mono uppercase tracking-widest text-[var(--muted)]">
                TOUCH TO EXPAND
              </div>
            </div>

            {/* Folder Base: Tech Stack Tags & Open Cue */}
            <div className="relative z-10 pt-2 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted)]">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--accent-hover)] shrink-0">
                <span>OPEN</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Dossier Modal Component (Opened when folder is touched)
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectDossierModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectDossierModal({ project, onClose }: ProjectDossierModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* ── Backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* ── Unfolded Dossier Window ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 28 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[88vh] bg-[var(--bg)] border border-[var(--border)] rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden text-[var(--dark)]"
      >
        {/* Dossier Header Bar */}
        <div className="relative px-6 sm:px-10 py-5 border-b border-[var(--border)] bg-[var(--surface)]/60 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)] text-[var(--accent-text)] flex items-center justify-center shadow-xs">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--muted)]">
                Project Archive &bull; File #{project.id}
              </p>
              <h4 className="font-display font-black text-sm sm:text-base tracking-tight uppercase">
                {project.title}
              </h4>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dossier"
            className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--dark)] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="overflow-y-auto flex-1 px-6 sm:px-12 py-8 space-y-8 select-text">
          
          {/* Top Highlight Box */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent-hover)] font-bold">
              <span>{project.emoji}</span>
              <span>{project.category}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-mono text-[var(--muted)]">
              {project.tagline}
            </p>
          </div>

          {/* Deep Description / Architecture */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold tracking-widest text-[var(--muted)] uppercase">
              Project Overview & Architecture
            </h5>
            <p className="text-[15px] sm:text-[16px] leading-[1.85] text-[var(--dark)] opacity-90 font-light">
              {project.longDescription}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          <div className="space-y-4">
            <h5 className="text-xs font-mono font-bold tracking-widest text-[var(--muted)] uppercase">
              {project.challengesLabel ?? "Key Deliverables & Engineering Challenges"}
            </h5>
            <div className="grid grid-cols-1 gap-2.5">
              {project.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--surface)]/60 border border-[var(--border)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--dark)] opacity-90">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Results (if available) */}
          {project.results.length > 0 && (
            <div className="space-y-4">
              <h5 className="text-xs font-mono font-bold tracking-widest text-[var(--muted)] uppercase">
                {project.resultsLabel ?? "Measured Results & Impact"}
              </h5>
              <div className="grid grid-cols-1 gap-2.5">
                {project.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[var(--surface)]/60 border border-[var(--border)]"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--dark)] opacity-90">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-4">
            <h5 className="text-xs font-mono font-bold tracking-widest text-[var(--muted)] uppercase">
              Technology Stack
            </h5>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t) => {
                const slug = techIconMap[t];
                return (
                  <div
                    key={t}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--dark)]"
                  >
                    {slug ? (
                      <img
                        src={`https://cdn.simpleicons.org/${slug}`}
                        alt={t}
                        className="w-4 h-4 tech-icon"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
                    )}
                    <span>{t}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dossier Footer with Action Buttons */}
        <div className="px-6 sm:px-10 py-5 border-t border-[var(--border)] bg-[var(--surface)]/40 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <p className="text-xs font-mono text-[var(--muted)] hidden sm:block">
            Status: {project.link || project.website ? "Public Access" : "Internal / Hardware Prototype"}
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-[var(--white)] text-[var(--dark)] border border-[var(--border)] hover:border-[var(--dark)] transition-all shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-[var(--accent)] text-[var(--accent-text)] hover:shadow-md transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>Live Deployment</span>
              </a>
            )}

            {!project.link && !project.website && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]">
                <Lock className="w-3.5 h-3.5" />
                <span>Private Repository &bull; Ongoing Innovation</span>
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
