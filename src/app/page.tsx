import { Navbar } from "@/components/navbar"
import { BentoProfile } from "@/components/bento-profile"
import { Projects } from "@/components/projects"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-10 flex flex-col gap-6">
        {/* Bento Grid Profile Section */}
        <BentoProfile />

        {/* Sections */}
        <Projects />
        <Blog />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
