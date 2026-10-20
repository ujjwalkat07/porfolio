"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Github } from "@/components/icons"
import { projects, ProjectItem } from "@/data/projects"

export type { ProjectItem }

interface ProjectsProps {
  showHeader?: boolean
  showBorder?: boolean
  showFilter?: boolean
  className?: string
}

export function Projects({
  showHeader = true,
  showBorder = true,
  showFilter = true,
  className = "",
}: ProjectsProps = {}) {
  const [selectedTag, setSelectedTag] = React.useState<string>("All")

  const allTags = React.useMemo(() => {
    const tagsSet = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)))
    return ["All", ...Array.from(tagsSet)]
  }, [])

  const filteredProjects = React.useMemo(() => {
    if (selectedTag === "All") return projects
    return projects.filter((p) => p.tags.includes(selectedTag))
  }, [selectedTag])

  return (
    <section
      id="projects"
      className={`py-5 transition-colors duration-300 ${
        showBorder ? "border-b border-border/40" : ""
      } ${className}`}
    >
      {/* Section Header */}
      {showHeader && (
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground select-none">
            Projects
          </h2>
        </div>
      )}

      {/* Filter Tags */}
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {allTags.map((tag) => {
            const isActive = selectedTag === tag
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60"
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      )}

      {/* 2-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {filteredProjects.map((project, i) => (
          <div
            key={project.title}
            className="bg-card border border-border rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col justify-between group hover:border-foreground/25 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div>
              {/* Top Title inside card */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight select-none">
                  {project.title}
                </h3>
                <div className="flex justify-end gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repository for ${project.title}`}
                      className="w-9 h-9 rounded-full bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit live demo for ${project.title}`}
                    className="w-9 h-9 rounded-full bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Preview Image Container */}
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-border bg-muted/40 mt-5">
                <Image
                  src={project.image}
                  alt={`Preview screenshot of ${project.title}`}
                  height={500}
                  width={500}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={i < 2}
                />
              </div>
            </div>

            {/* Bottom Details & Links */}
            <div>
              {/* Description */}
              <p className="text-xs md:text-sm text-muted-foreground font-normal leading-relaxed line-clamp-2 mb-4 mt-5">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 select-none">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="bg-muted border border-border text-foreground text-[11px] md:text-xs px-3 py-1 rounded-full font-medium tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
                {project.extraCount && (
                  <span className="bg-muted/50 border border-border/80 text-muted-foreground text-[11px] md:text-xs px-2.5 py-1 rounded-full font-medium">
                    +{project.extraCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
