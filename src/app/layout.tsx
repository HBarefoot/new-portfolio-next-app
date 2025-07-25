import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://next.henrybarefoot.com"),
  title: {
    default: "Henry Barefoot - Senior Web Developer",
    template: "%s | Henry Barefoot",
  },
  description:
    "Senior Web Developer with 5+ years of experience in React, Next.js, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences.",
  keywords: [
    "Henry Barefoot",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Frontend Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Henry Barefoot" }],
  creator: "Henry Barefoot",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://next.henrybarefoot.com",
    title: "Henry Barefoot - Senior Web Developer",
    description:
      "Senior Web Developer with 5+ years of experience in React, Next.js, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences.",
    siteName: "Henry Barefoot Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Barefoot - Senior Web Developer",
    description:
      "Senior Web Developer with 5+ years of experience in React, Next.js, TypeScript, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
