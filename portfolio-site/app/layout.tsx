import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import SplashScreen from "../components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kclabs.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Klaus Chamberlain — Full Stack Developer Portfolio",
    template: "%s | Klaus Chamberlain",
  },
  description:
    "Full-stack developer specializing in React, Next.js, and TypeScript. Building practical, high-performing applications that deliver phenomenal user experiences. View my portfolio of modern web projects.",
  keywords: [
    "Klaus Chamberlain",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Full Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Portfolio",
    "Software Engineer",
    "JavaScript Developer",
    "React Portfolio",
    "Next.js Portfolio",
    "Web Development",
    "React TypeScript",
    "Modern Web Applications",
  ],
  authors: [{ name: "Klaus Chamberlain", url: siteUrl }],
  creator: "Klaus Chamberlain",
  publisher: "Klaus Chamberlain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Klaus Chamberlain Portfolio",
    title: "Klaus Chamberlain — Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, and TypeScript. Building practical, high-performing applications that deliver phenomenal user experiences.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Klaus Chamberlain - Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klaus Chamberlain — Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, and TypeScript. Building practical, high-performing applications.",
    creator: "@klauschamberlain",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "Portfolio",
  classification: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Klaus Chamberlain",
              jobTitle: "Full Stack Developer",
              description:
                "Full-stack developer specializing in React, Next.js, and TypeScript. Building practical, high-performing applications that deliver phenomenal user experiences.",
              url: siteUrl,
              sameAs: [
                "https://github.com/TheFirstHero6",
                "https://www.linkedin.com/in/klaus-chamberlain/",
              ],
              email: "klaus.dev@kclabs.app",
              telephone: "+614-612-0032",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Columbus",
                addressRegion: "Ohio",
                addressCountry: "US",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Web Development",
                "Full Stack Development",
                "Frontend Development",
                "Node.js",
                "Prisma",
                "PostgreSQL",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Klaus Chamberlain Portfolio",
              url: siteUrl,
              description:
                "Portfolio website of Klaus Chamberlain, a full-stack developer specializing in React, Next.js, and TypeScript.",
              author: {
                "@type": "Person",
                name: "Klaus Chamberlain",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <SplashScreen />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-white/90 focus:text-black"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
