"use client";

import React from "react";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function ProfileCard() {
  return (
    <div
      className="w-full bg-[var(--white)] rounded-[28px] flex flex-col items-center select-none transition-colors duration-500"
      style={{
        boxShadow: "0 2px 24px var(--card-shadow)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ── Image with white mat frame ── */}
      <div className="w-full bg-[var(--white)] px-7 pt-8 pb-8 transition-colors duration-500">
        <div
          className="w-full overflow-hidden rounded-[14px] group transition-colors duration-500"
          style={{
            aspectRatio: "3/4",
            border: "20px solid var(--white)",
            outline: "1px solid var(--border)",
          }}
        >
          <img
            src="/profile_new.jpg"
            alt="Binethma Jayawickrama"
            className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ filter: "grayscale(1) contrast(1.08) brightness(0.97)" }}
          />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-[calc(100%-56px)] h-px bg-[var(--border)] transition-colors duration-500" />

      {/* ── Name & Title ── */}
      <div className="text-center w-full px-6 pt-8 pb-14 flex flex-col items-center gap-4">
        <h2
          className="font-display font-bold tracking-tight text-[var(--dark)] leading-[1.1] transition-colors duration-500"
          style={{ fontSize: "clamp(26px, 5vw, 32px)" }}
        >
          Binethma<br />Jayawickrama
        </h2>

        <p className="text-[12px] font-mono tracking-widest uppercase text-[var(--muted)] transition-colors duration-500">
          Full-Stack Developer
        </p>
      </div>

      {/* ── Spacer ── */}
      <div className="h-16 w-full" />

      {/* ── Social Link Dock ── */}
      <div 
        className="flex items-center gap-3 w-full justify-center"
        style={{ paddingTop: "36px", paddingBottom: "80px" }}
      >
        {[
          { href: "https://github.com/ADORIX000", icon: <Github className="w-[19px] h-[19px]" />, label: "GitHub" },
          { href: "https://www.linkedin.com/in/binethma-jayawickrama", icon: <Linkedin className="w-[19px] h-[19px]" />, label: "LinkedIn" },
          { href: "mailto:binethmad@gmail.com", icon: <Mail className="w-[19px] h-[19px]" />, label: "Email" },
          { href: "https://instagram.com/", icon: <Instagram className="w-[19px] h-[19px]" />, label: "Instagram" },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            title={label}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--dark)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 border border-transparent hover:border-[var(--accent)]/30 hover:scale-110 transition-all duration-300"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
