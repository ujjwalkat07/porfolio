import * as React from "react"
import Image from "next/image"
import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/components/ui/code-block"
import { Mermaid } from "@/components/Mermaid"
import { cn } from "@/lib/utils"

function getNodeText(node: React.ReactNode): string {
  if (!node) return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (React.isValidElement(node) && (node.props as { children?: React.ReactNode })?.children) {
    return getNodeText((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function createHeading(Tag: "h2" | "h3", classes: string, anchorSize: string) {
  return function Heading({ children, id, ...props }: React.ComponentPropsWithoutRef<typeof Tag>) {
    const headerId = id || slugify(getNodeText(children))
    return (
      <Tag id={headerId} className={cn("group scroll-mt-24 font-display font-bold tracking-tight text-foreground flex items-center", classes)} {...props}>
        <span>{children}</span>
        {headerId && (
          <a href={`#${headerId}`} className={cn("ml-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#3ECF8E] select-none font-normal", anchorSize)} aria-label="Link to section">
            #
          </a>
        )}
      </Tag>
    )
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Mermaid,
    CodeBlock,
    h2: createHeading("h2", "text-xl sm:text-2xl mt-12 mb-4", "text-base"),
    h3: createHeading("h3", "text-lg sm:text-xl font-semibold mt-8 mb-3", "text-sm"),
    p: ({ children, ...props }) => <p className="mb-6 leading-[1.8]" {...props}>{children}</p>,
    strong: ({ children, ...props }) => <strong className="font-semibold text-foreground" {...props}>{children}</strong>,
    a: ({ href, children, ...props }) => {
      const isInternal = href?.startsWith("/") || href?.startsWith("#")
      return (
        <a
          href={href}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="text-foreground underline decoration-[#3ECF8E]/60 underline-offset-4 hover:text-[#3ECF8E] hover:decoration-[#3ECF8E] transition-colors"
          {...props}
        >
          {children}
        </a>
      )
    },
    ul: ({ children, ...props }) => <ul className="list-disc pl-5 sm:pl-6 mb-6 space-y-2" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="list-decimal pl-5 sm:pl-6 mb-6 space-y-2" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li className="leading-[1.75]" {...props}>{children}</li>,
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-2 border-[#3ECF8E] pl-4.5 italic text-muted-foreground my-7" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-8 border border-border/60 rounded-xl">
        <table className="w-full border-collapse text-xs sm:text-sm" {...props}>{children}</table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="bg-muted/50 font-display font-semibold text-foreground px-4 py-3 text-left border-b border-border/60 text-[11px] uppercase tracking-wider" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 border-b border-border/40 text-neutral-700 dark:text-neutral-300" {...props}>{children}</td>
    ),
    tr: ({ children, ...props }) => <tr className="even:bg-muted/15" {...props}>{children}</tr>,
    img: ({ src, alt, title, style, width }) => {
      const cleanSrc = (typeof src === "string" ? src : "").replace(/^(\.\.\/)*public\//, "/").replace(/^\/public\//, "")
      const widthVal = (alt?.match(/\|(?:width=)?(\d+(?:px|%|rem)?)/i)?.[1] || title?.match(/width[:=]\s*(\d+(?:px|%|rem)?)/i)?.[1] || width)?.toString()
      const maxWidth = widthVal ? (/^\d+$/.test(widthVal) ? `${widthVal}px` : widthVal) : "100%"
      const cleanAlt = (alt || "").replace(/\|(?:width=)?\d+(?:px|%|rem)?/i, "").trim()

      if (!cleanAlt || cleanAlt.toLowerCase() === "alt text" || cleanAlt.toLowerCase().includes("placeholder")) {
        console.warn(
          `\x1b[33m[SEO ACCESSIBILITY WARNING]\x1b[0m MDX Image "${cleanSrc}" has missing or placeholder alt text ("${cleanAlt}"). Please provide a descriptive alt attribute for SEO and screen readers.`
        )
      }

      return (
        <span className="block my-8 text-center" style={{ maxWidth, width: widthVal ? "100%" : undefined, ...style }}>
          <Image
            src={cleanSrc}
            alt={cleanAlt || "Descriptive illustration of technical architecture"}
            title={title}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-auto w-full max-w-full rounded-xl border border-border/60 mx-auto block shadow-xs object-cover"
          />
        </span>
      )
    },
    pre: ({ children, ...props }) => {
      if (React.isValidElement(children)) {
        const childProps = children.props as { className?: string; children?: React.ReactNode; "data-language"?: string }
        const rawClass = childProps?.className || ""
        const dataLang = childProps?.["data-language"] || ""
        const rawCode = getNodeText(childProps?.children).trim()

        if (rawClass.includes("mermaid") || dataLang === "mermaid") {
          return <Mermaid chart={rawCode} />
        }

        const match = /language-([a-zA-Z0-9_-]+)/.exec(rawClass)
        const lang = match ? match[1] : (dataLang || "")
        return <CodeBlock language={lang}>{rawCode}</CodeBlock>
      }
      return <pre {...props}>{children}</pre>
    },
    code: ({ children, className, ...props }) => (
      <code className={cn("font-code text-[12px] sm:text-[12.5px] px-1.5 py-0.5 rounded bg-muted/70 dark:bg-[#1f1f1f] border border-border/70 text-foreground font-normal", className)} {...props}>
        {children}
      </code>
    ),
    ...components,
  }
}