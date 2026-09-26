"use client";

import React, { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import { sound } from "../utils/sound";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playShutterClick();
    }
  };

  const navLinks = [
    { name: "REEL SCRUB", href: "#hero" },
    { name: "3D OPTICS", href: "#lens3d" },
    { name: "PORTFOLIO", href: "#portfolio" },
    { name: "SHOWREEL", href: "#showreel" },
    { name: "TELEMETRY", href: "#telemetry" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#060608]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Monogram */}
          <a
            href="#hero"
            onClick={() => sound.playShutterClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white font-mono font-black text-sm group-hover:border-[#d4af37] transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="text-[#d4af37]">N</span>S
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-sm sm:text-base tracking-[0.2em] uppercase leading-tight group-hover:text-[#d4af37] transition-colors">
                NIMAN SANJANA
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
                PHOTOGRAPHY & CINEMA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playTick()}
                className="text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-colors uppercase relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Availability Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>BOOKINGS OPEN 2026/27</span>
            </div>

            {/* Search CMD+K Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
              title="Search Archive (Cmd + K)"
            >
              <svg
                className="w-3.5 h-3.5 text-[#d4af37]"
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
              <span className="hidden sm:inline">SEARCH</span>
              <kbd className="hidden sm:inline text-[9px] bg-black/50 px-1 py-0.5 rounded text-zinc-400 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all ${
                isMuted
                  ? "bg-white/5 border-white/10 text-zinc-500"
                  : "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]"
              }`}
              title={isMuted ? "Unmute Shutter & Sound FX" : "Mute Sound FX"}
            >
              {isMuted ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>

            {/* Book A Shoot CTA */}
            <a
              href="#contact"
              onClick={() => sound.playCinematicBoom()}
              className="px-4 sm:px-5 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5c04b] text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] active:scale-95"
            >
              BOOK A SHOOT
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              title="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pt-3 pb-6 bg-[#0c0c12]/95 border-b border-white/10 backdrop-blur-2xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    sound.playTick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-mono tracking-widest text-zinc-300 hover:text-[#d4af37] hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Worldwide
                </span>
                <span className="text-zinc-500">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Spotlight */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
