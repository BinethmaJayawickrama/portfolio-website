"use client";

import React from "react";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function ProfileCard() {
  return (
    <div
      className="w-full bg-white rounded-[28px] flex flex-col items-center select-none overflow-hidden"
      style={{
        boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* ── Image with white mat frame ── */}
      <div className="w-full bg-white px-7 pt-8 pb-8">
        <div
          className="w-full overflow-hidden rounded-[14px] group"
          style={{
            aspectRatio: "3/4",
            border: "20px solid white",
            outline: "1px solid rgba(0,0,0,0.09)",
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
      <div className="w-[calc(100%-56px)] h-px bg-gray-100" />

      {/* ── Name & Title ── */}
      <div className="text-center w-full px-6 pt-8 pb-14 flex flex-col items-center gap-4">
        <h2
          className="font-display font-bold tracking-tight text-gray-900 leading-[1.1]"
          style={{ fontSize: "clamp(26px, 5vw, 32px)" }}
        >
          Binethma<br />Jayawickrama
        </h2>

        <p className="text-[12px] font-mono tracking-widest uppercase text-gray-400">
          Full-Stack Developer
        </p>
      </div>

      {/* ── Spacer ── */}
      <div className="h-16 w-full" />

      {/* ── Divider ── */}
      <div className="w-[calc(100%-56px)] h-px bg-gray-100" />

      {/* ── Social Link Dock ── */}
      <div className="flex items-center gap-3 w-full justify-center py-9">
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
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-900 transition-all duration-200 hover:bg-gray-100 border border-transparent hover:border-gray-200"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
