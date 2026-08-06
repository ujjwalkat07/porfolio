"use client"

import Image from "next/image"
import { Mail, FileText, ArrowUpRight } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"

export function BentoProfile() {
  const email = "contact@ujjwalkatiyar.in"

  return (
    <section className="w-full pt-10 pb-2 border-b border-border/40">
      {/* Top row: Avatar + Name + Role */}
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl sm:text-5xl font-bold tracking-tight text-foreground">
            Ujjwal Katiyar
          </h1>
          <p className="text-sm md:text-base font-medium text-muted-foreground">
            Software Developer &amp; Systems Architect
          </p>
        </div>
      </div>

      {/* About paragraph */}
      <p className="text-sm md:text-sm text-muted-foreground max-w-3xl mb-6 text-justify">
        Software Developer specializing in real-time web applications, scalable systems and high-performance backend development, with hands-on experience across end-to-end product development. Combining academic grounding in data structures, algorithms, and systems design with shipped, real-world engineering work.
      </p>

      {/* Social links — inline */}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://github.com/ujjwalkat07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href="https://www.linkedin.com/in/ujjwalkatiyar07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href="/ujjwal-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <FileText className="h-4 w-4" />
          <span>Resume</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>
      </div>

    </section>
  )
}
