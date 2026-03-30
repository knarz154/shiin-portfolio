"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Lenis momentum scroll — lightweight, silky inertia.
 * Wraps wheel events with lerp-based easing that feels "weightless".
 */
export default function SmoothScrollProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth anchor links with navbar offset
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", handleAnchorClick));

    return () => {
      lenis.destroy();
      anchors.forEach((a) =>
        a.removeEventListener("click", handleAnchorClick)
      );
    };
  }, []);

  return null;
}
