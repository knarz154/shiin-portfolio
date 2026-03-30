"use client";

import dynamic from "next/dynamic";

// These sections access browser APIs during render; ssr: false prevents
// server-side rendering crashes and hydration mismatches.
const WorkSection = dynamic(() => import("@/components/WorkSection"), { ssr: false });
const LabSection  = dynamic(() => import("@/components/LabSection"),  { ssr: false });

export default function DynamicWorkLabSections() {
  return (
    <>
      <WorkSection />
      <LabSection />
    </>
  );
}
