"use client";

import React, { useRef, useState, useEffect } from "react";
import { sound } from "../utils/sound";

export default function CinematicReelSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:56");

  const togglePlay = () => {
    sound.playShutterClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    sound.playTick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    sound.playTick();
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 56;
    setProgress((cur / dur) * 100);

    const m = Math.floor(cur / 60);
    const s = Math.floor(cur % 60);
    setCurrentTime(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    const m = Math.floor(dur / 60);
    const s = Math.floor(dur % 60);
    setDuration(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPct = parseFloat(e.target.value);
    const dur = videoRef.current.duration || 56;
    videoRef.current.currentTime = (seekPct / 100) * dur;
    setProgress(seekPct);
  };

  return (
    <section id="showreel" className="relative py-28 bg-[#07070a] border-t border-zinc-900 overflow-hidden">
      {/* Glow diffuser */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse shadow-[0_0_10px_rgba(230,57,70,0.8)]" />
            <span className="text-xs font-mono font-bold tracking-[0.35em] text-[#e63946] uppercase">
              DIRECTOR&apos;S CUT // 4K CINEMATIC REEL
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            MOTION IN <span className="text-[#d4af37] gold-glow">HIGH DEFINITION</span>
          </h2>

          <p className="max-w-xl mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Experience the signature rhythm of Niman Sanjana Cinematics. Watch the full director&apos;s cut
            showreel featuring live festival performances, weddings, and high-energy cultural pageantry.
          </p>
        </div>

        {/* Video Theatre Container */}
        <div className="relative rounded-[2.5rem] bg-[#0c0c12] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden p-2 sm:p-4">
          {/* Top Video Status Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 text-xs font-mono text-zinc-400 border-b border-white/10 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-[#d4af37] font-bold">SOURCE:</span>
              <span className="text-zinc-200">MASTER SHOWREEL (4K DCI / 56 SECONDS)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HD PLAYBACK READY</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black group">
            <video
              ref={videoRef}
              src="/videos/showreel.mp4"
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Play Overlay Button if Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer transition-all z-20"
              >
                <div className="w-20 h-20 rounded-full bg-[#d4af37] flex items-center justify-center text-black shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="mt-4 text-xs font-mono font-bold tracking-[0.25em] text-white uppercase gold-glow">
                  START SHOWREEL PLAYBACK
                </span>
              </div>
            )}

            {/* In-Video Custom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Scrub Progress Bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 accent-[#d4af37] cursor-pointer rounded-lg"
              />

              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>

                  <span>
                    {currentTime} / {duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-zinc-400">1080P PRORES</span>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Fullscreen"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Production Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-3 border-t border-white/10 px-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37]">01.</span>
              <span>CINEMATIC COLOR SCIENCE // S-LOG3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37]">02.</span>
              <span>ANAMORPHIC FLARES & OVAL BOKEH</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37]">03.</span>
              <span>4K 120FPS SLOW MOTION CAPTURE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
