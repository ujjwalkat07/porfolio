import { Navbar } from "@/components/navbar"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Ujjwal Katiyar",
  description: "Insights on event-driven systems, microservice monorepos, and high-frequency real-time web applications.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/blog",
  },
}

export default function BlogListingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col pt-16 gap-6">
        <Blog />
        <Footer />
      </main>
    </div>
  )
}
