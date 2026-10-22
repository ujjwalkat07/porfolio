import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImpressionCounter } from "@/components/impression-counter"
import { TableOfContents, type TocItem } from "@/components/blog/table-of-contents"
import { BlogInteractions } from "@/components/blog/blog-interactions"
import { SupabaseShareBar } from "@/components/blog/supabase-share-bar"
import posts from "@/content/blog-posts.json"
import { marked } from "marked"
import type { Metadata } from "next"
import { renderShadcnCodeBlock } from "@/lib/syntax-highlight"

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
    keywords: [
      ...(post.tags || []),
      ...(post.keywords || []),
      "Ujjwal Katiyar",
      "Software Developer",
      "Blog",
      "System Design",
    ],
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

function extractToc(markdown: string): TocItem[] {
  const headings: TocItem[] = []
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const rawText = match[2].trim()
    const text = rawText
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    headings.push({ id, text, level })
  }
  return headings
}

async function renderSupabaseMarkdown(content: string) {
  const renderer = new marked.Renderer()

  renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
    const rawTitle = text.replace(/<[^>]*>?/gm, "").trim()
    const id = rawTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    if (depth === 2) {
      return `
        <h2 id="${id}" class="group scroll-mt-24 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-12 mb-4 flex items-center">
          <span>${text}</span>
          <a href="#${id}" class="ml-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#3ECF8E] select-none text-base font-normal" aria-label="Link to section">#</a>
        </h2>
      `
    }
    if (depth === 3) {
      return `
        <h3 id="${id}" class="group scroll-mt-24 font-display text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-8 mb-3 flex items-center">
          <span>${text}</span>
          <a href="#${id}" class="ml-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#3ECF8E] select-none text-sm font-normal" aria-label="Link to section">#</a>
        </h3>
      `
    }
    return `<h${depth} id="${id}" class="font-display font-semibold tracking-tight text-foreground mt-6 mb-3">${text}</h${depth}>`
  }

  renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
    return renderShadcnCodeBlock(text, lang)
  }

  renderer.codespan = function ({ text }: { text: string }) {
    return `<code class="font-code text-[12px] sm:text-[12.5px] px-1.5 py-0.5 rounded bg-muted/70 dark:bg-[#1f1f1f] border border-border/70 text-foreground font-normal">${text}</code>`
  }

  return await marked.parse(content, { renderer })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 2)
  const tocItems = extractToc(post.content)
  const contentHtml = await renderSupabaseMarkdown(post.content)

  // Safe ISO Date parsing for schema markup
  let isoPublishDate = new Date().toISOString()
  try {
    const d = new Date(post.date)
    if (!isNaN(d.getTime())) {
      isoPublishDate = d.toISOString()
    }
  } catch (e) {
    // ignore
  }

  let isoModifiedDate = isoPublishDate
  if (post.lastModified) {
    try {
      const d = new Date(post.lastModified)
      if (!isNaN(d.getTime())) {
        isoModifiedDate = d.toISOString()
      }
    } catch (e) {
      // ignore
    }
  }

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ujjwalkatiyar.in/blog/${slug}`,
    },
    headline: post.title,
    description: post.description,
    image: ["https://ujjwalkatiyar.in/profile_pic.webp"],
    datePublished: isoPublishDate,
    dateModified: isoModifiedDate,
    author: {
      "@type": "Person",
      name: "Ujjwal Katiyar",
      url: "https://ujjwalkatiyar.in",
      sameAs: [
        "https://github.com/ujjwalkat07",
        "https://www.linkedin.com/in/ujjwalkatiyar07",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Ujjwal Katiyar",
      url: "https://ujjwalkatiyar.in",
      image: {
        "@type": "ImageObject",
        url: "https://ujjwalkatiyar.in/profile_pic.webp",
      },
    },
    keywords: (post.tags || []).join(", "),
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
      {/* Blog Interaction Handlers (Copy button, etc.) */}
      <BlogInteractions />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Container - 12-Column Responsive Layout */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:pl-36 pt-8 sm:pt-12 pb-5">
        {/* Supabase Breadcrumbs & Back Link */}
        <div className="flex items-center gap-5 mb-5 sm:mb-5 text-xs text-muted-foreground font-body">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="capitalize text-foreground font-medium">
              {post.category || "Engineering"}
            </span>
          </div>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Main Article Column (col-span-12 lg:col-span-8) */}
          <article className="col-span-12 lg:col-span-8 flex flex-col min-w-0">
            {/* Header Section */}
            <header className="flex flex-col gap-5 pb-3 border-border/60">
              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-semibold text-foreground text-pretty break-words">
                {post.title}
              </h1>

              {/* Publication Meta details */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center">
                  <span>{post.date}</span>
                </span>
                <span className="text-muted-foreground/40 select-none">•</span>
                <span className="inline-flex items-center">
                  <span>{post.readTime}</span>
                </span>
                <span className="text-muted-foreground/40 select-none">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <ImpressionCounter slug={slug} />
                </span>
              </div>

              {/* Supabase Author Snippet */}
              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/80 shrink-0">
                  <Image
                    src="/profile_pic.webp"
                    alt="Ujjwal Katiyar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-semibold text-foreground">
                    Ujjwal Katiyar
                  </span>
                  <span className="text-xs text-muted-foreground font-body">
                    Software Developer
                  </span>
                </div>
              </div>
            </header>

            {/* Markdown Article Body */}
            <div
              className="mt-5 text-neutral-800 dark:text-neutral-300 font-body text-[15px] sm:text-[16px] leading-[1.8] break-words [overflow-wrap:anywhere]
                [&>p]:mb-6 [&>p]:leading-[1.8]
                [&>p>strong]:font-semibold [&>p>strong]:text-foreground
                [&>p>a]:text-foreground [&>p>a]:underline [&>p>a]:decoration-[#3ECF8E]/60 [&>p>a]:underline-offset-4 hover:[&>p>a]:text-[#3ECF8E] hover:[&>p>a]:decoration-[#3ECF8E] [&>p>a]:transition-colors
                [&>ul]:list-disc [&>ul]:pl-5 sm:[&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
                [&>ol]:list-decimal [&>ol]:pl-5 sm:[&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
                [&>li]:leading-[1.75]
                [&>blockquote]:border-l-2 [&>blockquote]:border-[#3ECF8E] [&>blockquote]:pl-4.5 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-7
                [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:border [&_img]:border-border/60 [&_img]:my-8
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:text-xs sm:[&_table]:text-sm [&_table]:border [&_table]:border-border/60 [&_table]:rounded-xl [&_table]:overflow-hidden
                [&_th]:bg-muted/50 [&_th]:font-display [&_th]:font-semibold [&_th]:text-foreground [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:border-b [&_th]:border-border/60 [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-wider
                [&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-border/40 [&_td]:text-neutral-700 dark:[&_td]:text-neutral-300
                [&_tr:nth-child(even)]:bg-muted/15
              "
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Horizontal Share Banner */}
            <SupabaseShareBar title={post.title} />

            {/* Read Next Section */}
            {otherPosts.length > 0 && (
              <section className="">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Read Next
                  </h3>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-xs text-[#3ECF8E] hover:underline font-medium"
                  >
                    <span>View all posts</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {otherPosts.map((otherPost) => (
                    <Link
                      key={otherPost.slug}
                      href={`/blog/${otherPost.slug}`}
                      className="group flex flex-col justify-between p-5 rounded-xl border border-border/60 bg-card/30 hover:bg-card/70 hover:border-[#3ECF8E]/40 transition-all duration-200"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-code text-muted-foreground uppercase tracking-wider mb-2">
                          <span>{otherPost.date}</span>
                          <span>•</span>
                          <span>{otherPost.readTime}</span>
                        </div>
                        <h4 className="font-display text-base font-bold text-foreground group-hover:text-[#3ECF8E] transition-colors line-clamp-2">
                          {otherPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground font-body line-clamp-2 mt-2 leading-relaxed">
                          {otherPost.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground group-hover:text-[#3ECF8E] transition-colors font-medium">
                        <span>Read article</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right Column / Sticky Sidebar (hidden lg:block col-span-4 col-start-9) */}
          <aside className="hidden lg:block col-span-4 col-start-9 space-y-8 pl-4 xl:pl-8 pt-58">
            {/* Category / Tags badges */}
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-code font-medium tracking-[0.06em] uppercase px-2 py-0.5 rounded-full border border-border/80 bg-muted/40 text-muted-foreground hover:border-[#3ECF8E]/60 hover:text-[#3ECF8E] transition-colors select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            <div className="sticky top-24 flex flex-col gap-8 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
              {/* Table of contents */}
              {tocItems.length > 0 && <TableOfContents items={tocItems} />}

              {/* Share & AI Links */}
              <div className="pt-2">
                <SupabaseShareBar title={post.title} compact={true} />
              </div>
            </div>
          </aside>
        </div>

        {/* Global Footer */}
        
      </main>
      <div className=" border-border/60 max-w-[900px] mx-auto w-full  ">
          <Footer />
        </div>
    </div>
  )
}
