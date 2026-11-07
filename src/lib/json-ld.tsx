import * as React from "react"

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * Safely serializes JSON-LD structured data and escapes '<' as '\u003c'
 * to avoid script injection or browser parsing issues.
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}

