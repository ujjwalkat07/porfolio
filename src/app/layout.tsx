import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope, Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
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
  title: "Ujjwal Katiyar — Software Developer & Systems Architect",
  description:
    "Software Developer building scalable real-time systems and AI observability platforms with Next.js, Kafka, Redis, and high-performance cloud architectures.",
  authors: [{ name: "Ujjwal Katiyar", url: "https://ujjwalkatiyar.in/about" }],
  alternates: {
    canonical: "https://ujjwalkatiyar.in",
    types: {
      "application/rss+xml": "https://ujjwalkatiyar.in/rss.xml",
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
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
    title: "Ujjwal Katiyar — Software Developer & Systems Architect",
    description:
      "Software Developer building scalable real-time systems and AI observability platforms with Next.js, Kafka, Redis, and high-performance cloud architectures.",
    type: "website",
    locale: "en_US",
    siteName: "Ujjwal Katiyar",
    url: "https://ujjwalkatiyar.in",
    images: [
      {
        url: "https://ujjwalkatiyar.in/profile-card.png",
        secureUrl: "https://ujjwalkatiyar.in/profile-card.png",
        width: 1200,
        height: 675,
        alt: "Ujjwal Katiyar — Software Developer & Systems Architect",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Katiyar — Software Developer & Systems Architect",
    description:
      "Software Developer building scalable real-time systems and AI observability platforms with Next.js, Kafka, Redis, and high-performance cloud architectures.",
    creator: "@ujjwalkatiyar07",
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
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable} ${sourceCodePro.variable} h-full antialiased`}
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
