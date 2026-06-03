"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Post {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  gradient: string;
  emoji: string;
}

const articles: Post[] = [
  {
    id: 1,
    category: "Web Dev",
    title: "Why I chose Next.js App Router for my e-commerce project",
    excerpt: "Exploring the trade-offs between the Pages Router and App Router, and why server components changed how I think about data fetching.",
    date: "May 2026",
    readTime: "5 min read",
    gradient: "from-rose-lightest to-rose-soft",
    emoji: "🚀",
  },
  {
    id: 2,
    category: "AI / Computer Vision",
    title: "Building Adorix: What I learned making an AI kiosk from scratch",
    excerpt: "From face detection pipelines to WebSocket streaming — the real challenges behind building a real-time AI retail experience.",
    date: "April 2026",
    readTime: "8 min read",
    gradient: "from-lavender-soft to-lavender-mid/40",
    emoji: "🤖",
  },
  {
    id: 3,
    category: "IoT",
    title: "Connecting cows to the cloud: the Smart Tail Pod journey",
    excerpt: "What happens when software meets agriculture. Building wearable IoT sensors for cattle heat detection and what the data actually looks like.",
    date: "March 2026",
    readTime: "6 min read",
    gradient: "from-mint-soft to-mint-mid/20",
    emoji: "🐄",
  },
];

export default function Blog() {
  const [clickedPostId, setClickedPostId] = useState<number | null>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      // 1. Heading Mask Reveal
      gsap.fromTo(
        ".blog-reveal-line span",
        { y: "100%" },
        {
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-heading-trigger",
            start: "top 80%",
          },
        }
      );

      // 2. Staggered Card Entrance
      gsap.fromTo(
        ".blog-card-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-cards-trigger",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleCardClick = (id: number) => {
    setClickedPostId(id);
    setTimeout(() => {
      setClickedPostId(null);
    }, 2000);
  };

  return (
    <section
      id="blog"
      className="py-20 relative overflow-hidden bg-lavender-soft text-slate-800 border-t border-rose-deep/5"
    >
      {/* Background visual lighting blobs */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-rose-soft/25 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-mint-soft/30 rounded-full filter blur-[110px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Header */}
        <div className="blog-heading-trigger text-center mb-16 space-y-4">
          <span className="text-2xs font-sans font-extrabold tracking-widest text-rose-deep uppercase">Technical Writing</span>
          <div className="overflow-hidden blog-reveal-line h-12 sm:h-14 flex justify-center">
            <span className="font-display font-light italic text-4xl sm:text-5xl text-rose-dark leading-none block select-none">
              From the Blog
            </span>
          </div>
          <p className="text-slate-505 max-w-md mx-auto text-xs sm:text-sm font-light">
            Thoughts on tech, building, and the creative process.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="blog-cards-trigger grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((post) => (
            <div
              key={post.id}
              onClick={() => handleCardClick(post.id)}
              className="blog-card-item bg-white p-6 rounded-[28px] cursor-pointer flex flex-col justify-between group border border-rose-deep/5 shadow-3xs hover:shadow-2xs hover:-translate-y-2 transition-all duration-400 relative overflow-hidden h-[460px]"
              data-hover="true"
            >
              {/* Coming Soon absolute overlay */}
              <AnimatePresence>
                {clickedPostId === post.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-charcoal/95 z-20 flex flex-col items-center justify-center text-white"
                  >
                    <span className="font-display font-light italic text-xl text-rose-soft">Coming Soon</span>
                    <span className="text-[8px] font-sans font-extrabold tracking-[0.25em] uppercase mt-2 text-slate-400">
                      Under Construction
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Contents */}
              <div>
                {/* Visual Thumbnail Area */}
                <div className="w-full h-[180px] rounded-2xl overflow-hidden relative mb-5">
                  <div className={`w-full h-full bg-gradient-to-tr ${post.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                    <span className="text-5xl transform group-hover:rotate-12 transition-transform animate-float select-none">
                      {post.emoji}
                    </span>
                  </div>
                </div>

                {/* Category Pill */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="inline-flex px-3 py-1 rounded-full bg-rose-soft/40 border border-rose-deep/10 text-rose-dark text-[9px] font-extrabold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-light text-slate-800 italic leading-snug tracking-wide group-hover:text-rose-deep transition-colors mb-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Metadata row */}
              <div className="flex items-center justify-between border-t border-rose-deep/5 pt-4 mt-4">
                <div className="flex items-center gap-3 text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-deep" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-deep" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Avatar tag */}
                <div className="w-8 h-8 rounded-full bg-rose-soft/50 border border-rose-deep/10 flex items-center justify-center shadow-inner">
                  <span className="font-display font-medium text-2xs text-rose-dark italic">BJ</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Read All posts link button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => handleCardClick(99)}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-rose-dark hover:text-rose-deep transition-colors group cursor-pointer"
            data-magnetic="true"
            data-magnetic-speed="0.2"
          >
            <span>Read all posts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
