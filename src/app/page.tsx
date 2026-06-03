"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import MagneticCursor from "@/components/MagneticCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll with Awwwards options
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
    });

    const gsap = (window as any).gsap;
    let tickerCallback: any;

    if (gsap) {
      // Connect Lenis to GSAP ticker for ultra-smooth rendering
      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
    } else {
      // Fallback requestAnimationFrame loop
      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    return () => {
      if (gsap && tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      lenis.destroy();
    };
  }, []);

  // Listen for scroll depth to update progress line
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. Loading Curtain Reveal Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen"
        >
          {/* 2. Magnetic Spring physics Cursor */}
          <MagneticCursor />

          {/* 3. Navigation Header Bar */}
          <Navbar />

          {/* 4. Left Scroll Progress Bar (3px rose line) */}
          <div className="fixed left-0 top-0 bottom-0 w-[3px] bg-rose-soft/30 z-40 pointer-events-none">
            <div
              className="w-full bg-rose-deep origin-top"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* 5. Left Vertical Social Dock */}
          <div className="fixed left-6 bottom-0 z-30 hidden xl:flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-col gap-5 text-muted/80 text-sm"
            >
              <a
                href="https://github.com/ADORIX000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-deep hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                title="GitHub"
                data-magnetic="true"
                data-magnetic-speed="0.2"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/binethma-jayawickrama"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-deep hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                title="LinkedIn"
                data-magnetic="true"
                data-magnetic-speed="0.2"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:binethmad@gmail.com"
                className="hover:text-rose-deep hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                title="Email"
                data-magnetic="true"
                data-magnetic-speed="0.2"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 96 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="w-[1px] bg-rose-deep/20"
            />
          </div>

          {/* 6. Right Vertical Email Dock */}
          <div className="fixed right-6 bottom-0 z-30 hidden xl:flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="hover:text-rose-deep hover:-translate-y-1 transition-all duration-300"
            >
              <a
                href="mailto:binethmad@gmail.com"
                className="font-mono text-[9px] font-semibold tracking-[0.25em] text-muted/80 hover:text-rose-deep uppercase cursor-pointer"
                style={{ writingMode: "vertical-rl" }}
                data-magnetic="true"
                data-magnetic-speed="0.15"
              >
                binethmad@gmail.com
              </a>
            </motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 96 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="w-[1px] bg-rose-deep/20"
            />
          </div>

          {/* 7. Page layout sections */}
          <main className="relative z-10 w-full overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Blog />
            <Education />
            <Contact />
          </main>

          {/* 8. Minimal editorial footer */}
          <footer className="py-8 bg-charcoal text-center border-t border-rose-ink/10 text-[9px] font-sans font-extrabold tracking-widest text-slate-400 uppercase select-none">
            &copy; {new Date().getFullYear()} Binethma Jayawickrama · Built with Next.js & Framer Motion
          </footer>
        </motion.div>
      )}
    </div>
  );
}
