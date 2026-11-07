import { Navbar } from "@/components/navbar"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/lib/json-ld"
import posts from "@/content/blog-posts.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Ujjwal Katiyar",
  description:
    "Technical articles on distributed systems, AI observability, microservices architecture, and high-throughput real-time backend engineering.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/blog",
  },
  openGraph: {
    title: "Blog — Ujjwal Katiyar",
    description:
      "Technical articles on distributed systems, AI observability, microservices architecture, and high-throughput real-time backend engineering.",
    url: "https://ujjwalkatiyar.in/blog",
    type: "website",
    siteName: "Ujjwal Katiyar",
    images: [
      {
        url: "https://ujjwalkatiyar.in/profile-card.png",
        width: 1200,
        height: 675,
        alt: "Blog — Ujjwal Katiyar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Ujjwal Katiyar",
    description:
      "Technical articles on distributed systems, AI observability, microservices architecture, and high-throughput real-time backend engineering.",
    creator: "@ujjwalkatiyar07",
    images: ["https://ujjwalkatiyar.in/profile-card.png"],
  },
}

export default function BlogListingPage() {
  const publishedPosts = posts.filter((post) => !post.draft)

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ujjwal Katiyar's Blog Posts",
    description:
      "Technical articles on distributed systems, AI observability, microservices architecture, and high-throughput real-time backend engineering.",
    url: "https://ujjwalkatiyar.in/blog",
    itemListElement: publishedPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://ujjwalkatiyar.in/blog/${post.slug}`,
      name: post.title,
      description: post.description,
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <JsonLd data={itemListSchema} />
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[1350px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-10 gap-6">
        <Blog />
        <Footer />
      </main>
    </div>
  )
}
