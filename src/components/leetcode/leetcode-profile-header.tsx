import Image from "next/image"
import { LeetCodeData } from "@/lib/leetcode"
import { LeetCode } from "@/components/icons"
import { MapPin, Trophy, Star, ExternalLink, Code2, Flame } from "lucide-react"

interface LeetCodeProfileHeaderProps {
  data: LeetCodeData | null
}

export function LeetCodeProfileHeader({ data }: LeetCodeProfileHeaderProps) {
  if (!data) {
    return (
      <header className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8 shadow-sm transition-all duration-300 animate-pulse">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-muted/80" />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="h-7 w-44 rounded-md bg-muted/80" />
                <div className="h-5 w-24 rounded-full bg-muted/50" />
              </div>
              <div className="h-4 w-72 rounded-md bg-muted/60" />
              <div className="h-3 w-40 rounded-md bg-muted/40" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-9 w-36 rounded-xl bg-muted/80" />
            <div className="h-4 w-48 rounded-md bg-muted/60" />
          </div>
        </div>
      </header>
    )
  }

  const { username, profile, submitStatsGlobal, badges } = data
  const totalSolved =
    submitStatsGlobal?.acSubmissionNum?.find((s) => s.difficulty === "All")?.count ?? 0
  const profileUrl = `https://leetcode.com/u/${username}`

  return (
    <header className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-muted/30 to-background p-6 md:p-8 shadow-sm transition-all duration-300">
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with LeetCode Accent Ring */}
          <div className="relative group">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-amber-500/40 bg-muted shadow-md">
              {profile.userAvatar ? (
                <Image
                  src={profile.userAvatar}
                  alt={`${profile.realName || username}'s LeetCode avatar`}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-500/10 text-amber-500">
                  <LeetCode className="h-12 w-12" />
                </div>
              )}
            </div>
            {/* Online/Active badge */}
            <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center" title="Active Problem Solver">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                {profile.realName || username}
              </h2>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                @{username}
              </span>
              {/* {profile.starRating > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/5 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>Level {profile.starRating}</span>
                </span>
              )} */}
            </div>

            {profile.aboutMe ? (
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                {profile.aboutMe}
              </p>
            ) : (
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Active LeetCode problem solver practicing Data Structures, Algorithms, and System Optimization.
              </p>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-1">
              {profile.countryName && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-500" />
                  <span>{profile.countryName}</span>
                </div>
              )}
              {/* {profile.ranking > 0 && (
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                  <span>Global Rank #{profile.ranking.toLocaleString()}</span>
                </div>
              )} */}
              {profile.skillTags && profile.skillTags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-blue-500" />
                  <span className="capitalize">{profile.skillTags.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button & Quick Highlight */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-between gap-4 border-t border-border/40 pt-4 md:border-t-0 md:pt-0">
          <a
            id="leetcode-profile-link-btn"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold px-4 py-2.5 text-sm active:scale-[0.98] transition-all shadow-sm"
          >
            <LeetCode className="h-4 w-4 fill-neutral-950" />
            <span>View on LeetCode</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 shrink-0">
              <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <strong className="font-semibold text-foreground">{totalSolved}</strong> problems solved
            </div>
            {badges.length > 0 && (
              <>
                <span className="shrink-0">•</span>
                <div className="flex items-center gap-1 shrink-0">
                  <strong className="font-semibold text-foreground">{badges.length}</strong> badges
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
