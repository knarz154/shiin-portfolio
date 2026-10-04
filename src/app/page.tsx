import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DynamicWorkLabSections from "@/components/DynamicWorkLabSections";
import AboutSection from "@/components/AboutSection";
import IDECodeBlock from "@/components/IDECodeBlock";
import ContactSection from "@/components/ContactSection";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ClientOnly from "@/components/ClientOnly";

export default function HomePage() {
  return (
    <>
      <Loader />
      <ClientOnly>
        <AtmosphereBackground />
      </ClientOnly>
      <ClientOnly>
        <ScrollProgressBar />
      </ClientOnly>
      <Navbar />
      <main className="relative z-[1]">
        <HeroSection />
        <DynamicWorkLabSections />
        <AboutSection>
          <IDECodeBlock />
        </AboutSection>
        <ContactSection />
      </main>
    </>
  );
}
