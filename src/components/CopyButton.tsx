"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-auto font-code text-[11px] flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all duration-200"
      style={{
        borderColor: copied ? "rgba(40,200,64,0.4)" : "rgba(255,255,255,0.06)",
        color: copied ? "#28c840" : "rgba(120,112,126,0.7)",
        background: copied ? "rgba(40,200,64,0.08)" : "transparent",
      }}
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#28c840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="#1a1b2e" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
