"use client"

import * as React from "react"
import { ChatGptIcon, ClaudeIcon, GeminiIcon } from "@/components/icons"

interface UnderstandWithAiProps {
  title: string
  slug: string
  className?: string
}

export function UnderstandWithAi({
  title,
  slug,
  className = "",
}: UnderstandWithAiProps) {
  const [copied, setCopied] = React.useState(false)

  const articleUrl = `https://ujjwalkatiyar.in/blog/${slug}`
  const promptText = `Explain and summarize this article in simple terms: "${title}" — ${articleUrl}`

  // Pre-configured URLs
  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(promptText)}`
  // Gemini does not always auto-fill query params, so we open Gemini and copy prompt for instant paste
  const geminiUrl = `https://gemini.google.com/app`

  const handleGeminiClick = () => {
    navigator.clipboard.writeText(promptText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className={`flex flex-col gap-3 pt-6 border-t border-border/40 ${className}`}>

      <div className="flex">
        {/* ChatGPT Link */}
        <a
          href={chatGptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between px-3 py-2 rounded-lg border border-border/60 bg-card/40 hover:bg-card/90 hover:border-[#10a37f]/50 transition-all duration-150 text-xs"
        >
          <div className="flex items-center gap-2.5 text-foreground/90 group-hover:text-[#10a37f] transition-colors">
            <div className="w-5 h-5 rounded-md bg-[#10a37f]/10 text-[#10a37f] flex items-center justify-center shrink-0">
              <ChatGptIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">ChatGPT</span>
          </div>
        </a>

        {/* Claude Link */}
        <a
          href={claudeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between px-3 py-2 rounded-lg border border-border/60 bg-card/40 hover:bg-card/90 hover:border-[#d97757]/50 transition-all duration-150 text-xs"
        >
          <div className="flex items-center gap-2.5 text-foreground/90 group-hover:text-[#d97757] transition-colors">
            <div className="w-5 h-5 rounded-md bg-[#d97757]/10 text-[#d97757] flex items-center justify-center shrink-0">
              <ClaudeIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">Claude</span>
          </div>
        </a>

        {/* Gemini Link */}
        <a
          href={geminiUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGeminiClick}
          className="group flex items-center justify-between px-3 py-2 rounded-lg border border-border/60 bg-card/40 hover:bg-card/90 hover:border-[#4285f4]/50 transition-all duration-150 text-xs"
        >
          <div className="flex items-center gap-2.5 text-foreground/90 group-hover:text-[#4285f4] transition-colors">
            <div className="w-5 h-5 rounded-md bg-[#4285f4]/10 text-[#4285f4] flex items-center justify-center shrink-0">
              <GeminiIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">Gemini</span>
          </div>
        </a>
      </div>

      {copied && (
        <p className="text-[10px] text-[#3ECF8E] font-mono transition-opacity">
          ✓ Prompt copied to clipboard — ready to paste!
        </p>
      )}
    </div>
  )
}
