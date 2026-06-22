"use client"

import * as React from "react"
import { Mail, Phone, FileText } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <section
      id="hero"
      className={`pt-24 pb-16 border-b border-border/40 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <div className="flex flex-col gap-6">
        {/* Active Badge */}
        <div>
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 px-3 py-1 bg-muted/30 border-border/60 rounded-full select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-normal tracking-wide text-muted-foreground uppercase">
              Open to opportunities
            </span>
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl">
          Hi! I&apos;m Ujjwal Katiyar,<br /> Full Stack Engineer
          from <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-300 dark:to-emerald-400">India.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-light">
          Specializing in real-time web applications, scalable distributed systems, and high-performance backends. Building production-ready products end to end.
        </p>

        {/* Contacts */}
        <div className="flex flex-wrap gap-2.5 mt-2">
          {/* Email */}
          <a
            href="mailto:ukcode07@gmail.com"
            className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
          >
            <Mail className="h-3.5 w-3.5 text-muted-foreground/80" />
            <span>ukcode07@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+917309324025"
            className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
          >
            <Phone className="h-3.5 w-3.5 text-muted-foreground/80" />
            <span>+91 73093 24025</span>
          </a>

          {/* Resume */}
          <a
            href="https://drive.google.com/file/d/1ergvRMmacThRf3foygDb8fHFty12boqY/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
          >
            <FileText className="h-3.5 w-3.5 text-muted-foreground/80" />
            <span>Resume</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ujjwalkatiyar07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
          >
            <Linkedin className="h-3.5 w-3.5 text-muted-foreground/80" />
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/ujjwalkat07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
          >
            <Github className="h-3.5 w-3.5 text-muted-foreground/80" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}
