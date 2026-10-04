"use client";

import { useEffect, useRef } from "react";

// Terminal / glitch symbols — default scramble set
const SET_DEFAULT = "_-▓√$@%!*&+=\\|/{}[]()█▓▒░?";

// Scholarly / mathematical notation — used exclusively for "academic papers"
const SET_ACADEMIC = "∑∏∫∆∇∂∞≈≠≡≤≥⊂⊃⊆⊇∈∉∀∃∠∧∨⊕⊗°µ";

interface ScrambleTextProps {
  words: string[];
  /** How long each resolved word stays visible (ms) */
  holdMs?: number;
  /** Duration of the scramble → resolve transition (ms) */
  scrambleMs?: number;
  className?: string;
}

/**
 * Cycles through `words` with a decipher/scramble effect.
 *
 * Performance strategy:
 *   - Direct DOM mutation via spanRef (zero React re-renders during animation)
 *   - requestAnimationFrame for buttery-smooth 60 fps ticks
 *   - IntersectionObserver pauses ticks when the hero is scrolled out of view
 *     so the main thread is never competing with Lenis while off-screen
 */
export default function ScrambleText({
  words,
  holdMs = 2500,
  scrambleMs = 600,
  className,
}: ScrambleTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el || words.length < 2) return;

    let rafId: number;
    let holdTimer: ReturnType<typeof setTimeout>;
    let isVisible = true;
    let currentIdx = 0;

    // Pause RAF work when the section is off-screen — prevents competing
    // with Lenis smooth-scroll on the main thread.
    const sentinel = el.closest("header, section") ?? el;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { root: null, threshold: 0 }
    );
    observer.observe(sentinel);

    function scrambleTo(idx: number): void {
      const target = words[idx];
      // Pick symbol set based on target word — "academic papers" gets
      // dense mathematical notation; everything else gets the glitch set.
      const charset = target === "academic papers" ? SET_ACADEMIC : SET_DEFAULT;
      let startTime: DOMHighResTimeStamp | null = null;

      function tick(ts: DOMHighResTimeStamp): void {
        // Skip DOM work when hero is off-screen, keep RAF alive to resume smoothly
        if (!isVisible) {
          rafId = requestAnimationFrame(tick);
          return;
        }

        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / scrambleMs, 1);

        // Characters resolve left-to-right proportional to progress
        const resolvedUpTo = Math.floor(target.length * progress);
        let result = "";
        for (let i = 0; i < target.length; i++) {
          if (target[i] === " ") {
            result += " "; // preserve spaces — never scramble them
          } else if (i < resolvedUpTo) {
            result += target[i];
          } else {
            result += charset[Math.floor(Math.random() * charset.length)];
          }
        }

        if (!el) return;

        el.textContent = result;

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          el.textContent = target; // guarantee perfect final state
          holdTimer = setTimeout(() => {
            currentIdx = (currentIdx + 1) % words.length;
            scrambleTo(currentIdx);
          }, holdMs);
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    // Show first word immediately, then begin cycling after the first hold
    if (!el) return;
    el.textContent = words[0];
    holdTimer = setTimeout(() => {
      currentIdx = 1 % words.length;
      scrambleTo(currentIdx);
    }, holdMs);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(holdTimer);
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // SSR: render first word so there's no layout flash on hydration
  return (
    <span ref={spanRef} className={className}>
      {words[0]}
    </span>
  );
}
