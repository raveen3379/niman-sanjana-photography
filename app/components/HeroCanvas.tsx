"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { sound } from "../utils/sound";

const START_FRAME = 47;
const END_FRAME = 567;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 521 frames

function getFramePath(frameNum: number): string {
  const padded = String(frameNum).padStart(3, "0");
  return `/frames/frame_${padded}.jpg`;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Store preloaded HTMLImageElements keyed by absolute frame number (47 to 567)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedSetRef = useRef<Set<number>>(new Set());

  // Smoothing and animation refs (tracking absolute frame numbers 47 to 567)
  const currentFrameRef = useRef<number>(START_FRAME);
  const targetFrameRef = useRef<number>(START_FRAME);
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Auto-play state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playSpeedRef = useRef<number>(1);
  const [playSpeed, setPlaySpeed] = useState<number>(1);

  // HUD & Progress States
  const [activeFrameDisplay, setActiveFrameDisplay] = useState<number>(START_FRAME);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);

  // Fallback to closest loaded frame to ensure jitter-free scrub
  const getClosestLoadedImage = useCallback(
    (desiredFrame: number): HTMLImageElement | null => {
      const images = imagesRef.current;
      if (images.has(desiredFrame) && loadedSetRef.current.has(desiredFrame)) {
        return images.get(desiredFrame) || null;
      }

      for (let distance = 1; distance <= 120; distance++) {
        const lower = desiredFrame - distance;
        if (lower >= START_FRAME && images.has(lower) && loadedSetRef.current.has(lower)) {
          return images.get(lower) || null;
        }
        const upper = desiredFrame + distance;
        if (upper <= END_FRAME && images.has(upper) && loadedSetRef.current.has(upper)) {
          return images.get(upper) || null;
        }
      }

      return images.get(START_FRAME) || null;
    },
    []
  );

  // Draw frame on canvas with aspect cover scaling & auto-orientation
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = getClosestLoadedImage(frameIndex);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const iWidth = img.naturalWidth;
      const iHeight = img.naturalHeight;

      // Handle portrait frame orientation (720x1280) -> rotate to cinematic 16:9 widescreen
      if (iWidth < iHeight) {
        const effectiveW = iHeight;
        const effectiveH = iWidth;
        const canvasAspect = cWidth / cHeight;
        const imgAspect = effectiveW / effectiveH;

        let drawW: number;
        let drawH: number;

        if (canvasAspect > imgAspect) {
          drawW = cWidth;
          drawH = cWidth / imgAspect;
        } else {
          drawH = cHeight;
          drawW = cHeight * imgAspect;
        }

        ctx.save();
        ctx.translate(cWidth / 2, cHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(img, -drawH / 2, -drawW / 2, drawH, drawW);
        ctx.restore();
      } else {
        // Standard landscape aspect cover
        const canvasAspect = cWidth / cHeight;
        const imgAspect = iWidth / iHeight;

        let drawW: number;
        let drawH: number;
        let offsetX: number;
        let offsetY: number;

        if (canvasAspect > imgAspect) {
          drawW = cWidth;
          drawH = cWidth / imgAspect;
          offsetX = 0;
          offsetY = (cHeight - drawH) / 2;
        } else {
          drawH = cHeight;
          drawW = cHeight * imgAspect;
          offsetX = (cWidth - drawW) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      }

      lastDrawnFrameRef.current = frameIndex;
    },
    [getClosestLoadedImage]
  );

  // Handle canvas resize with Retina devicePixelRatio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newWidth = Math.floor(displayWidth * dpr);
    const newHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      const frameToDraw = Math.min(
        END_FRAME,
        Math.max(START_FRAME, Math.round(currentFrameRef.current))
      );
      drawFrame(frameToDraw);
    }
  }, [drawFrame]);

  // Main animation loop for LERP smoothing and auto-playback
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        // Auto play progression at 30fps * speed
        const advance = 30 * playSpeedRef.current * delta;
        targetFrameRef.current += advance;
        if (targetFrameRef.current > END_FRAME) {
          targetFrameRef.current = START_FRAME;
        }
        currentFrameRef.current = targetFrameRef.current;
      } else {
        // Scroll LERP interpolation
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          currentFrameRef.current += diff * 0.16;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      const frameToDraw = Math.min(
        END_FRAME,
        Math.max(START_FRAME, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
        setActiveFrameDisplay(frameToDraw);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, isPlaying]);

  // Progressive intelligent preloading across START_FRAME to END_FRAME
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const updateBufferPercent = () => {
      if (isCancelled) return;
      const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      setLoadPercentage(pct);
    };

    const loadSingleFrame = (frameNum: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current.has(frameNum)) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFramePath(frameNum);

        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current.set(frameNum, img);
            loadedSetRef.current.add(frameNum);
            loadedCount++;
            updateBufferPercent();
            if (frameNum === START_FRAME && lastDrawnFrameRef.current === -1) {
              drawFrame(START_FRAME);
            }
          }
          resolve();
        };

        img.onerror = () => {
          resolve();
        };
      });
    };

    const runPreloadQueue = async () => {
      // 1. Initial priority anchor frames (key moments every 12 frames)
      const priorityIndices: number[] = [];
      for (let i = START_FRAME; i <= END_FRAME; i += 12) {
        priorityIndices.push(i);
      }
      if (!priorityIndices.includes(END_FRAME)) {
        priorityIndices.push(END_FRAME);
      }

      for (let i = 0; i < priorityIndices.length; i += 8) {
        if (isCancelled) return;
        const chunk = priorityIndices.slice(i, i + 8);
        await Promise.all(chunk.map((num) => loadSingleFrame(num)));
      }

      // 2. Stream all contiguous frames in balanced concurrent batches
      const remainingIndices: number[] = [];
      for (let i = START_FRAME; i <= END_FRAME; i++) {
        if (!loadedSetRef.current.has(i)) {
          remainingIndices.push(i);
        }
      }

      const BATCH_SIZE = 12;
      for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        const chunk = remainingIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(chunk.map((num) => loadSingleFrame(num)));
      }
    };

    runPreloadQueue();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Window resize & scroll listeners
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const handleScroll = () => {
      if (isPlaying) return; // scroll scrubbing pauses when auto-play active
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollPercent(progress * 100);

      // Map progress [0, 1] to frame [START_FRAME, END_FRAME]
      const targetFrame = START_FRAME + progress * (END_FRAME - START_FRAME);
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize, isPlaying]);

  // Smooth scroll down CTA
  const handleScrollDown = () => {
    sound.playTick();
    if (!containerRef.current) return;
    const targetScroll = window.scrollY + window.innerHeight * 1.5;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Toggle Auto Play Reel
  const handleTogglePlay = () => {
    sound.playShutterClick();
    setIsPlaying((prev) => !prev);
  };

  // Change playback speed
  const handleCycleSpeed = () => {
    sound.playTick();
    const nextSpeed = playSpeed === 1 ? 1.5 : playSpeed === 1.5 ? 2 : 1;
    playSpeedRef.current = nextSpeed;
    setPlaySpeed(nextSpeed);
  };

  // Timeline timecode computation (30 fps relative to sequence start)
  const formatTimecode = (frameNum: number) => {
    const relFrame = Math.max(0, frameNum - START_FRAME);
    const totalSeconds = relFrame / 30;
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const frames = Math.floor(relFrame % 30);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#060608]"
    >
      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Canvas Background Viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block select-none pointer-events-none"
        />

        {/* Cinematic Vignettes & Color Grading Gradients */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(6,6,8,0.2) 0%, rgba(6,6,8,0.78) 100%)",
          }}
        />

        {/* Content Layer */}
        <div className="relative z-20 flex-1 flex flex-col justify-between max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 pointer-events-none">
          {/* Top Camera Status & HUD */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_12px_rgba(212,175,55,1)]" />
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-zinc-300 uppercase font-bold">
                NIMAN SANJANA // FRAME 047 - 567 MASTER REEL
              </span>
            </div>

            {/* Buffer & Telemetry Pill */}
            <div className="flex items-center gap-2">
              {loadPercentage < 100 ? (
                <div className="hidden sm:flex items-center gap-2 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-zinc-400">
                  <span>BUFFERING SEQUENCE:</span>
                  <span className="text-[#d4af37] font-bold">{loadPercentage}%</span>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>521 FRAMES ACTIVE</span>
                </div>
              )}

              {/* Timecode Badge */}
              <div className="bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white font-bold tracking-widest">
                TC {formatTimecode(activeFrameDisplay)}
              </div>
            </div>
          </div>

          {/* Centered Hero Headline */}
          <div className="my-auto flex flex-col items-center text-center select-none py-6">
            {/* Top Subtitle Ribbon */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-8 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#d4af37]" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.35em] text-[#d4af37] uppercase gold-glow">
                CINEMATOGRAPHY & FINE ART DIRECTION
              </span>
              <div className="w-8 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>

            {/* Monumental Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-none cinema-shadow drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
              NIMAN <span className="text-[#d4af37] gold-glow">SANJANA</span>
            </h1>

            {/* Camera Spec Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-[10px] sm:text-xs font-mono tracking-widest text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
                SONY FX3 CINE LINE
              </span>
              <span className="text-[#d4af37] font-bold">•</span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
                MASTER PRIME T1.4
              </span>
              <span className="text-[#d4af37] font-bold">•</span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
                10-BIT 4:2:2 ALL-I
              </span>
              <span className="text-[#d4af37] font-bold">•</span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
                S-LOG3 FILM GRADE
              </span>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto">
              <a
                href="#portfolio"
                onClick={() => sound.playShutterClick()}
                className="px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#e6c148] text-black text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] active:scale-95"
              >
                EXPLORE GALLERY
              </a>
              <a
                href="#lens3d"
                onClick={() => sound.playTick()}
                className="px-6 py-3 rounded-full bg-black/65 hover:bg-black/85 text-white text-xs sm:text-sm font-bold tracking-widest uppercase border border-white/20 hover:border-[#d4af37]/60 backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                INTERACTIVE 3D LENS
              </a>
              <a
                href="#contact"
                onClick={() => sound.playCinematicBoom()}
                className="px-6 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs sm:text-sm font-bold tracking-widest uppercase border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                BOOK A SHOOT
              </a>
            </div>
          </div>

          {/* Bottom Interactive HUD: Scrub Controls & Frame Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
            {/* Tagline */}
            <div className="max-w-md text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg font-serif italic text-zinc-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                &ldquo;Capturing the unseen poetry between light and raw emotion.&rdquo;
              </p>
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">
                — Niman Sanjana Official Cinematics
              </p>
            </div>

            {/* Interactive Timeline Reel Control HUD */}
            <div className="flex flex-wrap items-center gap-3 bg-black/80 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl">
              {/* Play / Pause Reel Button */}
              <button
                onClick={handleTogglePlay}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isPlaying
                    ? "bg-[#e63946] text-white shadow-[0_0_15px_rgba(230,57,70,0.6)]"
                    : "bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-[#e5c04b]"
                }`}
                title={isPlaying ? "Pause cinematic timeline" : "Play cinematic reel automatically"}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>PLAY REEL</span>
                  </>
                )}
              </button>

              {/* Speed Cycler */}
              <button
                onClick={handleCycleSpeed}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-[11px] font-mono font-bold text-zinc-300 hover:text-white hover:border-[#d4af37]/40 transition-colors"
                title="Cycle Playback Speed"
              >
                {playSpeed}x
              </button>

              {/* Scrub Prompt Button */}
              <button
                onClick={handleScrollDown}
                className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-[#d4af37] transition-colors"
                title="Scroll down to scrub timeline frames"
              >
                <span className="tracking-wider uppercase">SCRUB REEL</span>
                <svg
                  className="w-3.5 h-3.5 text-[#d4af37] animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              <div className="w-[1px] h-6 bg-white/20" />

              {/* Exact Frame Counter HUD */}
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                  CINE FRAME
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-widest">
                  <span className="text-[#d4af37]">
                    {String(activeFrameDisplay).padStart(3, "0")}
                  </span>{" "}
                  / {END_FRAME}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-800/80 z-30">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#e63946] to-[#d4af37] transition-all duration-75 shadow-[0_0_12px_rgba(212,175,55,0.9)]"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
