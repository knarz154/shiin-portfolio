"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom liquid cursor: 4px white dot + 30px trailing ring.
 * The ring uses spring physics for a "momentum" lag behind the dot.
 * Expands when hovering interactive elements (links, buttons, cards).
 * Hidden on touch devices.
 */
export default function LiquidCursor() {
  const [visible, setVisible] = useState(false);

  // Dot position (instant)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring position — tight spring, just enough lag to feel "liquid"
  const ringX = useSpring(dotX, { stiffness: 520, damping: 28, mass: 0.25 });
  const ringY = useSpring(dotY, { stiffness: 520, damping: 28, mass: 0.25 });

  // Ring scale spring — snappy expand/contract on hover
  const scaleValue = useMotionValue(1);
  const ringScale = useSpring(scaleValue, { stiffness: 600, damping: 30 });

  useEffect(() => {
    setVisible(true);

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const addHover = () => scaleValue.set(1.6);
    const removeHover = () => scaleValue.set(1);

    window.addEventListener("mousemove", move);

    // Watch for hoverable elements via delegation
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='link'], [role='button'], .cursor-pointer, .project-card")
      ) {
        addHover();
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement | null;
      if (
        !target?.closest("a, button, [role='link'], [role='button'], .cursor-pointer, .project-card")
      ) {
        removeHover();
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [dotX, dotY, scaleValue]);

  if (!visible) return null;

  return (
    <>
      {/* Hide native cursor only on fine-pointer (mouse) devices */}
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      {/* Central dot — 4px, instant tracking */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: "#fff",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />

      {/* Outer ring — 30px, spring-lagged */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.7)",
          backgroundColor: "transparent",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </>
  );
}
