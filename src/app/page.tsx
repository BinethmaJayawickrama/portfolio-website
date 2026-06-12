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

    // Track mouse position for parallax grid shift
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      syncTouch: true,
    });

    // Expose lenis instance globally for Navbar scroll animations
    (window as any).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger and Lenis after entrance animation completes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      lenis.resize();
    }, 1500);

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCallback);
      (window as any).lenis = undefined;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded]);

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
    <div className="relative min-h-screen w-full bg-[var(--bg)] text-[var(--dark)] transition-colors duration-500 overflow-x-clip">
      {/* 1. Loading Curtain Reveal Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {isLoaded && (
        <>
          {/* 3. Navigation Header Bar (Placed outside scale animation to keep fixed positioning relative to viewport) */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen w-full flex flex-col items-center"
          >
            {/* 4. Two-Column Structural Layout Container (max-width and width aligned with Navbar's w-[92%] max-w-5xl) */}
            <main className="main-layout w-[92%] max-w-5xl px-0 pb-28 flex flex-col lg:flex-row gap-12 lg:gap-10 xl:gap-16 relative z-10">
              
              {/* Sticky Profile Card (Left Sidebar) */}
              <div className="w-full max-w-[320px] mx-auto self-center lg:mx-0 lg:sticky lg:top-[120px] lg:self-start h-fit shrink-0 z-20">
                <ProfileCard />
              </div>

              {/* Scrollable Content (Right Column) */}
              <div className="flex-1 w-full lg:max-w-[640px] min-w-0 flex flex-col gap-24 md:gap-32 lg:gap-[120px] z-10">
              <Hero />
              <Projects />

              <Skills />
              <Blog />
              <Contact />
            </div>

          </main>

          {/* Spacer to guarantee vertical padding/separation between the main layout and footer */}
          <div style={{ height: "100px" }} className="w-full block" />

          {/* Footer placed at the bottom, centered relative to the webpage */}
          <footer 
            style={{ paddingTop: "20px", paddingBottom: "40px" }}
            className="w-full text-[11px] font-sans text-[var(--muted)] select-none relative z-10 text-center whitespace-normal sm:whitespace-nowrap"
          >
            <div className="flex items-center justify-center">
              <p className="tracking-wide">
                &copy; {new Date().getFullYear()} <span className="text-[var(--accent)] font-semibold transition-colors duration-300">Binethma Jayawickrama</span>. All rights reserved.
              </p>
            </div>
          </footer>
         </motion.div>
        </>
      )}
    </div>
  );
}
