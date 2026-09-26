"use client";

import React, { useState } from "react";
import { sound } from "../utils/sound";

interface PackageCard {
  id: string;
  title: string;
  badge: string;
  idealFor: string;
  priceEstimate: string;
  features: string[];
}

const PACKAGES: PackageCard[] = [
  {
    id: "wedding",
    title: "The Heirloom Wedding Experience",
    badge: "MOST POPULAR",
    idealFor: "Full-day luxury weddings, destination ceremonies, & receptions",
    priceEstimate: "Starts at $1,200 / LKR 350,000",
    features: [
      "Full-Day Comprehensive Coverage (Up to 12 Hours)",
      "2 Lead Cinematographers + 1 Stills Master",
      "Licensed Aerial 4K Drone Filming",
      "Cinematic 4K Highlight Reel + Full Ceremony Film",
      "Bespoke Italian Leather-Bound Heirloom Album",
      "Private High-Res Cloud Gallery with 10-Year Hosting",
    ],
  },
  {
    id: "editorial",
    title: "Editorial & Celebrity Portraits",
    badge: "STUDIO / ON-LOCATION",
    idealFor: "Fashion lookbooks, magazine features, actors, & artist branding",
    priceEstimate: "Starts at $450 / LKR 120,000",
    features: [
      "Up to 4 Hours Dedicated Studio or Exterior Session",
      "Creative Moodboard & Wardrobe Lighting Direction",
      "Dedicated Lighting Assistant & Reflector Tech",
      "15 High-End Retouched Editorial Masters",
      "Full Commercial & Press Usage Rights",
      "Same-Week Expedited Proofing Delivery",
    ],
  },
  {
    id: "concert",
    title: "Live Concerts & Stage Cinematics",
    badge: "HIGH KINETIC",
    idealFor: "Music festivals, arena concerts, nightlife, & touring artists",
    priceEstimate: "Starts at $650 / LKR 180,000",
    features: [
      "All-Access Stage Pit, Front of House & Backstage",
      "Extreme Low-Light Dual-ISO 4K 120fps Capture",
      "Multitrack Audio Mastering & Soundboard Sync",
      "Same-Night 60-Second Social Media Teaser",
      "Full High-Resolution Live Performance Stills Gallery",
      "Artist Licensing & Promotional Release",
    ],
  },
  {
    id: "commercial",
    title: "Commercial & Automotive Campaigns",
    badge: "ENTERPRISE",
    idealFor: "Supercar shoots, luxury brands, resort hospitality, & commercials",
    priceEstimate: "Starts at $950 / LKR 280,000",
    features: [
      "Specialized High-Speed Car-to-Car Tracking Rig",
      "61MP Medium-Format Equivalent Stills for Billboards",
      "Anamorphic 4K DCI Commercial Video Production",
      "Full Global Commercial Buyout & Licensing",
      "Bespoke Colorist Tone Mapping (DCI-P3 / HDR)",
      "Multi-Aspect Deliverables (16:9, 9:16, 1:1, 4:5)",
    ],
  },
];

export default function ServicesBookingSection() {
  const [selectedPackage, setSelectedPackage] = useState<string>("wedding");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "wedding",
    date: "",
    location: "",
    budget: "1500",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handlePackageSelect = (pkgId: string) => {
    sound.playTick();
    setSelectedPackage(pkgId);
    setFormData((prev) => ({ ...prev, package: pkgId }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errors.email = "Valid email address is required";
    if (!formData.phone.trim()) errors.phone = "Phone or WhatsApp is required";
    if (!formData.date) errors.date = "Target date is required";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      sound.playTick();
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    sound.playShutterClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playCinematicBoom();
    }, 900);
  };

  return (
    <section id="services" className="relative py-28 bg-[#060608] border-t border-zinc-900 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
            <span className="text-xs font-mono font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              COMMISSIONS & PRODUCTION TIERS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            BESPOKE <span className="text-[#d4af37] gold-glow">PACKAGES</span> & BOOKINGS
          </h2>

          <p className="max-w-xl mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every client assignment is treated as a bespoke cinematic production. Review our signature
            offerings below, or customize your vision through the booking terminal.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => handlePackageSelect(pkg.id)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#12121a] border-2 border-[#d4af37] shadow-[0_20px_50px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "bg-[#0b0b10] border border-white/10 hover:border-white/20 hover:bg-[#0e0e14]"
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full font-bold ${
                        isSelected
                          ? "bg-[#d4af37] text-black"
                          : "bg-white/5 text-zinc-400 border border-white/10"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-wide leading-snug">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {pkg.idealFor}
                  </p>

                  <div className="my-5 py-3 border-y border-white/5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      INVESTMENT RANGE
                    </span>
                    <span className="text-sm font-mono font-bold text-[#d4af37] mt-0.5 block">
                      {pkg.priceEstimate}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6 text-xs text-zinc-300">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    isSelected
                      ? "bg-[#d4af37] text-black shadow-lg"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {isSelected ? "SELECTED PACKAGE" : "SELECT TIER"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Booking Terminal Form */}
        <div id="contact" className="rounded-[2.5rem] bg-[#0d0d13] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle Top Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Col: Contact info & Studio Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase">
                    DIRECT INQUIRY DESK
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  INITIATE YOUR <span className="text-[#d4af37] gold-glow">PRODUCTION</span>
                </h3>

                <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-sans">
                  Whether you are planning a grand wedding in Galle Fort, an arena concert in Colombo,
                  or an editorial magazine campaign, we are ready to craft a cinematic legacy for you.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-4 my-8">
                  <a
                    href="mailto:contact@nimansanjana.com"
                    onClick={() => sound.playTick()}
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#d4af37]/40 transition-all flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">DIRECT EMAIL</span>
                      <span className="text-xs sm:text-sm font-mono text-zinc-200 group-hover:text-[#d4af37] transition-colors">
                        contact@nimansanjana.com
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/94770000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTick()}
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#d4af37]/40 transition-all flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">WHATSAPP / PHONE</span>
                      <span className="text-xs sm:text-sm font-mono text-zinc-200 group-hover:text-emerald-400 transition-colors">
                        +94 77 123 4567
                      </span>
                    </div>
                  </a>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">STUDIO ADDRESS</span>
                      <span className="text-xs sm:text-sm font-mono text-zinc-200">
                        Colombo 07, Sri Lanka (Available Globally)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-500">
                <span>AVERAGE CONSULTATION RESPONSE TIME: &lt; 4 HOURS</span>
              </div>
            </div>

            {/* Right Col: Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-black/60 border border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white uppercase tracking-wide">
                    INQUIRY DISPATCHED
                  </h4>
                  <p className="text-sm text-zinc-400 max-w-md mt-2">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Niman Sanjana and the executive team will review your creative specifications and reply within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        package: "wedding",
                        date: "",
                        location: "",
                        budget: "1500",
                        message: "",
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Amanda Perera"
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] font-mono transition-colors ${
                          formErrors.name ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {formErrors.name && (
                        <span className="text-[10px] font-mono text-red-400 mt-1 block">
                          {formErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] font-mono transition-colors ${
                          formErrors.email ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {formErrors.email && (
                        <span className="text-[10px] font-mono text-red-400 mt-1 block">
                          {formErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        WHATSAPP / PHONE *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+94 77 000 0000"
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] font-mono transition-colors ${
                          formErrors.phone ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {formErrors.phone && (
                        <span className="text-[10px] font-mono text-red-400 mt-1 block">
                          {formErrors.phone}
                        </span>
                      )}
                    </div>

                    {/* Target Date */}
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        TARGET EVENT DATE *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono transition-colors ${
                          formErrors.date ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {formErrors.date && (
                        <span className="text-[10px] font-mono text-red-400 mt-1 block">
                          {formErrors.date}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Location */}
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        SHOOT LOCATION
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Galle, Kandy, or Overseas"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] font-mono transition-colors"
                      />
                    </div>

                    {/* Package Preset */}
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        SELECTED PACKAGE
                      </label>
                      <select
                        value={formData.package}
                        onChange={(e) => {
                          setFormData({ ...formData, package: e.target.value });
                          setSelectedPackage(e.target.value);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono transition-colors"
                      >
                        <option value="wedding">The Heirloom Wedding Experience</option>
                        <option value="editorial">Editorial & Celebrity Portraits</option>
                        <option value="concert">Live Concerts & Stage Cinematics</option>
                        <option value="commercial">Commercial & Automotive Campaigns</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Slider */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-400 uppercase">ESTIMATED PRODUCTION BUDGET:</span>
                      <span className="text-[#d4af37] font-bold text-sm">
                        ${formData.budget} USD (approx. LKR {(parseInt(formData.budget) * 310).toLocaleString()})
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="8000"
                      step="250"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full accent-[#d4af37] cursor-pointer"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                      CREATIVE VISION & SPECIAL REQUESTS
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the schedule, aesthetic preferences, moodboard links, or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] font-mono transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#d4af37] hover:bg-[#e5c04b] text-black font-mono font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT PRODUCTION INQUIRY</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
