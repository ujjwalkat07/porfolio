import { MetadataRoute } from "next"
import posts from "@/content/blog-posts.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ujjwalkatiyar.in"

  // Base routes
  const routes = ["", "/github", "/blog", "/about", "/contact", "/privacy", "/terms", "/rss.xml"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" || route === "/github" ? ("daily" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/blog" || route === "/github" ? 0.9 : 0.7,
  }))

  // Dynamic blog routes
  const blogRoutes = posts.map((post) => {
    const rawDate = post.lastModified || post.date
    const parsedDate = rawDate ? new Date(rawDate) : new Date()
    const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: validDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }
  })

  return [...routes, ...blogRoutes]
}
