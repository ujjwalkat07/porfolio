"use client"

import { useState, useMemo } from "react"
import { GithubRepo } from "@/lib/github"
import { Github } from "@/components/icons"
import { Star, GitFork, ExternalLink, Search, Filter, ArrowUpDown, Calendar, Code, Tag } from "lucide-react"

interface GithubRepoListProps {
  repos: GithubRepo[]
}

type SortOption = "stars" | "updated" | "forks" | "name"

const LANGUAGE_DOT_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-500",
  Go: "bg-cyan-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Rust: "bg-amber-600",
  "C++": "bg-pink-500",
  Java: "bg-red-500",
  Shell: "bg-lime-500",
  Other: "bg-gray-400",
}

export function GithubRepoList({ repos }: GithubRepoListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("updated")

  // Extract unique languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>()
    repos.forEach((r) => {
      if (r.language) langs.add(r.language)
    })
    return Array.from(langs).sort()
  }, [repos])

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesSearch =
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesLanguage =
          selectedLanguage === "all" || repo.language === selectedLanguage

        return matchesSearch && matchesLanguage
      })
      .sort((a, b) => {
        if (sortBy === "stars") return b.stargazers_count - a.stargazers_count
        if (sortBy === "forks") return b.forks_count - a.forks_count
        if (sortBy === "name") return a.name.localeCompare(b.name)
        // default: updated
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
  }, [repos, searchQuery, selectedLanguage, sortBy])

  return (
    <section className="flex flex-col gap-6" aria-label="GitHub Repositories Grid">
      {/* Controls Bar: Search, Language Filter, Sorting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-sm">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="github-search-input"
            type="text"
            placeholder="Search repositories by name, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 min-w-[140px]">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <select
              id="github-language-filter"
              value={selectedLanguage}
              aria-label="Filter repositories by programming language"
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              <option value="all">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 min-w-[140px]">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <select
              id="github-sort-select"
              value={sortBy}
              aria-label="Sort repositories"
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Repos Count & Active Filters summary */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong className="font-semibold text-foreground">{filteredRepos.length}</strong> of{" "}
          <strong className="font-semibold text-foreground">{repos.length}</strong> repositories
        </span>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedLanguage("all")
            }}
            className="text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid of Repository Cards */}
      {(!repos || repos.length === 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-5">
              <div className="flex items-center justify-between">
                <div className="h-5 w-40 rounded bg-muted/80" />
                <div className="h-4 w-4 rounded-full bg-muted/60" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded bg-muted/60" />
                <div className="h-3.5 w-3/4 rounded bg-muted/40" />
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-border/30">
                <div className="h-3 w-16 rounded bg-muted/60" />
                <div className="h-3 w-12 rounded bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <Code className="h-8 w-8 text-muted-foreground/60" />
          <p className="text-sm font-medium text-foreground">No repositories found</p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Try adjusting your search criteria or language filter to explore other projects.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {filteredRepos.map((repo) => {
            const formattedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            const dotColor = LANGUAGE_DOT_COLORS[repo.language || "Other"] || LANGUAGE_DOT_COLORS["Other"]

            return (
              <article
                key={repo.id}
                id={`repo-card-${repo.name}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border/60 bg-card/60 p-5 hover:border-border hover:shadow-md hover:bg-card/90 transition-all duration-200"
              >
                <div className="flex flex-col gap-3">
                  {/* Card Header: Repo Name + GitHub Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold tracking-tight text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                      </a>
                      {repo.fork && (
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Fork
                        </span>
                      )}
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${repo.name} on GitHub`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 min-h-[36px]">
                    {repo.description || "No description provided for this repository."}
                  </p>

                  {/* Topic Badges */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {repo.topics.slice(0, 5).map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-normal text-muted-foreground"
                        >
                          <Tag className="h-2.5 w-2.5 opacity-60" />
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    {/* Language */}
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
                        <span>{repo.language}</span>
                      </div>
                    )}

                    {/* Stars */}
                    <div className="flex items-center gap-1" title="Stargazers">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>

                    {/* Forks */}
                    <div className="flex items-center gap-1" title="Forks">
                      <GitFork className="h-3.5 w-3.5 text-blue-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Demo Link if Homepage exists */}
                    {repo.homepage && (
                      <a
                        href={repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        <span>Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                      <Calendar className="h-3 w-3" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
