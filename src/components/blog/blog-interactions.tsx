"use client"

import * as React from "react"

export function BlogInteractions() {
  React.useEffect(() => {
    const handleCopyClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>(".code-copy-btn, .supabase-copy-btn")
      if (!button) return

      const rawCode = button.getAttribute("data-code")
      if (!rawCode) return

      try {
        const decoded = decodeURIComponent(rawCode)
        await navigator.clipboard.writeText(decoded)

        const copyIcon = button.querySelector(".copy-icon")
        const checkIcon = button.querySelector(".check-icon")

        if (copyIcon && checkIcon) {
          copyIcon.classList.add("hidden")
          checkIcon.classList.remove("hidden")
          button.classList.add("text-emerald-400", "border-emerald-500/40")

          setTimeout(() => {
            copyIcon.classList.remove("hidden")
            checkIcon.classList.add("hidden")
            button.classList.remove("text-emerald-400", "border-emerald-500/40")
          }, 2000)
        }
      } catch (err) {
        console.error("Failed to copy code snippet:", err)
      }
    }

    document.addEventListener("click", handleCopyClick)
    return () => document.removeEventListener("click", handleCopyClick)
  }, [])

  return null
}
