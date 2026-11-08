"use client"

import { Mail, FileText, ArrowUpRight } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"
import Link from "next/link"

export function BentoProfile() {
  const email = "contact@ujjwalkatiyar.in"

  return (
    <section className="w-full pt-10 pb-5">
      {/* Top row: Avatar + Name + Role */}
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-5">
        <div className="flex flex-col gap-1">
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Ujjwal Katiyar
          </h1>
          <p className="text-sm md:text-base font-medium text-muted-foreground">
            Software Developer
          </p>
        </div>
      </div>

      {/* About paragraph - concise 2-3 sentences with link to /about */}
      <p className="text-sm md:text-base text-muted-foreground max-w-3xl mb-6 leading-relaxed">
        I build software, real-time systems, and scalable backend infrastructure with Next.js, TypeScript, Kafka, and ClickHouse. Currently, I am engineering <a href="https://asi-telemetry.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 underline hover:no-underline transition-colors duration-200">ASI:Telemetry</a> to provide observability, token tracking, and latency monitoring for AI applications and autonomous agents. Learn more <Link href="/about" className="text-emerald-500 underline hover:no-underline transition-colors duration-200">about my background</Link> or explore my <Link href="/projects" className="text-emerald-500 underline hover:no-underline transition-colors duration-200">featured projects</Link>.
      </p>

      {/* Social links — inline with accessible labels */}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://github.com/ujjwalkat07"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ujjwal Katiyar on GitHub"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-neutral-300 dark:border-gray-700 px-2 py-1 rounded-sm bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href="https://www.linkedin.com/in/ujjwalkatiyar07"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ujjwal Katiyar on LinkedIn"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-neutral-300 dark:border-gray-700 px-2 py-1 rounded-sm bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href={`mailto:${email}`}
          aria-label="Send email to Ujjwal Katiyar"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-neutral-300 dark:border-gray-700 px-2 py-1 rounded-sm bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href="/ujjwal-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Ujjwal Katiyar resume (PDF)"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-neutral-300 dark:border-gray-700 px-2 py-1 rounded-sm bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <FileText className="h-4 w-4" />
          <span>Resume</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>
      </div>
    </section>
  )
}
