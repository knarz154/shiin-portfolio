import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5918df",
        "primary-light": "#7b3ff2",
        "primary-dark": "#4012a6",
        bg: {
          darkest: "#0e0c16",
          dark: "#1a1527",
          section: "#14121c",
          card: "#0f0d15",
          footer: "#0e0d10",
        },
        text: {
          light: "#f9f9f9",
          muted: "#988e9f",
          dim: "#78707e",
          dark: "#574f5c",
        },
        code: {
          green: "#24e33a",
          teal: "#24e394",
          yellow: "#eeff31",
          red: "#e3244c",
          orange: "#e39d24",
          comment: "#78707e",
          line: "#3b3553",
          bg: "#231d28",
        },
        accent: {
          purple: "#302a4b",
          "purple-dark": "#221d35",
          "purple-deep": "#3b3553",
        },
      },
      fontFamily: {
        sans: ["Roboto Condensed", "Lato", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Roboto Mono", "Consolas", "Courier New", "monospace"],
        code: ["Fira Code", "JetBrains Mono", "Roboto Mono", "monospace"],
        serif: ["Palatino", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        hero: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "hero-md": ["38px", { lineHeight: "1.2", fontWeight: "700" }],
        "hero-sm": ["30px", { lineHeight: "1.2", fontWeight: "700" }],
        env: ["20rem", { lineHeight: "0.85" }],
      },
      animation: {
        blink: "blink 0.8s infinite",
        "fade-in-left": "fadeinLeft 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        "block-reveal": "blockReveal 0.8s cubic-bezier(0.65, 0.05, 0.36, 1)",
        "block-reveal-text": "blockRevealText 0s 0.4s forwards",
        "gradient-shift": "gradientShift 3s ease infinite alternate",
        "spin-slow": "spin 1.5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        fadeinLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        blockReveal: {
          "0%": { transform: "translateX(-101%)" },
          "100%": { transform: "translateX(101%)" },
        },
        blockRevealText: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundSize: {
        "gradient-btn": "400% 400%",
      },
    },
  },
  plugins: [],
};

export default config;
