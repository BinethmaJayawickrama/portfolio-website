"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import CanvasBackground from "@/components/CanvasBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Interactive Canvas Particle Grid */}
      <CanvasBackground />

      {/* Premium Spring Dual Cursor */}
      <CustomCursor />

      {/* Floating Bottom Nav Dock */}
      <Navbar />

      {/* Content Layout sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 bg-white/45 border-t border-slate-500/5 text-center backdrop-blur-sm pb-24">
        <div className="container mx-auto px-6">
          <p className="text-xs sm:text-sm text-slate-400">
            &copy; {new Date().getFullYear()} BINETHMA.J. Built with Next.js, React, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
