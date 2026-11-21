import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ujjwalkatiyar.in"),
  title: "Ujjwal Katiyar",
  description:
    "I am a software developer designing system architectures, optimizing APIs, and building AI applications and agents. See my projects and blogs.",
  authors: [{ name: "Ujjwal Katiyar", url: "https://ujjwalkatiyar.in/about" }],
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://ujjwalkatiyar.in",
    types: {
      "application/rss+xml": "https://ujjwalkatiyar.in/rss.xml",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
  openGraph: {
    title: "Ujjwal Katiyar",
    description:
      "I am a software developer designing system architectures, optimizing APIs, and building AI applications and agents. See my projects and blogs.",
    type: "website",
    locale: "en_US",
    siteName: "Ujjwal Katiyar",
    url: "https://ujjwalkatiyar.in",
    images: [
      {
        url: "https://ujjwalkatiyar.in/profile-card.png",
        secureUrl: "https://ujjwalkatiyar.in/profile-card.png",
        width: 1200,
        height: 630,
        alt: "Ujjwal Katiyar",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ujjwalkatiyar07",
    creator: "@ujjwalkatiyar07",
    title: "Ujjwal Katiyar",
    description:
      "I am a software developer designing system architectures, optimizing APIs, and building AI applications and agents. See my projects and blogs.",
    images: ["https://ujjwalkatiyar.in/profile-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
