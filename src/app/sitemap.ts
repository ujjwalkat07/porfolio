import { MetadataRoute } from "next"
import posts from "@/content/blog-posts.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ujjwalkatiyar.in"

  // Base routes with realistic change frequencies and balanced priorities
  // Excludes /rss.xml which is an XML feed, not an indexable HTML page
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-10-20"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamic blog post routes mapped from the generated blog index
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    let lastMod = new Date("2026-10-15")
    if (post.lastModified || post.date) {
      const parsed = new Date(post.lastModified || post.date)
      if (!isNaN(parsed.getTime())) {
        lastMod = parsed
      }
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    }
  })

  return [...staticRoutes, ...blogRoutes]
}
