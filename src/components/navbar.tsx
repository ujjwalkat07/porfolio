"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [activeSection, setActiveSection] = React.useState("")

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "skills", "projects", "blog"]
      let currentSection = ""

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the section occupies the upper part of the viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: id === "hero" ? 0 : offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-background/80 px-6 backdrop-blur-md transition-colors duration-300 md:px-10">
      <div className="flex items-center gap-8">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-tight cursor-pointer hover:text-foreground/80 transition-colors"
        >
          Ujjwal Katiyar
        </button>
        <ul className="hidden gap-1 md:flex">
          {["about", "experience", "skills", "projects", "blog"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollTo(section)}
                className={`text-xs font-normal capitalize px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${activeSection === section
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/ujjwal-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-card/50 px-3.5 text-xs font-normal text-muted-foreground hover:bg-muted hover:text-foreground hover:border-foreground/30 transition-all duration-200 cursor-pointer shadow-xs gap-1.5"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Resume</span>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
