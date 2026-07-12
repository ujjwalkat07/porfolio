import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/share-buttons"
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
    keywords: [...(post.tags || []), ...(post.keywords || []), "Ujjwal Katiyar", "Full Stack Engineer", "Blog", "System Design"],
    authors: [{ name: "Ujjwal Katiyar" }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Ujjwal Katiyar`,
      description: post.description,
      type: "article",
      authors: ["Ujjwal Katiyar"],
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

  // Parse markdown content to HTML
  const contentHtml = await marked.parse(post.content)

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-10 flex flex-col pt-16 pb-10">
        {/* Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors self-start"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to blog posts</span>
        </Link>

        {/* Article Header */}
        <article className="flex flex-col gap-6 text-foreground">
          <div className="flex flex-col gap-4">
            {/* Meta details */}
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-light uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-[9px] font-normal text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 rounded-md px-2.5 py-0.5 tracking-wide uppercase select-none font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons title={post.title}/>

          {/* HTML rendered markdown body */}
          <div
            className="-mt-16 text-foreground/85 leading-relaxed font-normal text-sm sm:text-base max-w-none
              [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:tracking-tight
              [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-tight
              [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-6 [&>p]:leading-8 [&>p]:text-foreground/80 [&>p]:font-light [&>p]:tracking-wide
              [&>p>strong]:font-semibold [&>p>strong]:text-foreground
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-foreground/80 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2.5 [&>ul]:font-light [&>ul]:tracking-wide
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-foreground/80 [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-2.5 [&>ol]:font-light [&>ol]:tracking-wide
              [&>li]:leading-7
              [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-8
              [&>pre]:p-5 [&>pre]:bg-muted/20 [&>pre]:border [&>pre]:border-border/40 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:my-8 [&>pre]:shadow-xs
              [&>code]:text-xs [&>code]:font-mono [&>code]:bg-indigo-500/10 [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-indigo-500 dark:[&>code]:text-indigo-400 [&>code]:font-medium
              [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-foreground [&>pre>code]:font-normal [&>pre>code]:leading-normal
              [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:text-sm [&_table]:text-foreground/85
              [&_th]:border [&_th]:border-border/40 [&_th]:bg-muted/20 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
              [&_td]:border [&_td]:border-border/40 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-foreground/80 [&_td]:font-light
              [&_tr:nth-child(even)]:bg-muted/5
            "
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Share Buttons at the bottom */}
          <ShareButtons title={post.title} />
        </article>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
