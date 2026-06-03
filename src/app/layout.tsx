import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binethma Jayawickrama | Creative Developer Portfolio",
  description:
    "Personal portfolio website of Binethma Jayawickrama, a dedicated Computer Science undergraduate at IIT Sri Lanka (University of Westminster). Full-Stack Developer, IoT Innovator, and Creative Engineer.",
  keywords: [
    "Binethma Jayawickrama",
    "IIT Sri Lanka",
    "University of Westminster",
    "Computer Science Student",
    "Web Developer",
    "Creative Engineer",
    "IoT Innovator",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Binethma Jayawickrama" }],
  creator: "Binethma Jayawickrama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        {/* Load Core Animation & Scrolling CDNs */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full font-sans bg-rose-bg text-slate-800 selection:bg-rose-500/20 selection:text-rose-950">
        {children}
      </body>
    </html>
  );
}

