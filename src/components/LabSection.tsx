"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const LAB_CATEGORIES = [
  {
    name: "Thesis Papers",
    items: [
      { label: "GSO-RMS — Resource Management System (Lead Author)", href: "#" },
      { label: "EXCELLENT — Interactive Excel Learning Platform", href: "https://excellent-platform.vercel.app/" },
      { label: "NegosyoNexus — Digital Marketing Simulator", href: "#" },
    ],
  },
  {
    name: "Design & Branding",
    items: [
      { label: "TASDEC — Singapore-Tayabas Alliance Identity", href: "http://tayabas-singapore.com/" },
      { label: "TWIMS — Water Management System Brand", href: "https://tayabaswaterintegratedmanagementsystem.com/" },
      { label: "CCT College — Website & Portal Design", href: "https://cct-tayabas.com/" },
      { label: "TimeLens VR — Startup Brand & Logo", href: "https://www.facebook.com/TimeLensVR" },
    ],
  },
  {
    name: "Awards & Competitions",
    items: [
      { label: "🏆 TimeLens VR — 4× Best Startup Awards", href: "https://www.facebook.com/TimeLensVR" },
      { label: "📊 VizWiz — 2nd Place Data Visualization", href: "#" },
      { label: "🎓 Dean's Lister AY 2022–2026 (Consistent)", href: "#" },
      { label: "🔬 iSITE Member — CCT Research Society", href: "#" },
    ],
  },
  {
    name: "Explorations",
    items: [
      { label: "TimeLens VR — 360° Immersive Experience", href: "https://kuula.co/share/collection/7HXTM?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1" },
      { label: "React + Vite + TypeScript Projects", href: "#" },
      { label: "React Native + Capacitor Mobile Apps", href: "#" },
      { label: "Python Data Visualization Scripts", href: "#" },
      { label: "PHP + MySQL REST API Development", href: "#" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 0.7,
    },
  },
};

export default function LabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-section"
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
            fontSize: "clamp(140px, 28vw, 700px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(89,24,223,0.05)",
            textShadow: "0 0 120px rgba(89,24,223,0.025)",
          }}
        >
          LAB
        </motion.span>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-4xl ml-4 sm:ml-12 lg:ml-20 relative">
          <div className="timeline alt" />
          <small className="bullet-title text-text-muted text-lg font-light mt-8 inline-block">
            Lab /&gt;
          </small>

          <motion.h2
            className="text-base sm:text-lg lg:text-xl text-text-light mt-5 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            Thesis papers, design work, competition wins, tech explorations
            and more.
          </motion.h2>

          {/* Lab Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {LAB_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.name}
                className="mb-8"
                variants={itemVariants}
              >
                <p className="font-sans text-2xl sm:text-3xl font-bold text-text-dim/40 mb-3 tracking-tight">
                  {cat.name}
                </p>
                {cat.items.map((item, ii) => (
                  <p key={ii} className="my-1.5">
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="lab-link"
                    >
                      {item.label}
                    </a>
                  </p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        className="down-arrow"
        style={{ backgroundImage: "linear-gradient(-180deg, transparent, #14121c)" }}
        aria-label="Go to About section"
      >
        <span>→</span>
      </a>
    </section>
  );
}
