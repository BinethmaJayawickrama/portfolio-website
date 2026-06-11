"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Loader2, Phone, Mail, MapPin, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // --- SCROLL REVEALS ---
  useEffect(() => {
    const targets = document.querySelectorAll(".contact-reveal-element");
    if (targets.length === 0) return;

    gsap.fromTo(
      targets,
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
    if (!formState.name || !formState.email || !formState.subject || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative z-10 w-full contact-trigger bg-transparent min-h-screen flex flex-col justify-center">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <section id="contact" className="py-12 sm:py-24 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-0 text-[var(--dark)]">
        
        <div className="flex flex-col items-center justify-center gap-16">
          
          {/* TOP: Typography */}
          <div className="contact-reveal-element flex flex-col items-start justify-start gap-0 text-left w-full">
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-[7rem] tracking-tight leading-[0.85] uppercase">
              LET'S
            </h2>
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-[7rem] tracking-tight leading-[0.85] uppercase text-transparent" style={{ WebkitTextStroke: "2px var(--dark)" }}>
              WORK
            </h2>
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-[7rem] tracking-tight leading-[0.85] uppercase">
              TOGETHER
            </h2>
          </div>

          {/* MIDDLE: Premium Form Card */}
          <div className="contact-reveal-element w-full max-w-6xl mx-auto">
            <div className="w-full relative overflow-hidden group/card px-0 py-2">
              
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!isSent ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6 w-full"
                    >
                      {/* Name and Email Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Name */}
                        <div className="flex flex-col-reverse gap-1.5 w-full text-left">
                          <input
                            type="text"
                            id="form-name"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Your Name"
                            className="peer w-full rounded-xl border-none bg-[#333] hover:bg-[#383838] text-[#ddd] placeholder:text-[#888] text-[15px] focus:outline-none focus:bg-[#404040] focus:ring-1 focus:ring-[#f46c38] transition-all duration-300"
                            style={{ padding: "20px 24px" }}
                          />
                          <label htmlFor="form-name" className="text-[13px] font-medium text-[#999] peer-focus:text-[#f46c38] transition-colors duration-300">
                            Name
                          </label>
                        </div>
 
                        {/* Email */}
                        <div className="flex flex-col-reverse gap-1.5 w-full text-left">
                          <input
                            type="email"
                            id="form-email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="Your@email.com"
                            className="peer w-full rounded-xl border-none bg-[#333] hover:bg-[#383838] text-[#ddd] placeholder:text-[#888] text-[15px] focus:outline-none focus:bg-[#404040] focus:ring-1 focus:ring-[#f46c38] transition-all duration-300"
                            style={{ padding: "20px 24px" }}
                          />
                          <label htmlFor="form-email" className="text-[13px] font-medium text-[#999] peer-focus:text-[#f46c38] transition-colors duration-300">
                            Email
                          </label>
                        </div>
                      </div>
 
                      {/* Subject */}
                      <div className="flex flex-col-reverse gap-1.5 w-full text-left">
                        <input
                          type="text"
                          id="form-subject"
                          required
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          placeholder="Write the subject"
                          className="peer w-full rounded-xl border-none bg-[#333] hover:bg-[#383838] text-[#ddd] placeholder:text-[#888] text-[15px] focus:outline-none focus:bg-[#404040] focus:ring-1 focus:ring-[#f46c38] transition-all duration-300"
                          style={{ padding: "20px 24px" }}
                        />
                        <label htmlFor="form-subject" className="text-[13px] font-medium text-[#999] peer-focus:text-[#f46c38] transition-colors duration-300">
                          Subject
                        </label>
                      </div>
 
                      {/* Message */}
                      <div className="flex flex-col-reverse gap-1.5 w-full text-left">
                        <textarea
                          id="form-message"
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Message"
                          className="peer w-full rounded-xl border-none bg-[#333] hover:bg-[#383838] text-[#ddd] placeholder:text-[#888] text-[15px] focus:outline-none focus:bg-[#404040] focus:ring-1 focus:ring-[#f46c38] transition-all duration-300 resize-none"
                          style={{ padding: "20px 24px" }}
                        />
                        <label htmlFor="form-message" className="text-[13px] font-medium text-[#999] peer-focus:text-[#f46c38] transition-colors duration-300">
                          Message
                        </label>
                      </div>
 
                      {/* Submit Button */}
                      <div className="pt-2 flex w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-[#f46c38] hover:bg-[#e05b2a] text-white font-semibold text-[15px] transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
                          style={{ padding: "20px 24px" }}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Sending...</span>
                            </div>
                          ) : (
                            <span>Submit</span>
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
                      className="py-16 flex flex-col items-center justify-center gap-6 text-center w-full"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-10 h-10 animate-bounce" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display text-3xl font-bold text-[var(--dark)]">
                          Message Sent!
                        </h4>
                        <p className="text-[var(--muted)] font-light text-[15px] leading-relaxed max-w-xs mx-auto">
                          Thank you for reaching out. I'll get back to you shortly to discuss your project.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* BOTTOM: Contact Details Row */}
          <div className="contact-reveal-element w-full pt-10 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--dark)]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] font-extrabold text-[var(--muted)] uppercase tracking-wider mb-0.5">Email</span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--dark)]">binethmad@gmail.com</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--dark)]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] font-extrabold text-[var(--muted)] uppercase tracking-wider mb-0.5">Phone</span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--dark)]">+94 70 113 1651</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--dark)]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] font-extrabold text-[var(--muted)] uppercase tracking-wider mb-0.5">Location</span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--dark)]">Sri Lanka</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--dark)]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] font-extrabold text-[var(--muted)] uppercase tracking-wider mb-0.5">Availability</span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--dark)]">Internships</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-[var(--border)] text-[11px] font-sans text-[var(--muted)] select-none relative z-10 max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
