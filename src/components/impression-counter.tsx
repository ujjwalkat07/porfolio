"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

interface ImpressionCounterProps {
  slug: string
  /** If true, only reads the count (GET) without incrementing (for listing cards) */
  readOnly?: boolean
}

export function ImpressionCounter({ slug, readOnly = false }: ImpressionCounterProps) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        let res: Response

        if (readOnly) {
          res = await fetch(`/api/impressions?slug=${encodeURIComponent(slug)}`)
        } else {
          res = await fetch("/api/impressions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          })
        }

        if (res.ok) {
          const data = await res.json()
          setCount(data.count)
        }
      } catch (err) {
        //("Failed to fetch impression:", err)
      }
    }

    fetchCount()
  }, [slug, readOnly])

  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground whitespace-nowrap shrink-0">
      <Eye className="h-3.5 w-3.5 shrink-0" />
      {count !== null ? (
        <span>{count.toLocaleString()} views</span>
      ) : (
        <span className="inline-block w-10 h-3 bg-muted/30 rounded animate-pulse" />
      )}
    </span>
  )
}
