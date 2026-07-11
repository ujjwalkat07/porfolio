import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Ujjwal Katiyar",
  description: "Read the privacy practices and policies for Ujjwal Katiyar's developer portfolio, including cookie details and contact forms.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPolicyPage() {
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
            Last Updated: July 11, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="flex flex-col gap-6 text-[14px] text-muted-foreground font-light leading-relaxed pt-6 border-t border-border/20">
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">1. Introduction</h2>
            <p>
              This website serves as a professional developer portfolio. I am committed to protecting your personal data and respecting your privacy. This document outlines how I collect, process, and protect any information gathered during your visit.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">2. Information Collection</h2>
            <p>
              I may collect personal information that you voluntarily provide when submitting a message via the Contact Form. This includes your name, email address, and message contents. I only use this data to respond to your queries.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">3. Cookies and Analytics</h2>
            <p>
              This website may use cookies to analyze web traffic, remember preferences, and serve relevant content. Third-party tools like Google Analytics or Google AdSense may place cookies on your device to gather metrics or serve advertisements based on past visits. You can disable cookies at any time through your browser settings.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">4. Third-Party Disclosures</h2>
            <p>
              I do not sell, trade, or transfer your personal data to outside parties. This does not include trusted third parties who assist in operating my website or conducting my business, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">5. Security Standards</h2>
            <p>
              I implement reasonable administrative and technological security measures (including HTTPS encryption and Strict Transport Security policies) to protect your personal details against unauthorized access, loss, or disclosure.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-foreground">6. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy or my handling of data, please feel free to reach out via the Contact Form or at <strong className="font-semibold text-foreground">ukcode07@gmail.com</strong>.
            </p>
          </section>
        </div>

      </div>
    </main>
  )
}
