"use client";

import { useEffect, useRef } from "react";

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  badge?: string;
  badgeStyle?: string;
}

const educationData: TimelineItem[] = [
  {
    year: "2024 – Present",
    title: "BSc (Hons) Computer Science",
    institution: "IIT Sri Lanka · University of Westminster, London",
    badge: "Currently Enrolled",
    badgeStyle: "bg-mint-soft border-mint-mid/20 text-emerald-800",
  },
  {
    year: "2023",
    title: "G.C.E. Advanced Level",
    institution: "Kalutara Balika Vidyalaya",
  },
  {
    year: "2020",
    title: "G.C.E. Ordinary Level",
    institution: "Ananda Balika Vidyalaya, Colombo 10",
  },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      // 1. Heading Mask Reveal
      gsap.fromTo(
        ".edu-reveal-line span",
        { y: "100%" },
        {
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-heading-trigger",
            start: "top 80%",
          },
        }
      );

      // 2. Timeline Vertical Track Drawing (height 0% to 100%)
      gsap.fromTo(
        ".edu-timeline-line-fill",
        { height: 0 },
        {
          height: "100%",
          duration: 1.6,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".edu-timeline-trigger",
            start: "top 75%",
          },
        }
      );

      // 3. Staggered node fade/slides synchronised with track line drawing
      const items = gsap.utils.toArray(".edu-timeline-node");
      items.forEach((item: any, idx: number) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: idx * 0.45, // syncs with track drawing depth
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".edu-timeline-trigger",
              start: "top 70%",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="education"
      className="py-20 relative overflow-hidden bg-white text-slate-800"
    >
      {/* Background Soft mesh blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-rose-soft/20 rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-lavender-soft/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Watermark and Section Heading */}
          <div className="lg:col-span-5 relative lg:h-[360px] flex flex-col justify-center">
            {/* Watermark "03" */}
            <div className="absolute left-0 top-0 lg:-top-6 font-display text-[15rem] lg:text-[18rem] font-light italic text-rose-soft/50 pointer-events-none select-none z-0">
              03
            </div>

            <div className="edu-heading-trigger space-y-3 z-10 relative mt-20 lg:mt-0">
              <span className="text-2xs font-sans font-extrabold tracking-widest text-rose-deep uppercase">Academic Milestones</span>
              <div className="overflow-hidden edu-reveal-line h-12 sm:h-14">
                <span className="font-display font-light italic text-4xl sm:text-5xl text-rose-dark leading-none block select-none">
                  Education Path
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-light max-w-xs">
                Timeline detailing my degree progression, Advanced Level scientific disciplines, and secondary schooling milestones.
              </p>
            </div>
          </div>

          {/* Right Column: Center Vertical Timeline */}
          <div className="lg:col-span-7 edu-timeline-trigger pt-6 pl-4 lg:pl-12">
            <div className="relative border-l border-rose-deep/10 pl-8 ml-3.5 space-y-8 min-h-[300px]">
              
              {/* Animated Line Fill Overlay */}
              <div className="absolute left-[-1.5px] top-0 w-[2px] bg-rose-deep pointer-events-none rounded-full edu-timeline-line-fill h-0" />

              {educationData.map((item, idx) => (
                <div key={idx} className="edu-timeline-node relative opacity-0">
                  
                  {/* Node Circle (14px, white center, rose ring halo) */}
                  <div className="absolute -left-[45px] top-[22px] w-[14px] h-[14px] rounded-full bg-white border-2 border-rose-deep z-10 flex items-center justify-center">
                    <div className="absolute inset-[-4px] rounded-full border border-rose-deep/30 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-deep" />
                  </div>

                  {/* Timeline content card */}
                  <div className="bg-sand/40 border border-rose-deep/5 hover:border-rose-deep/15 p-6 rounded-[24px] shadow-3xs hover:shadow-2xs hover:bg-sand/65 transition-all duration-400 select-none">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-rose-soft/60 border border-rose-deep/5 text-[9px] font-extrabold text-rose-dark">
                        {item.year}
                      </span>
                      {item.badge && (
                        <span className={`inline-flex px-2 py-0.5 rounded-full border text-[8px] font-extrabold uppercase tracking-wider ${item.badgeStyle}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-display text-lg font-light text-slate-805 italic">
                      {item.title}
                    </h4>
                    <p className="text-[9px] font-sans font-extrabold text-rose-deep uppercase tracking-widest mt-0.5">
                      {item.institution}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
