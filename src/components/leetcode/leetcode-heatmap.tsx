"use client"

import { useMemo, useState } from "react"
import { Calendar as CalendarIcon, Flame, Zap } from "lucide-react"

interface LeetCodeHeatmapProps {
  submissionCalendar: Record<string, number>
}

export function LeetCodeHeatmap({ submissionCalendar }: LeetCodeHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null)

  // Compute past ~180 days or year for heatmap grid
  const { days, totalActiveDays, maxSubmissionsInDay, totalCalendarSubmissions } = useMemo(() => {
    const calendarEntries = Object.entries(submissionCalendar || {})
    const activeDaysCount = calendarEntries.length
    let maxCount = 0
    let totalSubs = 0

    // Map epoch seconds -> submission count
    const countByDateKey = new Map<string, number>()
    for (const [timestampStr, count] of calendarEntries) {
      const numCount = Number(count)
      totalSubs += numCount
      if (numCount > maxCount) maxCount = numCount
      const date = new Date(Number(timestampStr) * 1000)
      const dateKey = date.toISOString().split("T")[0]
      countByDateKey.set(dateKey, numCount)
    }

    // Generate grid for past 24 weeks (~168 days)
    const today = new Date()
    const resultDays: { dateStr: string; displayDate: string; count: number }[] = []
    const totalDaysToShow = 168

    for (let i = totalDaysToShow - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const dateKey = d.toISOString().split("T")[0]
      const count = countByDateKey.get(dateKey) || 0
      resultDays.push({
        dateStr: dateKey,
        displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count,
      })
    }

    return {
      days: resultDays,
      totalActiveDays: activeDaysCount,
      maxSubmissionsInDay: maxCount,
      totalCalendarSubmissions: totalSubs,
    }
  }, [submissionCalendar])

  function getCellColor(count: number): string {
    if (count === 0) return "bg-muted/40 hover:border-muted-foreground/30"
    if (count <= 2) return "bg-amber-500/30 hover:bg-amber-500/40"
    if (count <= 5) return "bg-amber-500/60 hover:bg-amber-500/70"
    if (count <= 9) return "bg-amber-500/85 hover:bg-amber-500/95"
    return "bg-amber-500 hover:bg-amber-400"
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm" aria-label="LeetCode Activity Heatmap">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-amber-500" />
            <span>LeetCode Activity &amp; Consistency</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Contribution activity and problem-solving streak over the recent cycle.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            <strong className="font-semibold text-foreground">{totalActiveDays}</strong> Active Days
          </div>
          <span>•</span>
          <div className="inline-flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <strong className="font-semibold text-foreground">{totalCalendarSubmissions}</strong> Logged Submissions
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="w-full overflow-x-auto pb-2">
          <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-max p-1">
            {days.map((day) => {
              const colorClass = getCellColor(day.count)
              return (
                <div
                  key={day.dateStr}
                  onMouseEnter={() => setHoveredDay({ date: day.displayDate, count: day.count })}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`h-3.5 w-3.5 rounded-xs transition-colors cursor-pointer border border-transparent ${colorClass}`}
                  title={`${day.count} submissions on ${day.displayDate}`}
                />
              )
            })}
          </div>
        </div>

        {/* Legend and Hover tooltip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-1 border-t border-border/30">
          <div className="text-xs min-h-[18px]">
            {hoveredDay ? (
              <span>
                <strong className="font-semibold text-foreground">
                  {hoveredDay.count} {hoveredDay.count === 1 ? "submission" : "submissions"}
                </strong>{" "}
                on {hoveredDay.date}
              </span>
            ) : (
              <span>Hover over squares to inspect daily submission frequency</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            <span className="h-3 w-3 rounded-xs bg-muted/40 border border-border/40" />
            <span className="h-3 w-3 rounded-xs bg-amber-500/30" />
            <span className="h-3 w-3 rounded-xs bg-amber-500/60" />
            <span className="h-3 w-3 rounded-xs bg-amber-500/85" />
            <span className="h-3 w-3 rounded-xs bg-amber-500" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
