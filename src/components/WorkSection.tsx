"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "CCT Tayabas",
    description:
      "Complete college website with Student, Registrar & Admin portals. Full redesign, branding, and front-end development.",
    techStack: "HTML · CSS · JS · Full-Stack",
    image: "/works/cct-tayabas.com_.png",
    link: "https://cct-tayabas.com/",
    disclosure: "full" as const,
    orientation: "h" as const,
  },
  {
    title: "EXCELLENT Platform",
    description:
      "Interactive Excel learning platform with guided tutorials, quizzes, and progress tracking. Full thesis project (Ch.1–5).",
    techStack: "React · Vite · TypeScript",
    image: "/works/excellent-platform.vercel.app_login(Nest Hub Max) (1).png",
    link: "https://excellent-platform.vercel.app/",
    disclosure: "full" as const,
    orientation: "h" as const,
  },
  {
    title: "TASDEC Website",
    description:
      "Full redesign & branding for the Singapore-Tayabas Alliance. Responsive site with modern identity system.",
    techStack: "HTML · CSS · Branding · Logo",
    image: "/works/tayabas-singapore.com_.png",
    link: "http://tayabas-singapore.com/",
    logoImage: "/works/TASDECLOGO.png",
    disclosure: "full" as const,
    orientation: "v" as const,
  },
  {
    title: "TWIMS Website",
    description:
      "Tayabas Integrated Water Management System — public-facing website with dynamic pages for water source management.",
    techStack: "HTML · CSS · PHP · Branding",
    image: "/works/www.tayabaswaterintegratedmanagementsystem.com_homepage.php.png",
    link: "https://tayabaswaterintegratedmanagementsystem.com/",
    logoImage: "/works/twimsPngLogo.png",
    disclosure: "full" as const,
    orientation: "h" as const,
  },
  {
    title: "TimeLens VR",
    description:
      "Award-winning VR startup concept — 4× Best Startup Awards. Immersive historical experiences platform.",
    techStack: "VR · Startup · Kuula · Branding",
    image: "/works/TimeLensVRLogo.png",
    link: "https://kuula.co/share/collection/7HXTM?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    externalLink: "https://www.facebook.com/TimeLensVR",
    logoImage: "/works/TimeLensVRLogo.png",
    disclosure: "full" as const,
    orientation: "v" as const,
  },
  {
    title: "GSO-RMS",
    description:
      "Web-based Resource Management System for Tayabas City government — automated booking, rental tracking & admin dashboard. (Thesis — Lead Author)",
    techStack: "React · PHP · MySQL",
    image: "/works/GSORMS_dashboard.png",
    link: null,
    disclosure: "screenshots" as const,
    orientation: "h" as const,
  },
  {
    title: "NegosyoNexus",
    description:
      "Mobile digital marketing simulator for entrepreneurship education with scenario-based learning and simulation maps.",
    techStack: "React Native · Capacitor",
    image: "/works/NegosyoNexus_SimulationBriefing.png",
    link: null,
    disclosure: "screenshots" as const,
    orientation: "v" as const,
  },
];

// Per-card heights — intentionally varied to create visual rhythm in each column
const CARD_HEIGHT_CLASSES = [
  "h-[280px] sm:h-[360px] lg:h-[420px]",  // 0  CCT Tayabas
  "h-[280px] sm:h-[440px] lg:h-[500px]",  // 1  EXCELLENT
  "h-[280px] sm:h-[320px] lg:h-[380px]",  // 2  TASDEC
  "h-[280px] sm:h-[400px] lg:h-[460px]",  // 3  TWIMS
  "h-[280px] sm:h-[460px] lg:h-[530px]",  // 4  TimeLens VR
  "h-[280px] sm:h-[340px] lg:h-[400px]",  // 5  GSO-RMS
  "h-[280px] sm:h-[420px] lg:h-[490px]",  // 6  NegosyoNexus
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
      mass: 1,
    },
  },
};

// Column: renders a vertical stack of project cards at pre-defined indices.
// Each column owns its IntersectionObserver so cards animate when THAT
// column enters the viewport, not when the whole section does.
function Column({
  indices,
  topOffset = "pt-0",
}: {
  indices: number[];
  topOffset?: string;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(colRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={colRef}
      className={`flex flex-col gap-6 lg:gap-8 flex-1 ${topOffset}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {indices.map((idx) => {
        const p = PROJECTS[idx];
        return (
          <motion.div key={idx} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
            <ProjectCard
              title={p.title}
              description={p.description}
              techStack={p.techStack}
              image={p.image}
              link={p.link}
              index={idx}
              orientation={p.orientation}
              disclosure={p.disclosure}
              heightClass={CARD_HEIGHT_CLASSES[idx]}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // sectionRef is only for the watermark parallax — no section-level isInView needed
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  // Mobile list has its own observer — fires when the list top reaches 10% in view.
  // Cards are stacked vertically so they scroll in one at a time; 0.1 threshold
  // triggers early enough that the first card is visible before it animates.
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileInView = useInView(mobileRef, { once: true, amount: 0.1 });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0f0d15",
        backgroundImage: "linear-gradient(-180deg, #1a1527, #0e0c16 88%)",
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingBottom: "8rem",
      }}
    >
      {/* Environmental Watermark — massive, atmospheric */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="font-mono font-bold leading-none tracking-tighter whitespace-nowrap"
          style={{
            y: watermarkY,
            fontSize: "clamp(140px, 27vw, 720px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(89,24,223,0.07)",
            textShadow: "0 0 140px rgba(89,24,223,0.04)",
          }}
        >
          WORK
        </motion.span>
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-3xl ml-4 sm:ml-12 lg:ml-20 relative mb-20">
          <div className="timeline alt" />
          <small className="bullet-title text-text-muted text-lg font-light mt-8 inline-block">
            Work /&gt;
          </small>
          <h4 className="text-text-muted font-sans text-xl sm:text-2xl lg:text-[30px] font-bold mt-4">
            Selected web, mobile &amp; branding projects...
          </h4>
        </div>
      </div>

      {/* ── Mobile: single column ─────────────────────────────── */}
      <motion.div
        ref={mobileRef}
        className="md:hidden flex flex-col gap-5 px-4 sm:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={mobileInView ? "visible" : "hidden"}
      >
        {PROJECTS.map((p, i) => (
          <motion.div key={i} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
            <ProjectCard
              title={p.title}
              description={p.description}
              techStack={p.techStack}
              image={p.image}
              link={p.link}
              index={i}
              orientation={p.orientation}
              disclosure={p.disclosure}
              heightClass="h-[280px]"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Tablet: 2 columns, right col stepped down ─────────── */}
      {/* col-A: items 0 2 4 6 │ col-B: items 1 3 5 (offset pt-28 = 112 px) */}
      <div className="hidden md:flex lg:hidden gap-6 px-8 pb-36 relative z-10">
        <Column indices={[0, 2, 4, 6]} />
        <Column indices={[1, 3, 5]}    topOffset="pt-28" />
      </div>

      {/* ── Desktop: 3 columns with stepped vertical offsets ──── */}
      {/* col-A: pt-0 │ col-B: pt-20 (80 px) │ col-C: pt-40 (160 px)        */}
      <div className="hidden lg:flex gap-8 px-12 xl:px-20 pb-52 relative z-10">
        <Column indices={[0, 3, 6]} />
        <Column indices={[1, 4]}    topOffset="pt-20" />
        <Column indices={[2, 5]}    topOffset="pt-40" />
      </div>

      {/* Bottom shadow */}
      <div
        className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none"
        style={{ boxShadow: "0 0 100px 0 rgba(3,3,5,0.5)" }}
      />

      <a
        href="#lab"
        className="down-arrow"
        style={{ backgroundImage: "linear-gradient(-180deg, rgba(3,3,5,0.45), #14121c)" }}
        aria-label="Go to Lab section"
      >
        <span>→</span>
      </a>
    </section>
  );
}

