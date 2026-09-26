"use client";

import React from "react";
import { sound } from "../utils/sound";

export default function Footer() {
  const scrollToTop = () => {
    sound.playTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040406] border-t border-white/10 text-white pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (Span 5) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white font-mono font-black text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="text-[#d4af37]">N</span>S
              </div>
              <div>
                <span className="text-white font-black text-base tracking-[0.2em] uppercase block">
                  NIMAN SANJANA
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
                  PHOTOGRAPHY & CINEMA // NXS MEDIA
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed font-sans">
              Forging indelible cinematic memories through full-frame optics, high-contrast chiaroscuro
              lighting, and meticulous color grading. Available for luxury weddings, concerts, and commercial direction worldwide.
            </p>

            <div className="flex items-center gap-2 mt-6 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COLOMBO 07, SRI LANKA • AVAILABLE WORLDWIDE</span>
            </div>
          </div>

          {/* Quick Navigation (Span 3) */}
          <div className="lg:col-span-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#d4af37] uppercase font-bold block mb-4">
              ARCHIVE NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#hero" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 01. CINEMATIC TIMELINE REEL
                </a>
              </li>
              <li>
                <a href="#lens3d" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 02. INTERACTIVE 3D CINE LENS
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 03. CURATED PHOTO GALLERY
                </a>
              </li>
              <li>
                <a href="#showreel" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 04. 4K CINEMATIC SHOWREEL
                </a>
              </li>
              <li>
                <a href="#telemetry" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 05. SENSOR TELEMETRY & LUTs
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 06. ABOUT NIMAN SANJANA
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => sound.playTick()} className="hover:text-white transition-colors">
                  // 07. BESPOKE COMMISSIONS
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials (Span 4) */}
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#d4af37] uppercase font-bold block mb-4">
              DIRECT CHANNELS
            </span>
            <p className="text-xs text-zinc-400 mb-4 font-sans">
              Follow behind-the-scenes production reels, lighting breakdowns, and daily captures.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { name: "INSTAGRAM", url: "https://instagram.com" },
                { name: "YOUTUBE", url: "https://youtube.com" },
                { name: "TIKTOK", url: "https://tiktok.com" },
                { name: "VIMEO", url: "https://vimeo.com" },
                { name: "WHATSAPP", url: "https://wa.me/94770000000" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTick()}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#d4af37] hover:text-black border border-white/10 text-[11px] font-mono tracking-wider transition-all"
                >
                  {s.name}
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <div className="mt-8">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#d4af37] transition-colors"
              >
                <span>BACK TO APERTURE APEX</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} NIMAN SANJANA PHOTOGRAPHY & CINEMATOGRAPHY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">DESIGNED WITH HIGH-OCTANE CINEMA AESTHETICS</span>
            <span className="text-[#d4af37]">•</span>
            <span>NXS MEDIA GLOBAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
