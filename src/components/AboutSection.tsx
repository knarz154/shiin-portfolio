"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function AboutSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bg-section"
      style={{ paddingTop: "6rem", paddingBottom: "8rem" }}
    >
      {/* Environmental Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="font-mono font-bold leading-none tracking-tighter whitespace-nowrap"
          style={{
            y: watermarkY,
            fontSize: "clamp(130px, 25vw, 660px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(89,24,223,0.045)",
            textShadow: "0 0 120px rgba(89,24,223,0.025)",
          }}
        >
          ABOUT
        </motion.span>
      </div>

      {/* Bottom shadow */}
      <div
        className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none"
        style={{ boxShadow: "0 0 100px 0 #07060a" }}
      />

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-4xl ml-4 sm:ml-12 lg:ml-20 relative">
          <div className="timeline alt" />
          <small className="bullet-title text-text-muted text-lg font-light mt-8 inline-block">
            About /&gt;
          </small>

          {/* Code block — lg: pulls left so gutter line aligns with section timeline */}
          <motion.div
            className="mt-12 lg:-ml-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.8 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      <a
        href="#contact"
        className="down-arrow"
        style={{ backgroundImage: "linear-gradient(-180deg, #0d0c0e, #0e0d10)" }}
        aria-label="Go to Contact section"
      >
        <span>→</span>
      </a>
    </section>
  );
}
