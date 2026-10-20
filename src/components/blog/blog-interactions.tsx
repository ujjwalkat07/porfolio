"use client"

import * as React from "react"

export function BlogInteractions() {
  React.useEffect(() => {
    const handleCopyClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>(".supabase-copy-btn")
      if (!button) return

      const rawCode = button.getAttribute("data-code")
      if (!rawCode) return

      try {
        const decoded = decodeURIComponent(rawCode)
        await navigator.clipboard.writeText(decoded)

        const originalText = button.innerHTML
        button.innerHTML = `
          <svg class="w-3.5 h-3.5 text-[#3ECF8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="text-[#3ECF8E] font-medium">Copied!</span>
        `
        button.classList.add("text-[#3ECF8E]")

        setTimeout(() => {
          button.innerHTML = originalText
          button.classList.remove("text-[#3ECF8E]")
        }, 2000)
      } catch (err) {
        console.error("Failed to copy code snippet:", err)
      }
    }

    document.addEventListener("click", handleCopyClick)
    return () => document.removeEventListener("click", handleCopyClick)
  }, [])

  return null
}
