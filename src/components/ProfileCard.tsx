"use client";

import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileCard() {
  return (
    <div className="w-full bg-[var(--white)]/60 dark:bg-[var(--white)]/5 border border-[var(--border)] rounded-[24px] p-6 flex flex-col items-center gap-6 shadow-sm select-none">
      
      {/* Profile Image Frame with Gradient Mesh */}
      <div className="w-full aspect-[4/5] rounded-[18px] relative overflow-hidden bg-gradient-to-br from-[var(--surface)] to-[var(--border)]/30 border border-[var(--border)] flex items-end justify-center group">
        
        {/* Soft background aura circles */}
        <div className="absolute w-40 h-40 rounded-full bg-[var(--accent)]/10 dark:bg-[var(--accent)]/5 filter blur-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-[var(--accent)]/20 animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />

        {/* Decorative corner lines / brackets */}
        <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[var(--border)]" />
        <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[var(--border)]" />
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[var(--border)]" />
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[var(--border)]" />

        {/* Cutout Profile Image */}
        <img
          src="/profile_nobg.png"
          alt="Binethma Jayawickrama"
          className="relative z-10 w-[95%] h-[95%] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(244,108,56,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Name and Bio */}
      <div className="text-center space-y-3 px-2">
        <h2 className="font-display font-bold text-2xl tracking-tight text-[var(--dark)]">
          Binethma Jayawickrama
        </h2>
        
        <p className="text-xs sm:text-[13px] font-sans font-light leading-relaxed text-[var(--muted)] dark:text-[var(--muted)]/90">
          A Computer Science undergraduate at IIT Sri Lanka / University of Westminster. Specializing in IoT telemetry systems, full-stack web development, and interactive AI engineering.
        </p>
      </div>

      {/* Social Media Link Dock */}
      <div className="flex items-center gap-3 w-full justify-center mt-2">
        <a
          href="https://github.com/ADORIX000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 bg-[var(--surface)]/20 hover:bg-[var(--surface)] dark:hover:bg-white/5"
          title="GitHub"
          data-cursor="link"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/binethma-jayawickrama"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 bg-[var(--surface)]/20 hover:bg-[var(--surface)] dark:hover:bg-white/5"
          title="LinkedIn"
          data-cursor="link"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="mailto:binethmad@gmail.com"
          className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 bg-[var(--surface)]/20 hover:bg-[var(--surface)] dark:hover:bg-white/5"
          title="Email"
          data-cursor="link"
        >
          <Mail className="w-4 h-4" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 bg-[var(--surface)]/20 hover:bg-[var(--surface)] dark:hover:bg-white/5"
          title="Twitter / X"
          data-cursor="link"
        >
          <Twitter className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
