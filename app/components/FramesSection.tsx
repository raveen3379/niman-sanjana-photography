"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";

const IMAGES = [
  { src: "/images/sri_lankan_traditional_wedding.jpg", title: "TRADITION" },
  { src: "/images/bride_nature_portrait.jpg", title: "ETHEREAL" },
  { src: "/images/portrait_bw.jpg", title: "MONOCHROME" },
  { src: "/images/concert_drums_live.jpg", title: "RESONANCE" },
  { src: "/images/wedding_ocean_cliff.jpg", title: "HORIZON" },
  { src: "/images/couple_silhouette_bw.jpg", title: "SILHOUETTE" },
];

export default function FramesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = IMAGES[activeIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Map 0-1 progress to array index
      const index = Math.min(
        Math.floor(latest * IMAGES.length),
        IMAGES.length - 1
      );
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] my-12 max-w-[96%] mx-auto">
      <div className="sticky top-12 w-full h-[85vh] min-h-[600px] bg-[#060608] overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl">
        {/* Background Image Crossfade */}
        <AnimatePresence>
          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

      {/* Cinematic Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Massive Bold Typography Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden">
        <AnimatePresence>
          <motion.h2
            key={activeImage.title}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -15, filter: "blur(8px)", scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-[14vw] sm:text-[12vw] font-black tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            style={{ 
              lineHeight: 0.8,
            }}
          >
            {activeImage.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Floating Vertical Thumbnail Scroller */}
      <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 sm:p-2.5 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col gap-2 sm:gap-3"
        >
          {IMAGES.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button
                key={img.src}
                onClick={() => setActiveIndex(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-[1.2rem] overflow-hidden transition-all duration-300 ease-out ${
                  isActive 
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black/50 shadow-[0_0_30px_rgba(255,255,255,0.4)] opacity-100" 
                    : "opacity-40 hover:opacity-80 grayscale-[30%]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={`Thumbnail ${idx}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
        <div className="absolute bottom-6 left-8 z-30 text-white/50 font-mono text-[10px] tracking-[0.25em] uppercase pointer-events-none hidden md:block">
          CMS_SCROLL_GALLERY // 0{activeIndex + 1}
        </div>
        <div className="absolute bottom-6 right-8 z-30 flex items-center gap-2 pointer-events-none hidden md:flex">
           <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
           <span className="text-white/50 font-mono text-[10px] tracking-widest uppercase">AUTO-SCROLL ACTIVE</span>
        </div>
      </div>
    </section>
  );
}
