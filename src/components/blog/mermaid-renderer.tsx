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
    const cleanupFns: Array<() => void> = []

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
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
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
            if (cancelled) break

            renderTarget.innerHTML = svg
            const svgEl = renderTarget.querySelector<SVGSVGElement>("svg")
            if (!svgEl) continue

            // Determine natural diagram width to prevent over-stretching
            let naturalWidth = 0
            const inlineStyle = svgEl.getAttribute("style") || ""
            const styleMatch = inlineStyle.match(/max-width:\s*([\d.]+)px/i)
            if (styleMatch) {
              naturalWidth = parseFloat(styleMatch[1])
            }

            if (!naturalWidth || isNaN(naturalWidth)) {
              const viewBox = svgEl.getAttribute("viewBox")
              if (viewBox) {
                const parts = viewBox.split(/[\s,]+/).filter(Boolean)
                if (parts.length >= 4) {
                  naturalWidth = parseFloat(parts[2])
                }
              }
            }

            if (!naturalWidth || isNaN(naturalWidth)) {
              const widthAttr = svgEl.getAttribute("width")
              if (widthAttr && !widthAttr.includes("%")) {
                naturalWidth = parseFloat(widthAttr)
              }
            }

            const customMaxWidth = block.getAttribute("data-max-width")
            const targetMaxWidth = customMaxWidth
              ? customMaxWidth
              : naturalWidth > 0
                ? `min(100%, ${naturalWidth}px)`
                : "100%"

            svgEl.removeAttribute("height")
            svgEl.style.maxWidth = targetMaxWidth
            svgEl.style.width = "100%"
            svgEl.style.height = "auto"
            svgEl.style.display = "block"
            svgEl.style.margin = "0 auto"

            // Setup interactive zoom and pan controls
            const cleanup = setupZoomPan(block, renderTarget, svgEl)
            cleanupFns.push(cleanup)
          } catch (err) {
            console.warn("Failed to render Mermaid diagram:", err)
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
      cleanupFns.forEach((fn) => fn())
    }
  }, [mounted, resolvedTheme])

  return null
}

function setupZoomPan(
  block: HTMLElement,
  container: HTMLElement,
  svgEl: SVGSVGElement
): () => void {
  // Check if toolbar already exists
  let toolbar = block.querySelector<HTMLElement>(".mermaid-toolbar")
  if (!toolbar) {
    toolbar = document.createElement("div")
    toolbar.className =
      "mermaid-toolbar absolute top-3 right-3 z-20 flex items-center gap-1 rounded-lg border border-border/70 bg-background/85 backdrop-blur-md px-1.5 py-1 shadow-sm opacity-90 hover:opacity-100 transition-opacity select-none"

    toolbar.innerHTML = `
      <button type="button" class="btn-zoom-out flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors" title="Zoom out (-)" aria-label="Zoom out">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>

      <button type="button" class="btn-zoom-reset flex h-7 px-2 items-center justify-center rounded-md text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors" title="Click to reset (100%)" aria-label="Reset zoom">
        <span class="zoom-badge">100%</span>
      </button>

      <button type="button" class="btn-zoom-in flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors" title="Zoom in (+)" aria-label="Zoom in">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>

      <div class="h-3.5 w-px bg-border/80 mx-0.5"></div>

      <button type="button" class="btn-fullscreen flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors" title="Fullscreen view" aria-label="Fullscreen view">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h6v6"></path>
          <path d="M9 21H3v-6"></path>
          <path d="M21 3l-7 7"></path>
          <path d="M3 21l7-7"></path>
        </svg>
      </button>
    `
    block.style.position = "relative"
    block.appendChild(toolbar)
  }

  // Ensure helper footer exists
  let footer = block.querySelector<HTMLElement>(".mermaid-footer")
  if (!footer) {
    footer = document.createElement("div")
    footer.className =
      "mermaid-footer w-full flex items-center justify-between px-4 py-1.5 bg-muted/20 border-t border-border/40 text-[11px] text-muted-foreground/75 select-none"
    footer.innerHTML = `
      <span class="flex items-center gap-1.5">
        <svg class="h-3 w-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
        </svg>
        Drag to pan • Use buttons or pinch/scroll to zoom
      </span>
      <span class="hidden sm:inline-block text-[10px] font-mono opacity-70">Double-click to reset</span>
    `
    block.appendChild(footer)
  }

  // Ensure container has canvas wrapper for clean transformations
  let canvas = container.querySelector<HTMLElement>(".mermaid-canvas")
  if (!canvas) {
    canvas = document.createElement("div")
    canvas.className =
      "mermaid-canvas w-full flex items-center justify-center origin-center transition-transform duration-75 ease-out"
    container.innerHTML = ""
    canvas.appendChild(svgEl)
    container.appendChild(canvas)
  }

  // State
  let zoom = 1
  let panX = 0
  let panY = 0
  let isDragging = false
  let startX = 0
  let startY = 0

  const zoomBadge = toolbar.querySelector<HTMLElement>(".zoom-badge")
  const btnIn = toolbar.querySelector<HTMLButtonElement>(".btn-zoom-in")
  const btnOut = toolbar.querySelector<HTMLButtonElement>(".btn-zoom-out")
  const btnReset = toolbar.querySelector<HTMLButtonElement>(".btn-zoom-reset")
  const btnFullscreen = toolbar.querySelector<HTMLButtonElement>(".btn-fullscreen")

  function updateTransform(animate = false) {
    if (!canvas) return
    canvas.style.transition = animate ? "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`
    if (zoomBadge) {
      zoomBadge.textContent = `${Math.round(zoom * 100)}%`
    }
    container.style.cursor = isDragging ? "grabbing" : zoom > 1 ? "grab" : "default"
  }

  function handleZoomIn() {
    zoom = Math.min(3.5, Math.round((zoom + 0.2) * 10) / 10)
    updateTransform(true)
  }

  function handleZoomOut() {
    zoom = Math.max(0.4, Math.round((zoom - 0.2) * 10) / 10)
    updateTransform(true)
  }

  function handleReset() {
    zoom = 1
    panX = 0
    panY = 0
    updateTransform(true)
  }

  function handleMouseDown(e: MouseEvent) {
    if (e.button !== 0) return // Only left click
    isDragging = true
    startX = e.clientX - panX
    startY = e.clientY - panY
    updateTransform(false)
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return
    panX = e.clientX - startX
    panY = e.clientY - startY
    updateTransform(false)
  }

  function handleMouseUp() {
    if (!isDragging) return
    isDragging = false
    updateTransform(false)
  }

  function handleDoubleClick() {
    if (zoom === 1 && panX === 0 && panY === 0) {
      zoom = 1.5
    } else {
      zoom = 1
      panX = 0
      panY = 0
    }
    updateTransform(true)
  }

  function handleWheel(e: WheelEvent) {
    // Zoom with Ctrl/Cmd or trackpad pinch, or pan when zoomed
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.15 : -0.15
      zoom = Math.min(3.5, Math.max(0.4, Math.round((zoom + delta) * 100) / 100))
      updateTransform(false)
    }
  }

  // Touch handlers for mobile
  let initialTouchDistance = 0
  let initialZoom = 1

  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      isDragging = true
      startX = e.touches[0].clientX - panX
      startY = e.touches[0].clientY - panY
    } else if (e.touches.length === 2) {
      isDragging = false
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      initialTouchDistance = dist
      initialZoom = zoom
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (e.touches.length === 1 && isDragging) {
      panX = e.touches[0].clientX - startX
      panY = e.touches[0].clientY - startY
      updateTransform(false)
    } else if (e.touches.length === 2 && initialTouchDistance > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const factor = dist / initialTouchDistance
      zoom = Math.min(3.5, Math.max(0.4, Math.round(initialZoom * factor * 100) / 100))
      updateTransform(false)
    }
  }

  function handleTouchEnd() {
    isDragging = false
    initialTouchDistance = 0
  }

  // Fullscreen modal handler
  function openFullscreenModal() {
    const modal = document.createElement("div")
    modal.className =
      "fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"

    modal.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-border/60">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold tracking-tight text-foreground">Diagram View</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 rounded-lg border border-border/70 bg-card px-1.5 py-1">
            <button type="button" class="modal-zoom-out h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            </button>
            <button type="button" class="modal-zoom-reset h-7 px-2 flex items-center justify-center rounded text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
              <span class="modal-zoom-badge">100%</span>
            </button>
            <button type="button" class="modal-zoom-in h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            </button>
          </div>
          <button type="button" class="modal-close h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" aria-label="Close fullscreen">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
      <div class="modal-viewport flex-1 overflow-hidden relative flex items-center justify-center cursor-grab active:cursor-grabbing p-4">
        <div class="modal-canvas flex items-center justify-center origin-center transition-transform duration-75">
          ${svgEl.outerHTML}
        </div>
      </div>
      <div class="pt-2 text-center text-xs text-muted-foreground">
        Drag to pan • Use +/- or Ctrl + wheel to zoom • Press Esc to close
      </div>
    `

    document.body.appendChild(modal)
    document.body.style.overflow = "hidden"

    let mZoom = 1
    let mPanX = 0
    let mPanY = 0
    let mDragging = false
    let mStartX = 0
    let mStartY = 0

    const mCanvas = modal.querySelector<HTMLElement>(".modal-canvas")
    const mViewport = modal.querySelector<HTMLElement>(".modal-viewport")
    const mBadge = modal.querySelector<HTMLElement>(".modal-zoom-badge")
    const mBtnIn = modal.querySelector<HTMLButtonElement>(".modal-zoom-in")
    const mBtnOut = modal.querySelector<HTMLButtonElement>(".modal-zoom-out")
    const mBtnReset = modal.querySelector<HTMLButtonElement>(".modal-zoom-reset")
    const mBtnClose = modal.querySelector<HTMLButtonElement>(".modal-close")

    function updateModalTransform(animate = false) {
      if (!mCanvas) return
      mCanvas.style.transition = animate ? "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
      mCanvas.style.transform = `translate(${mPanX}px, ${mPanY}px) scale(${mZoom})`
      if (mBadge) mBadge.textContent = `${Math.round(mZoom * 100)}%`
      if (mViewport) mViewport.style.cursor = mDragging ? "grabbing" : "grab"
    }

    function closeModal() {
      modal.remove()
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal()
    }

    window.addEventListener("keydown", handleKeyDown)
    mBtnClose?.addEventListener("click", closeModal)
    mBtnIn?.addEventListener("click", () => {
      mZoom = Math.min(4.0, Math.round((mZoom + 0.2) * 10) / 10)
      updateModalTransform(true)
    })
    mBtnOut?.addEventListener("click", () => {
      mZoom = Math.max(0.3, Math.round((mZoom - 0.2) * 10) / 10)
      updateModalTransform(true)
    })
    mBtnReset?.addEventListener("click", () => {
      mZoom = 1
      mPanX = 0
      mPanY = 0
      updateModalTransform(true)
    })

    mViewport?.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return
      mDragging = true
      mStartX = e.clientX - mPanX
      mStartY = e.clientY - mPanY
    })
    window.addEventListener("mousemove", (e) => {
      if (!mDragging) return
      mPanX = e.clientX - mStartX
      mPanY = e.clientY - mStartY
      updateModalTransform(false)
    })
    window.addEventListener("mouseup", () => {
      mDragging = false
      if (mViewport) mViewport.style.cursor = "grab"
    })
    mViewport?.addEventListener("wheel", (e) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.15 : -0.15
      mZoom = Math.min(4.0, Math.max(0.3, Math.round((mZoom + delta) * 100) / 100))
      updateModalTransform(false)
    })
  }

  // Attach event listeners
  btnIn?.addEventListener("click", handleZoomIn)
  btnOut?.addEventListener("click", handleZoomOut)
  btnReset?.addEventListener("click", handleReset)
  btnFullscreen?.addEventListener("click", openFullscreenModal)

  container.addEventListener("mousedown", handleMouseDown)
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("mouseup", handleMouseUp)
  container.addEventListener("dblclick", handleDoubleClick)
  container.addEventListener("wheel", handleWheel, { passive: false })

  container.addEventListener("touchstart", handleTouchStart, { passive: true })
  container.addEventListener("touchmove", handleTouchMove, { passive: true })
  container.addEventListener("touchend", handleTouchEnd, { passive: true })

  // Return cleanup function
  return () => {
    btnIn?.removeEventListener("click", handleZoomIn)
    btnOut?.removeEventListener("click", handleZoomOut)
    btnReset?.removeEventListener("click", handleReset)
    btnFullscreen?.removeEventListener("click", openFullscreenModal)

    container.removeEventListener("mousedown", handleMouseDown)
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mouseup", handleMouseUp)
    container.removeEventListener("dblclick", handleDoubleClick)
    container.removeEventListener("wheel", handleWheel)

    container.removeEventListener("touchstart", handleTouchStart)
    container.removeEventListener("touchmove", handleTouchMove)
    container.removeEventListener("touchend", handleTouchEnd)
  }
}
