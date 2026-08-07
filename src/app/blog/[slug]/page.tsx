import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/share-buttons"
import { ImpressionCounter } from "@/components/impression-counter"
import posts from "@/content/blog-posts.json"
import { marked } from "marked"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — Ujjwal Katiyar`,
    description: post.description,
    keywords: [...(post.tags || []), ...(post.keywords || []), "Ujjwal Katiyar", "Software Developer", "Blog", "System Design"],
    authors: [{ name: "Ujjwal Katiyar" }],
    alternates: {
      canonical: `https://ujjwalkatiyar.in/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Ujjwal Katiyar`,
      description: post.description,
      type: "article",
      authors: ["Ujjwal Katiyar"],
      images: [
        {
          url: "/profile_pic.webp",
          width: 500,
          height: 500,
          alt: "Ujjwal Katiyar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Ujjwal Katiyar`,
      description: post.description,
      creator: "@ujjwalkatiyar07",
      images: ["/profile_pic.webp"],
    },
  }
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 2)

  // Parse markdown content to HTML
  const contentHtml = await marked.parse(post.content)

  // Safe ISO Date parsing for schema markup
  let isoPublishDate = new Date().toISOString()
  try {
    const d = new Date(post.date)
    if (!isNaN(d.getTime())) {
      isoPublishDate = d.toISOString()
    }
  } catch (e) {
    //("Error parsing date: ", e)
  }

  let isoModifiedDate = isoPublishDate
  if (post.lastModified) {
    try {
      const d = new Date(post.lastModified)
      if (!isNaN(d.getTime())) {
        isoModifiedDate = d.toISOString()
      }
    } catch (e) {
      //("Error parsing lastModified date: ", e)
    }
  }

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ujjwalkatiyar.in/blog/${slug}`,
    },
    "headline": post.title,
    "description": post.description,
    "image": ["https://ujjwalkatiyar.in/profile_pic.webp"],
    "datePublished": isoPublishDate,
    "dateModified": isoModifiedDate,
    "author": {
      "@type": "Person",
      "name": "Ujjwal Katiyar",
      "url": "https://ujjwalkatiyar.in",
      "sameAs": [
        "https://github.com/ujjwalkat07",
        "https://www.linkedin.com/in/ujjwalkatiyar07",
      ],
    },
    "publisher": {
      "@type": "Person",
      "name": "Ujjwal Katiyar",
      "url": "https://ujjwalkatiyar.in",
      "image": {
        "@type": "ImageObject",
        "url": "https://ujjwalkatiyar.in/profile_pic.webp",
      },
    },

    "keywords": (post.tags || []).join(", "),
    "articleSection": post.category || "Technology",
    "inLanguage": "en-US",
  }

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ujjwalkatiyar.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://ujjwalkatiyar.in/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://ujjwalkatiyar.in/blog/${slug}`,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      {/* Dynamic Blog Posting & Breadcrumbs Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-16 pb-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors self-start"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to blog posts</span>
        </Link>

        {/* Article Header */}
        <article className="flex flex-col gap-6 text-foreground">
          <div className="flex flex-col gap-4">
            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px] sm:text-xs text-muted-foreground font-light uppercase tracking-wider">
              <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                Published: {post.date}
              </span>
              {post.lastModified && (
                <>
                  <span className="text-muted-foreground/40 shrink-0 select-none">•</span>
                  <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    Updated: {post.lastModified}
                  </span>
                </>
              )}
              <span className="text-muted-foreground/40 shrink-0 select-none">•</span>
              <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {post.readTime}
              </span>
              <span className="text-muted-foreground/40 shrink-0 select-none">•</span>
              <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
                <ImpressionCounter slug={slug} />
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2] sm:leading-[1.15] break-words [overflow-wrap:anywhere]">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-[9px] sm:text-[10px] font-normal text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 rounded-md px-2.5 py-0.5 tracking-wide uppercase select-none font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons title={post.title} />

          {/* HTML rendered markdown body */}
          <div
            className="mt-0 text-foreground leading-relaxed font-normal text-sm sm:text-base max-w-none break-words [overflow-wrap:anywhere]
              [&>h1]:text-xl sm:[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mt-8 sm:[&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:tracking-tight
              [&>h2]:text-lg sm:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 sm:[&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-tight
              [&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 sm:[&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-5 [&>p]:leading-relaxed [&>p]:text-foreground [&>p]:font-light [&>p]:tracking-wide
              [&>p>strong]:font-semibold [&>p>strong]:text-foreground
              [&>ul]:list-disc [&>ul]:pl-5 sm:[&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-foreground [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2.5 [&>ul]:font-light [&>ul]:tracking-wide
              [&>ol]:list-decimal [&>ol]:pl-5 sm:[&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-foreground [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-2.5 [&>ol]:font-light [&>ol]:tracking-wide
              [&>li]:leading-relaxed
              [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-6 sm:[&>blockquote]:my-8
              [&>pre]:p-4 sm:[&>pre]:p-5 [&>pre]:bg-muted/20 [&>pre]:border [&>pre]:border-border/40 [&>pre]:rounded-xl sm:[&>pre]:rounded-2xl [&>pre]:max-w-full [&>pre]:overflow-x-auto [&>pre]:my-6 sm:[&>pre]:my-8 [&>pre]:shadow-xs
              [&>code]:text-xs [&>code]:font-mono [&>code]:bg-indigo-500/10 [&>code]:px-1.5 sm:[&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-indigo-500 dark:[&>code]:text-indigo-400 [&>code]:font-medium [&>code]:break-all
              [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-foreground [&>pre>code]:font-normal [&>pre>code]:leading-normal [&>pre>code]:break-normal
              [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:my-8 [&_table]:border-collapse [&_table]:text-xs sm:[&_table]:text-sm [&_table]:text-foreground
              [&_th]:border [&_th]:border-border/40 [&_th]:bg-muted/20 [&_th]:px-3 sm:[&_th]:px-4 [&_th]:py-2 sm:[&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
              [&_td]:border [&_td]:border-border/40 [&_td]:px-3 sm:[&_td]:px-4 [&_td]:py-2 sm:[&_td]:py-2.5 [&_td]:text-foreground [&_td]:font-light
              [&_tr:nth-child(even)]:bg-muted/5
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl
            "
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Share Buttons at the bottom */}
          <ShareButtons title={post.title} />

          {/* Read Next Section for Internal Linking & SEO */}
          {otherPosts.length > 0 && (
            <div className="mt-1 pt-1 border-t border-border/40">
              <h3 className="text-lg font-bold mb-6 text-foreground">Read Next</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="group block p-5 rounded-xl border border-border/30 bg-muted/5 hover:bg-muted/10 hover:border-foreground/15 transition-all duration-300"
                  >
                    <span className="text-[10px] font-light text-muted-foreground uppercase tracking-wider">
                      {otherPost.date}
                    </span>
                    <h4 className="text-base font-bold text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors mt-2">
                      {otherPost.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light line-clamp-2 mt-2">
                      {otherPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
