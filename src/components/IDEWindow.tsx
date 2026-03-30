"use client";

// IDEWindow — client component that owns the tab bar, code renderer,
// and spring-physics cert tooltip. Receives pre-tokenized token arrays
// from the IDECodeBlock server component (plain-object serialized).

import {
  useState,
  useMemo,
  useCallback,
  useRef,
  Fragment,
  type CSSProperties,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ── Serialised token — safe to cross the server→client boundary ───────────────
export interface SerToken {
  content: string;
  color?: string;
  italic: boolean;
  bold: boolean;
}

// ── Tooltip metadata for certifications ──────────────────────────────────────
interface TooltipData {
  issuer: string;
  date: string;
  verifyUrl: string;
  /** Accent dot colour matching the issuer's brand */
  accentColor: string;
}

const CERT_TOOLTIPS: Record<string, TooltipData> = {
  "Cisco Networking Academy": {
    issuer: "Cisco Networking Academy",
    date: "2023",
    verifyUrl: "https://www.netacad.com/",
    accentColor: "#1BA0D7",
  },
  freeCodeCamp: {
    issuer: "freeCodeCamp",
    date: "2022",
    verifyUrl: "https://www.freecodecamp.org/",
    accentColor: "#0A0A23",
  },
  Google: {
    issuer: "Google",
    date: "2023",
    verifyUrl: "https://grow.google/certificates/",
    accentColor: "#4285F4",
  },
};

/** Strip surrounding quotes then check the tooltip map. */
function getTooltip(raw: string): TooltipData | null {
  const key = raw.replace(/^['"]|['"]$/g, "").trim();
  return CERT_TOOLTIPS[key] ?? null;
}

// ── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: "profile"     as const, label: "About.js",        dotColor: "#f0db4f" },
  { id: "credentials" as const, label: "Credentials.ts",  dotColor: "#3178c6" },
];
type TabId = (typeof TABS)[number]["id"];

// ── Props ────────────────────────────────────────────────────────────────────
interface IDEWindowProps {
  profileTokens:     SerToken[][];
  credentialsTokens: SerToken[][];
}

// ─────────────────────────────────────────────────────────────────────────────
// IDEWindow
// ─────────────────────────────────────────────────────────────────────────────
export default function IDEWindow({ profileTokens, credentialsTokens }: IDEWindowProps) {
  const [activeTab,      setActiveTab]      = useState<TabId>("profile");
  const [tooltipData,    setTooltipData]    = useState<TooltipData | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Spring-physics cursor tracking for the floating tooltip
  const cursorX  = useMotionValue(-999);
  const cursorY  = useMotionValue(-999);
  const tooltipX = useSpring(cursorX, { stiffness: 350, damping: 28 });
  const tooltipY = useSpring(cursorY, { stiffness: 350, damping: 28 });

  const trackCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX + 18);
      cursorY.set(e.clientY + 18);
    },
    [cursorX, cursorY],
  );

  const openTooltip = useCallback(
    (data: TooltipData) => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setTooltipData(data);
      setTooltipVisible(true);
      window.addEventListener("mousemove", trackCursor);
    },
    [trackCursor],
  );

  const closeTooltip = useCallback(() => {
    hideTimer.current = setTimeout(() => {
      setTooltipVisible(false);
      window.removeEventListener("mousemove", trackCursor);
    }, 220);
  }, [trackCursor]);

  const cancelClose = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  // useMemo prevents the heavy JSX tree from being recreated on every
  // tooltip state change — only re-runs when the active tab switches.
  const tokens         = activeTab === "profile" ? profileTokens : credentialsTokens;
  const isCredentials  = activeTab === "credentials";

  const renderedLines = useMemo(
    () =>
      tokens.map((lineTokens, i) => (
        <CodeLine
          key={i}
          lineNumber={i + 1}
          tokens={lineTokens}
          enableTooltips={isCredentials}
          onTooltipEnter={openTooltip}
          onTooltipLeave={closeTooltip}
        />
      )),
    // openTooltip / closeTooltip are stable (useCallback with stable deps)
    [tokens, isCredentials, openTooltip, closeTooltip],
  );

  return (
    <div className="relative">

      {/* ── IDE Window ─────────────────────────────────────────────────────── */}
      <div
        className="overflow-hidden rounded-xl"
        style={{
          background:  "#0d0b14",
          border:      "1px solid rgba(89,24,223,0.25)",
          boxShadow:   "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* ── Title bar ──────────────────────────────────────────────────── */}
        <div
          className="flex items-center px-4 py-3 gap-2"
          style={{
            background:   "#0a0812",
            borderBottom: "1px solid rgba(89,24,223,0.15)",
          }}
        >
          {/* macOS traffic-light dots */}
          <div className="flex gap-1.5 mr-3 flex-shrink-0">
            {(["#ff5f57", "#ffbd2e", "#28c840"] as const).map((c) => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>

          {/* File tabs */}
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-all duration-200 rounded-t-md"
                style={{
                  background: active ? "#0d0b14" : "transparent",
                  color:      active ? "#e0e0e0" : "#55496a",
                  border:     active
                    ? "1px solid rgba(89,24,223,0.22)"
                    : "1px solid transparent",
                  borderBottom: active ? "1px solid #0d0b14" : "1px solid transparent",
                }}
              >
                {/* Language colour dot */}
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: tab.dotColor, opacity: active ? 1 : 0.35 }}
                />
                {tab.label}

                {/* Active-tab underline indicator */}
                {active && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: tab.dotColor, opacity: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Code area ──────────────────────────────────────────────────── */}
        <div className="overflow-x-auto scrollbar-none">
          <motion.div
            key={activeTab}
            className="min-w-max"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              fontFamily:           "'Fira Code', 'JetBrains Mono', 'Roboto Mono', monospace",
              fontSize:             "14px",
              lineHeight:           "1.75",
              fontVariantLigatures: "normal",
              fontFeatureSettings:  '"liga" 1, "calt" 1',
              paddingTop:           "1rem",
              paddingBottom:        "1.5rem",
            }}
          >
            {renderedLines}
          </motion.div>
        </div>
      </div>

      {/* ── Floating cert tooltip (fixed, spring-following) ───────────────── */}
      <AnimatePresence>
        {tooltipVisible && tooltipData && (
          <motion.div
            onMouseEnter={cancelClose}
            onMouseLeave={closeTooltip}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: tooltipX,
              y: tooltipY,
              zIndex: 9999,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <div
              style={{
                background:     "rgba(13,11,20,0.95)",
                backdropFilter: "blur(20px)",
                border:         "1px solid rgba(89,24,223,0.35)",
                borderRadius:   "10px",
                padding:        "12px 14px",
                minWidth:       "210px",
                maxWidth:       "270px",
                boxShadow:      "0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Issuer row */}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: tooltipData.accentColor }}
                />
                <span
                  style={{
                    color:          "#988e9f",
                    fontSize:       "10px",
                    fontFamily:     "'Fira Code', monospace",
                    textTransform:  "uppercase",
                    letterSpacing:  "0.08em",
                  }}
                >
                  {tooltipData.issuer}
                </span>
              </div>

              {/* Date */}
              <div
                style={{
                  color:       "#55496a",
                  fontSize:    "11px",
                  fontFamily:  "'Fira Code', monospace",
                  marginBottom: "10px",
                }}
              >
                Issued · {tooltipData.date}
              </div>

              {/* Verify link */}
              <a
                href={tooltipData.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:     "inline-flex",
                  alignItems:  "center",
                  gap:         "4px",
                  color:       "#5918df",
                  fontSize:    "11px",
                  fontFamily:  "'Fira Code', monospace",
                  textDecoration: "none",
                }}
              >
                Verify credentials ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CodeLine
// ─────────────────────────────────────────────────────────────────────────────
interface CodeLineProps {
  lineNumber:      number;
  tokens:          SerToken[];
  enableTooltips:  boolean;
  onTooltipEnter:  (data: TooltipData) => void;
  onTooltipLeave:  () => void;
}

function CodeLine({
  lineNumber,
  tokens,
  enableTooltips,
  onTooltipEnter,
  onTooltipLeave,
}: CodeLineProps) {
  const fullText     = tokens.map((t) => t.content).join("");
  const leadingSpaces = fullText.match(/^( *)/)?.[1] ?? "";
  const indentDepth  = Math.floor(leadingSpaces.length / 2);
  let   spacesLeft   = leadingSpaces.length;

  return (
    <div className="group flex items-stretch w-full hover:bg-[#ffffff05] transition-colors duration-150">

      {/* ── Col 1 · Line number ──────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="select-none flex-shrink-0 inline-flex items-center justify-end text-[12px]"
        style={{
          minWidth:            "2.5rem",
          paddingRight:        "0.75rem",
          color:               "rgba(255,255,255,0.08)",
          fontVariantNumeric:  "tabular-nums",
        }}
      >
        {String(lineNumber).padStart(2, "0")}
      </span>

      {/* ── Col 2 · Purple accent gutter line ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="flex-shrink-0 self-stretch"
        style={{ width: "1px", background: "rgba(89,24,223,0.5)" }}
      />

      {/* ── Col 3 · Code tokens ───────────────────────────────────────────── */}
      <span
        className="whitespace-pre inline-flex items-center"
        style={{
          paddingLeft:  "1.25rem",
          paddingRight: "3rem",
          textShadow:   "0 0 2px rgba(255,255,255,0.07)",
        }}
      >
        {/* Indentation guide dots — near-invisible, structural only */}
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

          // Strip already-consumed leading spaces
          if (spacesLeft > 0) {
            const strip = Math.min(spacesLeft, content.length);
            content  = content.slice(strip);
            spacesLeft -= strip;
          }
          if (!content) return null;

          const style: CSSProperties = {};
          if (token.color)  style.color      = token.color;
          if (token.italic) style.fontStyle   = "italic";
          if (token.bold)   style.fontWeight  = "bold";

          // ── Blinking | cursor — replaces the ▋ marker ──────────────────
          if (content.includes("▋")) {
            const [before, after] = content.split("▋");
            return (
              <Fragment key={i}>
                {before && <span style={style}>{before}</span>}
                <span className="animate-blink" style={{ color: "#5918df" }}>|</span>
                {after  && <span style={style}>{after}</span>}
              </Fragment>
            );
          }

          // ── Cert tooltip trigger (Credentials tab only) ─────────────────
          if (enableTooltips) {
            const tipData = getTooltip(content);
            if (tipData) {
              return (
                <span
                  key={i}
                  style={{
                    ...style,
                    borderBottom: "1px dashed rgba(89,24,223,0.55)",
                    cursor: "help",
                  }}
                  onMouseEnter={() => onTooltipEnter(tipData)}
                  onMouseLeave={onTooltipLeave}
                >
                  {content}
                </span>
              );
            }
          }

          return <span key={i} style={style}>{content}</span>;
        })}
      </span>
    </div>
  );
}
