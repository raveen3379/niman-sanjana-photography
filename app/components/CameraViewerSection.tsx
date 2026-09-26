"use client";

import React from "react";
import dynamic from "next/dynamic";

const CameraViewer = dynamic(() => import("./CameraViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] sm:h-[660px] rounded-3xl bg-[#09090e] border border-white/10 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mb-4" />
      <span className="text-xs font-mono font-bold tracking-[0.3em] text-white uppercase">
        INITIALIZING 3D OPTICAL ENGINE
      </span>
      <span className="text-[11px] font-mono text-[#d4af37] mt-1 font-semibold">
        CINE PRIME RAY-TRACING SHADERS
      </span>
    </div>
  ),
});

export default function CameraViewerSection() {
  const opticalSpecs = [
    { label: "FRONT APERTURE", value: "T1.2 - T16 (9 Circular Blades)" },
    { label: "OPTICAL RESOLUTION", value: "8K+ High-Contrast Telecentric" },
    { label: "COATING SCIENCE", value: "Nano AR Multi-layer Anti-Reflective" },
    { label: "MOUNT STANDARD", value: "PL / Sony E-Mount Titanium Bayonet" },
  ];

  return (
    <section
      id="lens3d"
      className="relative py-28 bg-[#060608] border-t border-zinc-900 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className="text-xs font-mono font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              INTERACTIVE 3D GEAR LAB // THREE.JS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            THE ANATOMY OF <span className="text-[#d4af37] gold-glow">PRECISION GLASS</span>
          </h2>

          <p className="max-w-2xl mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every frame captured by Niman Sanjana is forged through specialized anamorphic and
            high-speed prime glass. Interact with our flagship 3D cinema lens below — adjust the iris blades,
            switch focal lengths, and inspect the CAD optical wireframe.
          </p>
        </div>

        {/* 3D Model Card Container */}
        <div className="p-3 sm:p-5 rounded-[2.5rem] bg-gradient-to-b from-[#12121a] via-[#0d0d13] to-[#07070a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          {/* Top Bar inside card */}
          <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 mb-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-[#d4af37] font-bold">LENS SPECIFICATION:</span>
              <span className="text-zinc-200">MASTER CINE PRIME // FULL-FRAME T1.2</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">IRIS SYSTEM: 9-BLADE CIRCULAR</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                WEBGL 2.0 SHADERS ACTIVE
              </span>
            </div>
          </div>

          {/* Interactive 3D Model Canvas */}
          <CameraViewer />

          {/* Bottom Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/10 px-2 sm:px-4">
            {opticalSpecs.map((spec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {spec.label}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-zinc-200 mt-0.5 block">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
