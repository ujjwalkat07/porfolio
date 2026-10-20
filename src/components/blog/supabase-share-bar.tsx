"use client"

import * as React from "react"
import { Link2, Check } from "lucide-react"

interface SupabaseShareBarProps {
  title: string
  compact?: boolean
}

function ChatGptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5647 10.1815C21.0185 8.8202 20.8627 7.3302 20.138 6.09079C19.0476 4.19442 16.8532 3.21915 14.713 3.67292C13.7581 2.60283 12.39 1.99328 10.9542 2.00006C8.76659 2.00006 6.82281 3.40879 6.14554 5.48801C4.73681 5.77924 3.52449 6.6597 2.81335 7.90588C1.71617 9.80225 1.96676 12.1863 3.43644 13.8117C2.98267 15.173 3.13844 16.663 3.86312 17.8957C4.95354 19.7988 7.1479 20.7741 9.29486 20.3203C10.243 21.3904 11.6111 22.0067 13.047 21.9999C15.2345 21.9999 17.1783 20.5912 17.8556 18.512C19.2643 18.2208 20.4766 17.3403 21.181 16.0941C22.285 14.1978 22.0344 11.8138 20.5647 10.1883V10.1815ZM19.007 6.74774C19.4404 7.50629 19.603 8.39352 19.454 9.25366C19.4269 9.23334 19.3727 9.20625 19.3388 9.18593L15.3565 6.8832C15.1533 6.76806 14.9027 6.76806 14.6995 6.8832L10.0331 9.57875V7.60111L13.8868 5.37288C15.6815 4.33665 17.9707 4.95297 19.007 6.74774ZM10.0331 10.8588L11.9972 9.72097L13.9613 10.8588V13.1277L11.9972 14.2655L10.0331 13.1277V10.8588ZM10.9474 3.30719C11.8279 3.30719 12.6745 3.61197 13.3517 4.1741C13.3246 4.18765 13.2705 4.22151 13.2298 4.24183L9.24745 6.53779C9.04427 6.65293 8.92236 6.86965 8.92236 7.1067V12.4978L7.20886 11.509V7.05252C7.20886 4.98006 8.88172 3.30719 10.9542 3.30042L10.9474 3.30719ZM3.95117 8.56284C4.3914 7.80429 5.07544 7.22184 5.90172 6.91706V11.6512C5.90172 11.8883 6.02363 12.0982 6.22681 12.2201L10.8865 14.9089L9.16618 15.9045L5.31926 13.683C3.53126 12.6468 2.91494 10.3576 3.95117 8.56284ZM5.00094 17.2523C4.56072 16.5005 4.40494 15.6065 4.55394 14.7463C4.58103 14.7667 4.63522 14.7938 4.66908 14.8141L8.65145 17.1168C8.85463 17.2319 9.10522 17.2319 9.3084 17.1168L13.968 14.4213V16.3989L10.1144 18.6204C8.31958 19.6498 6.0304 19.0403 4.99417 17.2523H5.00094ZM13.0537 20.6928C12.18 20.6928 11.3267 20.388 10.6562 19.8259C10.6833 19.8124 10.7442 19.7785 10.7781 19.7582L14.7605 17.4622C14.9636 17.3471 15.0923 17.1303 15.0855 16.8933V11.509L16.799 12.4978V16.9475C16.799 19.0199 15.1194 20.6996 13.0537 20.6996V20.6928ZM20.0567 15.4372C19.6165 16.1957 18.9257 16.7782 18.1062 17.0762V12.342C18.1062 12.105 17.9843 11.8883 17.7811 11.7731L13.1147 9.07756L14.8282 8.08875L18.6819 10.3102C20.4766 11.3464 21.0862 13.6356 20.05 15.4304L20.0567 15.4372Z" />
    </svg>
  )
}

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.92381 15.2988L9.85798 13.0912L9.92381 12.8988L9.85798 12.7924H9.66558L9.00735 12.7519L6.75925 12.6912L4.80988 12.6102L2.92127 12.5089L2.44533 12.4076L1.99976 11.8203L2.04533 11.5266L2.44533 11.2583L3.01748 11.3089L4.2833 11.395L6.18203 11.5266L7.55925 11.6076L9.59976 11.8203H9.92381L9.96938 11.6886L9.85798 11.6076L9.77191 11.5266L7.80735 10.195L5.68077 8.78737L4.56684 7.97724L3.96431 7.56711L3.66052 7.1823L3.52887 6.3418L4.07571 5.73927L4.80988 5.7899L4.99722 5.84053L5.74153 6.41268L7.3314 7.64306L9.40735 9.17218L9.71115 9.42534L9.83267 9.33927L9.84786 9.27851L9.71115 9.05066L8.58203 7.01015L7.37697 4.9342L6.84026 4.07344L6.69849 3.55699C6.64786 3.34433 6.61241 3.16712 6.61241 2.94939L7.2352 2.10382L7.5795 1.99243L8.40988 2.10382L8.75925 2.40762L9.27571 3.58737L10.1111 5.4456L11.4074 7.97218L11.7871 8.72154L11.9896 9.41522L12.0656 9.62787H12.1972V9.50635L12.3036 8.08357L12.501 6.33673L12.6934 4.08863L12.7592 3.45572L13.0732 2.69623L13.696 2.2861L14.182 2.51901L14.582 3.09117L14.5263 3.46079L14.2884 5.00509L13.8225 7.42534L13.5187 9.0456H13.696L13.8985 8.84306L14.7187 7.75446L16.096 6.03294L16.7036 5.34939L17.4124 4.59496L17.8681 4.23547H18.7289L19.3618 5.17724L19.0782 6.14939L18.1922 7.27344L17.458 8.22534L16.4048 9.64306L15.7466 10.7772L15.8074 10.8684L15.9643 10.8532L18.3441 10.3469L19.6301 10.114L21.1643 9.85066L21.858 10.1747L21.9339 10.5038L21.6605 11.1772L20.02 11.5823L18.096 11.9671L15.2301 12.6456L15.1947 12.6709L15.2352 12.7215L16.5263 12.8431L17.0782 12.8734H18.4301L20.9466 13.0608L21.6048 13.4962L21.9998 14.0279L21.9339 14.4329L20.9213 14.9494L19.5542 14.6253L16.3643 13.8658L15.2706 13.5924H15.1187V13.6836L16.0301 14.5747L17.701 16.0836L19.7922 18.0279L19.8985 18.5089L19.6301 18.8886L19.3466 18.8481L17.5086 17.4658L16.7998 16.8431L15.1947 15.4912H15.0884V15.6329L15.458 16.1747L17.4124 19.1114L17.5137 20.0127L17.3719 20.3064L16.8656 20.4836L16.3086 20.3823L15.1643 18.7772L13.9846 16.9696L13.0327 15.3494L12.9162 15.4152L12.3542 21.4658L12.0909 21.7747L11.4833 22.0076L10.977 21.6228L10.7086 21L10.977 19.7696L11.301 18.1646L11.5643 16.8886L11.8023 15.3038L11.9441 14.7772L11.9339 14.7418L11.8175 14.757L10.6225 16.3975L8.80482 18.8532L7.36684 20.3924L7.02254 20.5291L6.42507 20.2203L6.48077 19.6684L6.81495 19.1772L8.80482 16.6456L10.0048 15.076L10.7795 14.1696L10.7744 14.038H10.7289L5.44279 17.4709L4.50102 17.5924L4.09596 17.2127L4.14659 16.5899L4.339 16.3874L5.92887 15.2937L5.92381 15.2988Z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6009 0.903908H15.0544L9.69434 7.03008L16 15.3664H11.0627L7.19566 10.3105L2.77087 15.3664H0.31595L6.04904 8.81379L0 0.903908H5.06262L8.55811 5.52524L12.6009 0.903908ZM11.7399 13.8979H13.0993L4.32392 2.29528H2.86506L11.7399 13.8979Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 1.85859C0 1.31985 0.180185 0.87541 0.540541 0.525253C0.900896 0.175079 1.36937 0 1.94595 0C2.51223 0 2.97039 0.17238 3.32046 0.517172C3.68082 0.872727 3.861 1.33602 3.861 1.90707C3.861 2.42424 3.68598 2.85521 3.33591 3.2C2.97555 3.55556 2.50193 3.73333 1.91506 3.73333H1.89961C1.33333 3.73333 0.875166 3.55556 0.525097 3.2C0.175027 2.84444 0 2.3973 0 1.85859ZM0.200772 16V5.20404H3.62934V16H0.200772ZM5.52896 16H8.95753V9.97172C8.95753 9.5946 8.99872 9.30369 9.08108 9.09899C9.22522 8.73265 9.44402 8.42289 9.73745 8.1697C10.0309 7.91649 10.399 7.7899 10.8417 7.7899C11.9949 7.7899 12.5714 8.60336 12.5714 10.2303V16H16V9.8101C16 8.21548 15.6396 7.00606 14.9189 6.18182C14.1982 5.35758 13.2458 4.94545 12.0618 4.94545C10.7336 4.94545 9.69884 5.54343 8.95753 6.73939V6.77172H8.94208L8.95753 6.73939V5.20404H5.52896C5.54954 5.54882 5.55985 6.62086 5.55985 8.4202C5.55985 10.2195 5.54954 12.7461 5.52896 16Z" />
    </svg>
  )
}

export function SupabaseShareBar({ title, compact = false }: SupabaseShareBarProps) {
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
      console.error("Failed to copy link:", err)
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedAiPrompt = encodeURIComponent(`Read from ${url} so I can ask questions about its contents`)

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
