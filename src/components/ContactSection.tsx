"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const contactItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative bg-bg-footer overflow-hidden"
      style={{ boxShadow: "0 0 76px 0 rgba(10,7,22,0.004)" }}
    >
      {/* Environmental Ghost Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="font-mono font-bold leading-none tracking-tighter whitespace-nowrap"
          style={{
            y: watermarkY,
            fontSize: "clamp(100px, 22vw, 580px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(89,24,223,0.04)",
            textShadow: "0 0 100px rgba(89,24,223,0.02)",
          }}
        >
          CONTACT
        </motion.span>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 min-h-[720px] relative">
        <div className="max-w-3xl ml-4 sm:ml-12 lg:ml-20 relative">
          <div className="timeline alt" />
          <small className="bullet-title text-text-muted text-lg font-light mt-8 pt-24 inline-block">
            Contact /&gt;
          </small>

          <motion.div
            className="relative"
            style={{ top: "10%", paddingTop: "2.5rem" }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          >
            <motion.h2
              className="text-xl sm:text-2xl font-bold mt-4 mb-8"
              variants={contactItemVariants}
            >
              Find me on:
            </motion.h2>

            {/* Social Links Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 mb-10"
              variants={contactItemVariants}
            >
              <a
                href="mailto:kenlawrencenarz@gmail.com"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M18 6v7c0 1.1-.9 2-2 2h-4v3l-4-3H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2z" />
                </svg>
                kenlawrencenarz@gmail.com
              </a>

              <a
                href="tel:09649907780"
                className="social-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                0964-990-7780
              </a>

              <a
                href="https://github.com/kenlawrencenarz"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5">
                  <path d="M16 .395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182.8.148 1.094-.347 1.094-.77 0-.381-.015-1.642-.022-2.979-4.452.968-5.391-1.888-5.391-1.888-.728-1.849-1.776-2.341-1.776-2.341-1.452-.993.11-.973.11-.973 1.606.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33.143-1.034.558-1.74 1.016-2.14-3.554-.404-7.29-1.777-7.29-7.907 0-1.747.625-3.174 1.649-4.295-.166-.403-.714-2.03.155-4.234 0 0 1.344-.43 4.401 1.64 1.276-.355 2.645-.532 4.005-.539 1.359.006 2.729.184 4.008.539 3.054-2.07 4.395-1.64 4.395-1.64.871 2.204.323 3.831.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895.574.497 1.085 1.47 1.085 2.963 0 2.141-.019 3.864-.019 4.391 0 .426.288.925 1.099.768C27.421 29.457 32 23.459 32 16.395c0-8.837-7.164-16-16-16z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/kenlawrencenarzabal"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M5 3c0 1.062-.71 1.976-2 1.976C1.785 4.976 1 4.114 1 3.052 1 1.962 1.76.9 3 .9s1.976.91 2 2.1zM1 19V6h4v13H1z" />
                  <path d="M7 10.444C7 8.9 6.949 7.608 6.898 6.493h3.594l.178 1.723h.076c.506-.811 1.746-2 3.822-2 2.532 0 4.432 1.695 4.432 5.342V19h-4v-6.861c0-1.594-.607-2.81-2-2.81-1.062 0-1.594.86-1.873 1.569-.102.254-.127.608-.127.963V19H7v-8.556z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>

            {/* CTA Button */}
            <motion.a href="mailto:kenlawrencenarz@gmail.com" className="inline-block" variants={contactItemVariants}>
              <button className="btn-gradient" type="button">
                Get in touch
                <div className="btn-gradient-glow" />
              </button>
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright — minimalist centered footer anchor */}
        <div className="w-full pt-32 pb-10 flex justify-center">
          <small className="text-text-muted/50 font-mono text-xs tracking-wider">
            © Made with{" "}
            <svg
              className="inline w-3.5 h-3.5 -mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ color: "rgba(152,142,159,0.5)" }}
            >
              <path d="M5.719 14.75a1 1 0 01-.664-.252l-5.06-4.498 5.341-4.748a1 1 0 011.328 1.495l-3.659 3.253 3.378 3.002a1 1 0 01-.664 1.748zm8.945-.002l5.341-4.748-5.06-4.498a1 1 0 00-1.328 1.495l3.378 3.003-3.659 3.252a1 1 0 001.328 1.496zm-4.678 1.417l2-12a1 1 0 00-1.972-.328l-2 12a1 1 0 001.972.328z" />
            </svg>{" "}
            by Shiin. 2025.
          </small>
        </div>
      </div>
    </footer>
  );
}
