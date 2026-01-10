import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Lazy load ChatWidget - it's not needed for initial page render
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  loading: () => null, // Don't show anything while loading
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MGZ8LLPP';

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Critical CSS for above-the-fold content - inlined to avoid render blocking */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical hero styles */
          body{margin:0;font-family:var(--font-inter),system-ui,sans-serif;background:#fff;color:#171717}
          .dark body{background:#0a0a0a;color:#ededed}
          /* Hero layout critical path */
          .min-h-screen{min-height:100vh}
          .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}
          .text-center{text-align:center}.relative{position:relative}
          /* LCP image container */
          .rounded-full{border-radius:9999px}.overflow-hidden{overflow:hidden}
          .w-64{width:16rem}.h-64{height:16rem}.object-cover{object-fit:cover}
          /* Gradient background */
          .bg-gradient-to-br{background:linear-gradient(to bottom right,var(--tw-gradient-stops))}
          .from-blue-400{--tw-gradient-from:#60a5fa;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,transparent)}
          .to-purple-500{--tw-gradient-to:#a855f7}
        `}} />
        
        {/* Preconnect hints for faster resource loading */}
        <link rel="preconnect" href="https://cms.henrybarefoot.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cms.henrybarefoot.com" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        {/* Google Tag Manager - delayed until user interaction to avoid blocking LCP */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Defer GTM until user interacts or 5 seconds pass
              function loadGTM() {
                if (window.gtmLoaded) return;
                window.gtmLoaded = true;
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              }
              // Load on first interaction
              ['scroll','click','touchstart','keydown'].forEach(function(e){
                window.addEventListener(e, loadGTM, {once:true,passive:true});
              });
              // Fallback: load after 5 seconds
              setTimeout(loadGTM, 5000);
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
