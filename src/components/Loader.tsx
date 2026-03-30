"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`loader-wrapper ${hidden ? "hidden" : ""}`}
      role="progressbar"
      aria-busy={!hidden}
      aria-label="Loading the page"
    >
      <div className="loader-bar">
        <div className="loader-bar-inner" />
      </div>
      <span className="font-mono text-sm font-bold tracking-[4px] text-white">
        L0AD1NG
      </span>
    </div>
  );
}
