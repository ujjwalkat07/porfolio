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

export const metadata: Metadata = {
  title: "Ujjwal Katiyar — Full Stack Engineer",
  description: "Portfolio website of Ujjwal Katiyar, Full Stack Engineer based in Noida, India. Specializing in real-time web applications, distributed systems, and high-performance backends.",
  keywords: ["Ujjwal Katiyar", "Full Stack Engineer", "Noida", "India", "Software Engineer", "Next.js", "Shadcn UI", "Kafka", "Redis"],
  authors: [{ name: "Ujjwal Katiyar" }],
  openGraph: {
    title: "Ujjwal Katiyar — Full Stack Engineer",
    description: "Portfolio website of Ujjwal Katiyar, Full Stack Engineer based in Noida, India. Specializing in real-time web applications, distributed systems, and high-performance backends.",
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

