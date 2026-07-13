"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Rss } from "lucide-react"
import posts from "@/content/blog-posts.json"

export function Blog() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Extract unique categories dynamically from compiled posts
  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category)))
    return ["All", ...unique]
  }, [])

  // Filter posts based on active category and search input
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Formatting date helper to match "30 June" style
  const formatDate = (dateStr: string) => {
    // Parse "Jul 10, 2026" or similar
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "long" })
    return `${day} ${month}`
  }

  return (
    <section id="blog" className="py-8 border-b border-border/40 transition-colors duration-300">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          What I've been writing
        </h2>
        <p className="text-xs font-light text-muted-foreground max-w-lg">
          Insights on event-driven systems, microservice monorepos, and high-frequency real-time web applications.
        </p>
      </div>

      {/* Control Bar: Filter pills + Search / Feed */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-border/20">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs font-normal px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 select-none ${
                activeCategory === category
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 bg-muted/20 border border-border/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search bar + RSS feed icon */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-48">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-muted/20 border border-border/50 rounded-lg px-3 py-1.5 pr-8 text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <Search className="absolute right-2.5 top-2.5 h-3 w-3 text-muted-foreground/75" />
          </div>
        </div>
      </div>

      {/* Articles Grid layout */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between p-6 rounded-xl border border-border/30 bg-muted/5 hover:bg-muted/10 hover:border-foreground/15 transition-all duration-300 min-h-[300px]"
            >
              <div>
                {/* Meta Category & Date */}
                <div className="text-xs font-light text-muted-foreground tracking-wider uppercase">
                  {formatDate(post.date)} <span className="mx-1.5 text-muted-foreground/40">•</span> {post.category}
                </div>

                {/* Article Title */}
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200 mt-3 line-clamp-3 leading-snug">
                  {post.title}
                </h3>
              </div>

              <div>
                {/* Description snippet */}
                <p className="text-xs text-muted-foreground font-light leading-relaxed mt-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Author signature section */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/20">
                  
                  <div className="flex -space-x-1">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 text-[9px] font-bold ring-1 ring-border/20">
                      UK
                    </span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground group-hover:text-foreground/90 transition-colors">
                    Ujjwal Katiyar
                  </span>


                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm font-light text-muted-foreground">
            No articles match your search or filter criteria.
          </p>
        </div>
      )}
    </section>
  )
}
