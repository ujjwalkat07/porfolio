"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export type NodePackageManager = "pnpm" | "npm" | "yarn" | "bun"
export type PythonPackageManager = "pip" | "uv" | "poetry"
export type PackageManager = NodePackageManager | PythonPackageManager | string

export interface PackageCommandProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string
  commands?: Partial<Record<string, string>>
  pnpm?: string
  npm?: string
  yarn?: string
  bun?: string
  pip?: string
  uv?: string
  poetry?: string
  defaultManager?: string
  children?: React.ReactNode
}

// Stores to remember the user's preferred package manager across the page
const state = {
  node: "npm" as NodePackageManager,
  python: "pip" as PythonPackageManager,
}

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function getNodeSnapshot(): NodePackageManager {
  return state.node
}

function getPythonSnapshot(): PythonPackageManager {
  return state.python
}

function getServerNodeSnapshot(): NodePackageManager {
  return "npm"
}

function getServerPythonSnapshot(): PythonPackageManager {
  return "pip"
}

function setPreferredManager(mgr: string, ecosystem: "node" | "python") {
  if (ecosystem === "python") {
    state.python = mgr as PythonPackageManager
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("preferred-python-manager", mgr)
      } catch {
        // Ignore storage errors
      }
    }
  } else {
    state.node = mgr as NodePackageManager
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("preferred-package-manager", mgr)
      } catch {
        // Ignore storage errors
      }
    }
  }
  listeners.forEach((listener) => listener())
}

// Initialize from localStorage on first client run
if (typeof window !== "undefined") {
  try {
    const savedNode = localStorage.getItem("preferred-package-manager") as NodePackageManager | null
    if (savedNode && ["pnpm", "npm", "yarn", "bun"].includes(savedNode)) {
      state.node = savedNode
    }
    const savedPython = localStorage.getItem("preferred-python-manager") as PythonPackageManager | null
    if (savedPython && ["pip", "uv", "poetry"].includes(savedPython)) {
      state.python = savedPython
    }
  } catch {
    // Ignore storage errors
  }
}

/**
 * Automatically translates Node commands (pnpm, npm, yarn, bun)
 */
function translateNodeCommand(raw: string): Record<NodePackageManager, string> {
  const trimmed = raw.trim()

  // 1. npx / dlx / bunx runners
  if (/^npx\s+/i.test(trimmed)) {
    const rest = trimmed.replace(/^npx\s+/i, "")
    return {
      npm: `npx ${rest}`,
      pnpm: `pnpm dlx ${rest}`,
      yarn: `yarn dlx ${rest}`,
      bun: `bunx --bun ${rest}`,
    }
  }

  if (/^pnpm\s+dlx\s+/i.test(trimmed)) {
    const rest = trimmed.replace(/^pnpm\s+dlx\s+/i, "")
    return {
      npm: `npx ${rest}`,
      pnpm: `pnpm dlx ${rest}`,
      yarn: `yarn dlx ${rest}`,
      bun: `bunx --bun ${rest}`,
    }
  }

  if (/^bunx\s+(--bun\s+)?/i.test(trimmed)) {
    const rest = trimmed.replace(/^bunx\s+(--bun\s+)?/i, "")
    return {
      npm: `npx ${rest}`,
      pnpm: `pnpm dlx ${rest}`,
      yarn: `yarn dlx ${rest}`,
      bun: `bunx --bun ${rest}`,
    }
  }

  // 2. Dev dependencies: npm i -D or npm install --save-dev
  if (/^npm\s+(i|install)\s+(-D|--save-dev)\s+/i.test(trimmed)) {
    const pkgs = trimmed.replace(/^npm\s+(i|install)\s+(-D|--save-dev)\s+/i, "")
    return {
      npm: `npm i -D ${pkgs}`,
      pnpm: `pnpm add -D ${pkgs}`,
      yarn: `yarn add -D ${pkgs}`,
      bun: `bun add -d ${pkgs}`,
    }
  }

  // 3. Regular dependencies: npm i or npm install
  if (/^npm\s+(i|install)\s+/i.test(trimmed)) {
    const pkgs = trimmed.replace(/^npm\s+(i|install)\s+/i, "")
    return {
      npm: `npm i ${pkgs}`,
      pnpm: `pnpm add ${pkgs}`,
      yarn: `yarn add ${pkgs}`,
      bun: `bun add ${pkgs}`,
    }
  }

  // 4. pnpm add / yarn add / bun add
  if (/^(pnpm|yarn|bun)\s+add\s+(-D|-d|--dev)?\s*/i.test(trimmed)) {
    const isDev = /(-D|-d|--dev)/i.test(trimmed)
    const pkgs = trimmed.replace(/^(pnpm|yarn|bun)\s+add\s+(-D|-d|--dev)?\s*/i, "")
    return {
      npm: isDev ? `npm i -D ${pkgs}` : `npm i ${pkgs}`,
      pnpm: isDev ? `pnpm add -D ${pkgs}` : `pnpm add ${pkgs}`,
      yarn: isDev ? `yarn add -D ${pkgs}` : `yarn add ${pkgs}`,
      bun: isDev ? `bun add -d ${pkgs}` : `bun add ${pkgs}`,
    }
  }

  // 5. npm run <script>
  if (/^npm\s+run\s+/i.test(trimmed)) {
    const script = trimmed.replace(/^npm\s+run\s+/i, "")
    return {
      npm: `npm run ${script}`,
      pnpm: `pnpm ${script}`,
      yarn: `yarn ${script}`,
      bun: `bun run ${script}`,
    }
  }

  return {
    npm: trimmed,
    pnpm: trimmed.replace(/^npm\b/, "pnpm"),
    yarn: trimmed.replace(/^npm\b/, "yarn"),
    bun: trimmed.replace(/^npm\b/, "bun"),
  }
}

/**
 * Automatically translates Python commands (pip, uv, poetry)
 */
function translatePythonCommand(raw: string): Record<string, string> {
  const trimmed = raw.trim()

  // 1. pip install -r requirements.txt
  if (/^pip3?\s+install\s+-r\s+/i.test(trimmed)) {
    const rest = trimmed.replace(/^pip3?\s+install\s+-r\s+/i, "")
    return {
      pip: `pip install -r ${rest}`,
      uv: `uv pip install -r ${rest}`,
    }
  }

  // 2. pip install <pkgs>
  if (/^pip3?\s+install\s+/i.test(trimmed)) {
    const pkgs = trimmed.replace(/^pip3?\s+install\s+/i, "")
    return {
      pip: `pip install ${pkgs}`,
      uv: `uv add ${pkgs}`,
    }
  }

  // 3. uv add <pkgs>
  if (/^uv\s+add\s+/i.test(trimmed)) {
    const pkgs = trimmed.replace(/^uv\s+add\s+/i, "")
    return {
      pip: `pip install ${pkgs}`,
      uv: `uv add ${pkgs}`,
    }
  }

  // 4. uv pip install <pkgs>
  if (/^uv\s+pip\s+install\s+/i.test(trimmed)) {
    const pkgs = trimmed.replace(/^uv\s+pip\s+install\s+/i, "")
    return {
      pip: `pip install ${pkgs}`,
      uv: `uv add ${pkgs}`,
    }
  }

  // 5. uvx / pipx
  if (/^uvx\s+/i.test(trimmed)) {
    const tool = trimmed.replace(/^uvx\s+/i, "")
    return {
      pip: `pip install ${tool}`,
      uv: `uvx ${tool}`,
    }
  }

  // 6. uv run / python
  if (/^uv\s+run\s+/i.test(trimmed)) {
    const script = trimmed.replace(/^uv\s+run\s+/i, "")
    return {
      pip: `python ${script}`,
      uv: `uv run ${script}`,
    }
  }

  return {
    pip: trimmed,
    uv: trimmed.replace(/^pip3?\s+install\b/i, "uv add").replace(/^pip\b/i, "uv"),
  }
}

export function PackageCommand({
  command,
  commands: explicitCommands,
  pnpm: pnpmProp,
  npm: npmProp,
  yarn: yarnProp,
  bun: bunProp,
  pip: pipProp,
  uv: uvProp,
  poetry: poetryProp,
  defaultManager,
  children,
  className,
  ...props
}: PackageCommandProps) {
  // Extract raw string command
  const rawCommand =
    command ||
    (typeof children === "string" ? children : undefined) ||
    pipProp ||
    uvProp ||
    poetryProp ||
    pnpmProp ||
    npmProp ||
    yarnProp ||
    bunProp ||
    ""

  // Detect ecosystem: "python" or "node"
  const isPython = React.useMemo(() => {
    if (pipProp || uvProp || poetryProp) return true
    if (explicitCommands && ("pip" in explicitCommands || "uv" in explicitCommands || "poetry" in explicitCommands)) return true
    if (pnpmProp || npmProp || yarnProp || bunProp) return false
    return /^(pip|pip3|uv|uvx|poetry)\b/i.test(rawCommand.trim())
  }, [rawCommand, pipProp, uvProp, poetryProp, pnpmProp, npmProp, yarnProp, bunProp, explicitCommands])

  const preferredNode = React.useSyncExternalStore(subscribe, getNodeSnapshot, getServerNodeSnapshot)
  const preferredPython = React.useSyncExternalStore(subscribe, getPythonSnapshot, getServerPythonSnapshot)

  const [copied, setCopied] = React.useState(false)

  // Resolve commands and tabs
  const { resolvedCommands, managers } = React.useMemo(() => {
    if (isPython) {
      const translated = rawCommand ? translatePythonCommand(rawCommand) : { pip: "", uv: "" }
      const res: Record<string, string> = {
        pip: pipProp || explicitCommands?.pip || translated.pip || "",
        uv: uvProp || explicitCommands?.uv || translated.uv || "",
      }
      if (poetryProp || explicitCommands?.poetry) {
        res.poetry = poetryProp || explicitCommands?.poetry || ""
      }
      const list = Object.keys(res).filter((k) => res[k])
      return { resolvedCommands: res, managers: list.length > 0 ? list : ["pip", "uv"] }
    } else {
      const translated = rawCommand ? translateNodeCommand(rawCommand) : { pnpm: "", npm: "", yarn: "", bun: "" }
      const res: Record<string, string> = {
        pnpm: pnpmProp || explicitCommands?.pnpm || translated.pnpm || "",
        npm: npmProp || explicitCommands?.npm || translated.npm || "",
        yarn: yarnProp || explicitCommands?.yarn || translated.yarn || "",
        bun: bunProp || explicitCommands?.bun || translated.bun || "",
      }
      return { resolvedCommands: res, managers: ["pnpm", "npm", "yarn", "bun"] }
    }
  }, [isPython, rawCommand, pipProp, uvProp, poetryProp, pnpmProp, npmProp, yarnProp, bunProp, explicitCommands])

  // Determine active manager
  const activeManager = React.useMemo(() => {
    if (defaultManager && managers.includes(defaultManager)) {
      return defaultManager
    }
    if (isPython) {
      return managers.includes(preferredPython) ? preferredPython : managers[0]
    }
    return managers.includes(preferredNode) ? preferredNode : managers[0]
  }, [defaultManager, managers, isPython, preferredPython, preferredNode])

  const activeCommand = resolvedCommands[activeManager] || Object.values(resolvedCommands)[0] || ""

  const handleCopy = async () => {
    if (!activeCommand) return
    try {
      await navigator.clipboard.writeText(activeCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy command:", err)
    }
  }

  return (
    <div
      className={cn(
        "group/package-command relative my-6 w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0e] shadow-sm transition-colors",
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      <div className="flex h-11 items-center justify-between border-b border-zinc-800/80 px-3 sm:px-4">
        {/* Left: Prompt Icon + Manager Tabs */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Terminal Badge Icon >_ */}
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-zinc-700/60 bg-zinc-800/60 font-mono text-[11px] font-semibold text-zinc-300 select-none"
            aria-hidden="true"
          >
            &gt;_
          </span>

          {/* Tab Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5" role="tablist" aria-label="Package Managers">
            {managers.map((mgr) => {
              const isActive = activeManager === mgr
              return (
                <button
                  key={mgr}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setPreferredManager(mgr, isPython ? "python" : "node")}
                  className={cn(
                    "relative rounded-md px-2.5 py-1 text-xs font-mono transition-all select-none cursor-pointer",
                    isActive
                      ? "border border-zinc-700/80 bg-zinc-900/90 font-medium text-white shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                  )}
                >
                  {mgr}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied command" : "Copy command"}
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200 cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400 animate-in fade-in zoom-in-75 duration-200" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Command Code Output Body */}
      <div className="overflow-x-auto p-4 sm:px-5 sm:py-4">
        <code className="font-mono text-[13px] sm:text-[13.5px] leading-relaxed text-zinc-100 select-text whitespace-pre">
          {activeCommand}
        </code>
      </div>
    </div>
  )
}

// Convenient Aliases
export const PackageManager = PackageCommand
export const CliTabs = PackageCommand
export const NpmCommand = PackageCommand
export const PythonCommand = PackageCommand
export const PipCommand = PackageCommand
