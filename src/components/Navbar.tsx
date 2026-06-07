"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const navItems = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "tools", label: "Tools" },
  { id: "blog", label: "Blogs" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("projects");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
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

    const heroEl = document.getElementById("home");
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[45] w-[92%] max-w-5xl rounded-full transition-all duration-500 ${
          isScrolled
            ? "top-4 bg-[var(--bg)]/92 backdrop-blur-[20px] border border-[var(--border)]/35 shadow-xs"
            : "top-6 bg-transparent border border-[var(--border)]/10"
        }`}
      >
        <div className="px-6 flex items-center justify-between w-full h-14 md:h-16 transition-all duration-500">
          {/* Logo (Left) */}
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => scrollToSection("home")}
              className="font-display font-semibold text-3xl tracking-[0.1em] text-[var(--accent-deep)] dark:text-[var(--accent)] italic cursor-pointer focus:outline-none select-none"
              data-magnetic="true"
              data-magnetic-speed="0.2"
              data-cursor="link"
            >
              B · J
            </button>
          </div>

          {/* Nav Links (Center) */}
          <div className="hidden md:flex flex-initial justify-center items-center gap-8 px-6 py-2 rounded-full relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 text-[9px] font-extrabold tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none cursor-pointer select-none group ${
                    isActive
                      ? "text-[var(--accent-deep)] dark:text-white"
                      : "text-[var(--muted)] hover:text-[var(--dark)]"
                  }`}
                  data-magnetic="true"
                  data-magnetic-speed="0.1"
                  data-cursor="link"
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Underline drawing from center-out */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--accent)] transition-transform duration-350 ease-out origin-center ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Theme switcher and Let's Talk button (Right) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Theme toggle switch */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/40 dark:bg-white/5 border border-[var(--border)]/30 hover:bg-[var(--surface)] dark:hover:bg-white/10 text-[var(--dark)] transition-all duration-300 cursor-pointer focus:outline-none"
              aria-label="Toggle Theme"
              data-magnetic="true"
              data-magnetic-speed="0.15"
              data-cursor="link"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-4 h-4 text-[var(--accent)]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Let's Talk Pill button with SVG border tracing on hover */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:inline-flex relative items-center justify-center px-6 py-2.5 text-[9px] font-extrabold tracking-[0.2em] uppercase text-[var(--dark)] dark:text-white transition-colors duration-300 group rounded-full focus:outline-none"
              data-cursor="link"
            >
              <span className="relative z-10">Let's Talk</span>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 120 40"
                preserveAspectRatio="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="118"
                  height="38"
                  rx="19"
                  className="fill-none stroke-[var(--border)] stroke-1 opacity-50 transition-opacity duration-300 group-hover:opacity-20"
                />
                <rect
                  x="1"
                  y="1"
                  width="118"
                  height="38"
                  rx="19"
                  className="fill-none stroke-[var(--accent)] stroke-[1.5] transition-all duration-500 ease-out [stroke-dasharray:320] [stroke-dashoffset:320] group-hover:[stroke-dashoffset:0]"
                />
              </svg>
            </button>

            {/* Mobile Hamburg Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-[50] p-2.5 rounded-full bg-white/40 dark:bg-white/5 border border-[var(--border)]/30 hover:bg-[var(--surface)] dark:hover:bg-white/10 text-[var(--dark)] focus:outline-none shrink-0"
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-3 flex flex-col justify-between items-end relative overflow-hidden">
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: 45, y: 5, width: "20px" }
                      : { rotate: 0, y: 0, width: "20px" }
                  }
                  transition={{ duration: 0.25 }}
                  className="w-5 h-[2px] bg-[var(--dark)] rounded-full origin-left"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { opacity: 0, x: 15 }
                      : { opacity: 1, x: 0, width: "14px" }
                  }
                  transition={{ duration: 0.25 }}
                  className="h-[2px] bg-[var(--dark)] rounded-full"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: -5, width: "20px" }
                      : { rotate: 0, y: 0, width: "20px" }
                  }
                  transition={{ duration: 0.25 }}
                  className="w-5 h-[2px] bg-[var(--dark)] rounded-full origin-left"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-screen h-screen bg-[var(--bg)]/98 z-[40] flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.3 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-1.5 text-lg font-display tracking-widest uppercase cursor-pointer select-none ${
                    isActive ? "text-[var(--accent)] font-medium italic" : "text-[var(--muted)]"
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
