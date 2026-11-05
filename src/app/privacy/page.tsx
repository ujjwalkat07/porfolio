import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PrivacyPolicyContent from "@/content/privacy-policy.mdx"

export const metadata: Metadata = {
  title: "Privacy Policy | Ujjwal Katiyar",
  description: "Read the privacy practices and policies for Ujjwal Katiyar's developer portfolio, including cookie details and contact forms.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/privacy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 px-4 sm:px-6 md:px-10 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        
        {/* Back Link */}
        <Link
          id="privacy-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2.5 border border-border/50 hover:border-blue-500/30 rounded-lg bg-card/50 hover:bg-muted hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-blue-500" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-xs font-light text-muted-foreground uppercase tracking-widest">
            Last Updated: October 15, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="text-foreground leading-relaxed font-normal text-sm sm:text-base max-w-none pt-6 border-t border-border/20 break-words [overflow-wrap:anywhere]">
          <PrivacyPolicyContent />
        </div>
      </div>
    </main>
  )
}
