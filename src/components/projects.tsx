"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { projects, ProjectItem } from "@/data/projects"
import { Project, ProjectProps } from "@/components/project"

export { Project }
export type { ProjectItem, ProjectProps }

interface ProjectsProps {
  showHeader?: boolean
  showBorder?: boolean
  showFilter?: boolean
  className?: string
}

export function Projects({
  showHeader = true,
  showBorder = true,
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
      aria-label="Projects Showcase"
      className={`py-5 text-white transition-colors duration-300 ${
        showBorder ? "border-b border-border/40" : ""
      } ${className}`}
    >

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project, idx) => (
          <Project
            key={project.slug}
            image={project.image}
            title={project.title}
            description={project.description}
            github={project.github}
            livedemo={project.demo}
            stack={project.stack}
            priority={idx < 2}
          />
        ))}
      </div>
    </section>
  )
}
