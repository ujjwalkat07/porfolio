import { LeetCodeData } from "@/lib/leetcode"
import { Layers, Terminal, Sparkles } from "lucide-react"

interface LeetCodeTopicsProps {
  data: LeetCodeData | null
}

export function LeetCodeTopics({ data }: LeetCodeTopicsProps) {
  if (!data) return null

  const { tagProblemCounts, languageProblemCount } = data

  const fundamental = tagProblemCounts?.fundamental || []
  const intermediate = tagProblemCounts?.intermediate || []
  const advanced = tagProblemCounts?.advanced || []
  const languages = languageProblemCount || []

  const totalTopicSolved =
    fundamental.reduce((a, b) => a + b.problemsSolved, 0) +
    intermediate.reduce((a, b) => a + b.problemsSolved, 0) +
    advanced.reduce((a, b) => a + b.problemsSolved, 0)

  return (
    <section className="flex flex-col gap-6" aria-label="Topic & Language Proficiency">
      <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-500" />
              <span>Skill &amp; Topic Breakdown</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Categorized data structure, algorithmic paradigm, and language proficiencies.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3 w-3" />
            <span>{totalTopicSolved} Tagged Solutions</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fundamental */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-background/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Fundamental Topics
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {fundamental.reduce((a, b) => a + b.problemsSolved, 0)} solved
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {fundamental.map((topic) => (
                <div
                  key={topic.tagSlug}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-muted/40 hover:bg-muted transition-colors"
                >
                  <span className="text-foreground font-medium">{topic.tagName}</span>
                  <span className="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 text-[11px]">
                    {topic.problemsSolved}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Intermediate */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-background/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Intermediate Topics
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {intermediate.reduce((a, b) => a + b.problemsSolved, 0)} solved
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {intermediate.map((topic) => (
                <div
                  key={topic.tagSlug}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-muted/40 hover:bg-muted transition-colors"
                >
                  <span className="text-foreground font-medium">{topic.tagName}</span>
                  <span className="rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 text-[11px]">
                    {topic.problemsSolved}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-background/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Advanced Topics
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {advanced.reduce((a, b) => a + b.problemsSolved, 0)} solved
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {advanced.map((topic) => (
                <div
                  key={topic.tagSlug}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-muted/40 hover:bg-muted transition-colors"
                >
                  <span className="text-foreground font-medium">{topic.tagName}</span>
                  <span className="rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold px-2 py-0.5 text-[11px]">
                    {topic.problemsSolved}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages Used Section */}
        {languages.length > 0 && (
          <div className="pt-2 border-t border-border/40 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" />
              <span>Languages Used in Solutions</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {languages.map((lang) => (
                <div
                  key={lang.languageName}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:border-foreground/30 transition-colors"
                >
                  <span>{lang.languageName}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {lang.problemsSolved} {lang.problemsSolved === 1 ? "problem" : "problems"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
