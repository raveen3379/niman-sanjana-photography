"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  {
    id: 0,
    title: "FOR BRANDS",
    description:
      "We tailor every collaboration to the brand's unique identity, merging cinematic vision with commercial goals.",
    bullets: ["Bespoke visual campaigns", "Brand storytelling", "High-end commercial licensing"],
    image: "/images/portrait_bw.jpg",
  },
  {
    id: 1,
    title: "FOR ATHLETES",
    description:
      "We don't work with everyone. We look past the transfer and the season, to the person carrying the game.",
    bullets: [
      "Fewer names, more craft",
      "From transfer shoots to years-long collaborations",
      "Work that grows with your career",
    ],
    image: "/images/concert_drums_live.jpg",
  },
  {
    id: 2,
    title: "FOR CLUBS & FEDERATIONS",
    description:
      "Elevating the institution through powerful imagery, historical documentation, and global resonance.",
    bullets: ["Match day coverage", "Archival curation", "Global stadium campaigns"],
    image: "/images/sri_lankan_traditional_wedding.jpg",
  },
];

export default function GalleryPlaySection() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle item

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative w-full py-24 bg-[#060608] overflow-hidden">
      {/* Header & Subtitle */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter text-white uppercase leading-none mb-6">
          CULTURAL DEPTH.
        </h2>
        <div className="max-w-xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
          <p>We tailor every collaboration to the client.</p>
          <p>Brands, athletes, clubs and federations.</p>
        </div>
      </div>

      {/* 3-Card Focus Carousel */}
      <div className="relative w-full max-w-[1600px] mx-auto h-[600px] md:h-[750px] flex items-center justify-center px-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {GALLERY_ITEMS.map((item, index) => {
              // Calculate relative position (-1, 0, 1) for wrapping
              let offset = index - activeIndex;
              if (offset > 1) offset -= GALLERY_ITEMS.length;
              if (offset < -1) offset += GALLERY_ITEMS.length;

              // Only render if it's the active one or adjacent
              if (Math.abs(offset) > 1) return null;

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Compute styles based on position
              const xPos = isActive ? "0%" : isLeft ? "-105%" : "105%";
              const scale = isActive ? 1 : 0.85;
              const zIndex = isActive ? 10 : 5;
              const blur = isActive ? "0px" : "12px";
              const opacity = isActive ? 1 : 0.5;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: xPos,
                    scale: scale,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8,
                  }}
                  className={`absolute w-full max-w-[300px] md:max-w-[400px] h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-pointer ${
                    !isActive ? "hover:opacity-70 transition-opacity" : ""
                  }`}
                  onClick={() => handleCardClick(item.id)}
                >
                  <motion.div 
                    className="absolute inset-0"
                    animate={{ filter: `blur(${blur})` }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 300px, 400px"
                    />
                  </motion.div>

                  {/* Dimming overlay */}
                  <div
                    className="absolute inset-0 transition-colors duration-500"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                        : "rgba(0,0,0,0.5)",
                    }}
                  />

                  {/* Text Content */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col p-8 md:p-12 text-white transition-all duration-500 ${
                      isActive ? "justify-end" : "justify-center items-center"
                    }`}
                    animate={{ opacity: isActive ? 1 : 0.8 }}
                  >
                    <h3
                      className={`font-black uppercase tracking-tight text-center ${
                        isActive ? "text-3xl md:text-5xl mb-6" : "text-2xl md:text-3xl mb-0"
                      } transition-all duration-500`}
                    >
                      {item.title}
                    </h3>

                    {/* Expandable details (only visible when active) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 20 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: 20 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="overflow-hidden"
                        >
                          <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                            {item.description}
                          </p>
                          <ul className="text-zinc-400 text-xs md:text-sm space-y-2">
                            {item.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#d4af37] mt-1">•</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
