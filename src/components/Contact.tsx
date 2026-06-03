"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Copy, Check, Send, CheckCircle2, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- CANVAS PARTICLE FIELD WITH MOUSE REPULSION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    // Mobile: 30 dots, Desktop: 70 dots
    const count = window.innerWidth < 768 ? 30 : 70;

    for (let i = 0; i < count; i++) {
      const isRose = Math.random() > 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 1.5, // 2-3px dots
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: isRose ? "74, 128, 176" : "199, 220, 240", // steel-blue accent or steel-mid
        alpha: Math.random() * 0.3 + 0.3, // opacity 0.3-0.6
      });
    }

    // Keep track of mouse position in canvas coordinates
    let mouse = { x: -1000, y: -1000 };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleCanvasMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = containerRef.current;
    if (parent) {
      parent.addEventListener("mousemove", handleCanvasMouseMove);
      parent.addEventListener("mouseleave", handleCanvasMouseLeave);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Calculate repulsion force
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 80; // repulsion radius

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          // Push away from mouse
          p.x -= Math.cos(angle) * force * 2.5;
          p.y -= Math.sin(angle) * force * 2.5;
        } else {
          // Normal slow drift
          p.x += p.speedX;
          p.y += p.speedY;
        }

        // Circular loop boundary wraps
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleCanvasMouseMove);
        parent.removeEventListener("mouseleave", handleCanvasMouseLeave);
      }
    };
  }, []);

  // --- SCROLL REVEALS ---
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      // Eyebrow and heading reveals
      gsap.fromTo(
        ".contact-reveal-line span",
        { y: "100%" },
        {
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading-trigger",
            start: "top 80%",
          },
        }
      );

      // Email typewriter reveal
      gsap.fromTo(
        ".contact-email-char",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.04,
          scrollTrigger: {
            trigger: ".contact-email-link",
            start: "top 85%",
          },
        }
      );

      // Muted fade ups
      gsap.fromTo(
        ".contact-fade-up",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-heading-trigger",
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 750);

    // Open Contact Form Modal after click delay
    setTimeout(() => {
      setFormModalOpen(true);
    }, 150);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => {
        setIsSent(false);
        setFormModalOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full">
      <section id="contact" className="py-24 relative overflow-hidden bg-charcoal text-white">
        {/* Background canvas particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />

        {/* Subtle lighting meshes */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-dark/15 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-lavender-deep/10 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl z-10 relative text-center">
          
          {/* Eyebrow & Giant Heading reveals */}
          <div className="contact-heading-trigger space-y-4 mb-8">
            <div className="overflow-hidden contact-reveal-line h-6 flex justify-center">
              <span className="text-rose-mid text-2xs font-sans font-extrabold tracking-widest uppercase block">
                Say Hello
              </span>
            </div>
            
            <div className="overflow-hidden contact-reveal-line h-12 sm:h-14 md:h-16 flex justify-center">
              <span className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-white leading-none block select-none">
                Let's create something
              </span>
            </div>
            <div className="overflow-hidden contact-reveal-line h-12 sm:h-14 md:h-16 flex justify-center">
              <span className="font-display font-light italic text-4xl sm:text-5xl md:text-6xl text-rose-mid leading-none block select-none">
                extraordinary
              </span>
            </div>
          </div>

          {/* Subtitle description */}
          <p className="contact-fade-up text-slate-400 font-sans text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed mb-12 opacity-0">
            Have an internship role, hardware system project, or custom web design challenge? I'd love to connect and bring it to life.
          </p>

          {/* Typewriter Email Link */}
          <div className="contact-fade-up inline-block mb-12 opacity-0">
            <a 
              href="mailto:binethmad@gmail.com"
              className="contact-email-link group font-display text-2xl sm:text-4xl md:text-[2.2rem] italic text-rose-soft select-all hover:text-white transition-colors relative pb-1 block"
              data-hover="true"
            >
              {"binethmad@gmail.com".split("").map((char, idx) => (
                <span
                  key={idx}
                  className="contact-email-char opacity-0 inline-block"
                >
                  {char}
                </span>
              ))}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-mid transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Contact Coordinates Row */}
          <div className="contact-fade-up flex flex-wrap justify-center gap-6 sm:gap-10 text-xs font-sans font-extrabold text-slate-400 tracking-wider uppercase mb-16 opacity-0">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-mid" />
              <span className="select-all hover:text-white transition-colors">+94 70 113 1651</span>
            </div>
            
            <a
              href="https://www.linkedin.com/in/binethma-jayawickrama"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
              data-hover="true"
            >
              <Linkedin className="w-3.5 h-3.5 text-rose-mid" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/ADORIX000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
              data-hover="true"
            >
              <Github className="w-3.5 h-3.5 text-rose-mid" />
              <span>GitHub</span>
            </a>

            <div className="flex items-center gap-2 select-none">
              <MapPin className="w-3.5 h-3.5 text-rose-mid" />
              <span>Sri Lanka</span>
            </div>
          </div>

          {/* Border-Tracing CTA Button with Click Ripple */}
          <div className="contact-fade-up flex justify-center opacity-0">
            <button
              onClick={handleButtonClick}
              className="px-10 py-5 rounded-xl bg-gradient-to-r from-rose-deep to-rose-dark hover:scale-103 active:scale-97 text-white font-semibold shadow-md shadow-rose-deep/5 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer relative overflow-hidden"
              data-hover="true"
            >
              {/* Border Tracing SVG overlay on hover */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl z-20">
                <rect 
                  className="w-full h-full fill-none stroke-white stroke-2 transition-all duration-700 [stroke-dasharray:500] [stroke-dashoffset:500] group-hover:[stroke-dashoffset:0]"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="12"
                />
              </svg>

              {/* Click Ripple renders here */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="animate-ripple"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: "80px",
                    height: "80px",
                  }}
                />
              ))}

              <span>Start a Conversation</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

        </div>
      </section>

      {/* Integrated Footer bottom bar */}
      <footer className="py-8 bg-charcoal border-t border-rose-ink/15 text-[11px] font-sans text-muted/65 select-none relative z-10">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Binethma Jayawickrama
          </div>
          
          <div className="font-display font-light italic tracking-widest text-sm text-rose-soft">
            B · J
          </div>

          <div className="flex items-center gap-1.5">
            <span>Designed & Developed with</span>
            {/* Heart pulses elastically on hover */}
            <motion.span
              whileHover={{ scale: [1, 1.4, 1.1, 1.4, 1.2, 1], color: "#c97a9a" }}
              transition={{ duration: 0.8 }}
              className="inline-block cursor-pointer font-bold select-none text-muted"
            >
              ♡
            </motion.span>
          </div>
        </div>
      </footer>

      {/* Modal Contact Form Form */}
      <AnimatePresence>
        {formModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isSubmitting) setFormModalOpen(false);
              }}
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-md bg-charcoal-mid/95 border border-rose-deep/15 p-8 rounded-[32px] shadow-2xl z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setFormModalOpen(false)}
                disabled={isSubmitting}
                className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                data-hover="true"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="modal-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-[10px] font-sans font-extrabold text-rose-mid/70 tracking-widest uppercase block mb-1">
                        Get In Touch
                      </span>
                      <h4 className="font-display text-xl font-light italic text-white mb-4">
                        Send a Message
                      </h4>
                    </div>

                    <div>
                      <label htmlFor="modal-name" className="block text-[9px] font-sans font-extrabold text-slate-400 tracking-wider uppercase mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="modal-name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4.5 py-3 rounded-xl border border-white/10 focus:border-rose-deep focus:ring-1 focus:ring-rose-deep/20 bg-white/5 text-white placeholder-slate-600 text-xs focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-email" className="block text-[9px] font-sans font-extrabold text-slate-400 tracking-wider uppercase mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4.5 py-3 rounded-xl border border-white/10 focus:border-rose-deep focus:ring-1 focus:ring-rose-deep/20 bg-white/5 text-white placeholder-slate-600 text-xs focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-message" className="block text-[9px] font-sans font-extrabold text-slate-400 tracking-wider uppercase mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="modal-message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Hello, I'd like to talk about..."
                        className="w-full px-4.5 py-3 rounded-xl border border-white/10 focus:border-rose-deep focus:ring-1 focus:ring-rose-deep/20 bg-white/5 text-white placeholder-slate-600 text-xs focus:outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-deep to-rose-dark hover:from-rose-dark hover:to-rose-deep text-white text-xs font-semibold shadow-md shadow-rose-deep/5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                      data-hover="true"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="modal-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-14 h-14 text-emerald-400 animate-bounce" />
                    </div>
                    <h4 className="font-display text-xl font-light text-rose-soft italic select-none">
                      Message Sent!
                    </h4>
                    <p className="text-slate-400 font-light max-w-xs mx-auto text-xs">
                      Thank you for reaching out. Binethma will get back to you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
