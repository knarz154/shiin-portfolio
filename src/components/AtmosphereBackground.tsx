"use client";

import { useEffect, useState } from "react";

export default function AtmosphereBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let raf: number;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMousePos({ x: currentX, y: currentY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Primary spotlight — follows mouse lazily */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          background: `radial-gradient(ellipse 1200px 900px at ${mousePos.x}% ${mousePos.y}%, rgba(89,24,223,0.13) 0%, transparent 65%)`,
        }}
      />
      {/* Fixed ambient spotlights for depth — larger, slightly stronger */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 800px 600px at 12% 10%, rgba(89,24,223,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 700px 700px at 88% 50%, rgba(89,24,223,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse 600px 400px at 50% 95%, rgba(89,24,223,0.04) 0%, transparent 60%)",
            "radial-gradient(ellipse 500px 500px at 35% 45%, rgba(120,50,255,0.025) 0%, transparent 55%)",
          ].join(", "),
        }}
      />
      {/* Film-grain noise overlay — stops gradient banding, adds physical texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
