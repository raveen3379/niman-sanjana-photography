import Navbar from "./components/Navbar";
import HeroCanvas from "./components/HeroCanvas";
import CameraViewerSection from "./components/CameraViewerSection";
import PortfolioSection from "./components/PortfolioSection";
import CinematicReelSection from "./components/CinematicReelSection";
import FramesSection from "./components/FramesSection";
import GalleryPlaySection from "./components/GalleryPlaySection";
import TelemetryBentoSection from "./components/TelemetryBentoSection";
import AboutSection from "./components/AboutSection";
import ServicesBookingSection from "./components/ServicesBookingSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060608] text-[#f4f4f6] flex flex-col selection:bg-[#d4af37] selection:text-black">
      {/* Top Floating Glass Navigation with Audio Toggle & Command Palette */}
      <Navbar />

      {/* Hero Section: 912-Frame Cinematic Timeline Reel Scrub & Playback */}
      <HeroCanvas />

      {/* Interactive 3D Cinema Prime Lens & Optics Rig in Three.js */}
      <CameraViewerSection />

      {/* Curated Photography Archive & High-Resolution Lightbox Inspection */}
      <PortfolioSection />

      {/* NEW SECTION: Curated Stills & Photographic Plates (Interactive Card Stack) */}
      <FramesSection />

      {/* NEW SECTION: Gallery Play Carousel */}
      <GalleryPlaySection />

      {/* Director's Cut 4K Cinematic Showreel Showcase */}
      <CinematicReelSection />

      {/* Studio Telemetry, RAW vs LUT Color Grade Slider, & Camera Rig */}
      <TelemetryBentoSection />

      {/* About Niman Sanjana: Philosophy, Storytelling & Accreditations */}
      <AboutSection />

      {/* Production Packages & Interactive Booking Terminal */}
      <ServicesBookingSection />

      {/* Global Studio Footer */}
      <Footer />
    </main>
  );
}
