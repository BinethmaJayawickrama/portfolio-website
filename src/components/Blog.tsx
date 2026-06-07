"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface Post {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const articlesData: Post[] = [
  {
    id: 1,
    category: "Web Dev",
    title: "Why I chose Next.js App Router for my e-commerce project",
    excerpt: "Exploring the trade-offs between the Pages Router and App Router, and why server components changed how I think about data fetching.",
    date: "May 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "AI / Computer Vision",
    title: "Building Adorix: What I learned making an AI kiosk from scratch",
    excerpt: "From face detection pipelines to WebSocket streaming — the real challenges behind building a real-time AI retail experience.",
    date: "April 2026",
    readTime: "8 min read",
  },
  {
    id: 3,
    category: "IoT",
    title: "Connecting cows to the cloud: the Smart Tail Pod journey",
    excerpt: "What happens when software meets agriculture. Building wearable IoT sensors for cattle heat detection and what the data actually looks like.",
    date: "March 2026",
    readTime: "6 min read",
  },
];

export default function Blog() {
  const [clickedPostId, setClickedPostId] = useState<number | null>(null);

  useEffect(() => {
    // Reveal blog rows
    gsap.fromTo(
      ".blog-row-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-section-trigger",
          start: "top 80%",
        },
      }
    );
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
      className="py-8 bg-transparent text-[var(--dark)] select-none"
    >
      <div className="w-full space-y-12 blog-section-trigger">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase">
            MY
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-[5.4rem] tracking-tight leading-[0.95] uppercase text-transparent" style={{ WebkitTextStroke: "1.5px var(--dark)" }}>
            BLOGS
          </h2>
        </div>

        {/* Blogs List Rows */}
        <div className="flex flex-col w-full border-t border-[var(--border)] mt-8">
          {articlesData.map((post) => (
            <div
              key={post.id}
              onClick={() => handleCardClick(post.id)}
              className="blog-row-item py-6 border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 hover:bg-[var(--surface)]/20 transition-all duration-300 px-2 sm:px-4 group cursor-pointer relative overflow-hidden"
              data-cursor="link"
            >
              {/* Coming Soon absolute overlay */}
              <AnimatePresence>
                {clickedPostId === post.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[var(--surface)]/95 dark:bg-[#0c0e12]/95 z-20 flex flex-col items-center justify-center text-[var(--dark)]"
                  >
                    <span className="font-display font-semibold italic text-xl text-[var(--accent)]">Coming Soon</span>
                    <span className="text-[8px] font-sans font-extrabold tracking-[0.25em] uppercase mt-1 text-[var(--dark)]">
                      Article Under Construction
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Left Side: Arrow and Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:rotate-45 transition-all duration-300 shrink-0 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                
                <div className="flex-1 min-w-0 text-left space-y-1">
                  <span className="text-[9px] font-sans font-extrabold tracking-widest text-[var(--muted)] uppercase leading-none">
                    {post.category}
                  </span>
                  <h3 className="font-display font-semibold text-lg sm:text-xl italic text-[var(--dark)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-sans font-light text-[var(--muted)] dark:text-[var(--muted-light)] leading-relaxed line-clamp-2 pt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Right Side: Date & Read Time */}
              <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-1.5 shrink-0 pl-12 md:pl-0 text-[10px] font-sans font-semibold text-[var(--muted)] dark:text-[var(--muted-light)] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{post.readTime}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
