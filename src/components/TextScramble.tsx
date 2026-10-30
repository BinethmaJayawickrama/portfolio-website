"use client";

import React, { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#abcdef0123456789";

export default function TextScramble({
  phrases,
  typingSpeed = 35,
  pauseDuration = 2800,
  className = "",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(phrases[0] || "");
  const phraseIndexRef = useRef(0);
  const currentTextRef = useRef(phrases[0] || "");
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!phrases.length) return;

    let isMounted = true;
    let queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    let frame = 0;
    let timeoutId: NodeJS.Timeout;

    const setText = (newText: string) => {
      const oldText = currentTextRef.current;
      const length = Math.max(oldText.length, newText.length);
      queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(frameRef.current || 0);
      frame = 0;
      update(newText);
    };

    const update = (targetText: string) => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let char = queue[i].char;

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span class="text-[var(--accent)] opacity-80">${char}</span>`;
        } else {
          output += from;
        }
      }

      if (isMounted) {
        setDisplayText(output);
      }

      if (complete === queue.length) {
        currentTextRef.current = targetText;
        timeoutId = setTimeout(() => {
          if (!isMounted) return;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          setText(phrases[phraseIndexRef.current]);
        }, pauseDuration);
      } else {
        frameRef.current = requestAnimationFrame(() => update(targetText));
        frame++;
      }
    };

    // Kick off first cycle after initial delay
    timeoutId = setTimeout(() => {
      phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
      setText(phrases[phraseIndexRef.current]);
    }, pauseDuration);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [phrases, pauseDuration]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
}
