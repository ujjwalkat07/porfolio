import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import posts from "@/content/blog-posts.json"
import Link from "next/link"

export function Blog() {

  return (
    <section id="blog" className="py-8 border-b border-border/40 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-semibold tracking-wider text-foreground uppercase select-none">
          Blog Posts
        </h2>
        <div className="h-[1px] flex-1 bg-border/40" />
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <Link
            key={i}
            href={`/blog/${post.slug}`}
            className="group block p-5 border border-border/50 bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:border-foreground/20 rounded-xl"
          >
            <div className="flex flex-col gap-3">
              {/* Meta details */}
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-light uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              {/* Title & Link Indicator */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {post.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-0.5" />
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-[9px] font-normal text-muted-foreground/90 bg-card/60 border border-border/40 rounded-md px-2 py-0.5 tracking-wide uppercase select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
