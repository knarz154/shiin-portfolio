"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      barRef.current.style.transform = `scaleY(${pct})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-0 top-0 h-full w-[2px] z-[9998] pointer-events-none"
      style={{ background: "rgba(89,24,223,0.07)" }}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="w-full h-full origin-top"
        style={{
          transform: "scaleY(0)",
          background: "linear-gradient(to bottom, #5918df 0%, #7b3ff2 100%)",
          boxShadow: "0 0 8px rgba(89,24,223,0.45), 0 0 2px rgba(123,63,242,0.3)",
        }}
      />
    </div>
  );
}
