import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://next.henrybarefoot.com"),
  title: {
    default: "Henry Barefoot - Senior Web Developer, n8n Automation & WordPress Specialist",
    template: "%s | Henry Barefoot",
  },
  description:
    "Senior Web Developer with 8+ years of experience specializing in n8n automation, WordPress development, and modern web technologies. Expert in building intelligent workflows, agentic systems, RAG implementations, custom WordPress solutions, and seamless integrations between platforms.",
  keywords: [
    "Henry Barefoot",
    "n8n Developer",
    "n8n Automation Specialist",
    "WordPress Developer",
    "WordPress Expert",
    "WordPress Custom Development",
    "WordPress Plugin Development",
    "WordPress Theme Development",
    "WordPress API Integration",
    "WooCommerce Developer",
    "WordPress Automation",
    "Agentic Systems",
    "Workflow Automation",
    "RAG Implementation",
    "AI Automation",
    "n8n Custom Nodes",
    "Intelligent Workflows",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "PHP Developer",
    "API Integrations",
    "Process Automation",
    "Business Intelligence",
    "AI Agent Development",
    "Vector Databases",
    "OpenAI Integration",
    "Telegram Bot Development",
    "Social Media Automation",
    "Marketing Automation",
    "Data Processing",
    "Webhook Development",
    "Custom Automation Solutions",
    "WordPress n8n Integration",
    "WordPress Workflow Automation",
    "Headless WordPress",
    "WordPress REST API",
    "Custom Post Types",
    "Advanced Custom Fields",
    "WordPress Security",
    "WordPress Performance Optimization"
  ],
  authors: [{ name: "Henry Barefoot" }],
  creator: "Henry Barefoot",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://next.henrybarefoot.com",
    title: "Henry Barefoot - Senior Web Developer, n8n Automation & WordPress Specialist",
    description:
      "Expert in n8n workflow automation, WordPress development, and agentic systems. Specializing in intelligent automation solutions, custom WordPress development, AI integrations, and seamless platform connectivity for modern businesses.",
    siteName: "Henry Barefoot Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Barefoot - n8n Automation & WordPress Specialist",
    description:
      "Building intelligent workflows with n8n and custom WordPress solutions. Expert in automation, AI integrations, and modern web development.",
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
        <Analytics />
      </body>
    </html>
  );
}
