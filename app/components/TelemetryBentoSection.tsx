"use client";

import React, { useState } from "react";
import { sound } from "../utils/sound";

export default function TelemetryBentoSection() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<"sensor" | "optics" | "color" | "rig">("color");

  const gearItems = [
    { name: "Sony FX3 Cinema Line", role: "Primary Body", detail: "Full-Frame 4K 120p, Dual Native ISO 800/12800", status: "Active" },
    { name: "Sony α7R V", role: "Stills & Editorial", detail: "61.0 MP BSI Sensor, 8-stop IBIS, AI Autofocus", status: "Ready" },
    { name: "Sony FE 50mm f/1.2 GM", role: "Signature Prime", detail: "Extreme low-light bokeh & edge-to-edge sharpness", status: "Mounted" },
    { name: "Sony FE 85mm f/1.4 GM", role: "Portrait Master", detail: "11-blade circular aperture, creamy falloff", status: "Standby" },
    { name: "DJI Ronin RS3 Pro", role: "Cinematic Gimbal", detail: "Carbon fiber arms, LiDAR automated focusing", status: "Calibrated" },
    { name: "Aputure 600d Pro", role: "Key Illumination", detail: "Daylight balanced 600W COB LED, Bowens Mount", status: "Rigged" },
  ];

  return (
    <section id="telemetry" className="relative py-28 bg-[#060608] border-t border-zinc-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className="text-xs font-mono font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              STUDIO TELEMETRY // COLOR SCIENCE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            THE CINEMATIC <span className="text-[#d4af37] gold-glow">TELEMETRY LAB</span>
          </h2>

          <p className="max-w-xl mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Behind every iconic photograph is a meticulous science of lighting angles, dynamic range
            preservation, and bespoke film LUT color transforms.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Interactive RAW vs Color Grade Split Slider (Span 8) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0e0e14] border border-white/10 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">
                  COLOR GRADING SUITE // BEFORE & AFTER
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  S-Log3 Flat Profile vs Hand-Mastered Film LUT
                </h3>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                DRAG SLIDER TO REVEAL
              </span>
            </div>

            {/* Split Comparison Image Frame */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden select-none border border-white/10 group">
              {/* After: Color Graded Version */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/concert_drums_live.jpg"
                alt="Color Graded Film Master"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#d4af37]/40 text-[10px] font-mono text-[#d4af37] font-bold">
                FINAL COLOR GRADE (LUT)
              </div>

              {/* Before: Raw / Desaturated S-Log3 Simulation (Clipped with slider) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/concert_drums_live.jpg"
                  alt="Raw S-Log3 Log Profile"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-75 brightness-125 saturate-50 sepia-0"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 font-bold">
                  FLAT RAW / S-LOG3
                </div>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,1)] pointer-events-none z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-lg font-bold text-xs">
                  ↔
                </div>
              </div>

              {/* Invisible Full-Overlay Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(parseFloat(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
              />
            </div>

            {/* Split description */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <span>HIGHLIGHT RETENTION: 99.4%</span>
              <span className="text-[#d4af37]">SHADOW ROLLOFF: SOFT CINEMA KNEE</span>
              <span>COLOR SPACE: DCI-P3 / REC.709</span>
            </div>
          </div>

          {/* Bento Card 2: Live Sensor Scope & Histogram (Span 4) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0e0e14] border border-white/10 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">
                  EXPOSURE SCOPE // HISTOGRAM
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Luminance & RGB Waveform
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Real-time dynamic range analysis across 15+ stops of latitude.
              </p>

              {/* Histogram Visualization Graphic */}
              <div className="my-6 p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-end h-40 relative overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20">
                  <div className="w-full h-[1px] bg-white border-dashed" />
                  <div className="w-full h-[1px] bg-white border-dashed" />
                  <div className="w-full h-[1px] bg-white border-dashed" />
                  <div className="w-full h-[1px] bg-white border-dashed" />
                </div>

                {/* Animated Histogram Bars */}
                <div className="flex items-end justify-between gap-1 h-32 z-10">
                  {[20, 35, 65, 80, 95, 85, 70, 50, 40, 60, 75, 90, 60, 45, 30, 20, 15, 10].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        background:
                          i < 6
                            ? "linear-gradient(to top, rgba(230,57,70,0.6), rgba(230,57,70,0.9))"
                            : i < 12
                            ? "linear-gradient(to top, rgba(212,175,55,0.6), rgba(212,175,55,0.9))"
                            : "linear-gradient(to top, rgba(14,165,233,0.6), rgba(14,165,233,0.9))",
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mt-2 z-10">
                  <span>0 IRE (BLACKS)</span>
                  <span>50 IRE (MIDTONES)</span>
                  <span>100 IRE (PEAK)</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-zinc-500 block">BASE SENSITIVITY</span>
                <span className="text-white font-bold">ISO 800 / 12,800</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-zinc-500 block">BIT DEPTH</span>
                <span className="text-[#d4af37] font-bold">10-Bit 4:2:2 All-I</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: The Cinema Gear Locker (Span 8) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0e0e14] border border-white/10 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">
                  PRODUCTION ARSENAL // GEAR LOCKER
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  Flagship Cinema Cameras & Optical Glass
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">MILITARY GRADE CASES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {gearItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#d4af37]/30 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold">
                      {item.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#d4af37] mt-0.5">
                    {item.role}
                  </span>
                  <p className="text-xs text-zinc-400 mt-2 font-sans">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 4: Global Recognition & Experience (Span 4) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0e0e14] border border-white/10 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">
                ACCREDITATION // RECOGNITION
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide mt-1">
                International Recognition & Client Trust
              </h3>

              <div className="space-y-3 my-5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Global Village 4.0 Partner</h5>
                    <p className="text-[11px] text-zinc-400">Official Interactive Photobooth Director</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">NXS Media Co-Founder</h5>
                    <p className="text-[11px] text-zinc-400">Leading creative visual production agency</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">High-End Wedding Features</h5>
                    <p className="text-[11px] text-zinc-400">Top-rated destination photographer in Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>ESTABLISHED 2018</span>
              <span className="text-[#d4af37] font-bold">100% FIVE STAR REVIEWS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
