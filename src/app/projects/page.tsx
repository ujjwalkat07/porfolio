import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { Github } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Projects } from "@/components/projects"
import { projects } from "@/data/projects"
import { JsonLd } from "@/lib/json-ld"

export const metadata: Metadata = {
  title: "Projects | Ujjwal Katiyar — Software Developer & Systems Architect",
  description:
    "Explore featured full-stack platforms, real-time trading engines, and distributed backend architectures engineered by Ujjwal Katiyar.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/projects",
  },
  openGraph: {
    title: "Projects | Ujjwal Katiyar — Software Developer & Systems Architect",
    description:
      "Explore featured full-stack platforms, real-time trading engines, and distributed backend architectures engineered by Ujjwal Katiyar.",
    url: "https://ujjwalkatiyar.in/projects",
    type: "website",
    siteName: "Ujjwal Katiyar",
    images: [
      {
        url: "https://ujjwalkatiyar.in/profile-card.png",
        width: 1200,
        height: 675,
        alt: "Projects | Ujjwal Katiyar — Software Developer & Systems Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ujjwal Katiyar — Software Developer & Systems Architect",
    description:
      "Explore featured full-stack platforms, real-time trading engines, and distributed backend architectures engineered by Ujjwal Katiyar.",
    creator: "@ujjwalkatiyar07",
    images: ["https://ujjwalkatiyar.in/profile-card.png"],
  },
}

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects by Ujjwal Katiyar",
    description:
      "A collection of full-stack web applications, real-time engines, and developer platforms built by Ujjwal Katiyar.",
    url: "https://ujjwalkatiyar.in/projects",
    itemListElement: projects.map((project, idx) => ({
      "@type": "SoftwareApplication",
      position: idx + 1,
      name: project.title,
      description: project.description,
      url: project.demo,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      author: {
        "@type": "Person",
        "@id": "https://ujjwalkatiyar.in/#person",
        name: "Ujjwal Katiyar",
        url: "https://ujjwalkatiyar.in",
      },
    })),
  }

  return (
    <div className="relative min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <JsonLd data={jsonLd} />

      {/* Resend-inspired Top Radial Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] max-w-full h-[360px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_70%)]"
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col pt-10 sm:pt-14 gap-10">
        {/* Back Link */}
        <Link
          id="projects-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-mono text-muted-foreground px-3.5 py-2 border border-border/60 rounded-lg bg-card/40 hover:bg-muted hover:text-foreground hover:border-foreground/30 transition-all duration-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header Block (Resend Inspired) */}
        <div className="flex flex-col gap-3">
          
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground">
           Engineering Projects
          </h1>
        </div>

        {/* Projects Section */}
        <Projects showHeader={false} showBorder={false} showFilter={true} />


        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
