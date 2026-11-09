import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImpressionCounter } from "@/components/impression-counter"
import { TableOfContents, type TocItem } from "@/components/blog/table-of-contents"
import { UnderstandWithAi } from "@/components/blog/understand-with-ai"
import { SupabaseShareBar } from "@/components/blog/supabase-share-bar"
import { JsonLd } from "@/lib/json-ld"
import { formatDate } from "@/lib/format-date"
import posts from "@/content/blog-posts.json"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

interface BlogPostItem {
  slug: string
  title: string
  category?: string
  description?: string
  date: string
  lastModified?: string
  readTime: string
  tags?: string[]
  link?: string
  draft?: boolean
  toc?: TocItem[]
}

const blogPosts = posts as BlogPostItem[]

function toIso(value?: string): string | undefined {
  if (!value) return undefined
  const d = new Date(value)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  if (post.draft) {
    return {
      title: `${post.title} — Ujjwal Katiyar`,
      description: post.description,
      alternates: {
        canonical: `https://ujjwalkatiyar.in/blog/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const isoPublishDate = toIso(post.date)
  const isoModifiedDate = toIso(post.lastModified) ?? isoPublishDate
  const ogImageUrl = `https://ujjwalkatiyar.in/blog/${slug}/opengraph-image`

  return {
    title: `${post.title} — Ujjwal Katiyar`,
    description: post.description,
    authors: [{ name: "Ujjwal Katiyar", url: "https://ujjwalkatiyar.in/about" }],
    alternates: {
      canonical: `https://ujjwalkatiyar.in/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Ujjwal Katiyar`,
      description: post.description,
      type: "article",
      url: `https://ujjwalkatiyar.in/blog/${slug}`,
      publishedTime: isoPublishDate,
      modifiedTime: isoModifiedDate,
      authors: ["Ujjwal Katiyar"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Ujjwal Katiyar`,
      description: post.description,
      creator: "@ujjwalkatiyar07",
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  let PostContent: React.ComponentType | null = null
  try {
    PostContent = (await import(`@content/blog/${slug}.mdx`)).default
  } catch {
    try {
      PostContent = (await import(`@content/blog/${slug}.md`)).default
    } catch {
      notFound()
    }
  }

  if (!PostContent) {
    notFound()
  }

  const publishedPosts = blogPosts.filter((p) => !p.draft && p.slug !== slug)
  const sameCategoryPosts = publishedPosts.filter(
    (p) => p.category && post.category && p.category.toLowerCase() === post.category.toLowerCase()
  )
  const differentCategoryPosts = publishedPosts.filter(
    (p) => !p.category || !post.category || p.category.toLowerCase() !== post.category.toLowerCase()
  )
  const readNextPosts = [...sameCategoryPosts, ...differentCategoryPosts].slice(0, 3)
  const tocItems: TocItem[] = post.toc || []

  const isoPublishDate = toIso(post.date) ?? new Date().toISOString()
  const isoModifiedDate = toIso(post.lastModified) ?? isoPublishDate

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ujjwalkatiyar.in/blog/${slug}`,
    },
    headline: post.title,
    description: post.description,
    image: [`https://ujjwalkatiyar.in/blog/${slug}/opengraph-image`],
    datePublished: isoPublishDate,
    dateModified: isoModifiedDate,
    author: {
      "@type": "Person",
      "@id": "https://ujjwalkatiyar.in/#person",
      name: "Ujjwal Katiyar",
      url: "https://ujjwalkatiyar.in/about",
      sameAs: [
        "https://github.com/ujjwalkat07",
        "https://www.linkedin.com/in/ujjwalkatiyar07",
        "https://x.com/ujjwalkatiyar07",
      ],
    },
    publisher: {
      "@type": "Person",
      "@id": "https://ujjwalkatiyar.in/#person",
      name: "Ujjwal Katiyar",
      url: "https://ujjwalkatiyar.in/about",
      image: {
        "@type": "ImageObject",
        url: "https://ujjwalkatiyar.in/profile_pic.webp",
      },
    },
    articleSection: post.category || "Engineering",
    inLanguage: "en-US",
  }

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ujjwalkatiyar.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://ujjwalkatiyar.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://ujjwalkatiyar.in/blog/${slug}`,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body transition-colors duration-300 antialiased selection:bg-[#3ECF8E]/20 selection:text-[#10b981] dark:selection:text-[#3ECF8E]">
      {/* JSON-LD Schemas (excluded for draft posts) */}
      {!post.draft && (
        <>
          <JsonLd data={jsonLdArticle} />
          <JsonLd data={jsonLdBreadcrumbs} />
        </>
      )}

      {/* Global Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:pl-36 pt-8 sm:pt-12 pb-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 mb-6 text-xs text-muted-foreground/80 font-body"
        >
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="capitalize text-foreground font-medium">
            {post.category || "Engineering"}
          </span>
        </nav>

        {/* 12-Column Grid: row 1 = header, row 2 = body (8) + sticky TOC (4) */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          {/* Header: row 1, only spans the article column */}
          <header className="col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-1 flex flex-col gap-5 min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] leading-tight font-semibold text-foreground text-pretty break-words">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                <span>{formatDate(post.date)}</span>
                <span className="text-muted-foreground/40 select-none">•</span>
                <span>{post.readTime}</span>
                <span className="text-muted-foreground/40 select-none">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <ImpressionCounter slug={slug} />
                </span>
              </div>

              <Link href="/about" className="flex items-center gap-3 group self-start">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/80 shrink-0 group-hover:border-foreground/40 transition-colors">
                  <Image
                    src="/profile_pic.webp"
                    alt="Ujjwal Katiyar"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-semibold text-foreground group-hover:text-[#3ECF8E] transition-colors">
                    Ujjwal Katiyar
                  </span>
                  <span className="text-xs text-muted-foreground font-body">
                    Software Developer
                  </span>
                </div>
              </Link>
          </header>

          {/* Row 2: article body; the TOC sidebar starts on this same row */}
          <article className="col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-2 flex flex-col min-w-0">
            {/* MDX Article Body */}
            <div className="text-neutral-800 dark:text-neutral-300 font-body text-[15px] sm:text-[16px] leading-[1.8] break-words [overflow-wrap:anywhere]">
              <PostContent />
            </div>

            {/* "Understand with AI" – mobile/tablet only (sidebar hosts it on desktop) */}
            <div className="lg:hidden mt-8">
              <UnderstandWithAi title={post.title} slug={slug} className="border-t-0 pt-0" />
            </div>

            {/* Share Banner */}
            <div className="mt-8">
              <SupabaseShareBar title={post.title} slug={slug} />
            </div>

            {/* Read Next */}
            {readNextPosts.length > 0 && (
              <section className="">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground">Read Next</h3>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-xs text-[#3ECF8E] hover:underline font-medium"
                  >
                    <span>View all posts</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {readNextPosts.map((otherPost) => (
                    <Link
                      key={otherPost.slug}
                      href={`/blog/${otherPost.slug}`}
                      className="group flex flex-col justify-between p-5 rounded-xl border border-border/60 bg-card/30 hover:bg-card/70 hover:border-[#3ECF8E]/40 transition-all duration-200"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                          <span>{formatDate(otherPost.date)}</span>
                          <span>•</span>
                          <span>{otherPost.readTime}</span>
                        </div>
                        <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-[#3ECF8E] transition-colors line-clamp-2 mb-2">
                          {otherPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground font-normal line-clamp-2 leading-relaxed">
                          {otherPost.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-[#3ECF8E] mt-4 pt-3 border-t border-border/40">
                        <span>Read article</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right Column: sticky TOC, starts level with the top of the article body (the hero image) */}
          <aside className="hidden lg:block lg:col-span-4 lg:col-start-9 lg:row-start-2">
            <div className="sticky top-24 pl-4 border-l border-border/50 space-y-6">
              <TableOfContents items={tocItems} />
              <UnderstandWithAi title={post.title} slug={slug} />
            </div>
          </aside>
        </div>
      </main>

      {/* Global Footer */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:pl-36">
        <Footer />
      </div>
    </div>
  )
}