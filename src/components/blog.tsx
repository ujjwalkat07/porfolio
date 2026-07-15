"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Rss } from "lucide-react"
import { usePathname } from "next/navigation"
import posts from "@/content/blog-posts.json"

export function Blog() {
  const pathname = usePathname()
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [visibleCount, setVisibleCount] = React.useState(6)

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

  const isHomepage = pathname === "/"

  // Compute displayed posts based on whether we are on the homepage or blog page
  const displayedPosts = React.useMemo(() => {
    if (isHomepage) {
      return filteredPosts.slice(0, 3) // Show at most 3 on the homepage
    }
    return filteredPosts.slice(0, visibleCount)
  }, [filteredPosts, isHomepage, visibleCount])

  // Formatting date helper to match "30 June" style
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "long" })
    return `${day} ${month}`
  }

  const showMoreButtonVisible = isHomepage
    ? filteredPosts.length > 3
    : filteredPosts.length > visibleCount

  return (
    <section id="blog" className="py-8 border-b border-border/40 transition-colors duration-300">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          What I&apos;ve been writing
        </h2>
        <p className="text-sm font-light text-muted-foreground max-w-2xl leading-relaxed">
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
              className={`text-xs font-normal px-3.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 select-none ${
                activeCategory === category
                  ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search bar + RSS feed icon */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-48">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-muted/10 border border-border/50 rounded-full pl-8 pr-3 py-1.5 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/30 focus:bg-card transition-all"
            />
            <Search className="absolute left-3 top-[7px] h-3.5 w-3.5 text-muted-foreground/70" />
          </div>

          {/* <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-[28px] w-[28px] rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="RSS Feed"
          >
            <Rss className="h-3.5 w-3.5" />
          </a> */}
        </div>
      </div>

      {/* Articles Grid layout */}
      {displayedPosts.length > 0 ? (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1050px]">
            {displayedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-border/30 bg-card shadow-md hover:shadow-lg hover:border-foreground/15 transition-all duration-300 min-h-[340px]"
              >
                <div>
                  {/* Meta Category & Date */}
                  <div className="text-xs font-light text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <span>{formatDate(post.date)}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span>{post.category}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200 mt-4 line-clamp-3 leading-snug">
                    {post.title}
                  </h3>
                </div>

                <div>
                  {/* Description snippet */}
                  <p className="text-sm font-light text-muted-foreground/80 leading-relaxed mt-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Author signature section */}
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border/20">
                    <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-border/40">
                      <Image
                        src="/profile_pic.webp"
                        alt="Ujjwal Katiyar"
                        fill
                        sizes="22px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-normal text-muted-foreground group-hover:text-foreground/90 transition-colors">
                      Ujjwal Katiyar
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Show more posts button */}
          {showMoreButtonVisible && (
            <div className="flex justify-center mt-4">
              {isHomepage ? (
                <Link
                  href="/blog"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-card px-6 text-xs font-medium text-foreground hover:bg-muted hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-xs gap-1.5"
                >
                  Show more posts
                </Link>
              ) : (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-card px-6 text-xs font-medium text-foreground hover:bg-muted hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-xs gap-1.5"
                >
                  Show more posts
                </button>
              )}
            </div>
          )}
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
