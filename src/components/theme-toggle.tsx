"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md border border-border" disabled>
        <div className="h-4 w-4 bg-muted animate-pulse rounded" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-md border border-border cursor-pointer transition-all hover:bg-muted duration-200"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-500 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-violet-500 transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
