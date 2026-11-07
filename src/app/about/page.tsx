import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Code2, BookOpen, Layers } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About | Ujjwal Katiyar — Software Developer",
  description:
    "Learn about Ujjwal Katiyar, a Software Developer building scalable real-time systems, distributed backend infrastructure, and AI observability platforms.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/about",
  },
  openGraph: {
    title: "About | Ujjwal Katiyar — Software Developer",
    description:
      "Learn about Ujjwal Katiyar, a Software Developer building scalable real-time systems, distributed backend infrastructure, and AI observability platforms.",
    url: "https://ujjwalkatiyar.in/about",
    type: "profile",
    images: [
      {
        url: "/profile-card.png",
        width: 1671,
        height: 941,
        alt: "About Ujjwal Katiyar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Ujjwal Katiyar — Software Developer",
    description:
      "Learn about Ujjwal Katiyar, a Software Developer building scalable real-time systems, distributed backend infrastructure, and AI observability platforms.",
    creator: "@ujjwalkatiyar07",
    images: ["/profile-card.png"],
  },
}

const techStack = {
  "Languages & Runtimes": ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  "Frontend & Frameworks": ["Next.js (App Router)", "React 19", "Tailwind CSS", "Shadcn UI"],
  "Backend & Distributed Systems": ["Node.js", "FastAPI", "Apache Kafka", "Redis", "WebSockets"],
  "Databases & Storage": ["PostgreSQL", "ClickHouse", "Supabase"],
  "DevOps & Tooling": ["Docker", "Cloudflare", "Linux", "Git", "GitHub Actions"],
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <Navbar />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-16 pb-16 gap-10">
        {/* Back Link */}
        <Link
          id="about-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-border/40">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-border/80 shrink-0 shadow-sm">
            <Image
              src="/profile_pic.webp"
              alt="Ujjwal Katiyar"
              fill
              priority
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Ujjwal Katiyar
            </h1>
            <p className="text-base text-[#3ECF8E] font-medium">
              Software Developer &amp; Systems Architect
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Noida, India • Focused on scalable real-time systems and AI observability
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Background &amp; Philosophy
          </h2>
          <p>
            I build software, real-time systems, and scalable backend infrastructure. Most of my work is hands-on:
            designing resilient architectures, optimizing high-throughput APIs, and engineering AI applications and autonomous agents.
          </p>
          <p>
            Previously, I worked on multiple full-stack applications as personal projects—spanning distributed cryptocurrency exchange engines, high-concurrency order matching books, and modern SaaS dashboards. These systems leverage modern stacks including Next.js, TypeScript, PostgreSQL, Redis, Kafka, and WebSockets to achieve low latency, fault tolerance, and clear domain separation.
          </p>
          <p>
            Currently, I am building <Link href="https://asi-telemetry.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 underline hover:no-underline font-medium">ASI:Telemetry</Link>, an observability and monitoring platform tailored for AI agents and LLM applications. ASI:Telemetry helps developers track token consumption, inference latency, agent-to-agent communication, and execution spans—giving teams the observability needed to optimize cost and debug non-deterministic agent workflows.
          </p>
        </div>

        {/* Tech Stack Section */}
        <div className="flex flex-col gap-6 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#3ECF8E]" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Technical Stack &amp; Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(techStack).map(([category, items]) => (
              <div
                key={category}
                className="p-4 rounded-xl border border-border/50 bg-card/40 flex flex-col gap-3"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md border border-border/60 bg-muted/30 text-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links & Navigation Cards */}
        <div className="flex flex-col gap-6 pt-4 border-t border-border/40">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Explore &amp; Connect
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/projects"
              className="group p-5 rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-[#3ECF8E]/40 transition-all flex items-start justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#3ECF8E]" />
                  <span className="font-semibold text-foreground text-sm group-hover:text-[#3ECF8E] transition-colors">
                    Projects
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Explore full-stack platforms, real-time engines, and open source tools.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#3ECF8E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </Link>

            <Link
              href="/blog"
              className="group p-5 rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-[#3ECF8E]/40 transition-all flex items-start justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#3ECF8E]" />
                  <span className="font-semibold text-foreground text-sm group-hover:text-[#3ECF8E] transition-colors">
                    Blog &amp; Articles
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Read system design deep-dives, migration guides, and architecture breakdowns.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#3ECF8E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </Link>

            <a
              href="https://github.com/ujjwalkat07"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-[#3ECF8E]/40 transition-all flex items-start justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-foreground" />
                  <span className="font-semibold text-foreground text-sm group-hover:text-[#3ECF8E] transition-colors">
                    GitHub
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Check out repositories, SDK source code, and developer experiments.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#3ECF8E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

            <a
              href="https://www.linkedin.com/in/ujjwalkatiyar07"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-[#3ECF8E]/40 transition-all flex items-start justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                  <span className="font-semibold text-foreground text-sm group-hover:text-[#3ECF8E] transition-colors">
                    LinkedIn
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connect for professional inquiries, collaborations, and discussions.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#3ECF8E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
