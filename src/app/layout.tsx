import type { Metadata } from "next";
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ujjwalkatiyar.in"),
  title: "Ujjwal Katiyar — Software Developer | Next.js, Kafka, Redis",
  description:
    "Software Developer building scalable real-time systems and AI observability platforms with Next.js, Kafka, Redis, and high-performance cloud architectures.",
  authors: [{ name: "Ujjwal Katiyar" }],
  alternates: {
    canonical: "https://ujjwalkatiyar.in",
    languages: {
      "en-US": "https://ujjwalkatiyar.in",
    },
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
    title: "Ujjwal Katiyar — Software Developer | Next.js, Kafka, Redis",
    description:
      "Software Developer building scalable real-time systems and AI observability platforms with Next.js, Kafka, Redis, and high-performance cloud architectures.",
    type: "website",
    locale: "en_US",
    siteName: "Ujjwal Katiyar",
    images: [
      {
        url: "/profile-card.png",
        width: 1671,
        height: 941,
        alt: "Ujjwal Katiyar — Software Developer | AI, System Design & Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Katiyar — Software Developer | Next.js, Kafka, Redis",
    description:
      "Software Developer building scalable real-time systems and AI observability platforms with Next.js, Kafka, Redis, and high-performance cloud architectures.",
    creator: "@ujjwalkatiyar07",
    images: ["/profile-card.png"],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Ujjwal Katiyar — Blog RSS Feed"
          href="https://ujjwalkatiyar.in/rss.xml"
        />
      </head>
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

