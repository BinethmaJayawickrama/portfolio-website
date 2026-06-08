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
      <div className="w-full bg-white px-7 pt-7 pb-0">
        <div
          className="w-full overflow-hidden rounded-[14px] group"
          style={{
            aspectRatio: "3/4",
            border: "20px solid white",
            outline: "1px solid rgba(0,0,0,0.09)",
          }}
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
      </div>

      {/* ── Name & Title ── */}
      <div className="text-center space-y-2.5 px-6 pt-5 pb-1 w-full">
        <h2
          className="font-display font-bold tracking-tight text-gray-900 leading-[1.1]"
          style={{ fontSize: "clamp(26px, 5vw, 32px)" }}
        >
          Binethma<br />Jayawickrama
        </h2>
        <p className="text-[12px] font-mono tracking-widest uppercase text-gray-400">
          Full-Stack Developer
        </p>
        <div className="flex flex-col items-center gap-1.5 pt-0.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-sans text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Sri Lanka
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-sans text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            University of Westminster (IIT)
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-[calc(100%-48px)] h-px bg-gray-100 my-4" />

      {/* ── Social Link Dock ── */}
      <div className="flex items-center gap-2.5 w-full justify-center pb-6">
        {[
          { href: "https://github.com/ADORIX000", icon: <Github className="w-[15px] h-[15px]" />, label: "GitHub" },
          { href: "https://www.linkedin.com/in/binethma-jayawickrama", icon: <Linkedin className="w-[15px] h-[15px]" />, label: "LinkedIn" },
          { href: "mailto:binethmad@gmail.com", icon: <Mail className="w-[15px] h-[15px]" />, label: "Email" },
          { href: "https://instagram.com/", icon: <Instagram className="w-[15px] h-[15px]" />, label: "Instagram" },
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
