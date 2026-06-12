"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Folder, Briefcase, Wrench, BookOpen, SquarePen, Sun, Moon } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Folder },

  { id: "tools", label: "Tools", icon: Wrench },
  { id: "blog", label: "Blogs", icon: BookOpen },
  { id: "contact", label: "Contact", icon: SquarePen },
];

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Check if we are at the bottom of the page (lock to contact)
          const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 120;
          if (isAtBottom) {
            setActiveSection("contact");
            ticking = false;
            return;
          }

          // 2. Otherwise, find the current active section based on viewport position
          const triggerPoint = window.innerHeight * 0.35; // 35% from the top of the viewport
          let currentSection = "home";

          for (const item of navItems) {
            const el = document.getElementById(item.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              // If the section top is above the trigger point, it is the active candidate
              if (rect.top <= triggerPoint) {
                currentSection = item.id;
              }
            }
          }

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount to set the initial active section correctly
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[45] flex items-center gap-3 sm:gap-4.5 px-4 sm:px-5.5 py-2.5 sm:py-3 rounded-full bg-[var(--nav-bg)] backdrop-blur-[20px] border border-[var(--nav-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <div
            key={item.id}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              onClick={() => scrollToSection(item.id)}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none relative flex items-center justify-center ${
                isActive
                  ? "text-[var(--accent)] bg-[var(--surface)] scale-110 shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--dark)] hover:bg-[var(--surface)]/40"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4 sm:w-[17px] sm:h-[17px] stroke-[1.8]" />
            </button>

            {/* Premium Hover Tooltip */}
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-13 px-2.5 py-1.5 rounded-md bg-[var(--dark)] dark:bg-[var(--accent-deep)] text-[var(--bg)] text-[9px] font-sans font-extrabold tracking-widest uppercase shadow-md pointer-events-none whitespace-nowrap z-50 border border-[var(--border)]/10"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Vertical Spacer Divider */}
      <div className="w-[1px] h-5.5 bg-[var(--border)]/65 self-center mx-0.5" />

      {/* Theme Toggle Element */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoveredItem("theme")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--dark)] hover:bg-[var(--surface)]/40 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-amber-400 stroke-[1.8]" />
          ) : (
            <Moon className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[var(--accent)] stroke-[1.8]" />
          )}
        </button>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredItem === "theme" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-13 px-2.5 py-1.5 rounded-md bg-[var(--dark)] dark:bg-[var(--accent-deep)] text-[var(--bg)] text-[9px] font-sans font-extrabold tracking-widest uppercase shadow-md pointer-events-none whitespace-nowrap z-50 border border-[var(--border)]/10"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
