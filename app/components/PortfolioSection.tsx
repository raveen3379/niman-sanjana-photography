"use client";

import React, { useState } from "react";
import LightboxModal, { PhotoItem } from "./LightboxModal";
import { sound } from "../utils/sound";

const PORTFOLIO_DATA: PhotoItem[] = [
  {
    id: "photo-1",
    src: "/images/concert_drums_live.jpg",
    title: "Percussive Rhythm & Stage Glow",
    category: "Cinematic & Concerts",
    aspect: "landscape",
    year: "2025",
    location: "Manohari Live Concert, Colombo",
    camera: "Sony FX3 Cinema Line",
    lens: "FE 24-70mm f/2.8 GM II",
    settings: "1/250s • f/2.8 • ISO 3200 • 35mm",
    description:
      "Captured live on stage during a high-octane musical concert. Balanced deep stage amber warm washes against cyan LED backdrops to emphasize the raw kinetic energy of the performance.",
  },
  {
    id: "photo-2",
    src: "/images/wedding_ocean_cliff.jpg",
    title: "Whispers by the Indian Ocean",
    category: "Weddings & Couples",
    aspect: "landscape",
    year: "2025",
    location: "Bentota Coastal Cliffs, Sri Lanka",
    camera: "Sony α7R V Full-Frame",
    lens: "FE 85mm f/1.4 GM",
    settings: "1/800s • f/1.8 • ISO 100 • 85mm",
    description:
      "A serene, windswept moment between bride and groom overlooking the ocean swells. Hand-graded with subtle muted film tones to evoke timeless cinematic romance.",
  },
  {
    id: "photo-3",
    src: "/images/portrait_bw.jpg",
    title: "Chiaroscuro Silhouette & Solitude",
    category: "Portraits & Editorial",
    aspect: "portrait",
    year: "2024",
    location: "NXS Studio, Colombo",
    camera: "Sony α7R V Full-Frame",
    lens: "FE 50mm f/1.2 GM",
    settings: "1/200s • f/1.4 • ISO 50 • 50mm",
    description:
      "An exploration of pure shadow and form. Using a single focused key light with negative fill on the camera left to sculpt deep dramatic tonality in monochrome.",
  },
  {
    id: "photo-4",
    src: "/images/bride_nature_portrait.jpg",
    title: "The Botanical Solitude",
    category: "Weddings & Couples",
    aspect: "portrait",
    year: "2024",
    location: "Kandy Mountain Sanctuary",
    camera: "Sony FX3 Cinema Line",
    lens: "FE 85mm f/1.4 GM",
    settings: "1/1000s • f/1.4 • ISO 100 • 85mm",
    description:
      "A contemplative bridal portrait framed by lush tropical foliage and reflective waters. Dreamy shallow depth of field rendering creamy foreground bokeh.",
  },
  {
    id: "photo-5",
    src: "/images/sri_lankan_traditional_wedding.jpg",
    title: "Heritage & Kandyan Elegance",
    category: "Weddings & Couples",
    aspect: "portrait",
    year: "2024",
    location: "Peradeniya Botanical Gardens",
    camera: "Sony α7R V Full-Frame",
    lens: "FE 70-200mm f/2.8 GM OSS II",
    settings: "1/640s • f/2.8 • ISO 160 • 135mm",
    description:
      "Traditional Sri Lankan ceremony showcasing the pristine white Kandyan attire, intricate head jewelry, and floral bouquet against an expansive emerald canopy.",
  },
  {
    id: "photo-6",
    src: "/images/couple_silhouette_bw.jpg",
    title: "Metropolitan Twilight Embrace",
    category: "Weddings & Couples",
    aspect: "landscape",
    year: "2025",
    location: "Galle Road, Colombo",
    camera: "Sony FX3 Cinema Line",
    lens: "FE 35mm f/1.4 GM",
    settings: "1/160s • f/1.4 • ISO 800 • 35mm",
    description:
      "An intimate kiss caught in the bustling urban evening twilight. High-contrast black and white color grading elevates the timeless, classic mood of the couple.",
  },
  {
    id: "photo-7",
    src: "/images/niman_profile.jpg",
    title: "The Creative Director Profile",
    category: "Portraits & Editorial",
    aspect: "square",
    year: "2025",
    location: "Colombo Creative Quarter",
    camera: "Sony α7R V Full-Frame",
    lens: "FE 50mm f/1.2 GM",
    settings: "1/500s • f/1.4 • ISO 200 • 50mm",
    description:
      "Niman Sanjana in his signature aesthetic — dual-tone ambient studio illumination with deep matte charcoal tones and modern cinematic presence.",
  },
  {
    id: "photo-8",
    src: "/images/photobooth_brand.jpg",
    title: "Instant Photobooth by NXS Media",
    category: "Commercial & Events",
    aspect: "square",
    year: "2025",
    location: "Global Village 4.0, Exhibition Arena",
    camera: "Commercial Studio Rig",
    lens: "FE 24-70mm f/2.8 GM II",
    settings: "1/160s • f/8.0 • ISO 100 • 50mm",
    description:
      "Official brand branding and visual experience for the Instant Photobooth experiential installation at Global Village 4.0, powered by Niman Sanjana Photography and NXS Media.",
  },
  {
    id: "photo-9",
    src: "/frames/frame_070.jpg",
    title: "Runway Noir & Pageant Precision",
    category: "Cinematic & Concerts",
    aspect: "landscape",
    year: "2025",
    location: "Grand Ballroom Runway, Colombo",
    camera: "Sony FX3 Cinema Line",
    lens: "Master Cine Prime 35mm T1.4",
    settings: "1/50s • T1.4 • ISO 1600 • 35mm (180° Shutter)",
    description:
      "Extracted directly from Niman Sanjana's Master Reel. High-fashion models moving in sync under diffuse catwalk spotlighting with vintage film perforation borders.",
  },
  {
    id: "photo-10",
    src: "/frames/frame_300.jpg",
    title: "Cultural Vibrance in 16:9 Cinema",
    category: "Commercial & Events",
    aspect: "landscape",
    year: "2025",
    location: "Heritage Pavilion, Sri Lanka",
    camera: "Sony FX3 Cinema Line",
    lens: "Master Cine Prime 50mm T1.2",
    settings: "1/50s • T1.2 • ISO 800 • 50mm (180° Shutter)",
    description:
      "Frame from the master cinema timeline. Rich saturated pinks, gold embroidery, and gentle bokeh rendering joyful celebrations.",
  },
  {
    id: "photo-11",
    src: "/frames/frame_500.jpg",
    title: "The Rave & Festival Electric Tide",
    category: "Cinematic & Concerts",
    aspect: "landscape",
    year: "2025",
    location: "Lisandr Arena Live Fest",
    camera: "Sony FX3 Cinema Line",
    lens: "FE 16-35mm f/2.8 GM",
    settings: "1/50s • T2.8 • ISO 3200 • 16mm",
    description:
      "Vintage 35mm perforated film aesthetic capturing the ecstatic roar of a packed indoor festival crowd with animated film grain.",
  },
  {
    id: "photo-12",
    src: "/images/niman_portrait_casual.jpg",
    title: "Night Vision: The Photographer at Work",
    category: "Portraits & Editorial",
    aspect: "square",
    year: "2024",
    location: "Colombo Night Streets",
    camera: "Sony α7R V Full-Frame",
    lens: "FE 85mm f/1.4 GM",
    settings: "1/125s • f/1.4 • ISO 1600 • 85mm",
    description:
      "Environmental night portrait of Niman Sanjana against street neon and urban bokeh during an on-location cinematic production shoot.",
  },
];

type CategoryFilter =
  | "All Works"
  | "Cinematic & Concerts"
  | "Weddings & Couples"
  | "Portraits & Editorial"
  | "Commercial & Events";

const CATEGORIES: CategoryFilter[] = [
  "All Works",
  "Cinematic & Concerts",
  "Weddings & Couples",
  "Portraits & Editorial",
  "Commercial & Events",
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All Works");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos =
    activeCategory === "All Works"
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((p) => p.category === activeCategory);

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNextPhoto = () => {
    if (currentIndex >= 0 && currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredPhotos[0]);
    }
  };

  const handlePrevPhoto = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  return (
    <section id="portfolio" className="relative py-28 bg-[#060608] border-t border-zinc-900">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-red-950/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className="text-xs font-mono font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              CURATED ARCHIVE // 2024 - 2026
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            SELECTED <span className="text-[#d4af37] gold-glow">WORKS</span> & FRAMES
          </h2>

          <p className="max-w-2xl mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            A hand-picked collection spanning high-energy concert stages, intimate destination weddings,
            dramatic editorial fashion, and signature 35mm film timeline reels.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playTick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#d4af37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Dynamic Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                sound.playShutterClick();
                setSelectedPhoto(photo);
              }}
              className="group relative rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-[0_15px_45px_rgba(0,0,0,0.9)] hover:-translate-y-1.5"
            >
              {/* Photo Image View */}
              <div
                className={`relative w-full overflow-hidden bg-black ${
                  photo.aspect === "portrait"
                    ? "aspect-[3/4]"
                    : photo.aspect === "square"
                    ? "aspect-square"
                    : "aspect-[16/10]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Film Grain Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10 uppercase tracking-wider">
                    {photo.category}
                  </span>
                </div>

                {/* Lens Spec Badge on Hover */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2.5 py-1 rounded-md bg-[#d4af37] text-[10px] font-mono font-bold text-black uppercase tracking-wider shadow-lg">
                    {photo.lens}
                  </span>
                </div>

                {/* Expand Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                    <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Card Details */}
              <div className="p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
                    <span>{photo.location}</span>
                    <span>{photo.year}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[#d4af37] transition-colors">
                    {photo.title}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate mr-2">{photo.camera}</span>
                  <span className="text-[#d4af37] shrink-0 font-semibold">{photo.settings.split("•")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        totalPhotos={filteredPhotos.length}
        currentIndex={currentIndex}
      />
    </section>
  );
}
