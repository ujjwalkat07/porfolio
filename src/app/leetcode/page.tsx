import type { Metadata } from "next"
import { fetchLeetCodeData } from "@/lib/leetcode"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeetCodeProfileHeader } from "@/components/leetcode/leetcode-profile-header"
import { LeetCodeStats } from "@/components/leetcode/leetcode-stats"
import { LeetCodeTopics } from "@/components/leetcode/leetcode-topics"
import { LeetCodeHeatmap } from "@/components/leetcode/leetcode-heatmap"
import { LeetCodeSubmissions } from "@/components/leetcode/leetcode-submissions"
import { LeetCode, Github } from "@/components/icons"
import { Trophy, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "LeetCode Solutions & Algorithm Stats — Ujjwal Katiyar",
  description:
    "Explore solved Data Structures & Algorithms challenges, topic proficiencies, acceptance rates, and live LeetCode stats of Ujjwal Katiyar.",
  keywords: [
    "Ujjwal Katiyar LeetCode",
    "Ujjwal Katiyar DSA",
    "LeetCode profile ujjwalkat07",
    "Competitive Programming",
    "Data Structures and Algorithms",
    "C++ LeetCode solutions",
    "Software Developer Noida",
  ],
  alternates: {
    canonical: "https://ujjwalkatiyar.in/leetcode",
  },
  openGraph: {
    title: "LeetCode Solutions & Algorithm Stats — Ujjwal Katiyar",
    description:
      "Explore solved Data Structures & Algorithms challenges, topic proficiencies, and live LeetCode stats of Ujjwal Katiyar.",
    url: "https://ujjwalkatiyar.in/leetcode",
    type: "profile",
    siteName: "Ujjwal Katiyar",
    images: [
      {
        url: "https://assets.leetcode.com/users/devrithm07/avatar_1781017208.png",
        width: 400,
        height: 400,
        alt: "Ujjwal Katiyar LeetCode Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetCode Solutions & Algorithm Stats — Ujjwal Katiyar",
    description:
      "Explore solved Data Structures & Algorithms challenges, topic proficiencies, and live LeetCode stats of Ujjwal Katiyar.",
    creator: "@ujjwalkatiyar07",
    images: ["https://assets.leetcode.com/users/devrithm07/avatar_1781017208.png"],
  },
}

export const revalidate = 3600 // Cache page for 1 hour (ISR)

export default async function LeetCodePage() {
  const leetCodeData = await fetchLeetCodeData("ujjwalkat07")

  // Generate JSON-LD Structured Data
  const jsonLdProfile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: leetCodeData?.profile.realName || "Ujjwal Katiyar",
      alternateName: leetCodeData?.username || "ujjwalkat07",
      url: "https://ujjwalkatiyar.in/leetcode",
      image: leetCodeData?.profile.userAvatar || "https://assets.leetcode.com/users/devrithm07/avatar_1781017208.png",
      jobTitle: "Software Developer & Systems Architect",
      sameAs: [
        "https://leetcode.com/u/ujjwalkat07",
        "https://github.com/ujjwalkat07",
        "https://ujjwalkatiyar.in",
        "https://www.linkedin.com/in/ujjwalkatiyar07",
      ],
      description: "Active LeetCode problem solver practicing Data Structures, Algorithms, and System Optimization.",
    },
  }

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ujjwal Katiyar LeetCode Solved Solutions",
    description: "Recent accepted algorithm and data structure solutions solved by Ujjwal Katiyar on LeetCode",
    numberOfItems: leetCodeData?.recentAcSubmissionList.length || 0,
    itemListElement: (leetCodeData?.recentAcSubmissionList || []).slice(0, 15).map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        url: `https://leetcode.com/problems/${item.titleSlug}/`,
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
            <span className="text-foreground font-medium">LeetCode Showcase</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
                <span>LeetCode Showcase</span>
                {/* <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Sparkles className="h-3 w-3" /> Live API
                </span> */}
              </h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Explore my algorithmic problem-solving journey, data structure mastery, topic proficiencies, and recent accepted solutions powered directly by the LeetCode GraphQL API.
              </p>
            </div>
          </div>
        </div>

        {/* LeetCode User Hero Header */}
        <LeetCodeProfileHeader data={leetCodeData} />

        {/* Aggregate Statistics & Difficulty Breakdown */}
        <LeetCodeStats data={leetCodeData} />

        {/* Topic & Language Proficiency Breakdown */}
        <LeetCodeTopics data={leetCodeData} />

        {/* Activity Heatmap */}
        {leetCodeData?.submissionCalendar && (
          <LeetCodeHeatmap submissionCalendar={leetCodeData.submissionCalendar} />
        )}

        {/* Recent Solved Submissions List */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>Recent Accepted Solutions</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live log of recently solved problems and algorithms verified on LeetCode.
            </p>
          </div>
          <LeetCodeSubmissions submissions={leetCodeData?.recentAcSubmissionList || []} />
        </div>

        {/* Call to Action Footer Box */}
        <section
          aria-label="DSA Collaboration & Open Source"
          className="rounded-2xl border border-border/60 bg-gradient-to-r from-muted/40 via-background to-muted/40 p-6 sm:p-8 text-center flex flex-col items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <LeetCode className="h-6 w-6 fill-amber-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Looking for strong problem solving &amp; systems design skills?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
            Check out my open-source GitHub repositories or reach out to discuss engineering roles, technical collaboration, or system architecture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              id="leetcode-page-cta-github"
              href="/github"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-foreground/90 transition-colors shadow-sm"
            >
              <Github className="h-3.5 w-3.5" />
              <span>View GitHub Showcase</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              id="leetcode-page-cta-contact"
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
