"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Calendar, Layout, Settings } from "lucide-react";

const skillGroups = [
  {
    category: "Languages & Databases",
    icon: Code2,
    skills: [
      { name: "Python", type: "Advanced" },
      { name: "Java", type: "Intermediate" },
      { name: "JavaScript", type: "Intermediate" },
      { name: "SQL & MySQL", type: "Advanced" },
      { name: "HTML5 / CSS3", type: "Advanced" },
    ],
  },
  {
    category: "Frameworks & Design",
    icon: Layout,
    skills: [
      { name: "Next.js", type: "Intermediate" },
      { name: "React.js", type: "Intermediate" },
      { name: "Tailwind CSS", type: "Advanced" },
      { name: "Figma (UI/UX)", type: "Advanced" },
    ],
  },
  {
    category: "Infrastructure & DevTools",
    icon: Settings,
    skills: [
      { name: "Git / GitHub", type: "Advanced" },
      { name: "Basic Networking", type: "Intermediate" },
    ],
  },
];

const timeline = [
  {
    year: "2023 - Present",
    title: "BSc (Hons) Computer Science",
    institution: "University of Westminster",
    description: "Acquiring strong foundations in algorithms, database design, software engineering practices, and computer networks. Active participant in academic projects.",
    icon: GraduationCap,
  },
  {
    year: "2024 - Present",
    title: "Personal & Academic Milestones",
    institution: "Software Developer",
    description: "Engineering computer vision synchronization utilities, full-stack relational database systems, and AI retail kiosks to solve real-world problems.",
    icon: Code2,
  },
];

export default function About() {
  return (
    <section id="about" className="py-36 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 mb-4">
            About Me
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-sky-500 to-teal-500 mx-auto rounded-full" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Bio & Skills (Left side) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-500/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none" />
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mb-4">
                My Story & Ambition
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                A dedicated undergraduate BSc (Hons) Computer Science student at the University of Westminster with a strong interest in web development. Possesses a solid foundation in programming, including Java and Python, along with web technologies such as HTML and CSS. Eager to further develop technical skills and apply academic knowledge in practical, real-world environments.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                I enjoy engineering solutions where design aesthetics meet solid software architecture. My target is to construct efficient interfaces that streamline operations and deliver immersive interactions for real users.
              </p>
            </div>

            {/* Skills Groups Grid */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-500/10 shadow-sm space-y-6">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mb-4">
                Skills & Technologies
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skillGroups.map((group, gIdx) => {
                  const GroupIcon = group.icon;
                  return (
                    <div key={gIdx} className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <GroupIcon className="w-4 h-4 text-teal-600" />
                        <h4 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                          {group.category}
                        </h4>
                      </div>
                      
                      <div className="space-y-3">
                        {group.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700 bg-white/40 border border-slate-500/5 rounded-xl px-3.5 py-2 shadow-2xs hover:bg-white/70 hover:border-teal-500/20 transition-all duration-300 group cursor-default"
                          >
                            <span className="group-hover:text-teal-700 transition-colors">
                              {skill.name}
                            </span>
                            
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                skill.type === "Advanced"
                                  ? "bg-teal-500/10 text-teal-700 border border-teal-500/20"
                                  : "bg-sky-500/10 text-sky-700 border border-sky-500/20"
                              }`}
                            >
                              {skill.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline & Progress (Right side) */}
          <div className="lg:col-span-5 lg:pl-6 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-500/10 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mb-6">
                Academic Journey
              </h3>
              <div className="relative border-l-2 border-slate-200 pl-6 ml-2.5 space-y-8">
                {timeline.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative">
                      {/* Timeline marker */}
                      <span className="absolute -left-[35px] top-1 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-sky-400 shadow-sm">
                        <Icon className="w-3.5 h-3.5 text-sky-500" />
                      </span>
                      {/* Dates */}
                      <span className="flex items-center gap-1 text-xs font-semibold text-teal-600 mb-1.5">
                        <Calendar className="w-3 h-3" />
                        {item.year}
                      </span>
                      {/* Content */}
                      <h4 className="text-base font-display font-bold text-slate-800">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-400 mb-2">
                        {item.institution}
                      </p>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background shape */}
      <div className="absolute right-0 bottom-1/4 w-[200px] h-[200px] bg-sky-100/10 blur-[80px] pointer-events-none -z-10" />
    </section>
  );
}
