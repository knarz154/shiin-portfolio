"use client";

import WorkSection from "@/components/WorkSection";
import LabSection from "@/components/LabSection";
import ClientOnly from "./ClientOnly";

export default function DynamicWorkLabSections() {
  return (
    <ClientOnly>
      <WorkSection />
      <LabSection />
    </ClientOnly>
  );
}
