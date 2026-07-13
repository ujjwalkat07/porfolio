"use client"

import * as React from "react"
import Image from "next/image"
import { Mail, Phone, FileText, GraduationCap, Code, Layers, Database, Server, GitBranch, Key, ArrowUpRight, ShieldCheck } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function BentoProfile() {
  const email = "ukcode07@gmail.com"

  const skillCategories = [
    { title: "Languages", icon: Code, skills: ["TypeScript", "JavaScript", "Python", "C/C++"] },
    { title: "Frameworks", icon: Layers, skills: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Redux"] },
    { title: "Databases", icon: Database, skills: ["MongoDB", "PostgreSQL", "Mongoose", "Prisma ORM"] },
    { title: "Infrastructure", icon: Server, skills: ["Redis", "Kafka", "Docker", "Git/GitHub", "CI/CD", "Postman"] },
    { title: "Concepts", icon: GitBranch, skills: ["Distributed Systems", "Microservices", "System Design", "Real-Time"] },
    { title: "APIs & Auth", icon: Key, skills: ["REST APIs", "WebSockets", "JWT", "OAuth"] },
  ]

  return (
    <section className="w-full flex flex-col gap-6 pt-6 pb-4 border-b border-border/40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

        {/* CARD 1: Identity & Hero (Spans 2 columns on desktop) */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 dark:bg-zinc-900/40 dark:border-zinc-800/80 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-indigo-500/20 hover:bg-muted/30 dark:hover:bg-zinc-900/50 hover:shadow-lg dark:hover:shadow-indigo-500/2">
          {/* Decorative background glow */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500" />

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Avatar image */}
            <div className="relative h-20 w-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-border/80 dark:border-zinc-800/80 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/profile_pic.webp"
                alt="Ujjwal Katiyar"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col gap-2">
              {/* Active Badge */}
              <div className="self-start">
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 rounded-full select-none"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-emerald-800 dark:text-emerald-400 uppercase">
                    Open to opportunities
                  </span>
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Hi! I&apos;m Ujjwal Katiyar
              </h1>
              <p className="text-sm font-medium bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-300 dark:to-emerald-400">
                Software Developer & Systems Architect
              </p>
            </div>
          </div>

          {/* Tagline/Subtitle */}
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
            Specializing in real-time web applications, scalable distributed systems, and high-performance backends. Building production-ready products end to end.
          </p>
        </div>

        {/* CARD 2: Bio / About Column (Spans 1 col, but row-span-2 tall on desktop) */}
        <div className="md:row-span-2 group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 dark:bg-zinc-900/40 dark:border-zinc-800/80 backdrop-blur-md p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-indigo-500/20 hover:bg-muted/30 dark:hover:bg-zinc-900/50 hover:shadow-lg">
          <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-violet-500/5 blur-3xl group-hover:bg-violet-500/10 transition-all duration-500" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/20">
              <span className="text-xs font-semibold text-foreground tracking-wider uppercase select-none">
                About Me
              </span>
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Software Developer specializing in real-time web applications, scalable systems, and high-performance backend development, with hands-on experience across end-to-end product development.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Currently pursuing a Bachelor&apos;s in Computer Science (AI Specialization), combining academic grounding in systems design with shipped, real-world engineering work.
            </p>
          </div>

          {/* <div className="text-[11px] text-muted-foreground/60 italic font-light pt-2">
            Based in Noida, India
          </div> */}
        </div>

        {/* CARD 3: Connect / Socials (Spans 1 column) */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 dark:bg-zinc-900/40 dark:border-zinc-800/80 backdrop-blur-md p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-indigo-500/20 hover:bg-muted/30 dark:hover:bg-zinc-900/50 hover:shadow-lg">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-foreground tracking-wider uppercase select-none">
              Let&apos;s Connect
            </span>
            {/* <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Reach out for roles, collaborations, or developer banter.
            </p> */}
          </div>

          {/* Social Links Bento-grid-buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* GitHub */}
            <a
              href="https://github.com/ujjwalkat07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-border/40 bg-muted/10 dark:bg-zinc-950/20 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-foreground/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ujjwalkatiyar07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-border/40 bg-muted/10 dark:bg-zinc-950/20 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-foreground/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Linkedin className="h-4 w-4 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-border/40 bg-muted/10 dark:bg-zinc-950/20 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-foreground/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Mail className="h-4 w-4 text-violet-500" />
              <span className="truncate">Email</span>
            </a>

            {/* Resume */}
            <a
              href="/ujjwal-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-border/40 bg-muted/10 dark:bg-zinc-950/20 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-foreground/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <FileText className="h-4 w-4 text-emerald-500" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* CARD 4: Education (Spans 1 column) */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 dark:bg-zinc-900/40 dark:border-zinc-800/80 backdrop-blur-md p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-indigo-500/20 hover:bg-muted/30 dark:hover:bg-zinc-900/50 hover:shadow-lg">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-indigo-500" />
              <span className="text-xs font-semibold text-foreground tracking-wider uppercase select-none">
                Education
              </span>
            </div>

            <div className="text-xs leading-relaxed font-light text-muted-foreground">
              <strong className="font-semibold text-foreground">
                IIMT College of Engineering
              </strong>
              <br />
              B.Tech in CSE (AI Specialization)
              <br />
              <span className="text-[10px] text-muted-foreground font-normal">Oct 2023 – Feb 2027 · Greater Noida</span>
            </div>
          </div>

          {/* <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 hover:text-foreground transition-colors cursor-pointer select-none">
            <span>Verify Credentials</span>
            <ArrowUpRight className="h-3 w-3" />
          </div> */}
        </div>

        {/* CARD 5: Tech Stack / Skills (Spans full width - 3 columns on desktop) */}
        {/* <div className="md:col-span-3 group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 dark:bg-zinc-900/40 dark:border-zinc-800/80 backdrop-blur-md p-6 flex flex-col gap-6 transition-all duration-300 hover:border-indigo-500/20 hover:bg-muted/30 dark:hover:bg-zinc-900/50 hover:shadow-lg"> */}
        {/* <div className="flex items-center justify-between pb-3 border-b border-border/20">
            <span className="text-xs font-semibold text-foreground tracking-wider uppercase select-none">
              Technical Skillset
            </span>
            <Badge variant="secondary" className="text-[9px] uppercase tracking-wider font-light bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              Core stack
            </Badge>
          </div> */}

        {/* Skills Grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillCategories.map((category, i) => {
              const Icon = category.icon
              return (
                <div key={i} className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-md bg-indigo-500/5 text-indigo-500 dark:bg-indigo-500/10 transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground tracking-wide uppercase">
                      {category.title}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    {category.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="text-xs font-light text-muted-foreground hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-default select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div> */}
        {/* </div> */}

      </div>
    </section>
  )
}
