"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Cpu, Heart, CheckCircle2 } from "lucide-react";

const taglines = [
  "I build things for the web.",
  "I craft intelligent experiences.",
  "I turn ideas into interfaces.",
  "I engineer the future.",
];

export default function Hero() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Tagline phrase cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap) {
      // 1. Entrance timeline triggers after loading curtain completes (starts around 2.1s)
      const tl = gsap.timeline({ delay: 2.1 });

      // Background mesh fades in
      tl.fromTo(".hero-blob", { opacity: 0, scale: 0.8 }, { opacity: 0.5, scale: 1, duration: 1.0, ease: "power2.out" }, 0);

      // Letters rise with stagger
      tl.fromTo(
        ".name-letter-first",
        { y: 100, opacity: 0, rotate: -8, filter: "blur(8px)" },
        { y: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.05, ease: "power3.out" },
        0.1
      );

      tl.fromTo(
        ".name-letter-last",
        { y: 100, opacity: 0, rotate: 8, filter: "blur(8px)" },
        { y: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.04, ease: "power3.out" },
        0.3
      );

      // Subtitle words stagger
      tl.fromTo(
        ".hero-sub-word",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        0.9
      );

      // Tagline container fades in
      tl.fromTo(
        ".hero-tagline-container",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.3
      );

      // Description fades up
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.8, ease: "power2.out" },
        1.4
      );

      // CTA button entrance
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.1 },
        1.6
      );

      // Right card slides in
      tl.fromTo(
        ".hero-card-visual",
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: "power3.out" },
        1.3
      );

      // 2. Interactive bobbing motion for right card (looping sine)
      gsap.to(".hero-card-visual", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Orbit float paths for the two floating chips
      gsap.to(".orbit-chip-1", {
        y: -8,
        x: 5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-chip-2", {
        y: 8,
        x: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Parallax effect for blobs (move at 0.25x scroll speed)
      if (ScrollTrigger && heroRef.current) {
        gsap.to(".hero-blobs-container", {
          y: () => window.innerHeight * 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Strict 8-degree maximum 3D rotation
    const maxTilt = 8;
    const tiltX = (y / (rect.height / 2)) * -maxTilt;
    const tiltY = (x / (rect.width / 2)) * maxTilt;

    card.style.setProperty("--card-tilt-x", `${tiltX}deg`);
    card.style.setProperty("--card-tilt-y", `${tiltY}deg`);

    // Dynamic reflection tracker coordinates
    const glossX = ((e.clientX - rect.left) / rect.width) * 100;
    const glossY = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--card-gloss-x", `${glossX}%`);
    card.style.setProperty("--card-gloss-y", `${glossY}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--card-tilt-x", "0deg");
    card.style.setProperty("--card-tilt-y", "0deg");
  };

  const nameFirst = "BINETHMA".split("");
  const nameLast = "JAYAWICKRAMA".split("");
  const subtitleWords = "Full-Stack Developer · IoT Innovator · Creative Engineer".split(" ");

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-cream"
    >
      {/* Background Gradient Mesh - parallaxing container */}
      <div className="hero-blobs-container absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Pink Blob */}
        <div className="hero-blob absolute top-[15%] left-[8%] w-96 h-96 rounded-full bg-rose-mid/10 filter blur-[90px] animate-pulse-slow" />
        
        {/* Lavender Blob */}
        <div className="hero-blob absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-lavender-mid/10 filter blur-[110px] animate-pulse-slow" style={{ animationDelay: "-3s" }} />
        
        {/* Mint Blob */}
        <div className="hero-blob absolute top-[30%] right-[25%] w-80 h-80 rounded-full bg-mint-soft/20 filter blur-[80px] animate-pulse-slow" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Text details */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center select-none">
            
            {/* Split Letter Names */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-display font-light uppercase tracking-[0.05em] text-rose-dark leading-[0.95] flex flex-row whitespace-nowrap overflow-hidden justify-center lg:justify-start">
              {nameFirst.map((letter, idx) => (
                <span
                  key={idx}
                  className="name-letter-first inline-block origin-bottom-left will-change-transform opacity-0"
                >
                  {letter}
                </span>
              ))}
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-display font-light italic uppercase tracking-[0.05em] text-rose-deep leading-[0.95] flex flex-row whitespace-nowrap overflow-hidden justify-center lg:justify-start mt-1">
              {nameLast.map((letter, idx) => (
                <span
                  key={idx}
                  className="name-letter-last inline-block origin-bottom-left will-change-transform opacity-0"
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* Staggered subtitle */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-2 text-rose-deep font-sans text-[10px] font-extrabold tracking-[0.25em] uppercase mt-8 mb-4 overflow-hidden">
              {subtitleWords.map((word, idx) => (
                <span
                  key={idx}
                  className="hero-sub-word inline-block opacity-0"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Vertical fip swaps tagline */}
            <div className="hero-tagline-container h-10 md:h-14 overflow-hidden relative mt-6 mb-12 flex justify-center lg:justify-start opacity-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIdx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-rose-dark font-display font-light italic text-2xl sm:text-3xl lg:text-4xl tracking-wide block"
                >
                  {taglines[taglineIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Description Bio */}
            <p className="hero-desc text-slate-600 font-sans text-sm sm:text-base mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light opacity-0">
              Building digital harmony where elegant editorial design meets solid software architecture. Currently studying at IIT Sri Lanka / University of Westminster.
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep to-rose-dark hover:scale-103 active:scale-97 text-white font-semibold shadow-md shadow-rose-deep/15 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer opacity-0"
                data-magnetic="true"
                data-magnetic-speed="0.2"
              >
                <span>Connect with me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent hover:bg-rose-soft/45 border border-rose-deep/20 text-rose-dark font-semibold shadow-3xs hover:shadow-2xs transition-all duration-300 cursor-pointer opacity-0"
                data-magnetic="true"
                data-magnetic-speed="0.15"
              >
                <span>View Projects</span>
              </button>
            </div>
          </div>

          {/* Right Column - Luxury 3D Profile Card & Floating Orbit Chips */}
          <div className="lg:col-span-5 flex justify-center items-center h-[420px] sm:h-[480px]">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] flex justify-center items-center">
              {/* Floating Orbit Chip 1 (Top Left) */}
              <div className="orbit-chip-1 absolute top-[-30px] left-[-35px] z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 border border-rose-soft shadow-sm text-[9px] font-bold text-rose-dark font-sans tracking-widest uppercase select-none whitespace-nowrap">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Available for Internships</span>
                </div>
              </div>

              {/* Floating Orbit Chip 2 (Bottom Right) */}
              <div className="orbit-chip-2 absolute bottom-[-30px] right-[-35px] z-20 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white/90 border border-rose-soft shadow-sm text-[9px] font-bold text-rose-dark font-sans tracking-widest uppercase select-none whitespace-nowrap">
                  <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep/10" />
                  <span>Open to Collaborate</span>
                </div>
              </div>

              {/* Profile Card Container (Bobbing & Tilt) */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hero-card-visual h-[400px] sm:h-[420px] aspect-[4/5] rounded-[32px] bg-white/70 border border-rose-deep/10 backdrop-blur-md p-8 sm:p-10 shadow-lg shadow-rose-deep/5 relative flex flex-col justify-between overflow-hidden cursor-default group opacity-0 select-none"
                style={{
                  transform: "perspective(1000px) rotateX(var(--card-tilt-x, 0deg)) rotateY(var(--card-tilt-y, 0deg))",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.1s ease-out, shadow-box 0.3s ease",
                }}
                data-cursor="crosshair"
              >
              {/* Holographic Gloss highlight overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(circle 220px at var(--card-gloss-x, 50%) var(--card-gloss-y, 50%), rgba(255,255,255,0.45) 0%, transparent 60%)`,
                }}
              />

              {/* Inner glowing lights */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-soft/40 rounded-full blur-xl pointer-events-none z-0" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-lavender-soft/40 rounded-full blur-xl pointer-events-none z-0" />

              {/* Card top */}
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] font-sans font-extrabold tracking-widest text-rose-deep uppercase">Profile</span>
                <Cpu className="w-5 h-5 text-rose-deep animate-pulse" />
              </div>

              {/* Card center content */}
              <div className="my-auto z-10 flex flex-col items-center">
                <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-rose-soft via-lavender-soft to-mint-soft flex items-center justify-center shadow-inner border border-rose-deep/5 mb-4">
                  <span className="font-display font-medium text-xl text-rose-dark italic">BJ</span>
                </div>
                
                <h2 className="font-display text-2xl font-light text-slate-800 text-center tracking-wide">
                  Binethma J.
                </h2>
                <p className="text-[10px] font-sans text-slate-400 font-extrabold tracking-widest uppercase mt-1">
                  IIT Sri Lanka / Westminster
                </p>

                {/* Micro tech metrics code mock */}
                <div className="w-full mt-6 bg-white/30 rounded-xl p-3 border border-rose-deep/5 font-mono text-[8.5px] text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-rose-deep">let</span>
                    <span>focus = <span className="text-lavender-deep">["IoT", "CV", "Web"]</span>;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-rose-deep">const</span>
                    <span>passion = <span className="text-rose-dark">"Interactive Design"</span>;</span>
                  </div>
                </div>
              </div>

              {/* Card bottom details */}
              <div className="flex justify-between items-center border-t border-rose-deep/10 pt-4 z-10 text-[10px] font-sans font-semibold text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-deep" />
                  <span>Colombo, LK</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep/10" />
                  <span>CS Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bouncing Scroll Indicator Arrow */}
      <div
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer select-none group"
      >
        <span className="font-sans text-[9px] font-extrabold tracking-[0.25em] text-rose-deep/60 group-hover:text-rose-deep transition-colors uppercase">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-rose-deep/70 group-hover:text-rose-deep transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  </section>
);
}
