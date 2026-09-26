"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface LensRigProps {
  wireframe: boolean;
  aperture: number;
  focalLength: number;
  mousePos: { x: number; y: number };
  autoRotate: boolean;
}

function ImportedCameraModel({
  wireframe,
  focalLength,
  mousePos,
  autoRotate,
}: LensRigProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3d-professional-video-camera.glb");

  // Normalize scale so the model fits nicely in view, regardless of its original size
  useMemo(() => {
    // Reset scale before computing box
    scene.scale.setScalar(1);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetSize = 3.5; 
      scene.scale.setScalar(targetSize / maxDim);
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!autoRotate) {
      // Gentle cursor-following rotation with inertia
      const targetRotX = mousePos.y * 0.45;
      const targetRotY = mousePos.x * 0.65;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    } else {
        // Return to center when auto-rotating
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 4, delta);
        groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 4, delta);
    }

    // Apply wireframe setting
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const material = (child as THREE.Mesh).material;
        if (material) {
          if (Array.isArray(material)) {
            material.forEach(m => {
              if ('wireframe' in m) (m as any).wireframe = wireframe;
            });
          } else {
            if ('wireframe' in material) (material as any).wireframe = wireframe;
          }
        }
      }
    });
  });

  // Optional: scale slightly based on focal length
  const scale = 1.0 + (focalLength - 50) * 0.005;

  return (
    <group ref={groupRef} scale={scale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/3d-professional-video-camera.glb");

export default function CameraViewer() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // States
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [aperture, setAperture] = useState<number>(1.4);
  const [focalLength, setFocalLength] = useState<number>(50);
  const [lightingPreset, setLightingPreset] = useState<"gold" | "cyber" | "studio" | "noir">("gold");
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      className="relative w-full h-[580px] sm:h-[660px] rounded-3xl bg-[#09090e] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.8, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting Presets */}
          {lightingPreset === "gold" && (
            <>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} intensity={2.5} color="#ffd480" />
              <directionalLight position={[-4, 2, -2]} intensity={1.5} color="#e5a93b" />
              <pointLight position={[0, -2, 2]} intensity={1.2} color="#ffffff" />
            </>
          )}

          {lightingPreset === "cyber" && (
            <>
              <ambientLight intensity={0.2} />
              <directionalLight position={[4, 4, 3]} intensity={2.8} color="#00f5d4" />
              <directionalLight position={[-4, -2, -3]} intensity={3.0} color="#ff0055" />
              <pointLight position={[0, 3, 2]} intensity={1.5} color="#7928ca" />
            </>
          )}

          {lightingPreset === "studio" && (
            <>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 6, 5]} intensity={2.0} color="#ffffff" />
              <directionalLight position={[-5, 4, -3]} intensity={1.2} color="#ffffff" />
            </>
          )}

          {lightingPreset === "noir" && (
            <>
              <ambientLight intensity={0.08} />
              <directionalLight position={[3, 5, 2]} intensity={3.5} color="#94a3b8" />
              <directionalLight position={[-4, -3, -2]} intensity={0.8} color="#1e293b" />
            </>
          )}

          {/* Floating Subtle Ambient Bobbing */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <React.Suspense fallback={null}>
              <ImportedCameraModel
                wireframe={wireframe}
                aperture={aperture}
                focalLength={focalLength}
                mousePos={mousePos}
                autoRotate={autoRotate}
              />
            </React.Suspense>
          </Float>

          {/* Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            enableDamping
            dampingFactor={0.06}
            minDistance={2.0}
            maxDistance={6.0}
          />
        </Canvas>
      </div>

      {/* Top HUD Overlay */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] font-bold uppercase">
              OPTICAL TELEMETRY // THREE.JS WEBGL 2.0
            </div>
            <div className="text-white font-extrabold text-sm sm:text-base tracking-wider uppercase">
              MASTER CINE PRIME {focalLength}MM T{aperture}
            </div>
          </div>
        </div>

        {/* Live Lens Metrics */}
        <div className="flex items-center gap-2 text-[10px] font-mono pointer-events-auto">
          <span className="px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-zinc-300">
            GLASS: 11 ELEMENTS / 9 GROUPS
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-semibold">
            STATUS: ACTIVE TILT
          </span>
        </div>
      </div>

      {/* Bottom Interactive Controls Panel */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4 pointer-events-none bg-gradient-to-t from-black/95 via-black/60 to-transparent">
        {/* Sliders and Toggles Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto bg-black/85 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/10 shadow-2xl">
          {/* Focal Length Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1">FOCAL:</span>
            {[24, 50, 85, 135].map((fl) => (
              <button
                key={fl}
                onClick={() => setFocalLength(fl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  focalLength === fl
                    ? "bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                {fl}mm
              </button>
            ))}
          </div>

          {/* Aperture Slider */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">IRIS:</span>
            <input
              type="range"
              min="1.2"
              max="16"
              step="0.2"
              value={aperture}
              onChange={(e) => setAperture(parseFloat(e.target.value))}
              className="w-24 sm:w-32 accent-[#d4af37] cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-[#d4af37] w-12 text-right">
              T{aperture.toFixed(1)}
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                autoRotate
                  ? "bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
              title="Toggle Auto Spin"
            >
              <span>{autoRotate ? "SPIN ON" : "MOUSE TILT"}</span>
            </button>

            {/* Wireframe Toggle */}
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                wireframe
                  ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
              title="Toggle Optical Wireframe"
            >
              <span>CAD WIRE</span>
            </button>

            {/* Lighting Preset Cycler */}
            <div className="flex items-center bg-zinc-900 rounded-xl p-0.5 border border-zinc-800">
              {(["gold", "cyber", "studio", "noir"] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLightingPreset(preset)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase transition-colors ${
                    lightingPreset === preset
                      ? "bg-[#d4af37] text-black font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title={`Switch to ${preset} lighting`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Reset Camera */}
            <button
              onClick={handleResetCamera}
              className="p-1.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Reset 3D Perspective"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Interaction Hint */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-2">
          <span>Drag to orbit • Scroll to zoom • Move mouse to tilt lens optics</span>
          <span className="text-[#d4af37] font-semibold">T1.2 - T16 APERTURE BLADES</span>
        </div>
      </div>
    </div>
  );
}
