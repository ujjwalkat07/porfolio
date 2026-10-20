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
      url: `${baseUrl}/github`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.6,
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

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const rawDate = post.lastModified || post.date
    const parsedDate = rawDate ? new Date(rawDate) : new Date("2026-07-15")
    const validDate = isNaN(parsedDate.getTime()) ? new Date("2026-07-15") : parsedDate

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: validDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }
  })

  return [...staticRoutes, ...blogRoutes]
}
