"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ArrowRight, ArrowLeft, Copy, Check } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Optimizing OpenCV Camera Frames for Real-Time Retail Kiosks",
    excerpt: "Learn the core techniques required to reduce video feed latency and offload CPU bottlenecks in retail kiosks using Python multi-threading and OpenCV stream grabbing.",
    category: "AI & Systems",
    readTime: "5 min read",
    date: "May 2026",
    content: `
### The Latency Problem in Retail OpenCV Feeds
In real-time retail presence detection (like ADORIX), reading webcam frames in the main application loop causes severe bottlenecks. By default, \`cv2.VideoCapture.read()\` blocks the CPU thread until the camera hardware delivers a frame. On a standard 1080p stream at 30 FPS, this latency adds up quickly. Combined with running inference on detection models, frame rates drop below 10 FPS, which ruins interactive customer kiosk experiences.

### The Solution: Multi-Threaded Camera Producers
To solve this, we decouple frame acquisition from frame processing by moving camera reads to a separate dedicated thread. The producer thread continuously grabs frames from the camera and stores the latest frame in a thread-safe variable, while the consumer (the main UI thread) reads from it without waiting.

\`\`\`python
import cv2
import threading
import time

class ThreadedCamera:
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
        self.grabbed, self.frame = self.cap.read()
        self.stopped = False
        self.lock = threading.Lock()

    def start(self):
        t = threading.Thread(target=self.update, args=())
        t.daemon = True
        t.start()
        return self

    def update(self):
        while not self.stopped:
            grabbed, frame = self.cap.read()
            if not grabbed:
                self.stop()
                break
            with self.lock:
                self.grabbed = grabbed
                self.frame = frame

    def read(self):
        with self.lock:
            return self.frame.copy() if self.frame is not None else None

    def stop(self):
        self.stopped = True
        self.cap.release()
\`\`\`

### Offloading Computations
In addition to threading:
1. **Resolution Downscaling:** Downscaling incoming frames (e.g. from 1920x1080 to 640x360) prior to passing them to model inference boosts detection speeds by over 300%.
2. **Inference Throttling:** Run object detection once every 3 to 5 frames, then use lightweight optical flow trackers (like KCF tracker) for intermediate frames to maintain responsive visual targets.
3. **Color Conversion Offloading:** Perform BGR-to-RGB conversions on-demand, or directly in GPU buffers if using CUDA-enabled frameworks.
    `,
  },
  {
    id: 2,
    title: "Seamless Windows Integration with WMI in Python Systems",
    excerpt: "An exploration of controlling Windows OS parameters programmatically. Map hand gestures from computer vision engines directly to WMI brightness APIs.",
    category: "OS Integration",
    readTime: "4 min read",
    date: "Apr 2026",
    content: `
### Bridging Hand-Gestures and Windows Core APIs
In the "Vision Brightness Sync" project, mapping hand coordinates (captured via MediaPipe) to screen brightness requires interacting with the Windows Operating System core. Windows Management Instrumentation (WMI) provides a powerful interface to read and write system values, but doing so synchronously inside a high-speed computer vision loop can lead to lag.

### The WMI Python Interface
In Python, the \`wmi\` module allows us to control screen brightness by interfacing with the WmiMonitorBrightnessMethods class:

\`\`\`python
import wmi

def set_windows_brightness(percent):
    # Ensure value is clamped between 0 and 100
    percent = max(0, min(100, int(percent)))
    
    # Initialize COM library
    import pythoncom
    pythoncom.CoInitialize()
    
    try:
        connection = wmi.WMI(namespace="root\\wmi")
        methods = connection.WmiMonitorBrightnessMethods()[0]
        # Active Timeout = 1 second
        methods.WmiSetBrightness(percent, 1)
    finally:
        pythoncom.CoUninitialize()
\`\`\`

### Smoothing Actions via Exponential Moving Average (EMA)
Raw coordinates from hand-tracking can be noisy. Moving your hand slightly produces jitter. Directly feeding jittery values to WMI results in flashing screen brightness. We apply an Exponential Moving Average (EMA) filter to smooth out transitions:

$$\\text{Value}_{t} = \\alpha \\cdot \\text{Input}_{t} + (1 - \\alpha) \\cdot \\text{Value}_{t-1}$$

Where $\\alpha = 0.15$ works exceptionally well to filter out noise, generating a highly professional fluid transitions similar to macOS ambient brightness adjustments. We run this WMI updater inside a decoupled thread queue so the main CV thread continues to run at a consistent 30 FPS.
    `,
  },
  {
    id: 3,
    title: "Database Schema Design for Agricultural Management Systems",
    excerpt: "A deep dive into schema normalization, recursive relationships for lineage tracking, and designing triggers to manage complex breeding calendars.",
    category: "Database Design",
    readTime: "6 min read",
    date: "Mar 2026",
    content: `
### Relational Schema Challenges in Agriculture
Designing a database for livestock breeding systems requires handling complex domain rules: animal genealogy tracking (lineage), cycle stages, health records, and vaccination tracking. An incorrect schema layout can cause data integrity issues or lead to slow queries when crawling multi-generational family trees.

### Normalizing the Lineage Model
To track parent-child relationships among livestock, we implement a recursive relationship on a single \`Animals\` table. This avoids creating separate redundant tables for males and females:

\`\`\`sql
CREATE TABLE Animals (
    animal_id INT AUTO_INCREMENT PRIMARY KEY,
    ear_tag VARCHAR(50) UNIQUE NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('Male', 'Female') NOT NULL,
    sire_id INT, -- Father
    dam_id INT,  -- Mother
    status ENUM('Active', 'Sold', 'Deceased') DEFAULT 'Active',
    FOREIGN KEY (sire_id) REFERENCES Animals(animal_id) ON DELETE SET NULL,
    FOREIGN KEY (dam_id) REFERENCES Animals(animal_id) ON DELETE SET NULL
);
\`\`\`

### Breeding Cycle States and Triggers
The livestock system monitors breeding schedules (gestation, dry period, weaning). We model the state machine using a dedicated \`BreedingRecords\` table:

\`\`\`sql
CREATE TABLE BreedingRecords (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    female_id INT NOT NULL,
    male_id INT NOT NULL,
    insemination_date DATE NOT NULL,
    expected_birth_date DATE GENERATED ALWAYS AS (DATE_ADD(insemination_date, INTERVAL 283 DAY)) STORED, -- Standard Gestation
    outcome ENUM('Pending', 'Successful', 'Failed') DEFAULT 'Pending',
    FOREIGN KEY (female_id) REFERENCES Animals(animal_id) ON DELETE CASCADE,
    FOREIGN KEY (male_id) REFERENCES Animals(animal_id) ON DELETE CASCADE
);
\`\`\`

### Index Optimization for Lineage Traversal
Traversing lineage trees requires nested queries or Recursive Common Table Expressions (CTEs). To optimize this, we index the foreign keys:
\`\`\`sql
CREATE INDEX idx_lineage_sire ON Animals(sire_id);
CREATE INDEX idx_lineage_dam ON Animals(dam_id);
\`\`\`
This index cuts down sequential lookup scans to index-seek operations, returning family tree trees instantly.
    `,
  },
];

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 group/code">
      <div className="absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200 z-20">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
          data-hover="true"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm font-mono overflow-x-auto shadow-inner">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </div>
  );
}

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[0] | null>(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  return (
    <section id="blog" className="py-36 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 mb-4">
            Developer Logs
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Technical write-ups documenting software engineering challenges, system designs, and optimization decisions.
          </p>
          <div className="w-12 h-1.5 bg-gradient-to-r from-sky-500 to-teal-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="glass-card p-6 sm:p-8 rounded-3xl cursor-pointer flex flex-col justify-between group"
              data-hover="true"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 text-slate-400 text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 font-semibold border border-sky-100">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-display font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-600 group-hover:text-teal-700 mt-2">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white/95 rounded-3xl border border-slate-500/10 shadow-2xl p-6 sm:p-10 z-10 no-scrollbar"
            >
              {/* Top Reading Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-teal-400" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-colors focus:outline-none cursor-pointer"
                data-hover="true"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-6 pt-4 pr-6">
                <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 font-semibold border border-sky-100">
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-800 leading-tight">
                  {selectedArticle.title}
                </h1>
              </div>

              {/* MD Rendered Content */}
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 border-t border-slate-100 pt-6">
                {selectedArticle.content.split("\n\n").map((block, idx) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith("###")) {
                    return (
                      <h3 key={idx} className="text-lg sm:text-xl font-display font-bold text-slate-800 mt-6 mb-2">
                        {trimmed.replace("###", "").trim()}
                      </h3>
                    );
                  }

                  if (trimmed.startsWith("1.") || trimmed.startsWith("2.") || trimmed.startsWith("3.")) {
                    return (
                      <ul key={idx} className="list-decimal list-inside pl-4 space-y-1.5">
                        {trimmed.split("\n").map((li, lIdx) => (
                          <li key={lIdx} className="pl-1">
                            {li.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (trimmed.startsWith("```")) {
                    const lines = trimmed.split("\n");
                    const code = lines.slice(1, -1).join("\n");
                    const lang = lines[0].replace("```", "").trim();
                    return <CodeBlock key={idx} code={code} lang={lang} />;
                  }

                  return (
                    <p key={idx} className="leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-slate-100 mt-8 pt-6">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs sm:text-sm font-semibold transition-colors focus:outline-none cursor-pointer"
                  data-hover="true"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to logs</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
