"use client";

import { useEffect, useState } from "react";
import { Home, User, Briefcase, BookOpen, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1.5 p-2 bg-white/70 backdrop-blur-xl border border-slate-500/10 rounded-full shadow-lg shadow-slate-200/40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative p-3 rounded-full text-slate-500 hover:text-teal-600 transition-colors focus:outline-none"
              data-hover="true"
              aria-label={`Scroll to ${item.label}`}
            >
              {/* Highlight Background Bubble */}
              {isActive && (
                <motion.span
                  layoutId="activeNavBubble"
                  className="absolute inset-0 bg-gradient-to-r from-sky-400/25 to-teal-400/25 rounded-full border border-sky-400/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              <span className="relative z-10 block">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110 text-teal-700" : "group-hover:scale-115 text-slate-600"
                  }`}
                />
              </span>

              {/* Tooltip */}
              <span className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md font-sans">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
