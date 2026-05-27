"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center max-w-4xl z-10"
      >
        {/* Logo Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative w-16 h-16 rounded-full bg-white/80 border border-slate-500/10 flex items-center justify-center font-display font-bold text-lg text-slate-800 shadow-sm backdrop-blur">
              <span className="bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent">
                BJ
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating Tag */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-800 text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Available for Internships & Projects</span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
            Binethma Jayawickrama
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-slate-600 mb-8 max-w-2xl mx-auto"
        >
          Computer Science Undergraduate{" "}
          <span className="text-teal-400">|</span> Web Developer
        </motion.p>

        {/* Short Bio Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-slate-500 text-sm sm:text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Crafting high-performance systems and interactive web experiences.
          Currently studying at the University of Westminster.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-semibold shadow-md shadow-sky-500/10 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            data-hover="true"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/70 hover:bg-white/90 border border-slate-500/10 text-slate-700 hover:text-slate-900 font-semibold backdrop-blur shadow-sm hover:shadow transition-all duration-300"
            data-hover="true"
          >
            <span>View Projects</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none text-slate-400 hidden sm:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scroll</span>
        <div className="w-5.5 h-8.5 rounded-full border border-slate-300 flex justify-center p-1.5 bg-white/30 backdrop-blur-xs">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-teal-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-sky-200/20 blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-teal-200/20 blur-[80px] pointer-events-none -z-10 animate-float" />
    </section>
  );
}
