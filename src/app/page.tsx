import { Navbar } from "@/components/navbar"
import { BentoProfile } from "@/components/bento-profile"
import { HomeBlog } from "@/components/home-blog"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-6">
        {/* Bento Grid Profile Section */}
        <BentoProfile />

        {/* Sections */}
        <HomeBlog />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
