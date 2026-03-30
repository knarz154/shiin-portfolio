"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "start", label: "Start" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("start");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);

    const sections = NAV_ITEMS.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return { id: item.id, top: 0 };
      return { id: item.id, top: el.getBoundingClientRect().top };
    });

    const current = sections.reduce((closest, section) => {
      if (section.top <= 200 && section.top > closest.top) return section;
      return closest;
    }, { id: "start", top: -Infinity });

    setActive(current.id);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] px-6 py-5 transition-all duration-700 ${
        scrolled
          ? "shadow-[inset_0_35px_13px_rgba(14,12,22,0.9)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="#start"
          className="text-text-light hover:scale-110 transition-transform duration-300 no-underline"
          aria-label="Shiin — Home"
        >
          <span className="text-primary font-mono text-lg">&lt;</span>
          <span className="font-bold text-xl text-text-light">Shiin</span>
          <span className="text-primary font-mono text-lg">/&gt;</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded bg-bg-dark/90 border border-accent-purple"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg
            className="w-6 h-6 text-text-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={`text-lg font-bold no-underline transition-colors duration-300 ${
                  active === item.id
                    ? "text-text-light"
                    : "text-text-muted hover:text-text-light"
                }`}
              >
                {item.label}{" "}
                <span className="text-accent-purple-deep">/&gt;</span>
              </a>
              {active === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #5918df, #a855f7)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 bg-bg-darkest/95 rounded-xl shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <ul className="flex flex-col items-center gap-4 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xl font-bold no-underline ${
                      active === item.id ? "text-text-light" : "text-text-muted"
                    }`}
                  >
                    {item.label}{" "}
                    <span className="text-accent-purple-deep">/&gt;</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
