"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Compress navigation bar past 60px scroll depth
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px", // Active section classification threshold
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

    // Observe home/hero to reset navigation
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
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-cream/80 backdrop-blur-md border-b border-rose-deep/10 shadow-xs"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Column 1: Logo (Left) */}
          <div className="flex justify-start">
            <button
              onClick={() => scrollToSection("home")}
              className="font-display font-semibold text-3xl tracking-[0.1em] text-rose-dark italic cursor-pointer focus:outline-none"
              data-magnetic="true"
              data-magnetic-speed="0.2"
            >
              B · J
            </button>
          </div>

          {/* Column 2: Nav Links (Center) */}
          <div className="hidden md:flex justify-center items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors focus:outline-none cursor-pointer group ${
                    isActive ? "text-rose-dark" : "text-slate-550 hover:text-rose-deep"
                  } after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1.5px] after:bg-rose-dark after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "after:w-full" : ""
                  }`}
                  data-magnetic="true"
                  data-magnetic-speed="0.1"
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Column 3: Action Trigger / Mobile menu (Right) */}
          <div className="flex justify-end items-center">
            {/* Morphing Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-slate-700 hover:text-rose-dark focus:outline-none shrink-0"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-end relative overflow-hidden">
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: 45, y: 7, width: "24px" }
                      : { rotate: 0, y: 0, width: "24px" }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-6 h-[2px] bg-rose-dark rounded-full origin-left"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { opacity: 0, x: 20 }
                      : { opacity: 1, x: 0, width: "18px" }
                  }
                  transition={{ duration: 0.2 }}
                  className="h-[2px] bg-rose-dark rounded-full"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: -7, width: "24px" }
                      : { rotate: 0, y: 0, width: "24px" }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-6 h-[2px] bg-rose-dark rounded-full origin-left"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-screen h-screen bg-cream/98 z-30 flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2 text-lg font-display tracking-widest uppercase cursor-pointer ${
                    isActive ? "text-rose-dark font-medium italic" : "text-slate-550"
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
