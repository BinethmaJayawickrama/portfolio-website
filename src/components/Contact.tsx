"use client";

import React, { useState } from "react";
import { Mail, Phone, Linkedin, MapPin, Copy, Check, Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-36 relative overflow-hidden bg-slate-50/50">
      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Have a question, an opportunity, or want to discuss a project? Feel free to reach out.
          </p>
          <div className="w-12 h-1.5 bg-gradient-to-r from-sky-500 to-teal-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Form and Coordinates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Coordinates (Left Side) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-500/10 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/15">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-slate-400 block">EMAIL ME</span>
                      <span className="text-sm sm:text-base font-medium text-slate-700 truncate block">
                        binethmad@gmail.com
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy("binethmad@gmail.com", "email")}
                      className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-all focus:outline-none shrink-0"
                      data-hover="true"
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-500 animate-scale-up" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 border border-teal-500/15">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-slate-400 block">CALL ME</span>
                      <span className="text-sm sm:text-base font-medium text-slate-700 truncate block">
                        +94 70 113 1651
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy("+94701131651", "phone")}
                      className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-all focus:outline-none shrink-0"
                      data-hover="true"
                      title="Copy phone number"
                      aria-label="Copy phone number"
                    >
                      {copiedPhone ? (
                        <Check className="w-4 h-4 text-emerald-500 animate-scale-up" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/binethma-jayawickrama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group hover:bg-slate-50/50 p-1.5 -mx-1.5 rounded-2xl transition-colors"
                    data-hover="true"
                  >
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/15 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-slate-400 block">LINKEDIN</span>
                      <span className="text-sm sm:text-base font-medium text-slate-700 truncate block group-hover:text-blue-600 transition-colors">
                        Binethma Jayawickrama
                      </span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/15">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 block">LOCATION</span>
                      <span className="text-sm sm:text-base font-medium text-slate-700 block">
                        London, UK / Sri Lanka
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monogram stamp */}
              <div className="border-t border-slate-100 pt-6 mt-8 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold uppercase">Portfolio Brand</span>
                <span className="text-sm font-display font-extrabold tracking-wider bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent">
                  BINETHMA.J
                </span>
              </div>
            </div>
          </div>

          {/* Form Panel (Right Side) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-500/10 shadow-sm h-full flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 bg-white/50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 bg-white/50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Hello, I'd like to talk about..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 bg-white/50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-semibold shadow-md shadow-sky-500/10 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                      data-hover="true"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-800">
                      Message Sent!
                    </h4>
                    <p className="text-slate-500 max-w-sm mx-auto text-sm">
                      Thank you for reaching out. Binethma will get back to you shortly at the email address provided.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
