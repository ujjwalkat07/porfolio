import type { Metadata } from "next"
import { fetchGithubUser, fetchGithubRepos } from "@/lib/github"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GithubProfileHeader } from "@/components/github/github-profile-header"
import { GithubStats } from "@/components/github/github-stats"
import { GithubRepoList } from "@/components/github/github-repo-list"
import { TechStackSlider } from "@/components/github/tech-stack-slider"
import { Github } from "@/components/icons"
import { Code2, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "GitHub Repositories & Open Source Projects — Ujjwal Katiyar",
  description:
    "Explore open-source projects, developer statistics, and public GitHub code contributions of Ujjwal Katiyar, a Full Stack Engineer & Systems Architect.",
  keywords: [
    "Ujjwal Katiyar GitHub",
    "Ujjwal Katiyar projects",
    "Ujjwal Katiyar open source",
    "TypeScript repositories",
    "Next.js projects",
    "Distributed Systems code",
    "Full Stack Engineer Noida",
    "GitHub Showcase",
  ],
  alternates: {
    canonical: "https://ujjwalkatiyar.in/github",
  },
  openGraph: {
    title: "GitHub Repositories & Open Source Projects — Ujjwal Katiyar",
    description:
      "Explore open-source projects, developer statistics, and public GitHub code contributions of Ujjwal Katiyar.",
    url: "https://ujjwalkatiyar.in/github",
    type: "profile",
    siteName: "Ujjwal Katiyar",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/ujjwalkat07?v=4",
        width: 400,
        height: 400,
        alt: "Ujjwal Katiyar GitHub Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Repositories & Open Source Projects — Ujjwal Katiyar",
    description:
      "Explore open-source projects, developer statistics, and public GitHub code contributions of Ujjwal Katiyar.",
    creator: "@ujjwalkatiyar07",
    images: ["https://avatars.githubusercontent.com/u/ujjwalkat07?v=4"],
  },
};

export const revalidate = 3600; // Cache page for 1 hour (ISR)

export default async function GithubPage() {
  const [user, repos] = await Promise.all([
    fetchGithubUser("ujjwalkat07"),
    fetchGithubRepos("ujjwalkat07"),
  ])

  // Generate JSON-LD Structured Data for Google Search
  const jsonLdProfile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "dateCreated": user?.created_at || new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntity": {
      "@type": "Person",
      "name": user?.name || "Ujjwal Katiyar",
      "alternateName": user?.login || "ujjwalkat07",
      "url": "https://ujjwalkatiyar.in/github",
      "image": user?.avatar_url || "https://avatars.githubusercontent.com/u/ujjwalkat07?v=4",
      "jobTitle": "Full Stack Engineer & Systems Architect",
      "sameAs": [
        user?.html_url || "https://github.com/ujjwalkat07",
        "https://ujjwalkatiyar.in",
        "https://www.linkedin.com/in/ujjwalkatiyar07",
      ],
      "description": user?.bio || "Full Stack Engineer & Systems Architect",
    },
  }


  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ujjwal Katiyar GitHub Open Source Repositories",
    "description": "Public source code repositories maintained by Ujjwal Katiyar",
    "numberOfItems": repos.length,
    "itemListElement": repos.slice(0, 10).map((repo, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": repo.name,
        "description": repo.description || "Open source project by Ujjwal Katiyar",
        "codeRepository": repo.html_url,
        "programmingLanguage": repo.language || "TypeScript",
        "author": {
          "@type": "Person",
          "name": "Ujjwal Katiyar",
        },
      },
    })),
  }

  return (
    <>
      {/* Structured Data Scripts for Google Search Crawler */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfile) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* Page Header / Breadcrumb navigation */}
        <div className="flex flex-col gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">GitHub Showcase</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
                <span>GitHub Repositories</span>
                {/* <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="h-3 w-3" /> Live API
                </span> */}
              </h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Discover my public repositories, developer statistics, language distributions, and open-source contributions powered directly by the GitHub REST API.
              </p>
            </div>
          </div>
        </div>

        {/* GitHub User Hero Header */}
        <GithubProfileHeader user={user} />

        {/* Sliding Tech Stack Marquee */}
        <TechStackSlider />

        {/* GitHub Aggregate Statistics */}
        <GithubStats repos={repos} />

        {/* Repository Search, Filtering & Grid Display Component */}
        <GithubRepoList repos={repos} />

        {/* Call to Action Footer Box */}
        <section aria-label="GitHub Collaboration" className="rounded-2xl border border-border/60 bg-gradient-to-r from-muted/40 via-background to-muted/40 p-6 sm:p-8 text-center flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Interested in collaborating or reviewing code?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
            Check out my featured portfolio projects or get in touch for custom software development and architectural consulting.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              id="github-page-cta-projects"
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <span>View Featured Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              id="github-page-cta-contact"
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </section>
      </main>
<div className="w-full max-w-[960px] mx-auto">
        <Footer />
      </div>
    </>
  )
}
