"use client";

import React from "react";
import { Github, Linkedin, Mail, Twitter, MapPin } from "lucide-react";

export default function ProfileCard() {
  return (
    <div
      className="w-full bg-white border border-[rgba(0,0,0,0.06)] rounded-[28px] p-6 flex flex-col items-center gap-5 select-none"
      style={{
        boxShadow: "0 2px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Profile Image with White Mat Frame ── */}
      <div
        className="w-full rounded-[18px] overflow-hidden relative transition-all duration-500 ease-out hover:shadow-xl"
        style={{
          padding: "20px 20px 28px 20px",
          background: "white",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Corner tick marks (photo-print aesthetic) */}
        {[
          "top-3 left-3",
          "top-3 right-3 rotate-90",
          "bottom-3 left-3 -rotate-90",
          "bottom-3 right-3 rotate-180",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-3 h-3 pointer-events-none z-20`}
            style={{
              borderTop: "1.5px solid rgba(0,0,0,0.15)",
              borderLeft: "1.5px solid rgba(0,0,0,0.15)",
              borderRadius: "1px",
            }}
          />
        ))}

        {/* Photo inside the mat */}
        <div
          className="w-full overflow-hidden rounded-[10px] group"
          style={{ aspectRatio: "3/4", background: "#f0ede8" }}
        >
          <img
            src="/profile_cropped_v7.png"
            alt="Binethma Jayawickrama"
            className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{
              filter: "grayscale(1) contrast(1.08) brightness(0.97)",
            }}
          />
        </div>

        {/* Caption */}
        <div className="pt-3 text-center">
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-300 select-none">
            Colombo, Sri Lanka &nbsp;·&nbsp; CS&apos;26
          </p>
        </div>
      </div>

      {/* ── Name and Bio ── */}
      <div className="text-center space-y-2 px-1 w-full">
        <h2 className="font-display font-bold text-[22px] tracking-tight text-gray-900 leading-tight">
          Binethma Jayawickrama
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-gray-400">
          <MapPin className="w-3 h-3" strokeWidth={1.8} />
          <span className="text-[11px] font-mono tracking-wide">
            Sri Lanka · IIT / Westminster
          </span>
        </div>
        <p className="text-[12px] font-sans font-light leading-relaxed text-gray-400 pt-1">
          CS undergraduate specializing in IoT telemetry, full-stack web dev &amp; interactive AI engineering.
        </p>
      </div>

      {/* ── Thin divider ── */}
      <div className="w-full h-px bg-gray-100" />

      {/* ── Social Link Dock ── */}
      <div className="flex items-center gap-2.5 w-full justify-center">
        {[
          { href: "https://github.com/ADORIX000", icon: <Github className="w-[15px] h-[15px]" />, label: "GitHub" },
          { href: "https://www.linkedin.com/in/binethma-jayawickrama", icon: <Linkedin className="w-[15px] h-[15px]" />, label: "LinkedIn" },
          { href: "mailto:binethmad@gmail.com", icon: <Mail className="w-[15px] h-[15px]" />, label: "Email" },
          { href: "https://twitter.com/", icon: <Twitter className="w-[15px] h-[15px]" />, label: "Twitter" },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            title={label}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all duration-200 hover:bg-gray-100 border border-transparent hover:border-gray-200"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
