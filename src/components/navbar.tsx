"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [activeSection, setActiveSection] = React.useState("")

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "skills", "projects"]
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
          {["about", "experience", "skills", "projects"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollTo(section)}
                className={`text-xs font-normal capitalize px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                  activeSection === section
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
      <div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
