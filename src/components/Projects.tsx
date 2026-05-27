"use client";

import { motion } from "framer-motion";
import { Monitor, Eye, Sliders, Database, Car, ArrowUpRight, CheckCircle2 } from "lucide-react";
import React from "react";

const projects = [
  {
    id: 1,
    title: "ADORIX",
    tagline: "AI-Powered Interactive Retail Kiosk",
    description: "An interactive retail kiosk system that detects shoppers in real time and displays targeted advertisements using Python, OpenCV, and Next.js.",
    highlights: [
      "Real-time presence detection",
      "Targeted ad display synchronization",
      "Modular frontend state architecture"
    ],
    tech: ["Python", "OpenCV", "Next.js", "React.js", "Tailwind CSS"],
    icon: Monitor,
    color: "from-sky-500 to-blue-600",
    colSpan: "lg:col-span-4",
  },
  {
    id: 2,
    title: "Vision Brightness Sync",
    tagline: "AI Hand-Tracking System Controller",
    description: "A real-time computer vision system utilizing Google MediaPipe Tasks and OpenCV in Python to map hand gestures directly to Windows screen brightness adjustments.",
    highlights: [
      "Sub-25ms input latency",
      "EMA signal filtering for smooth transitions",
      "Lightweight 30 FPS CPU footprint"
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "WMI"],
    icon: Sliders,
    color: "from-teal-400 to-emerald-500",
    colSpan: "lg:col-span-2",
  },
  {
    id: 3,
    title: "Animals Breeding System",
    tagline: "Livestock Management Platform",
    description: "A database-driven system designed in Figma and SQL to streamline animal breeding cycles, health history records, and farm productivity tracking.",
    highlights: [
      "Detailed relational database schema",
      "Interactive UI wireframes",
      "Breeding cycle calendar triggers"
    ],
    tech: ["SQL", "MySQL", "Figma", "Database Design"],
    icon: Database,
    color: "from-teal-500 to-sky-400",
    colSpan: "lg:col-span-2",
  },
  {
    id: 4,
    title: "Traffic Vehicles Database",
    tagline: "Desktop CRUD SQL Database System",
    description: "A standalone desktop database application built independently with Python and Tkinter to log, search, and manage traffic vehicle records.",
    highlights: [
      "100% independent GUI & DB architecture",
      "Efficient SQLCRUD query optimizations",
      "Offline local file system storage"
    ],
    tech: ["Python", "Tkinter", "SQL", "MySQL", "Git"],
    icon: Car,
    color: "from-blue-500 to-teal-400",
    colSpan: "lg:col-span-4",
  },
];

export default function Projects() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="projects" className="py-36 relative overflow-hidden bg-slate-50/50">
      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            A selection of academic and personal systems engineering, AI, and full-stack web applications.
          </p>
          <div className="w-12 h-1.5 bg-gradient-to-r from-sky-500 to-teal-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                onMouseMove={handleMouseMove}
                className={`${project.colSpan} relative overflow-hidden rounded-3xl border border-slate-500/10 bg-white/75 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 group`}
                style={{
                  contentVisibility: "auto",
                }}
              >
                {/* Spotlight hover effect background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(13, 148, 136, 0.07), transparent 80%)`,
                  }}
                />

                {/* Card Top / Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-800 transition-colors p-1.5 rounded-full border border-transparent group-hover:border-slate-500/15 group-hover:bg-slate-50">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Project Titles */}
                <div>
                  <span className="text-xs font-semibold tracking-wider text-teal-600 uppercase">
                    {project.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-800 mt-1 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Highlights Checklist */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-2xs sm:text-xs font-medium rounded-lg bg-slate-50 text-slate-500 border border-slate-500/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
