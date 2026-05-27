import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binethma Jayawickrama | CS Undergraduate & Web Developer",
  description:
    "Personal portfolio website of Binethma Jayawickrama, a dedicated Computer Science undergraduate at the University of Westminster. Explore AI kiosks, CV integrations, and developer articles.",
  keywords: [
    "Binethma Jayawickrama",
    "Computer Science Student",
    "Web Developer",
    "University of Westminster",
    "Software Engineer Portfolio",
    "ADORIX",
    "Python Developer",
    "Java Developer",
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-ice-bg text-slate-900 selection:bg-teal-500/20 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
