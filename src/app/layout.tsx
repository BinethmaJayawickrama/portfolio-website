import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
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
  title: "Binethma Jayawickrama",
  description:
    "Personal portfolio website of Binethma Jayawickrama, a dedicated Computer Science undergraduate at IIT Sri Lanka (University of Westminster). Full-Stack Developer, IoT Innovator, and Creative Engineer.",
  icons: {
    icon: "/favicon.svg",
  },
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
      className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to detect and apply theme instantly (prevents flash of white) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  let theme = 'light';
                  const storedTheme = localStorage.getItem('theme');
                  if (localStorage.getItem('theme_migrated_v3') !== 'true') {
                    localStorage.setItem('theme', 'light');
                    localStorage.setItem('theme_migrated_v3', 'true');
                    theme = 'light';
                  } else {
                    theme = storedTheme || 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        {/* Fallback CDN for vanilla-tilt if needed by legacy files, though we will rewrite tilt in pure React */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full font-sans bg-[var(--bg)] text-[var(--dark)] selection:bg-[var(--accent)]/20 selection:text-[var(--accent-deep)]">
        {/* Film grain noise texture */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
