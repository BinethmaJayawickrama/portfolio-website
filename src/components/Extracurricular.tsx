"use client";

import { motion } from "framer-motion";
import { Award, Compass, Star, Users, Volleyball } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const activities = [
  { name: "IEEE Computer Society Member", role: "2024 - Present", icon: Star, color: "bg-rose-blush/60 text-rose-dark border-rose-deep/10" },
  { name: "RACIIT Active Member", role: "2024 - Present", icon: Users, color: "bg-lavender-light text-lavender-deep border-lavender-deep/10" },
  { name: "University Carrom Team", role: "Athlete", icon: Award, color: "bg-mint text-emerald-800 border-emerald-500/10" },
  { name: "School Volleyball Representative", role: "Athlete", icon: Volleyball, color: "bg-rose-blush/40 text-rose-dark border-rose-deep/10" },
  { name: "Science Society Presentations", role: "Active Organizer", icon: Compass, color: "bg-lavender-light text-lavender-deep border-lavender-deep/10" }
];

export default function Extracurricular() {
  return (
    <section id="extracurricular" className="py-16 relative overflow-hidden bg-cream/15">
      <div className="container mx-auto px-6 max-w-4xl z-10 relative">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <ScrollReveal type="draw-line" className="justify-center" delay={100}>
            <span className="text-2xs font-sans font-extrabold tracking-widest text-rose-deep uppercase">Active Spaces</span>
          </ScrollReveal>
          <ScrollReveal type="mask" delay={200}>
            <h2 className="font-display font-light italic text-4xl sm:text-5xl text-rose-dark leading-tight select-none">
              Extracurricular Activities
            </h2>
          </ScrollReveal>
        </div>

        {/* Floating Pill Tags Stagger Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <ScrollReveal
                key={act.name}
                type="fade-up"
                delay={100 + idx * 80}
              >
                <div
                  className={`flex items-center gap-3 px-6 py-4 rounded-[28px] border hover:border-rose-deep/30 hover:scale-103 active:scale-97 hover:bg-white hover:shadow-2xs transition-all duration-400 cursor-default shadow-3xs ${act.color}`}
                  data-magnetic="true"
                  data-magnetic-speed="0.1"
                >
                  <div className="p-2 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-slate-800">{act.name}</h3>
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450 mt-0.5">{act.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
