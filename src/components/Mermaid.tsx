"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export interface MermaidProps {
  chart: string
  className?: string
}

export function Mermaid({ chart, className }: MermaidProps) {
  const { resolvedTheme } = useTheme()
  const rawId = React.useId()
  const uniqueId = React.useMemo(() => `mermaid-${rawId.replace(/:/g, "")}`, [rawId])

  const [svg, setSvg] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function renderChart() {
      if (!chart || !chart.trim()) {
        if (!cancelled) {
          setSvg("")
          setIsLoading(false)
          setError(null)
        }
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const mermaid = (await import("mermaid")).default
        const theme = resolvedTheme === "dark" ? "dark" : "default"

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        })

        const cleanCode = chart.trim()
        const { svg: renderedSvg } = await mermaid.render(uniqueId, cleanCode)

        if (!cancelled) {
          setSvg(renderedSvg)
          setIsLoading(false)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid rendering failed:", err)
          setError(err instanceof Error ? err.message : String(err))
          setIsLoading(false)
        }
      }
    }

    renderChart()

    return () => {
      cancelled = true
    }
  }, [chart, resolvedTheme, uniqueId])

  if (error) {
    return (
      <div className="not-prose my-8 w-full rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-600 dark:text-rose-400">
        <p className="font-semibold mb-1">Failed to render diagram:</p>
        <pre className="overflow-x-auto whitespace-pre-wrap font-code text-[11px] opacity-90">{error}</pre>
      </div>
    )
  }

  return (
    <figure
      role="img"
      aria-label="Architecture flowchart diagram"
      className={`not-prose my-8 w-full flex flex-col items-center justify-center relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-8 shadow-xs ${className || ""}`}
    >
      <figcaption className="sr-only">
        Architecture diagram workflow and data flow description
      </figcaption>
      <noscript>
        <div className="w-full p-4 text-xs font-mono bg-muted/40 rounded-lg overflow-x-auto text-muted-foreground whitespace-pre">
          {chart}
        </div>
      </noscript>
      {isLoading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse py-8">
          <svg className="h-4 w-4 animate-spin text-[#3ECF8E]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Rendering diagram...</span>
        </div>
      ) : (
        <div
          className="w-full overflow-x-auto flex justify-center items-center select-none"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </figure>
  )
}

