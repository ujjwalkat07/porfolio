"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

export interface PackageCommandProps {
  command?: string
  className?: string
}

export function PackageCommand({ command = "pip install asi-telemetry", className = "" }: PackageCommandProps) {
  const [copied, setCopied] = React.useState(false)
  const [manager, setManager] = React.useState<"pip" | "uv" | "poetry">("pip")

  const pkgName = command.replace(/^(pip install|uv add|poetry add)\s*/, "").trim()

  const commands = {
    pip: `pip install ${pkgName}`,
    uv: `uv add ${pkgName}`,
    poetry: `poetry add ${pkgName}`,
  }

  const currentCommand = commands[manager]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore
    }
  }

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-border/60 bg-muted/30 font-mono text-xs sm:text-sm ${className}`}>
      <div className="flex items-center justify-between border-b border-border/40 bg-muted/50 px-3 py-1.5">
        <div className="flex items-center gap-1">
          {(["pip", "uv", "poetry"] as const).map((mgr) => (
            <button
              key={mgr}
              type="button"
              onClick={() => setManager(mgr)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                manager === mgr
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mgr}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy command"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="flex items-center px-4 py-3 text-foreground select-all overflow-x-auto">
        <span className="text-muted-foreground select-none mr-2">$</span>
        <span>{currentCommand}</span>
      </div>
    </div>
  )
}
