# Niman Sanjana Photography & Cinematography — Official Portfolio

An ultra-immersive, high-performance, dark-mode portfolio website created for professional photographer and cinematic director **Niman Sanjana (NXS Media)**.

Inspired by cutting-edge interactive websites (e.g. Formula 1 telemetry and cinematic luxury branding), the site combines high-contrast imagery, smooth canvas scroll scrubbing, an interactive 3D WebGL camera lens rig, and a comprehensive studio telemetry dashboard.

---

## Key Features

### 1. 912-Frame Cinematic Timeline Reel (`HeroCanvas.tsx`)
- **Full Frame Scrubbing:** Smoothly scrubs through all 912 high-definition frames (`frame_001.jpg` to `frame_912.jpg`) using smooth dual-direction LERP physics.
- **Auto-Play Reel Mode:** Users can click "PLAY REEL" to watch the continuous footage at 1x, 1.5x, or 2x speed.
- **Dynamic Camera HUD:** Displays real-time timecode (`TC 00:00:15:02`), frame counter (`FRAME 345 / 912`), camera profile (`S-LOG3 / S-GAMUT3.CINE`), and progressive buffer indicator.

### 2. Interactive 3D Cinema Lens Rig (`CameraViewer.tsx`)
- **Three.js & React Three Fiber:** Procedurally modeled master cinema prime lens with multi-element physical transmission glass, antireflective optical coatings, and titanium chassis.
- **Organic Mouse Tilt Physics:** Organically tracks and banks with the user's cursor across the viewport with smooth inertia.
- **Live Iris Blade Actuation:** Interactive slider dynamically opens and constricts the 9 circular aperture iris blades from T1.2 to T16.
- **Focal Length Selector:** Toggle between 24mm (Ultra-Wide), 50mm (Standard Prime), 85mm (Portrait Master), and 135mm (Telephoto Bokeh).
- **CAD Wireframe Blueprint Mode:** Inspect the internal ray-tracing geometry with a single click.
- **Studio Lighting Presets:** Switch between *Studio Gold*, *Cyber Neon*, *Editorial Clean*, and *Midnight Noir*.

### 3. Curated Photography Archive & Lightbox (`PortfolioSection.tsx` & `LightboxModal.tsx`)
- **Categorized Filters:**
  - *Cinematic & Concerts* (Live stage concert lighting, festival crowds)
  - *Weddings & Couples* (Bentota coastal cliffs, traditional Kandyan ceremonies, urban night silhouettes)
  - *Portraits & Editorial* (Low-key chiaroscuro B&W portraits, environmental night sessions)
  - *Commercial & Events* (Global Village 4.0 Instant Photobooth, fashion runway)
- **High-Resolution Inspection Lightbox:**
  - Smooth zoom (1x, 1.5x, 2x, 3x) and drag-to-pan exploration.
  - Comprehensive EXIF & telemetry overlay (Camera model, lens, shutter speed, aperture, ISO, location).
  - Keyboard navigation (Arrow keys, Escape, +/- zoom).

### 4. Director's Cut 4K Showreel Player (`CinematicReelSection.tsx`)
- Dedicated high-definition player for `showreel.mp4` with custom dark-glass controls, volume toggle, seek slider, and fullscreen trigger.

### 5. Studio Telemetry & Bento Grid (`TelemetryBentoSection.tsx`)
- **Interactive RAW vs LUT Split Slider:** Drag-to-reveal comparison between flat S-Log3 camera footage and Niman Sanjana's finished film LUT color grade.
- **Dynamic Histogram & RGB Waveform:** Real-time animated exposure latitude graph (0 to 100 IRE).
- **Gear Arsenal:** Technical specifications for Sony FX3 Cinema Line, Sony α7R V 61MP, G Master Primes, DJI Ronin RS3 Pro, and Aputure lighting.

### 6. Storytelling & Biography (`AboutSection.tsx`)
- Storytelling narrative detailing Niman Sanjana's visual philosophy: *"Light, Shadow, and the Human Soul"*.
- Verified credentials: 8+ years of craft, 450+ captured stories, 15+ destination shoots, and 100% bespoke grading.

### 7. Bespoke Commissions & Interactive Booking (`ServicesBookingSection.tsx`)
- 4 luxury package cards: *The Heirloom Wedding Experience*, *Editorial & Celebrity Portraits*, *Live Concerts & Stage Cinematics*, and *Commercial & Automotive Campaigns*.
- Interactive booking inquiry terminal with instant budget estimator, form validation, and feedback toast notifications.

### 8. Web Audio API Sound System (`sound.ts`)
- Synthesizes realistic mechanical camera shutter clicks and subtle UI feedback without requiring external audio files. Includes a global mute/unmute toggle in the navbar.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 (Dark Luxury Cinema Theme)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Audio:** Web Audio API synthesis

---

## Running the Application

```bash
# Navigate to the project directory
cd /Users/damanthafernando/.gemini/antigravity/scratch/niman-sanjana-photography

# Run the production server (already built)
npm start

# Or run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.
