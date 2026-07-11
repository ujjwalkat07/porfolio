import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/share-buttons"
import posts from "@/content/blog-posts.json"
import { marked } from "marked"

interface PageProps {
  params: Promise<{ slug: string }>
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
        <article className="flex flex-col gap-6">
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
          <ShareButtons title={post.title} />

          {/* HTML rendered markdown body */}
          <div
            className="text-foreground leading-relaxed font-light
              [&>h1]:text-2xl [&>h1]:font-semibold [&>h1]:text-foreground [&>h1]:mt-8 [&>h1]:mb-4
              [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4
              [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3
              [&>p]:text-sm [&>p]:text-muted-foreground [&>p]:mb-4 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:text-sm [&>ul]:text-muted-foreground [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol]:text-sm [&>ol]:text-muted-foreground [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-2
              [&>li]:leading-relaxed
              [&>pre]:p-4 [&>pre]:bg-muted/30 [&>pre]:border [&>pre]:border-border/50 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6
              [&>code]:text-xs [&>code]:font-mono [&>code]:bg-muted/50 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-indigo-500
              [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-foreground
            "
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
