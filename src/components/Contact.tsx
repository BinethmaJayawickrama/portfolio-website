"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, Loader2, Phone, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", budget: "<$3k", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- CANVAS PARTICLE FIELD CONSTELLATION ---
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
    const count = window.innerWidth < 768 ? 25 : 50;
    const connectionDistance = 90;

    for (let i = 0; i < count; i++) {
      const isAlt = Math.random() > 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 1.2,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        color: isAlt ? "244, 108, 56" : "197, 255, 65",
        alpha: Math.random() * 0.25 + 0.15,
      });
    }

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

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(244, 108, 56, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 80;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 2.2;
          p.y -= Math.sin(angle) * force * 2.2;
        } else {
          p.x += p.speedX;
          p.y += p.speedY;
        }

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
    gsap.fromTo(
      ".contact-reveal-element",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", budget: "<$3k", message: "" });
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full contact-trigger">
      <section
        id="contact"
        className="py-8 relative overflow-hidden bg-transparent text-[var(--dark)] select-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

        <div className="w-full space-y-12">
          
          {/* Section Heading */}
          <div className="contact-reveal-element flex flex-col items-start gap-1">
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase">
              LET'S WORK
            </h2>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase text-transparent" style={{ WebkitTextStroke: "1.5px var(--dark)" }}>
              TOGETHER
            </h2>
          </div>

          {/* Embedded Contact Form */}
          <div className="contact-reveal-element w-full mt-8 relative z-10 text-left">
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 max-w-2xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="block text-[10px] font-sans font-extrabold text-[var(--muted)] tracking-wider uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-5 py-4 rounded-[12px] border border-[var(--border)] focus:border-[var(--accent)] bg-[var(--white)]/40 dark:bg-[var(--white)]/5 text-[var(--dark)] placeholder-[var(--muted)]/50 text-[13px] font-sans focus:outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block text-[10px] font-sans font-extrabold text-[var(--muted)] tracking-wider uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Your Email"
                        className="w-full px-5 py-4 rounded-[12px] border border-[var(--border)] focus:border-[var(--accent)] bg-[var(--white)]/40 dark:bg-[var(--white)]/5 text-[var(--dark)] placeholder-[var(--muted)]/50 text-[13px] font-sans focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label htmlFor="form-budget" className="block text-[10px] font-sans font-extrabold text-[var(--muted)] tracking-wider uppercase">
                      Budget
                    </label>
                    <select
                      id="form-budget"
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full px-5 py-4 rounded-[12px] border border-[var(--border)] focus:border-[var(--accent)] bg-[var(--white)]/40 dark:bg-[var(--white)]/5 text-[var(--dark)] text-[13px] font-sans focus:outline-none transition-all duration-300"
                    >
                      <option value="<$3k">&lt;$3k</option>
                      <option value="$3k - $5k">$3k - $5k</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value=">$10k">&gt;$10k</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="block text-[10px] font-sans font-extrabold text-[var(--muted)] tracking-wider uppercase">
                      Message
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Message"
                      className="w-full px-5 py-4 rounded-[12px] border border-[var(--border)] focus:border-[var(--accent)] bg-[var(--white)]/40 dark:bg-[var(--white)]/5 text-[var(--dark)] placeholder-[var(--muted)]/50 text-[13px] font-sans focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4.5 rounded-xl bg-[var(--dark)] hover:bg-[var(--accent)] text-[var(--bg)] font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer disabled:opacity-50"
                      data-hover="true"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Submit</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="py-12 flex flex-col items-start gap-4 max-w-md"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="font-display text-2xl font-light italic text-[var(--dark)] select-none">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-[var(--muted)] dark:text-[var(--muted-light)] font-light text-[13px] leading-relaxed">
                    Thank you for reaching out. Binethma will get back to you shortly to discuss your project.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Details Row */}
          <div className="contact-reveal-element border-t border-[var(--border)] pt-10 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-extrabold text-[var(--muted)] uppercase tracking-wider">Phone</span>
              <p className="text-xs font-sans font-semibold text-[var(--dark)] select-all leading-none">+94 70 113 1651</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-extrabold text-[var(--muted)] uppercase tracking-wider">Email</span>
              <a href="mailto:binethmad@gmail.com" className="text-xs font-sans font-semibold text-[var(--dark)] hover:text-[var(--accent)] transition-colors leading-none">binethmad@gmail.com</a>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-extrabold text-[var(--muted)] uppercase tracking-wider">Location</span>
              <p className="text-xs font-sans font-semibold text-[var(--dark)] leading-none">Sri Lanka</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-extrabold text-[var(--muted)] uppercase tracking-wider">Availability</span>
              <p className="text-xs font-sans font-semibold text-[var(--dark)] leading-none">Open for Internships</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer (Aligned inside the grids) */}
      <footer className="py-8 border-t border-[var(--border)] text-[11px] font-sans text-[var(--muted)] select-none relative z-10 text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--muted)] px-2">
          <div>
            &copy; {new Date().getFullYear()} Binethma Jayawickrama. All rights reserved.
          </div>
          
          <div className="font-display font-light italic tracking-widest text-sm text-[var(--accent-deep)] dark:text-white select-none">
            B · J
          </div>

          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <span className="text-[var(--accent)] font-bold">♡</span>
            <span>inspired by Sawad</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
