import { LeetCodeData } from "@/lib/leetcode"
import { CheckCircle2, Trophy, Zap, Percent, Flame } from "lucide-react"

interface LeetCodeStatsProps {
  data: LeetCodeData | null
}

export function LeetCodeStats({ data }: LeetCodeStatsProps) {
  if (!data) {
    return (
      <section className="flex flex-col gap-6" aria-label="LeetCode Statistics">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border border-border/50 bg-card/40">
              <div className="h-4 w-20 rounded bg-muted/80" />
              <div className="h-7 w-12 rounded bg-muted/60" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  const { submitStatsGlobal, allQuestionsCount, profile } = data

  const acStats = submitStatsGlobal?.acSubmissionNum || []
  const totalStats = submitStatsGlobal?.totalSubmissionNum || []

  const solvedAll = acStats.find((s) => s.difficulty === "All")?.count || 0
  const solvedEasy = acStats.find((s) => s.difficulty === "Easy")?.count || 0
  const solvedMedium = acStats.find((s) => s.difficulty === "Medium")?.count || 0
  const solvedHard = acStats.find((s) => s.difficulty === "Hard")?.count || 0

  const totalQuestionsAll = allQuestionsCount.find((q) => q.difficulty === "All")?.count || 4000
  const totalQuestionsEasy = allQuestionsCount.find((q) => q.difficulty === "Easy")?.count || 950
  const totalQuestionsMedium = allQuestionsCount.find((q) => q.difficulty === "Medium")?.count || 2100
  const totalQuestionsHard = allQuestionsCount.find((q) => q.difficulty === "Hard")?.count || 950

  const totalAcSubmissions = acStats.find((s) => s.difficulty === "All")?.submissions || 0
  const totalSubmissions = totalStats.find((s) => s.difficulty === "All")?.submissions || 0
  const acceptanceRate =
    totalSubmissions > 0 ? ((totalAcSubmissions / totalSubmissions) * 100).toFixed(1) : "0.0"

  const easyPercent = ((solvedEasy / totalQuestionsEasy) * 100).toFixed(1)
  const mediumPercent = ((solvedMedium / totalQuestionsMedium) * 100).toFixed(1)
  const hardPercent = ((solvedHard / totalQuestionsHard) * 100).toFixed(1)

  return (
    <section className="flex flex-col gap-6" aria-label="LeetCode Statistics & Difficulty Breakdown">
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Solved Problems</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{solvedAll}</span>
        </div>

        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Percent className="h-4 w-4 text-amber-500" />
            <span>Acceptance Rate</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{acceptanceRate}%</span>
        </div>

        {/* <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>Global Ranking</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {profile.ranking ? `#${profile.ranking.toLocaleString()}` : "N/A"}
          </span>
        </div> */}

        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Zap className="h-4 w-4 text-blue-400" />
            <span>Total Submissions</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{totalSubmissions}</span>
        </div>
      </div>

      {/* Difficulty Breakdown Visual Panel */}
      <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500" />
              <span>Difficulty Distribution</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Breakdown of solved algorithms and data structure challenges across LeetCode tiers.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            <strong className="font-semibold text-foreground">{solvedAll}</strong> / {totalQuestionsAll} Total Solved (
            {((solvedAll / totalQuestionsAll) * 100).toFixed(1)}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Easy Card */}
          <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Easy
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {easyPercent}%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground">{solvedEasy}</span>
              <span className="text-xs text-muted-foreground">/ {totalQuestionsEasy}</span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-500/20">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(2, (solvedEasy / totalQuestionsEasy) * 100))}%` }}
              />
            </div>
          </div>

          {/* Medium Card */}
          <div className="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Medium
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {mediumPercent}%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground">{solvedMedium}</span>
              <span className="text-xs text-muted-foreground">/ {totalQuestionsMedium}</span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-amber-500/20">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(2, (solvedMedium / totalQuestionsMedium) * 100))}%` }}
              />
            </div>
          </div>

          {/* Hard Card */}
          <div className="flex flex-col gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Hard
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {hardPercent}%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground">{solvedHard}</span>
              <span className="text-xs text-muted-foreground">/ {totalQuestionsHard}</span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-rose-500/20">
              <div
                className="h-full rounded-full bg-rose-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, (solvedHard / totalQuestionsHard) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
