import Navbar from "@/components/Navbar";
import HeroScrollStory from "@/sections/HeroScrollStory";
import FrictionSection from "@/sections/FrictionSection";
import ForecastTeaseSection from "@/components/home/ForecastTeaseSection";
import FeaturesPreviewSection from "@/components/home/FeaturesPreviewSection";
import TrustTeaseSection from "@/components/home/TrustTeaseSection";
import FinalCTA from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main className="bg-[#2E2F2B] w-full selection:bg-white/20">
      <Navbar />

      {/* ── Strongest Assets (preserved) ── */}
      <HeroScrollStory />
      <FrictionSection />

      {/* ── New Spec Sections ── */}
      <ForecastTeaseSection />
      <FeaturesPreviewSection />
      <TrustTeaseSection />

      {/* ── Conversion ── */}
      <FinalCTA />
    </main>
  );
}
