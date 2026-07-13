import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms & Disclaimer | Ujjwal Katiyar",
  description: "Read the Terms of Use and Disclaimer policies for Ujjwal Katiyar's portfolio, articles, and open-source code demonstrations.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/terms",
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-6 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        
        {/* Back Link */}
        <Link
          id="terms-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Terms &amp; Disclaimer
          </h1>
          <p className="text-xs font-light text-muted-foreground uppercase tracking-widest">
            Last Updated: July 11, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="flex flex-col gap-6 text-[14px] text-muted-foreground font-light leading-relaxed pt-6 border-t border-border/20">
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">1. Terms of Use</h2>
            <p>
              By accessing and browsing this portfolio, you agree to comply with and be bound by the terms outlined in this document. All content, designs, and text elements are the intellectual property of Ujjwal Katiyar unless specified otherwise.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">2. Code &amp; Demo Licensing</h2>
            <p>
              Many projects and code tutorials shared on the blog are open-source. Unless explicitly stated otherwise in the project repository, you may use, study, and adapt the code snippets for personal or educational purposes. Commercial reuse should credit the original author.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">3. General Disclaimer</h2>
            <p>
              All code guides, design demonstrations, and architectures detailed on this portfolio are provided on an &quot;AS IS&quot; basis, without warranty of any kind, express or implied. I make no representations or guarantees that the code runs without bugs or fits a specific industrial application.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">4. Limitation of Liability</h2>
            <p>
              Under no circumstances shall Ujjwal Katiyar be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the resources, software links, or opinions presented on this website.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">5. Modifications</h2>
            <p>
              I reserve the right to modify these terms or change portfolio content at any time without notice. We encourage users to check this page periodically for updates.
            </p>
          </section>
        </div>

      </div>
    </main>
  )
}
