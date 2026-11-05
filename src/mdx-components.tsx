import * as React from "react"
import type { MDXComponents } from "mdx/types"
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
} from "@/components/ui/code-block"
import { Mermaid } from "@/components/Mermaid"
import { cn } from "@/lib/utils"

function getNodeText(node: React.ReactNode): string {
  if (!node) return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (React.isValidElement(node) && node.props && (node.props as { children?: React.ReactNode }).children) {
    return getNodeText((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Mermaid,
    CodeBlock,
    CodeBlockHeader,
    CodeBlockTitle,
    CodeBlockActions,
    CodeBlockCopyButton,
    CodeBlockContent,
    CodeBlockLine,
    CodeBlockFooter,
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
    img: ({ src, alt, title, style, width, ...props }: React.ComponentPropsWithoutRef<"img">) => {
      let cleanSrc = typeof src === "string" ? src : ""
      cleanSrc = cleanSrc.replace(/^(\.\.\/)*public\//, "/").replace(/^\/public\//, "")

      // Parse custom width from alt text e.g. ![Architecture|400px](/image.png) or ![Architecture|50%](/image.png)
      let customWidth: string | undefined = undefined
      let cleanAlt = alt || ""
      const altMatch = cleanAlt.match(/\|(?:width=)?([0-9]+(?:px|%|rem)?)$/i)
      if (altMatch) {
        const val = altMatch[1]
        customWidth = /^[0-9]+$/.test(val) ? `${val}px` : val
        cleanAlt = cleanAlt.slice(0, altMatch.index).trim()
      }

      // Also support title="width: 400px" or width prop
      const titleMatch = typeof title === "string" ? title.match(/width[:=]\s*([0-9]+(?:px|%|rem)?)/i) : null
      if (!customWidth && titleMatch) {
        const val = titleMatch[1]
        customWidth = /^[0-9]+$/.test(val) ? `${val}px` : val
      }
      if (!customWidth && width) {
        customWidth = typeof width === "number" ? `${width}px` : width
      }

      return (
        <span className="block my-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cleanSrc}
            alt={cleanAlt}
            title={title}
            style={{
              maxWidth: customWidth || "100%",
              width: customWidth ? "100%" : undefined,
              ...style,
            }}
            className="h-auto rounded-xl border border-border/60 mx-auto block shadow-xs"
            {...props}
          />
        </span>
      )
    },
    pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => {
      if (React.isValidElement(children)) {
        const childProps = children.props as {
          className?: string
          children?: React.ReactNode
          "data-language"?: string
        }
        const rawClass = childProps?.className || ""
        const dataLang = childProps?.["data-language"] || ""
        const rawCode = getNodeText(childProps?.children)

        if (rawClass.includes("mermaid") || dataLang === "mermaid") {
          let cleanChart = rawCode.trim()
          if (cleanChart.startsWith("```")) {
            cleanChart = cleanChart.replace(/^```[a-z]*\r?\n/, "").trim()
          }
          return <Mermaid chart={cleanChart} />
        }

        const match = /language-([a-zA-Z0-9_-]+)/.exec(rawClass)
        const lang = match ? match[1] : (dataLang || "")
        return <CodeBlock language={lang}>{rawCode}</CodeBlock>
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
