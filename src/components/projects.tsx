"use client"

import * as React from "react"
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
  showBorder = true,
  className = "",
}: ProjectsProps = {}) {
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
        {projects.map((project, idx) => (
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
