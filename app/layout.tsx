import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060608",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nimansanjana.com"),
  title: "Niman Sanjana Photography & Cinematography | Official Portfolio",
  description:
    "Award-winning cinematic photographer and visual director based in Sri Lanka. Specializing in high-end editorial portraits, luxury weddings, live concerts, and commercial campaigns.",
  keywords: [
    "Niman Sanjana",
    "Niman Sanjana Photography",
    "NXS Media",
    "Sri Lanka Wedding Photographer",
    "Cinematic Photography",
    "Colombo Photographer",
    "Concert Photography",
    "Editorial Portrait Photographer",
  ],
  authors: [{ name: "Niman Sanjana" }],
  openGraph: {
    title: "Niman Sanjana Photography & Cinematography",
    description: "Capturing transcendent emotions through cinematic lens craft and fine art direction.",
    images: ["/images/concert_drums_live.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#060608] text-[#f4f4f6] selection:bg-[#d4af37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
