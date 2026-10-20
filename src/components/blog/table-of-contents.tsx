"use client"

import * as React from "react"

export interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    if (items.length === 0) return

    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null)

      const scrollPosition = window.scrollY + 140

      let currentActive = items[0]?.id || ""
      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          currentActive = el.id
        }
      }
      setActiveId(currentActive)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  if (!items || items.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top, behavior: "smooth" })
      history.pushState(null, "", `#${id}`)
      setActiveId(id)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-code font-semibold tracking-wider text-muted-foreground uppercase">
        On this page
      </p>
      <nav
        aria-label="Table of contents"
        className="relative border-l border-border/60 pl-3.5 flex flex-col gap-1.5 text-xs font-body"
      >
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`group relative transition-all duration-150 py-1 leading-snug break-words ${
                item.level === 3 ? "pl-3 text-[11px]" : "font-medium"
              } ${
                isActive
                  ? "text-[#3ECF8E] font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <span
                  className="absolute -left-[15px] top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#3ECF8E] rounded-full transition-all"
                  aria-hidden="true"
                />
              )}
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                {item.text}
              </span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
