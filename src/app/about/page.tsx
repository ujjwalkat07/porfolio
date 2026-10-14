import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About | Ujjwal Katiyar — Software Developer",
  description: "Learn more about Ujjwal Katiyar's background, education in Computer Science (AI), and approach to building scalable systems.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <Navbar />

      <main className="flex-1 w-full max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col pt-12 sm:pt-16 pb-16 gap-10">

        {/* Back Link */}
        <Link
          id="about-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            About Me
          </h1>
          <p className="text-sm font-light text-muted-foreground leading-relaxed">
            Software Developer building resilient architectures, event pipelines, and dynamic user interfaces.
          </p>
        </div>

        {/* Bio Sections */}
        <div className="flex flex-col gap-6 text-[15px] text-muted-foreground font-light leading-relaxed">
          <p>
            Hello! I&apos;m <strong className="font-semibold text-foreground">Ujjwal Katiyar</strong>, a software developer based in India. I specialize in backend efficiency, distributed caching, real-time message streams, and modern responsive frontend client layers.
          </p>
          <p>
            My engineering philosophy centers around simplicity, modularity, and scalability. I enjoy diving into complex integration layers—designing Kafka topics to process streaming events, structuring transactional models with Prisma and MongoDB, and tailoring accessible Web UI interactions using Tailwind and Next.js.
          </p>
          <p>
            I am currently pursuing my B.Tech degree with a specialized focus on Artificial Intelligence, combining algorithmic analytics with practical, production-level software development methodologies.
          </p>
        </div>

      </main>

      <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 md:px-10">
        <Footer />
      </div>
    </div>
  )
}
