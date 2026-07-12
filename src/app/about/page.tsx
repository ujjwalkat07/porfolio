import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, GraduationCap, Code2, Server, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Ujjwal Katiyar — Full Stack Engineer",
  description: "Learn more about Ujjwal Katiyar's background, education in Computer Science (AI), and approach to building scalable systems.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  const timeline = [
    {
      date: "Oct 2023 – Feb 2027",
      title: "B.Tech in Computer Science & Engineering (AI Specialization)",
      institution: "IIMT College of Engineering, Greater Noida",
      description: "Focusing on artificial intelligence, algorithmic foundations, distributed databases, and software design principles.",
      icon: GraduationCap,
    },
    {
      date: "2024 – Present",
      title: "Real-time Architectures & Messaging Systems",
      institution: "Self-Driven Research & Production builds",
      description: "Experimenting with event-driven message brokers like Apache Kafka, memory stores like Redis, and dynamic WebSocket pipelines to reduce interaction latency.",
      icon: Server,
    },
    {
      date: "2023 – Present",
      title: "Full Stack Web Engineering",
      institution: "Open Source Contributions & Portfolios",
      description: "Building production-grade applications using Next.js, Node.js, Express, MongoDB, and Tailwind CSS. Implementing modern UI systems and dynamic SEO architectures.",
      icon: Code2,
    },
  ]

  return (
    <main className="min-h-screen bg-background py-16 px-6 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        
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
            Full Stack Engineer building resilient architectures, event pipelines, and dynamic user interfaces.
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

        {/* Timeline */}
        <div className="flex flex-col gap-8 pt-4 border-t border-border/20">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Journey &amp; Education
          </h2>
          <div className="flex flex-col gap-8 relative pl-6 border-l border-border/40">
            {timeline.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="relative group">
                  {/* Icon Badge Indicator */}
                  <span className="absolute -left-[37px] top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-card border border-border/60 text-indigo-500 group-hover:bg-indigo-500/10 transition-colors shadow-xs">
                    <Icon className="h-3 w-3" />
                  </span>
                  
                  {/* Timeline content card */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold tracking-wider text-indigo-500 uppercase">
                      {item.date}
                    </span>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-muted-foreground/80 font-normal">
                      {item.institution}
                    </span>
                    <p className="text-[13px] text-muted-foreground/95 font-light leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </main>
  )
}
