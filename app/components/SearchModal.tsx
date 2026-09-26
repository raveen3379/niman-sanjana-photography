"use client";

import React, { useState, useEffect } from "react";
import { sound } from "../utils/sound";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  category: string;
  title: string;
  desc: string;
  href: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    category: "Portfolio",
    title: "Live Concert Lighting & Drums",
    desc: "Stage performance photography with high-contrast dynamic lighting",
    href: "#portfolio",
  },
  {
    category: "Portfolio",
    title: "Ocean Cliff Romantic Wedding",
    desc: "Fine-art coastal bridal and couple session in southern Sri Lanka",
    href: "#portfolio",
  },
  {
    category: "Portfolio",
    title: "Low-Key Studio Portrait",
    desc: "Dramatic black & white portrait with chiaroscuro rim lighting",
    href: "#portfolio",
  },
  {
    category: "Portfolio",
    title: "Botanical Outdoor Bridal Session",
    desc: "Lakeside morning light wedding editorial with natural flora",
    href: "#portfolio",
  },
  {
    category: "Portfolio",
    title: "Traditional Sri Lankan Wedding",
    desc: "Kandyan white ceremony with intricate cultural details",
    href: "#portfolio",
  },
  {
    category: "Interactive 3D",
    title: "3D Cinema Lens & Camera Rig",
    desc: "Inspect multi-element optics, aperture blades, and focal lengths in Three.js",
    href: "#lens3d",
  },
  {
    category: "Cinema Reel",
    title: "Director's Cut 4K Showreel",
    desc: "Watch the cinematic timeline reel and high-definition showreel teaser",
    href: "#showreel",
  },
  {
    category: "Telemetry & Gear",
    title: "Sony FX3 & G Master Arsenal",
    desc: "Technical camera telemetry, dual native ISO 800/12800, and S-Log3 color science",
    href: "#telemetry",
  },
  {
    category: "About",
    title: "Niman Sanjana Creative Vision",
    desc: "Background, creative philosophy, stats, and international publications",
    href: "#about",
  },
  {
    category: "Services & Booking",
    title: "The Heirloom Wedding Package",
    desc: "Full day 4K multi-cam coverage, drone aerials, and leather-bound album",
    href: "#services",
  },
  {
    category: "Services & Booking",
    title: "Editorial & Commercial Inquiry",
    desc: "Book a shoot, request consultation, and estimate project pricing",
    href: "#contact",
  },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      sound.playShutterClick();
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
        sound.playTick();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
        sound.playTick();
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        sound.playShutterClick();
        window.location.href = filtered[selectedIndex].href;
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-xl transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#0e0e14] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <svg
            className="w-5 h-5 text-[#d4af37] mr-3 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search portfolio, 3D lens, gear, packages, or bookings..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm font-mono">
              No matching archive records found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => {
                  sound.playShutterClick();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-start justify-between p-3 rounded-xl transition-colors ${
                  selectedIndex === idx
                    ? "bg-white/10 border-l-2 border-[#d4af37]"
                    : "hover:bg-white/5"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-[#d4af37] border border-[#d4af37]/20">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-zinc-500 ml-4 shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Use ↑ ↓ to navigate</span>
          <span>↵ to select</span>
        </div>
      </div>
    </div>
  );
}
