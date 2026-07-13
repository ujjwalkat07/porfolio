import { MetadataRoute } from "next"
import posts from "@/content/blog-posts.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ujjwalkatiyar.in"

  // Base routes
  const routes = ["", "/about", "/contact", "/privacy", "/terms"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.7,
  }))

  // Dynamic blog routes
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified || post.date || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes]
}
