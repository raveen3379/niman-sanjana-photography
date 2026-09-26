"use client";

import React from "react";
import { sound } from "../utils/sound";

export default function AboutSection() {
  const stats = [
    { value: "08+", label: "YEARS OF CRAFT", sub: "Mastering light & color science" },
    { value: "450+", label: "CAPTURED STORIES", sub: "Weddings, concerts, & editorial" },
    { value: "15+", label: "DESTINATION SHOOTS", sub: "Sri Lanka, Maldives, & beyond" },
    { value: "100%", label: "BESPOKE GRADING", sub: "Handcrafted color profiles" },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#07070a] border-t border-zinc-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Composite */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Portrait Card */}
              <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] aspect-[4/5] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/niman_profile.jpg"
                  alt="Niman Sanjana Creative Director"
                  className="w-full h-full object-cover object-center filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-extrabold text-base tracking-wider uppercase">
                        NIMAN SANJANA
                      </h4>
                      <p className="text-[11px] font-mono text-[#d4af37] tracking-widest uppercase">
                        DIRECTOR OF PHOTOGRAPHY & FOUNDER
                      </p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Secondary Casual Frame */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-44 h-52 rounded-2xl overflow-hidden bg-black border-2 border-white/15 shadow-2xl z-20 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/niman_portrait_casual.jpg"
                  alt="Niman Sanjana on shoot"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 right-2 text-center text-[9px] font-mono text-zinc-300 bg-black/70 backdrop-blur-sm py-1 rounded">
                  ON-LOCATION NIGHT SHOOT
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
              <span className="text-xs font-mono font-bold tracking-[0.35em] text-[#d4af37] uppercase">
                THE EYE BEHIND THE LENS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              CAPTURING THE <span className="text-[#d4af37] gold-glow">EMOTIONAL LATITUDE</span> OF LIFE
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 mt-6 leading-relaxed font-sans">
              Photography is not merely freezing a split second—it is sculpting light, honoring vulnerability,
              and etching a feeling into immortality. Based in Sri Lanka and working internationally,
              I approach every assignment with an unyielding dedication to cinema aesthetics.
            </p>

            <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-sans">
              From the thunderous strobe lights of concert stages to the sacred, quiet intimacy of coastal
              vows, my visual language combines anamorphic lenses, nuanced chiaroscuro contrast, and bespoke
              color grading to make ordinary moments feel larger than life.
            </p>

            {/* Gear & Approach Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-xs font-mono font-bold text-[#d4af37] tracking-wider uppercase block">
                  [01] THE GEAR PHILOSOPHY
                </span>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  We invest in cinema-line full-frame bodies, G Master prime optics, and high-CRI lighting
                  to guarantee zero compromise under any ambient condition.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-xs font-mono font-bold text-[#d4af37] tracking-wider uppercase block">
                  [02] BESPOKE COLOR SCIENCE
                </span>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Every delivered image and video is individually tone-mapped with custom film LUTs,
                  ensuring timeless skin tones and painterly highlight roll-off.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-semibold mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#contact"
                onClick={() => sound.playCinematicBoom()}
                className="px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#e5c04b] text-black text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
              >
                DISCUSS YOUR PROJECT
              </a>
              <a
                href="#portfolio"
                onClick={() => sound.playTick()}
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-bold tracking-widest uppercase border border-white/10 transition-all active:scale-95"
              >
                VIEW ARCHIVE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
