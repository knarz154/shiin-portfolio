"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "./ScrambleText";

// holdMs 1500 + scrambleMs 450 ≈ 1950 ms/word × 10 words ≈ 19.5 s total loop
const SCRAMBLE_WORDS = [
  "things",
  "mobile apps",
  "websites",
  "games",
  "webapps",
  "ui/ux",
  "brands",
  "academic papers",
  "experiences",
  "solutions",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // One flag per line — fired sequentially so the CSS animation runs
  // exactly when its parent gets the `active` class.
  //
  // "Once per mount" is free: these are regular useState booleans that
  // flip true once and never reset. Scrolling back to the top doesn't
  // remount the component, so the animation won't replay. A hard reload
  // (F5) remounts the component and the intro plays again — intentional.
  const [line0, setLine0] = useState(false); // Start />
  const [line1, setLine1] = useState(false); // Hi, my name is…
  const [line2, setLine2] = useState(false); // i build and develop…
  const [line3, setLine3] = useState(false); // Let me show you…

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    const t0 = setTimeout(() => setLine0(true),  400);
    const t1 = setTimeout(() => setLine1(true),  600);
    const t2 = setTimeout(() => setLine2(true),  800);
    const t3 = setTimeout(() => setLine3(true), 1000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <header
      id="start"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse at 30% 50%, rgba(89,24,223,0.14) 0%, transparent 55%)",
          "radial-gradient(ellipse at 80% 80%, rgba(89,24,223,0.06) 0%, transparent 50%)",
        ].join(", "),
      }}
    >
      {/* Environmental Ghost Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="font-mono font-bold leading-none tracking-tighter whitespace-nowrap"
          style={{
            y: watermarkY,
            fontSize: "clamp(150px, 30vw, 800px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(89,24,223,0.06)",
            textShadow: "0 0 160px rgba(89,24,223,0.035)",
          }}
        >
          HELLO
        </motion.span>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-3xl ml-4 sm:ml-12 lg:ml-20 relative">
          {/* Timeline */}
          <div className="timeline alt" />

          {/* Section Label — Line 1 · delay 0ms */}
          <div className={`block-reveal mb-8 ${line0 ? "active" : ""}`}>
            <span className="block-reveal__block" />
            <small className="block-reveal__text bullet-title text-text-muted text-lg font-light">
              Start /&gt;
            </small>
          </div>

          <br />

          {/* Headline — Line 2 · delay 200ms */}
          <div className={`block-reveal mb-3 ${line1 ? "active" : ""}`}>
            <span className="block-reveal__block" />
            <h1 className="block-reveal__text text-3xl sm:text-4xl lg:text-hero font-bold leading-tight">
              Hi, my name is{" "}
              <strong className="text-primary">Shiin</strong>
            </h1>
          </div>

          <br />

          {/* Headline — scramble sentence · Line 3 · delay 400ms */}
          <div className={`block-reveal mb-6 ${line2 ? "active" : ""}`}>
            <span className="block-reveal__block" />
            <h1
              className="block-reveal__text font-mono font-bold leading-tight whitespace-nowrap"
              style={{ fontSize: "clamp(0.875rem, 3.5vw, 2.25rem)" }}
            >
              i build and develop{" "}
              <ScrambleText
                words={SCRAMBLE_WORDS}
                className="text-primary inline-block min-w-[16ch]"
              />
            </h1>
          </div>

          <br />

          {/* Subtitle — Line 4 · delay 600ms */}
          <div className={`block-reveal ${line3 ? "active" : ""}`}>
            <span className="block-reveal__block" />
            <p className="block-reveal__text text-text-muted text-lg mt-2 pb-3">
              Let me show you what I&apos;ve been working on...
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 flex flex-col items-start gap-3">
            <a href="#work" aria-label="Scroll to work section">
              <div className="scroll-indicator" />
            </a>
            <span className="text-primary font-mono text-xs tracking-widest uppercase">
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <a
        href="#work"
        className="down-arrow"
        style={{
          backgroundImage:
            "linear-gradient(-180deg, transparent, #1a1527)",
        }}
        aria-label="Go to next section"
      >
        <span>→</span>
      </a>
    </header>
  );
}
