import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ujjwalkatiyar.in"),
  title: "Ujjwal Katiyar — Full Stack Engineer & Web Systems Architect",
  description: "Portfolio of Ujjwal Katiyar, a Full Stack Engineer specializing in real-time systems, Kafka pipelines, and responsive Next.js apps.",
  keywords: ["Ujjwal Katiyar", "Full Stack Engineer", "Noida", "India", "Software Engineer", "Next.js", "Shadcn UI", "Kafka", "Redis"],
  authors: [{ name: "Ujjwal Katiyar" }],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Ujjwal Katiyar — Full Stack Engineer & Web Systems Architect",
    description: "Portfolio of Ujjwal Katiyar, a Full Stack Engineer specializing in real-time systems, Kafka pipelines, and responsive Next.js apps.",
    type: "website",
    locale: "en_US",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ujjwal Katiyar",
              "jobTitle": "Full Stack Engineer",
              "url": "https://ujjwalkatiyar.in",
              "sameAs": [
                "https://github.com/ujjwalkat07",
                "https://www.linkedin.com/in/ujjwalkatiyar07"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Noida",
                "addressCountry": "India"
              }
            })
          }}
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

