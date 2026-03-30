// Async Server Component — runs on the server, zero client JS.
// Three-column gutter: [Line Numbers] | [Purple accent line] | [Code]
import { codeToTokens, type ThemedToken } from "shiki";
import { Fragment, type CSSProperties } from "react";

// Custom vibrant theme — Tokyo Night-inspired with boosted saturation.
// Uses the same TextMate scopes as VS Code so every token maps precisely.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VIBRANT_THEME: any = {
  name: "portfolio-vibrant",
  type: "dark",
  colors: {
    "editor.background": "#0d0b14",
    "editor.foreground": "#a9b1d6",
  },
  tokenColors: [
    {
      // Comments — very muted so they fade into the background
      scope: ["comment", "comment.line", "comment.block"],
      settings: { foreground: "#4a4a6a", fontStyle: "italic" },
    },
    {
      // Keywords: class, return, const, let — and `this` (language variable)
      scope: [
        "keyword",
        "keyword.control",
        "storage.type",
        "storage.modifier",
        "variable.language.this",
        "variable.language.super",
      ],
      settings: { foreground: "#c792ea" },
    },
    {
      // Class name + all method / function names
      scope: [
        "entity.name.class",
        "entity.name.type.class",
        "entity.name.function",
        "meta.definition.method entity.name.function",
        "support.function",
      ],
      settings: { foreground: "#ffcb6b" },
    },
    {
      // Property access: this.name, this.location, etc.
      scope: [
        "variable.other.property",
        "meta.property.object",
        "support.variable.property",
        "variable.other.object.property",
      ],
      settings: { foreground: "#f07178" },
    },
    {
      // All string literals (values AND object-key strings)
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#c3e88d" },
    },
    {
      // Numeric literals / timestamps
      scope: ["constant.numeric"],
      settings: { foreground: "#f78c6c" },
    },
    {
      // Punctuation — brackets, braces, dots, commas
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#89ddff" },
    },
  ],
};

const CODE = `class Shiin {
  // I build, because I can.
  // My skill set is continuously expanding.

  constructor() {
    this.name     = 'Shiin (Ken Narzabal)'
    this.location = 'Tayabas City, Quezon'
    this.email    = 'kenlawrencenarz@gmail.com'
    this.phone    = '+63 XXX XXX XXXX'
  }

  workExperience() {
    return [
      { '2024–now': 'Lead Author — GSO-RMS Thesis' },
      { '2023–now': 'Freelance Full-Stack Developer' },
      { '2022–now': 'Co-founder — TimeLens VR (4× Best Startup)' },
    ]
  }

  skills() {
    return [
      // frontend
      'React', 'TypeScript', 'Next.js',
      'Tailwind CSS', 'Vite', 'HTML/CSS/JS',
      // backend & mobile
      'PHP', 'MySQL', 'Node.js', 'Python',
      'REST APIs', 'React Native', 'Capacitor',
      // tools & design
      'Git', 'Figma', 'Photoshop',
      'UI/UX Design', 'Responsive Design', 'Data Visualization',▋
    ]
  }
}`;

export default async function IDECodeBlock() {
  const { tokens } = await codeToTokens(CODE, {
    lang: "javascript",
    theme: VIBRANT_THEME,
  });

  return (
    <div className="overflow-x-auto scrollbar-none">
      {/* min-w-max so every row stretches to the widest line — ensures full-width hover */}
      <div
        className="min-w-max"
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace",
          fontSize: "15px",
          lineHeight: "1.7",
          fontVariantLigatures: "normal",
          fontFeatureSettings: '"liga" 1, "calt" 1',
        }}
      >
        {tokens.map((lineTokens, lineIdx) => (
          <CodeLine
            key={lineIdx}
            lineNumber={lineIdx + 1}
            tokens={lineTokens}
          />
        ))}
      </div>
    </div>
  );
}

function CodeLine({
  lineNumber,
  tokens,
}: {
  lineNumber: number;
  tokens: ThemedToken[];
}) {
  const fullText = tokens.map((t) => t.content).join("");
  const leadingSpaces = fullText.match(/^( *)/)?.[1] ?? "";
  const indentDepth = Math.floor(leadingSpaces.length / 2);
  let spacesLeft = leadingSpaces.length;

  return (
    // Pure CSS hover — no JS listeners, no re-renders, scroll stays smooth
    <div className="group flex items-stretch w-full hover:bg-[#ffffff05] transition-colors duration-150">

      {/* ── Col 1 · Line number — very muted so the code "pops" ── */}
      <span
        aria-hidden="true"
        className="select-none flex-shrink-0 inline-flex items-center justify-end text-[12px]"
        style={{
          minWidth: "2.5rem",
          paddingRight: "0.75rem",
          color: "rgba(255,255,255,0.08)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(lineNumber).padStart(2, "0")}
      </span>

      {/* ── Col 2 · Purple accent line ────────────────────────── */}
      <div
        aria-hidden="true"
        className="flex-shrink-0 self-stretch"
        style={{ width: "1px", background: "rgba(89, 24, 223, 0.5)" }}
      />

      {/* ── Col 3 · Code content — subtle glow gives OLED depth ── */}
      <span
        className="whitespace-pre inline-flex items-center"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "3rem",
          textShadow: "0 0 2px rgba(255,255,255,0.07)",
        }}
      >
        {/* Indentation dots — near-invisible, non-competing */}
        {indentDepth > 0 && (
          <span aria-hidden="true" className="select-none pointer-events-none inline-flex">
            {Array.from({ length: indentDepth }, (_, i) => (
              <span
                key={i}
                style={{ display: "inline-block", width: "2ch", color: "rgba(255,255,255,0.06)" }}
              >
                {"· "}
              </span>
            ))}
          </span>
        )}

        {/* Shiki syntax tokens */}
        {tokens.map((token, i) => {
          let content = token.content;
          if (spacesLeft > 0) {
            const strip = Math.min(spacesLeft, content.length);
            content = content.slice(strip);
            spacesLeft -= strip;
          }
          if (!content) return null;

          const style: CSSProperties = {};
          if (token.color) style.color = token.color;
          if (token.fontStyle) {
            if (token.fontStyle & 1) style.fontStyle = "italic";
            if (token.fontStyle & 2) style.fontWeight = "bold";
            if (token.fontStyle & 4) style.textDecoration = "underline";
          }

          // Blinking | cursor replacing the ▋ marker
          if (content.includes("▋")) {
            const [before, after] = content.split("▋");
            return (
              <Fragment key={i}>
                {before && <span style={style}>{before}</span>}
                <span className="animate-blink" style={{ color: "#5918df" }}>|</span>
                {after && <span style={style}>{after}</span>}
              </Fragment>
            );
          }

          return (
            <span key={i} style={style}>
              {content}
            </span>
          );
        })}
      </span>
    </div>
  );
}
