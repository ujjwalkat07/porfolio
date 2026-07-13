import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { marked } from "marked"
import { privacyPolicyContent } from "@/content/privacy-policy"

export const metadata: Metadata = {
  title: "Privacy Policy | Ujjwal Katiyar",
  description: "Read the privacy practices and policies for Ujjwal Katiyar's developer portfolio, including cookie details and contact forms.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/privacy",
  },
}

export default async function PrivacyPolicyPage() {
  const contentHtml = await marked.parse(privacyPolicyContent)

  return (
    <main className="min-h-screen bg-background py-16 px-6 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        
        {/* Back Link */}
        <Link
          id="privacy-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-xs font-light text-muted-foreground uppercase tracking-widest">
            Last Updated: July 12, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div
          className="text-foreground leading-relaxed font-normal text-sm sm:text-base max-w-none pt-6 border-t border-border/20
            [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:tracking-tight
            [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-tight
            [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-3
            [&>p]:mb-5 [&>p]:leading-relaxed [&>p]:text-foreground [&>p]:font-light [&>p]:tracking-wide
            [&>p>strong]:font-semibold [&>p>strong]:text-foreground
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-foreground [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2.5 [&>ul]:font-light [&>ul]:tracking-wide
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-foreground [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-2.5 [&>ol]:font-light [&>ol]:tracking-wide
            [&>li]:leading-relaxed
            [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-8
            [&>pre]:p-5 [&>pre]:bg-muted/20 [&>pre]:border [&>pre]:border-border/40 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:my-8 [&>pre]:shadow-xs
            [&>code]:text-xs [&>code]:font-mono [&>code]:bg-indigo-500/10 [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-indigo-500 dark:[&>code]:text-indigo-400 [&>code]:font-medium
            [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-foreground [&>pre>code]:font-normal [&>pre>code]:leading-normal
            [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:text-sm [&_table]:text-foreground
            [&_th]:border [&_th]:border-border/40 [&_th]:bg-muted/20 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
            [&_td]:border [&_td]:border-border/40 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-foreground [&_td]:font-light
            [&_tr:nth-child(even)]:bg-muted/5
            [&_a]:text-indigo-500 [&_a]:hover:text-indigo-600 [&_a]:underline [&_a]:transition-colors
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

      </div>
    </main>
  )
}
