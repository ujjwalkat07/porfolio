"use client"

import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Github } from "@/components/icons"

export interface ProjectProps {
  /** Screenshot / preview image path, e.g. "/asi.webp" */
  image: string
  /** Project name */
  title: string
  /** Short description (1-2 lines) */
  description?: string
  /** GitHub repository URL */
  github?: string
  /** Live demo URL */
  livedemo?: string
  /** Tech stack tags */
  stack?: string[]
  /** Priority image loading (above the fold) */
  priority?: boolean
  /** Extra classes on the outer card */
  className?: string
}

export function Project({
  image,
  title,
  github,
  livedemo,
  priority = false,
  className = "",
}: ProjectProps) {
  return (
    <article
      className={`group relative flex flex-col rounded-xl border border-white/[0.08] hover:border-white/[0.16] bg-[#0A0A0A] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#080808] border-b border-white/[0.06] text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        {livedemo && (
          <a
            href={livedemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
          >
            <span>Open in App</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>

      {/* Full image with all content overlaid */}
      <div className="relative w-full aspect-[16/10] bg-[#050505] overflow-hidden">
        {/* Screenshot — contained so full image is visible, no cropping */}
        <Image
          src={image}
          alt={`Screenshot of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={priority ? undefined : "lazy"}
          priority={priority}
          className="object-contain object-top group-hover:scale-[1.02] transition-transform duration-500"
        />

        {/* Gradient overlay — lighter so the image stays visible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-35% to-transparent" />

        {/* Overlaid content: title, description, stack, buttons */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
          {/* Title */}
          <h3 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent text-3xl font-bold">
            {title}
          </h3>

          {/* Description */}
          {/* {description && (
            <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2">
              {description}
            </p>
          )} */}

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-white/10 text-white/80 text-xs font-medium transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {livedemo && (
              <a
                href={livedemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-xs font-semibold hover:bg-neutral-900 transition-all"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
