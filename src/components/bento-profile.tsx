"use client"

import Image from "next/image"
import { Mail, FileText, ArrowUpRight } from "lucide-react"
import { Github, Linkedin, LeetCode } from "@/components/icons"
import Link from "next/link"

export function BentoProfile() {
  const email = "contact@ujjwalkatiyar.in"

  return (
    <section className="w-full pt-10 pb-5 ">
      {/* Top row: Avatar + Name + Role */}
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Ujjwal Katiyar
          </h1>
          <p className="text-sm md:text-base font-medium text-muted-foreground">
            Software Developer
          </p>
        </div>
      </div>

      {/* About paragraph */}
      <p className="text-xs md:text-[15px] text-muted-foreground max-w-3xl mb-6 leading-tight">
        I build software, real-time systems, and scalable backend infrastructure.
        Most of my work is hands-on designing backend architectures, optimizing APIs, building AI applications and agents.
        <br /><br />
        Previously, I worked on multiple full-stack applications as  <Link href="/projects" className="text-emerald-500 underline hover:no-underline transition-colors duration-200"> Personal Projects</Link>, which use a modern tech stack including Next.js, TypeScript, PostgreSQL, Redis, Kafka, and WebSocket. These projects helped me gain hands-on experience in building scalable applications, designing backend architectures, and working with distributed systems.
        <br /><br />
        Currently, I am working on a product called <Link href={"https://asi-telemetry.vercel.app/"} className="text-emerald-500 underline hover:no-underline transition-colors duration-200">ASI:Telemetry</Link> which is a monitoring & observability platform for AI applications and Agents, it helps developers to monitor, collect traces and observe there AI application and agents. It track LLM cost, token usages, latency, performance, intractions, communications between multiple AI agents etc. providing developers with the visibility they need to debug issues, optimize performance, and build more reliable AI systems.
        <br />
      </p>

      {/* Social links — inline */}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://github.com/ujjwalkat07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-gray-700 px-2 py-1 rounded-sm bg-neutral-800"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href="https://www.linkedin.com/in/ujjwalkatiyar07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-gray-700 px-2 py-1 rounded-sm bg-neutral-800"
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-gray-700 px-2 py-1 rounded-sm bg-neutral-800"
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>

        <a
          href="/ujjwal-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border border-gray-700 px-2 py-1 rounded-sm bg-neutral-800"
        >
          <FileText className="h-4 w-4" />
          <span>Resume</span>
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>
      </div>

    </section>
  )
}
