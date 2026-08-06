import Image from "next/image"
import { GithubUser } from "@/lib/github"
import { Github } from "@/components/icons"
import { MapPin, Users, BookOpen, ExternalLink, Link2, Calendar } from "lucide-react"

interface GithubProfileHeaderProps {
  user: GithubUser
}

export function GithubProfileHeader({ user }: GithubProfileHeaderProps) {
  const memberSince = new Date(user.created_at).getFullYear()

  return (
    <header className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-muted/30 to-background p-6 md:p-8 shadow-sm transition-all duration-300">
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with pulse ring */}
          <div className="relative group">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-background bg-muted">
              <Image
                src={user.avatar_url}
                alt={`${user.name || user.login}'s GitHub avatar`}
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover"
              />
            </div>
          </div>

          {/* User Bio & Details */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                {user.name || user.login}
              </h2>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">

                @{user.login}
              </span>
            </div>

            {user.bio && (
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                {user.bio}
              </p>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-1">
              {user.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Link2 className="h-3.5 w-3.5 text-blue-500" />
                  <span>{user.blog.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Joined {memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button & Quick Stats */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-between gap-4 border-t border-border/40 pt-4 md:border-t-0 md:pt-0">
          <a
            id="github-profile-link-btn"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background font-medium px-4 py-2.5 text-sm hover:bg-foreground/90 active:scale-[0.98] transition-all shadow-sm"
          >
            <Github className="h-4 w-4" />
            <span>Follow on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-primary" />
              <strong className="font-semibold text-foreground">{user.followers}</strong> followers
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <strong className="font-semibold text-foreground">{user.following}</strong> following
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-blue-500" />
              <strong className="font-semibold text-foreground">{user.public_repos}</strong> repos
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
