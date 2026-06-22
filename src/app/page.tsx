import Navbar from "@/components/Navbar";
import HeroScrollStory from "@/sections/HeroScrollStory";
import FrictionSection from "@/sections/FrictionSection";
import DashboardPreview from "@/sections/DashboardPreview";
import FinalCTA from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main className="bg-[#2E2F2B] w-full selection:bg-white/20">
      <Navbar />
      <HeroScrollStory />
      <FrictionSection />
      <DashboardPreview />
      <FinalCTA />
    </main>
  );
}
