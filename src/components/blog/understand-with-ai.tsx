"use client"

import * as React from "react"

interface UnderstandWithAiProps {
  title: string
  slug: string
  className?: string
}

function ChatGptIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h1.88l-1.33 1.33a1.5 1.5 0 1 0 2.12 2.12L8.5 15.62v1.88c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1.88l1.33 1.33a1.5 1.5 0 0 0 2.12-2.12L13.62 13.5h1.88c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-1.88l1.33-1.33a1.5 1.5 0 1 0-2.12-2.12L11.5 8.38V6.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.88L7.17 7.05a1.5 1.5 0 0 0-2.12 2.12L6.38 10.5H4.5zm10.75-6.25a1 1 0 0 0-1.41 1.41l1.09 1.09-1.09 1.09a1 1 0 1 0 1.41 1.41l1.09-1.09 1.09 1.09a1 1 0 0 0 1.41-1.41l-1.09-1.09 1.09-1.09a1 1 0 0 0-1.41-1.41l-1.09 1.09-1.09-1.09z" />
    </svg>
  )
}

function GeminiIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 24C12 17.3726 6.6274 12 0 12C6.6274 12 12 6.6274 12 0C12 6.6274 17.3726 12 24 12C17.3726 12 12 17.3726 12 24Z" />
    </svg>
  )
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
