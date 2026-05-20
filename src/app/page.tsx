import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-10 flex flex-col gap-2">
        {/* Sections */}
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
