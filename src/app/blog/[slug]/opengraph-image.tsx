import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"
import posts from "@/content/blog-posts.json"

export const runtime = "nodejs"

export const alt = "Article Open Graph Image"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

interface BlogPostItem {
  slug: string
  title: string
  category?: string
  description?: string
  date: string
}

const blogPosts = posts as BlogPostItem[]

// Pre-load template image as base64 data URL
let bgDataUrl = ""
try {
  const bgPath = path.join(process.cwd(), "public", "postTempate.png")
  if (fs.existsSync(bgPath)) {
    const bgBuffer = fs.readFileSync(bgPath)
    bgDataUrl = `data:image/png;base64,${bgBuffer.toString("base64")}`
  }
} catch (e) {
  console.error("Failed to load post template background image:", e)
}

function splitTitle(title: string): { whiteLines: string[]; highlightText: string } {
  // Case 1: "The Engineering behind [Subject]"
  const behindMatch = title.match(/^(the engineering\s+behind)\s+(.+)$/i)
  if (behindMatch) {
    return {
      whiteLines: ["The Engineering", "behind"],
      highlightText: behindMatch[2].trim(),
    }
  }

  // Case 2: "X vs Y"
  const vsMatch = title.match(/^(.+?\bvs\b)\s+(.+)$/i)
  if (vsMatch) {
    return {
      whiteLines: [vsMatch[1].trim()],
      highlightText: vsMatch[2].trim(),
    }
  }

  // Case 3: multi-word title, highlight last word/term
  const words = title.split(" ")
  if (words.length > 2) {
    const splitPoint = words.length - 1
    return {
      whiteLines: [words.slice(0, splitPoint).join(" ")],
      highlightText: words[splitPoint],
    }
  }

  return {
    whiteLines: [title],
    highlightText: "",
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  const rawTitle = post?.title || "Engineering Deep Dive"
  const { whiteLines, highlightText } = splitTitle(rawTitle)

  let fontSize = "92px"
  if (rawTitle.length > 55) {
    fontSize = "66px"
  } else if (rawTitle.length > 38) {
    fontSize = "78px"
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#030712",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background Template Graphic */}
        {bgDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgDataUrl}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1200px",
              height: "630px",
              objectFit: "cover",
            }}
          />
        ) : null}

        {/* Top Right Domain Watermark: ujjwalkatiyar.in ↗ */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            right: "64px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#f3f4f6",
            fontSize: "24px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          <span>ujjwalkatiyar.in</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>

        {/* Center-Left Content Area */}
        <div
          style={{
            position: "absolute",
            top: "115px",
            left: "80px",
            maxWidth: "1020px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Main Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
            }}
          >
            {whiteLines.map((line, index) => (
              <span key={index} style={{ color: "#ffffff" }}>
                {line}
              </span>
            ))}
            {highlightText ? (
              <span style={{ color: "#3ECF8E" }}>
                {highlightText}
              </span>
            ) : null}
          </div>

          {/* Emerald Accent Bar */}
          <div
            style={{
              width: "86px",
              height: "9px",
              borderRadius: "9999px",
              backgroundColor: "#3ECF8E",
              marginTop: "30px",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
