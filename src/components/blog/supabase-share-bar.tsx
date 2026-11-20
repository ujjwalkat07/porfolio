"use client"

import * as React from "react"
import { Link2, Check } from "lucide-react"
import { ChatGptIcon, ClaudeIcon, XIcon, Linkedin as LinkedinIcon } from "@/components/icons"

interface SupabaseShareBarProps {
  title: string
  slug?: string
  url?: string
  compact?: boolean
}

const SITE_URL = "https://ujjwalkatiyar.in"

export function SupabaseShareBar({ title, slug, url, compact = false }: SupabaseShareBarProps) {
  const [copied, setCopied] = React.useState(false)
  const finalUrl = url || (slug ? `${SITE_URL}/blog/${slug}` : SITE_URL)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const encodedUrl = encodeURIComponent(finalUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedAiPrompt = encodeURIComponent(`Read from ${finalUrl} so I can ask questions about its contents`)

  if (compact) {
    return (
      <div className="flex flex-col gap-3 font-body">
        {/* AI Links (Ask ChatGPT & Ask Claude) */}
        <div className="flex flex-col gap-2">
          <a
            href={`https://chatgpt.com/?q=${encodedAiPrompt}`}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChatGptIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Ask ChatGPT</span>
          </a>
          <a
            href={`https://claude.ai/new?q=${encodedAiPrompt}`}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ClaudeIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Ask Claude</span>
          </a>
        </div>

        {/* Pure Bare Icons Row: X, in, Y */}
        <div className="mt-2 flex items-center gap-4 text-muted-foreground">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="hover:text-foreground transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-y border-border/60 font-body my-10">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold font-display text-foreground">
          Enjoyed this article?
        </span>
        <span className="text-xs text-muted-foreground">
          Share it with fellow developers and architects.
        </span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground hover:border-[#3ECF8E]/50 text-xs font-medium transition-colors"
        >
          <XIcon className="w-3.5 h-3.5" />
          <span>Post</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground hover:border-[#3ECF8E]/50 text-xs font-medium transition-colors"
        >
          <LinkedinIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground hover:border-[#3ECF8E]/50 text-xs font-medium transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#3ECF8E]" />
              <span className="text-[#3ECF8E]">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              <span>Copy link</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
