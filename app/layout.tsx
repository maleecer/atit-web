import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Footer } from "@/components/footer"
import { PageLoader } from "@/components/page-loader"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { GlobalStructuredData } from "@/components/structured-data"
import { SITE_URL, siteConfig, pageMetadata, verificationCodes } from "@/lib/seo-config"
import { Toaster } from "sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const exo = localFont({
  src: [
    {
      path: "./fonts/Exo-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Exo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Exo-DemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Exo-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-exo",
})

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  // Title template - page titles will be formatted as "Page Title | ATIT Rajarata"
  title: {
    default: pageMetadata.home.title,
    template: "%s | ATIT Rajarata",
  },
  description: pageMetadata.home.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Canonical URL and language
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },

  // Open Graph - for Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: SITE_URL,
    siteName: siteConfig.name,
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    images: [
      {
        url: `${SITE_URL}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    images: [`${SITE_URL}${siteConfig.ogImage}`],
    creator: "@atitrajarata", // Update with actual Twitter handle if exists
  },

  // Robots and indexing
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

  // Icons
  icons: {
    icon: [
      {
        url: "/assets/atit-logo-rounded.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/atit-logo-rounded.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/atit-logo-rounded.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  // Category
  category: "education",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={exo.className}>
      <head>
        {/* JSON-LD Structured Data for rich search results */}
        <GlobalStructuredData />
      </head>
      <body>
        <PageLoader />
        <SmoothScrollProvider>
          {children}
          <Footer />
          <ScrollToTop />
          <GoogleAnalytics gaId={verificationCodes.googleAnalytics} />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
