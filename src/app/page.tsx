"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let initialTheme: "light" | "dark" = "light";
    if (localStorage.getItem("theme_migrated_v3") !== "true") {
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme_migrated_v3", "true");
    } else {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme === "dark") initialTheme = "dark";
    }
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      syncTouch: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Track mouse position for parallax grid shift
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--dark)] transition-colors duration-500 overflow-x-hidden">
      {/* 1. Loading Curtain Reveal Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen"
        >
          {/* 3. Navigation Header Bar */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* 4. Two-Column Structural Layout Container */}
          <main className="max-w-[1140px] mx-auto px-6 md:px-10 lg:px-12 xl:px-0 py-28 flex flex-col lg:flex-row gap-12 lg:gap-[100px] relative z-10">
            
            {/* Sticky Profile Card (Left Sidebar) */}
            <div className="w-full lg:w-[344px] lg:sticky lg:top-28 h-fit shrink-0 z-20">
              <ProfileCard />
            </div>

            {/* Scrollable Content (Right Column) */}
            <div className="flex-1 w-full lg:w-1 min-w-0 flex flex-col gap-24 md:gap-32 lg:gap-[120px] z-10">
              <Hero />
              <Projects />
              <Education />
              <Skills />
              <Blog />
              <Contact />
            </div>

          </main>
        </motion.div>
      )}
    </div>
  );
}
