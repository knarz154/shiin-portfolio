"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string;
  image: string;
  link: string | null;
  index: number;
  orientation: "h" | "v";
  disclosure: "full" | "screenshots";
  heightClass?: string;
}

// Split title into multi-line display like yasio.dev
function formatTitle(title: string) {
  const words = title.split(/[\s-]+/);
  if (words.length <= 1) return [title];
  if (words.length === 2) return words;
  // Group into 2-3 lines
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function ProjectCard({
  title,
  description,
  techStack,
  image,
  link,
  index,
  disclosure,
  heightClass = "h-[280px] sm:h-[340px]",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  });

  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  const handleClick = () => {
    if (link) window.open(link, "_blank", "noreferrer");
  };

  const titleLines = formatTitle(title);

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full ${heightClass} overflow-hidden cursor-pointer group rounded-xl`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { type: "spring", stiffness: 260, damping: 25 } }}
      role={link ? "link" : "article"}
      aria-label={title}
    >
      {/* Subtle border for "floating" feel */}
      <div className="absolute inset-0 z-[4] rounded-xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
      />

      {/* Spinner behind image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <span className="spinner-border" role="status" aria-hidden="true" />
      </div>

      {/* Screenshot */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(65deg, rgba(14,12,22,0.85) 0%, rgba(14,12,22,0.4) 40%, transparent 60%), linear-gradient(to top, rgba(14,12,22,0.7) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Dynamic glow on hover */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle 300px at ${x}% ${y}%, rgba(89,24,223,0.18) 0%, transparent 70%)`
          ),
        }}
      />

      {/* Tilt glare effect */}
      <div
        className="absolute inset-0 z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 40px rgba(89,24,223,0.12), 0 12px 50px rgba(0,0,0,0.4)",
        }}
      />

      {/* Disclosure badge */}
      {disclosure === "screenshots" && (
        <div className="absolute top-3 right-3 z-20 bg-bg-darkest/70 backdrop-blur-sm border border-white/5 rounded-full px-3 py-1 flex items-center gap-1.5">
          <svg className="w-3 h-3 text-text-dim" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-text-dim font-mono text-[10px] uppercase tracking-wider">private</span>
        </div>
      )}

      {/* Meta — yasio-style: multi-line title + divider + number/arrow */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 transition-opacity duration-300 group-hover:opacity-0"
        style={{ transform: "translateZ(30px)" }}
      >
        <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-text-light leading-[1.15] mb-3 drop-shadow-lg">
          {titleLines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h3>
        <div className="w-12 h-px bg-primary/40 mb-3" />
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-text-muted tracking-wider">
            {String(index).padStart(2, "0")}
          </span>
          <span className="text-text-muted text-lg project-arrow transition-all duration-300">→</span>
        </div>
      </div>

      {/* Hover overlay with details */}
      <div className="absolute inset-0 z-20 bg-bg-darkest/92 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-text-light mb-2 leading-tight">{title}</h3>
        <p className="text-text-muted text-sm mb-3 line-clamp-3 leading-relaxed max-w-md">
          {description}
        </p>
        <p className="text-primary/80 font-mono text-xs mb-4 tracking-wider">{techStack}</p>
        {link ? (
          <span className="inline-flex items-center gap-2 text-primary font-mono text-sm">
            View live
            <motion.span
              className="inline-block"
              animate={hovered ? { x: [0, 5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              →
            </motion.span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-text-dim font-mono text-xs">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Screenshots only
          </span>
        )}
      </div>
    </motion.div>
  );
}

