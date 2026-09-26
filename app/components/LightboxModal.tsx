"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/sound";

export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: "Cinematic & Concerts" | "Weddings & Couples" | "Portraits & Editorial" | "Commercial & Events";
  aspect: "landscape" | "portrait" | "square";
  year: string;
  location: string;
  camera: string;
  lens: string;
  settings: string;
  description: string;
}

interface LightboxModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalPhotos: number;
  currentIndex: number;
}

export default function LightboxModal({
  photo,
  onClose,
  onNext,
  onPrev,
  totalPhotos,
  currentIndex,
}: LightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showMetadata, setShowMetadata] = useState<boolean>(true);

  // Reset zoom & pan when photo changes
  useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [photo]);

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        sound.playTick();
        onNext();
      } else if (e.key === "ArrowLeft") {
        sound.playTick();
        onPrev();
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(3, prev + 0.5));
      } else if (e.key === "-") {
        setZoomLevel((prev) => Math.max(1, prev - 0.5));
      } else if (e.key.toLowerCase() === "i") {
        setShowMetadata((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  // Mouse pan handlers when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomToggle = () => {
    sound.playTick();
    setZoomLevel((prev) => (prev >= 2.5 ? 1 : prev + 0.75));
    if (zoomLevel >= 2.5) {
      setPanOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-all"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-30 pointer-events-auto bg-gradient-to-b from-black/90 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
          <div>
            <h3 className="text-white font-black text-sm sm:text-base tracking-wider uppercase">
              {photo.title}
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              {photo.category} • {photo.location} ({photo.year})
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Level Indicator & Toggle */}
          <button
            onClick={handleZoomToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-zinc-200 transition-all"
            title="Toggle Zoom Inspection"
          >
            <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
            <span>{zoomLevel.toFixed(1)}x</span>
          </button>

          {/* Toggle Metadata Overlay */}
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              showMetadata
                ? "bg-[#d4af37]/20 border-[#d4af37]/50 text-[#d4af37]"
                : "bg-white/10 border-white/10 text-zinc-400"
            }`}
            title="Toggle EXIF Metadata"
          >
            EXIF (I)
          </button>

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all ml-2"
            title="Close Lightbox (Esc)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Image Viewing Container */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-16 overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        <div
          className="relative max-w-full max-h-[85vh] transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.title}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-white/10 pointer-events-none"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          sound.playTick();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 text-white transition-all hover:scale-110 shadow-2xl z-30"
        title="Previous Photograph (Left Arrow)"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          sound.playTick();
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 text-white transition-all hover:scale-110 shadow-2xl z-30"
        title="Next Photograph (Right Arrow)"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom EXIF & Narrative Overlay */}
      {showMetadata && (
        <div
          className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-2xl w-full p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl z-30 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-2 mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37]">
                TECHNICAL TELEMETRY
              </span>
              <p className="text-xs sm:text-sm font-mono text-zinc-200">
                {photo.camera} • {photo.lens}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                EXPOSURE SPEC
              </span>
              <p className="text-xs font-mono font-bold text-white tracking-wider">
                {photo.settings}
              </p>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {photo.description}
          </p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
            <span>DRAG TO PAN WHEN ZOOMED</span>
            <span>
              ARCHIVE INDEX: {currentIndex + 1} / {totalPhotos}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
