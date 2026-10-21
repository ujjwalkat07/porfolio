import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Projects } from "@/components/projects"
import { projects } from "@/data/projects"
import { Github } from "@/components/icons"

export const metadata: Metadata = {
  title: "Projects | Ujjwal Katiyar — Software Developer & Systems Architect",
  description:
    "Explore featured full-stack platforms, real-time engines, and distributed web applications engineered by Ujjwal Katiyar.",
  keywords: [
    "Ujjwal Katiyar projects",
    "Full-stack projects",
    "Next.js projects",
    "Distributed systems",
    "Cryptocurrency exchange",
    "CRM Next.js Turborepo",
    "TypeScript portfolio projects",
    "Ujjwal Katiyar software developer",
  ],
  alternates: {
    canonical: "https://ujjwalkatiyar.in/projects",
  },
  openGraph: {
    title: "Projects | Ujjwal Katiyar — Software Developer & Systems Architect",
    description:
      "Explore featured full-stack platforms, real-time engines, and distributed web applications engineered by Ujjwal Katiyar.",
    url: "https://ujjwalkatiyar.in/projects",
    type: "website",
    siteName: "Ujjwal Katiyar",
    images: [
      {
        url: "https://ujjwalkatiyar.in/crypto.webp",
        width: 1200,
        height: 630,
        alt: "Ujjwal Katiyar Featured Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ujjwal Katiyar — Software Developer",
    description:
      "Explore featured full-stack platforms, real-time engines, and distributed web applications engineered by Ujjwal Katiyar.",
    creator: "@ujjwalkatiyar07",
    images: ["https://ujjwalkatiyar.in/crypto.webp"],
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
        name: "Ujjwal Katiyar",
        url: "https://ujjwalkatiyar.in",
      },
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-16 pb-16 gap-8">
        {/* Back Link */}
        <Link
          id="projects-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full w-fit">
            Portfolio Showcase
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Featured Projects
          </h1>
          <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-2xl">
            A curated collection of full-stack platforms, real-time trading architectures, and distributed systems I&apos;ve designed and engineered.
          </p>
        </div>

        {/* Projects Section */}
        <Projects showHeader={false} showBorder={false} showFilter={true} />

        {/* Bottom CTA Card */}
        <div className="mt-4 p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-border bg-card/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Want to see more code or collaborate?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore open-source repositories on GitHub or reach out directly to discuss new opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              id="projects-cta-github"
              href="https://github.com/ujjwalkat07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
            </a>
            <Link
              id="projects-cta-contact"
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-xs"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
