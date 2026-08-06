import { GithubRepo } from "@/lib/github"
import { Star, GitFork, BookOpen, AlertCircle } from "lucide-react"

interface GithubStatsProps {
  repos: GithubRepo[]
}

export function GithubStats({ repos }: GithubStatsProps) {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)
  const totalOpenIssues = repos.reduce((acc, repo) => acc + repo.open_issues_count, 0)

  return (
    <section className="flex flex-col gap-6" aria-label="GitHub Repository Statistics">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Star className="h-4 w-4 text-amber-400" />
            <span>Total Stars</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{totalStars}</span>
        </div>

        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <GitFork className="h-4 w-4 text-blue-400" />
            <span>Total Forks</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{totalForks}</span>
        </div>

        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <BookOpen className="h-4 w-4 text-purple-400" />
            <span>Public Repos</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{repos.length}</span>
        </div>

        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-emerald-400" />
            <span>Open Issues</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{totalOpenIssues}</span>
        </div>
      </div>
    </section>
  )
}
