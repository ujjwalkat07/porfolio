import * as React from "react"
import type { MDXComponents } from "mdx/types"
import { renderShadcnCodeBlock } from "@/lib/syntax-highlight"
import { cn } from "@/lib/utils"

function getNodeText(node: React.ReactNode): string {
  if (!node) return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (typeof node === "object" && "props" in node && (node as any).props?.children) {
    return getNodeText((node as any).props.children)
  }
  return ""
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, id, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
      const rawText = getNodeText(children)
      const headerId = id || rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      return (
        <h2
          id={headerId}
          className="group scroll-mt-24 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-12 mb-4 flex items-center"
          {...props}
        >
          <span>{children}</span>
          {headerId && (
            <a
              href={`#${headerId}`}
              className="ml-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#3ECF8E] select-none text-base font-normal"
              aria-label="Link to section"
            >
              #
            </a>
          )}
        </h2>
      )
    },
    h3: ({ children, id, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
      const rawText = getNodeText(children)
      const headerId = id || rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      return (
        <h3
          id={headerId}
          className="group scroll-mt-24 font-display text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-8 mb-3 flex items-center"
          {...props}
        >
          <span>{children}</span>
          {headerId && (
            <a
              href={`#${headerId}`}
              className="ml-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#3ECF8E] select-none text-sm font-normal"
              aria-label="Link to section"
            >
              #
            </a>
          )}
        </h3>
      )
    },
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
      <p className="mb-6 leading-[1.8]" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }: React.ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
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
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
      <ul className="list-disc pl-5 sm:pl-6 mb-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
      <ol className="list-decimal pl-5 sm:pl-6 mb-6 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
      <li className="leading-[1.75]" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote className="border-l-2 border-[#3ECF8E] pl-4.5 italic text-muted-foreground my-7" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
      <div className="overflow-x-auto my-8 border border-border/60 rounded-xl">
        <table className="w-full border-collapse text-xs sm:text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
      <th className="bg-muted/50 font-display font-semibold text-foreground px-4 py-3 text-left border-b border-border/60 text-[11px] uppercase tracking-wider" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
      <td className="px-4 py-3 border-b border-border/40 text-neutral-700 dark:text-neutral-300" {...props}>
        {children}
      </td>
    ),
    tr: ({ children, ...props }: React.ComponentPropsWithoutRef<"tr">) => (
      <tr className="even:bg-muted/15" {...props}>
        {children}
      </tr>
    ),
    img: ({ src, alt, title, ...props }: React.ComponentPropsWithoutRef<"img">) => {
      let cleanSrc = typeof src === "string" ? src : ""
      cleanSrc = cleanSrc.replace(/^(\.\.\/)*public\//, "/").replace(/^\/public\//, "")
      return (
        <img
          src={cleanSrc}
          alt={alt || ""}
          title={title}
          className="max-w-full h-auto rounded-xl border border-border/60 my-8"
          {...props}
        />
      )
    },
    pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => {
      if (React.isValidElement(children)) {
        const childProps = children.props as { className?: string; children?: React.ReactNode }
        const rawClass = childProps?.className || ""
        const rawCode = getNodeText(childProps?.children)

        if (rawClass.includes("mermaid")) {
          const cleanChart = rawCode.trim()
          let customMaxWidth = ""
          const widthMatch = rawClass.match(/mermaid[ :](?:(?:max-)?width[=:])?([0-9]+(?:px|%|rem)?)/i)
          if (widthMatch) {
            const val = widthMatch[1]
            customMaxWidth = /^[0-9]+$/.test(val) ? `${val}px` : val
          }

          return (
            <div
              className="mermaid-block not-prose my-8 w-full flex flex-col items-center justify-center relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/70 bg-card/60 shadow-xs"
              data-chart={encodeURIComponent(cleanChart)}
              {...(customMaxWidth ? { "data-max-width": customMaxWidth } : {})}
            >
              <div className="mermaid-render flex justify-center w-full min-h-[180px] items-center p-6 sm:p-8 pt-12 overflow-hidden">
                <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse py-6">
                  <svg className="h-4 w-4 animate-spin text-[#3ECF8E]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Rendering diagram...</span>
                </div>
              </div>
            </div>
          )
        }

        const match = /language-([a-zA-Z0-9_-]+)/.exec(rawClass)
        const lang = match ? match[1] : ""
        const html = renderShadcnCodeBlock(rawCode, lang)
        return <div dangerouslySetInnerHTML={{ __html: html }} />
      }

      return <pre {...props}>{children}</pre>
    },
    code: ({ children, className, ...props }: React.ComponentPropsWithoutRef<"code">) => {
      return (
        <code
          className={cn(
            "font-code text-[12px] sm:text-[12.5px] px-1.5 py-0.5 rounded bg-muted/70 dark:bg-[#1f1f1f] border border-border/70 text-foreground font-normal",
            className
          )}
          {...props}
        >
          {children}
        </code>
      )
    },
    ...components,
  }
}

