"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function MermaidRenderer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    let cancelled = false

    async function renderDiagrams() {
      const blocks = document.querySelectorAll<HTMLElement>(".mermaid-block")
      if (blocks.length === 0) return

      try {
        const mermaid = (await import("mermaid")).default

        const isDark = resolvedTheme === "dark"

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "transparent",
                mainBkg: "#171717",
                textColor: "#f4f4f5",
                lineColor: "#71717a",
                primaryColor: "#1e293b",
                primaryTextColor: "#f4f4f5",
                primaryBorderColor: "#3f3f46",
                nodeBorder: "#3f3f46",
                edgeLabelBackground: "#18181b",
                clusterBkg: "#09090b",
                clusterBorder: "#27272a",
              }
            : {
                darkMode: false,
                background: "transparent",
                mainBkg: "#ffffff",
                textColor: "#18181b",
                lineColor: "#71717a",
                primaryColor: "#f1f5f9",
                primaryTextColor: "#0f172a",
                primaryBorderColor: "#cbd5e1",
                nodeBorder: "#cbd5e1",
                edgeLabelBackground: "#ffffff",
                clusterBkg: "#f8fafc",
                clusterBorder: "#e2e8f0",
              },
        })

        for (let i = 0; i < blocks.length; i++) {
          if (cancelled) break
          const block = blocks[i]
          const chartCode = decodeURIComponent(block.getAttribute("data-chart") || "").trim()
          const renderTarget = block.querySelector<HTMLElement>(".mermaid-render")

          if (!chartCode || !renderTarget) continue

          const uniqueId = `mermaid-render-${i}-${Math.random().toString(36).slice(2, 8)}`

          try {
            const { svg } = await mermaid.render(uniqueId, chartCode)
            if (!cancelled) {
              renderTarget.innerHTML = svg
              const svgEl = renderTarget.querySelector<SVGSVGElement>("svg")
              if (svgEl) {
                svgEl.removeAttribute("height")
                svgEl.style.maxWidth = "100%"
                svgEl.style.height = "auto"
                svgEl.style.display = "block"
                svgEl.style.margin = "0 auto"
              }
            }
          } catch (err) {
            console.warn("Failed to render Mermaid diagram:", err)
            // Clean up any stray error DOM element created by mermaid
            const strayErr = document.getElementById("d" + uniqueId)
            if (strayErr) strayErr.remove()

            if (!cancelled) {
              renderTarget.innerHTML = `
                <div class="w-full text-left p-4 rounded-lg bg-muted/40 border border-border/50 text-xs font-mono text-muted-foreground overflow-x-auto">
                  <p class="text-rose-500 font-semibold mb-2">Diagram rendering error:</p>
                  <pre><code>${chartCode}</code></pre>
                </div>
              `
            }
          }
        }
      } catch (err) {
        console.error("Error loading Mermaid:", err)
      }
    }

    renderDiagrams()

    return () => {
      cancelled = true
    }
  }, [mounted, resolvedTheme])

  return null
}

