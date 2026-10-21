"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ImpressionCounter } from "@/components/impression-counter"
import posts from "@/content/blog-posts.json"

export function HomeBlog() {
  // Format date helper (e.g. "13 Jul 2026")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Display top 3 latest posts on the homepage
  const recentPosts = posts.slice(0, 3)

  return (
    <section id="home-blog" aria-label="Recent Blog Posts" className="w-full transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 pb-3 border-b border-border/40">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Blog
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
            {posts.length} articles
          </span>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span>View all posts</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Horizontal Blog Post Rows with Separator Lines */}
      <div className="divide-y divide-border/40">
        {recentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-5 px-3 sm:px-4 rounded-xl hover:bg-muted/40 transition-all duration-200 gap-4"
          >
            {/* Post Content Details */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-0 sm:pr-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="shrink-0">{formatDate(post.date)}</span>
                <span className="text-muted-foreground/40 shrink-0">•</span>
                <span className="text-primary font-medium shrink-0">{post.category}</span>
                {post.readTime && (
                  <>
                    <span className="text-muted-foreground/40 shrink-0">•</span>
                    <span className="shrink-0">{post.readTime}</span>
                  </>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground group-hover:text-primary hover:underline transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                {post.description}
              </p>
            </div>

            {/* Post Meta & Image Logo */}
            <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/20">
              <div className="text-xs text-muted-foreground">
                <ImpressionCounter slug={post.slug} readOnly />
              </div>

              <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-border/60 shrink-0 group-hover:border-foreground/40 group-hover:scale-105 transition-all duration-200 shadow-xs">
                <Image
                  src="/profile_pic.webp"
                  alt="Ujjwal Katiyar logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile/Bottom Call to Action */}
      <div className="flex justify-center mt-6 sm:hidden">
        <Link
          href="/blog"
          className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-card px-6 text-xs font-medium text-foreground hover:bg-muted active:scale-[0.98] transition-all duration-200 shadow-xs gap-1.5"
        >
          <span>View all posts</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
