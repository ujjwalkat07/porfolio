"use client"

import * as React from "react"
import { Link2, Check } from "lucide-react"

interface ShareButtonsProps {
  title: string
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false)
  const [url, setUrl] = React.useState("")

  React.useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL: ", err)
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(`Check out this post: ${title}`)

  const shareLinks = [
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-400 hover:border-sky-400/30",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-indigo-400 hover:border-indigo-400/30",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-500 hover:border-blue-500/30",
    },
  ]

  return (
    <div className="flex flex-col gap-4 py-6 border-y border-border/40 my-8">
      <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase select-none">
        Share this article
      </span>
      <div className="flex flex-wrap gap-2.5">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs text-muted-foreground px-3.5 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground transition-all duration-200 shadow-xs ${link.color}`}
          >
            <link.icon className="h-3.5 w-3.5" />
            <span className="font-light">{link.name}</span>
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground px-3.5 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-emerald-500/30 hover:text-emerald-500 transition-all duration-200 shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500 animate-in fade-in zoom-in-50 duration-200" />
              <span className="font-medium text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              <span className="font-light">Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
