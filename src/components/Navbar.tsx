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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check if user has scrolled down
          setHasScrolled(window.scrollY > 20);

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
    const lenis = (window as any).lenis;
    if (id === "home") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection("home");
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(id);
    }
  };

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[45] flex items-center rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 premium-navbar-capsule"
    >
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
              className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none relative flex items-center justify-center ${
                isActive
                  ? "text-[var(--accent)] scale-110 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
              aria-label={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
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
                  className="absolute top-14 px-2.5 py-1.5 rounded-md bg-neutral-950 text-white text-[9px] font-sans font-extrabold tracking-widest uppercase shadow-md pointer-events-none whitespace-nowrap z-50 border border-white/10"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Vertical Spacer Divider */}
      <div className="w-[1px] h-5.5 bg-white/15 self-center mx-0.5" />

      {/* Theme Toggle Element */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoveredItem("theme")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center active:scale-95 duration-200"
          aria-label="Toggle Theme"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-amber-400 stroke-[1.8]" />
            ) : (
              <Moon className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-amber-300 stroke-[1.8]" />
            )}
          </motion.div>
        </button>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredItem === "theme" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-14 px-2.5 py-1.5 rounded-md bg-neutral-950 text-white text-[9px] font-sans font-extrabold tracking-widest uppercase shadow-md pointer-events-none whitespace-nowrap z-50 border border-white/10"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
