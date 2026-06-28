import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer"; // Updated import
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  // Only load the weights we actually use to reduce font file size
  weight: ["400", "500", "600", "700"],
  // Subset to only Latin characters (removes unnecessary glyphs)
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MGZ8LLPP';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barefootdigital.dev"),
  title: {
    default: "Barefoot Digital — AI Adoption & Production AI Systems",
    template: "%s | Barefoot Digital",
  },
  description:
    "Barefoot Digital helps organizations adopt AI that works — strategy, enablement, and production systems, backed by shipped tools (Engram, Paw) and real deployments.",
  keywords: [
    "Barefoot Digital",
    "AI adoption",
    "AI enablement",
    "AI strategy",
    "AI training",
    "production AI systems",
    "RAG implementation",
    "AI agents",
    "AI automation",
    "Next.js Developer",
    "FastAPI",
    "TypeScript",
    "Engram",
    "Paw"
  ],
  authors: [{ name: "Barefoot Digital" }],
  creator: "Barefoot Digital",
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
    url: "https://www.barefootdigital.dev",
    title: "Barefoot Digital — AI Adoption & Production AI Systems",
    description:
      "Barefoot Digital helps organizations adopt AI that works — strategy, enablement, and production systems, backed by shipped tools (Engram, Paw) and real deployments.",
    siteName: "Barefoot Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barefoot Digital — AI Adoption & Production AI Systems",
    description:
      "We help organizations adopt AI that works — strategy, enablement, and production systems, backed by shipped tools and real deployments.",
  },
  alternates: {
    canonical: "/",
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
        {/* Minimal critical CSS - only layout-critical styles that won't conflict with Tailwind */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Prevent FOUC - minimal safe styles */
          html{scroll-behavior:smooth}
          body{margin:0}
        `}} />

        {/* Preconnect hints for faster resource loading - establish connection early */}
        <link rel="preconnect" href="https://cms.henrybarefoot.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cms.henrybarefoot.com" />

        {/* Defer third-party connections until after critical content */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Consent Mode v2 defaults — MUST run before GTM loads.
            Deny ad/analytics storage by default in the EEA/UK (Google geo-detects
            the region); grant elsewhere (US opt-out model). GPC forces deny
            everywhere. The consent banner only flips this state via gtag updates;
            GTM blocks/fires the Meta + LinkedIn tags based on it. */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB']
            });

            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });

            gtag('set', 'ads_data_redaction', true);

            if (navigator.globalPrivacyControl === true) {
              gtag('consent', 'update', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });
            }
          `}
        </Script>

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
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
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
          <div id="footer-new">
            <Footer />
          </div>
        </ThemeProvider>
        <ConsentBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
