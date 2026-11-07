import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight, BookOpen, ExternalLink, Package } from "lucide-react"
import { Github } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { projects } from "@/data/projects"
import { JsonLd } from "@/lib/json-ld"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  const title = `${project.title} | Projects — Ujjwal Katiyar`
  const description = project.description
  const canonicalUrl = `https://ujjwalkatiyar.in/projects/${slug}`
  const ogImage = "https://ujjwalkatiyar.in/profile-card.png"

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Ujjwal Katiyar",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 675,
          alt: `${project.title} — Ujjwal Katiyar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ujjwalkatiyar07",
      images: [ogImage],
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.demo,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      "@id": "https://ujjwalkatiyar.in/#person",
      name: "Ujjwal Katiyar",
      url: "https://ujjwalkatiyar.in/about",
    },
  }

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ujjwalkatiyar.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://ujjwalkatiyar.in/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://ujjwalkatiyar.in/projects/${slug}`,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbsLd} />

      <Navbar />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-16 pb-16 gap-8">
        {/* Back Link */}
        <Link
          id="project-back-link"
          href="/projects"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>

        {/* Header Section */}
        <header className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
            Featured Engineering Project
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live deployment for ${project.title}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Visit Live Application</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.title} on GitHub`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.pypi && (
              <a
                href={project.pypi}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Python package on PyPI for ${project.title}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <Package className="w-4 h-4 text-emerald-500" />
                <span>PyPI Package</span>
              </a>
            )}
          </div>
        </header>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted border border-border text-foreground text-xs px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Architectural Image */}
        <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-border/80 bg-muted/40 shadow-sm">
          <Image
            src={project.image}
            alt={`Architecture diagram and dashboard preview of ${project.title}`}
            fill
            sizes="(max-width: 960px) 100vw, 960px"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="flex flex-col gap-4 pt-4 border-t border-border/40">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Architecture &amp; Key Highlights
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Related Deep Dive Blog Post */}
        {project.blogSlug && (
          <aside className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Engineering Deep Dive Available
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Read the complete architecture breakdown, FastAPI backend design, and ClickHouse aggregation pipelines.
                </p>
              </div>
            </div>
            <Link
              href={`/blog/${project.blogSlug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-500 hover:text-emerald-400 shrink-0"
            >
              <span>Read Article</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </aside>
        )}
      </main>

      <Footer />
    </div>
  )
}

