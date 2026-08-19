"use client"

import { useState, useMemo } from "react"
import { LeetCodeRecentSubmission } from "@/lib/leetcode"
import { Search, ExternalLink, Code2, Calendar, CheckCircle2 } from "lucide-react"

interface LeetCodeSubmissionsProps {
  submissions: LeetCodeRecentSubmission[]
}

export function LeetCodeSubmissions({ submissions }: LeetCodeSubmissionsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubmissions = useMemo(() => {
    return (submissions || []).filter((sub) => {
      const matchTitle = sub.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchSlug = sub.titleSlug.toLowerCase().includes(searchQuery.toLowerCase())
      return matchTitle || matchSlug
    })
  }, [submissions, searchQuery])

  function formatSubmissionTime(epochSeconds: string): string {
    const timestamp = Number(epochSeconds) * 1000
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return "Recently"

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="flex flex-col gap-6" aria-label="Recent Accepted Solutions">
      {/* Controls Bar: Search & Count */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="leetcode-search-input"
            type="text"
            placeholder="Search solved problems by name or algorithm topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            Showing <strong className="font-semibold text-foreground">{filteredSubmissions.length}</strong> of{" "}
            <strong className="font-semibold text-foreground">{submissions.length}</strong> recent accepted solutions
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-amber-500 hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Solutions Grid */}
      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <Code2 className="h-8 w-8 text-muted-foreground/60" />
          <p className="text-sm font-medium text-foreground">No recent submissions found</p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Accepted solutions will automatically sync from the LeetCode platform.
          </p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <Code2 className="h-8 w-8 text-muted-foreground/60" />
          <p className="text-sm font-medium text-foreground">No matching problems found</p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Try searching for another problem name or keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubmissions.map((sub) => {
            const problemUrl = `https://leetcode.com/problems/${sub.titleSlug}/`
            const formattedDate = formatSubmissionTime(sub.timestamp)

            return (
              <article
                key={sub.id}
                id={`leetcode-sub-${sub.id}`}
                className="group relative flex items-center justify-between rounded-xl border border-border/60 bg-card/60 p-4 hover:border-amber-500/40 hover:shadow-md hover:bg-card/90 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <a
                      href={problemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold tracking-tight text-foreground hover:text-amber-500 transition-colors truncate flex items-center gap-1.5"
                    >
                      <span className="truncate">{sub.title}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-0.5">
                      <span className="font-mono text-muted-foreground/80">#{sub.id}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={problemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${sub.title} on LeetCode`}
                  className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:border-amber-500/50 hover:text-amber-500 transition-colors ml-3"
                >
                  <span>Solve</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
