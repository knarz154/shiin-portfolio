"use client";

import { useEffect, useState, useCallback } from "react";

interface ScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export function useScrollSpy({ sectionIds, offset = 200 }: ScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = id;
        }
      }
    }
    setActiveSection(current);
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { activeSection, scrollProgress };
}
