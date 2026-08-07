import { Navbar } from "@/components/navbar"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Ujjwal Katiyar",
  description: "Insights on event-driven systems, microservice monorepos, and high-frequency real-time web applications.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/blog",
  },
}

import posts from "@/content/blog-posts.json"

export default function BlogListingPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ujjwal Katiyar's Blog Posts",
    "description": "Insights on event-driven systems, microservice monorepos, and high-frequency real-time web applications.",
    "url": "https://ujjwalkatiyar.in/blog",
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://ujjwalkatiyar.in/blog/${post.slug}`,
      "name": post.title,
      "description": post.description,
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-16 gap-6">
        <h1 className="sr-only">Blog — Ujjwal Katiyar</h1>
        <Blog />
        <Footer />
      </main>

    </div>
  )
}
