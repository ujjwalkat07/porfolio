import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Sparkles } from "lucide-react"
import { Github } from "@/components/icons"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      title: "Exchange-X",
      featured: true,
      tags: ["TypeScript", "Node.js", "Next.js", "Redis", "Kafka", "MongoDB", "WebSockets"],
      description:
        "A full-stack cryptocurrency exchange with a real-time order matching engine pairing buy/sell orders by price-priority. Live price updates via WebSockets, high-throughput processing with Kafka, and Redis caching for concurrent data access.",
      demo: "https://web-exchange-x.onrender.com/",
      github: "https://github.com/ujjwalkat07/crypto-exchange-web",
      image: "/crypto.png",
    },
    {
      title: "CRM-X",
      featured: false,
      tags: ["TypeScript", "Next.js", "Express", "Node.js", "Turborepo", "Tailwind CSS", "Framer Motion"],
      description:
        "A next-generation Customer Relationship Management platform engineered as a high-performance monorepo. Combines a premium glassmorphic growth dashboard, sales pipeline automation, lead tracking, and client-server decoupling.",
      demo: "https://crm-x-crm-client.vercel.app/",
      github: "https://github.com/ujjwalkat07/crm-x",
      image: "/crmx.png",
    },
    {
      title: "QR Event Management System",
      featured: false,
      tags: ["TypeScript", "Node.js", "Next.js", "PostgreSQL", "REST API"],
      description:
        "QR code-based participant verification system for large-scale events. Includes a JWT-secured evaluation platform for mentors and judges. Onboarded 2000+ participants with an 80% reduction in manual check-in time.",
      demo: "https://lamp-mih.vercel.app",
      github: "https://github.com/ujjwalkat07/lamp",
      image: "/lamp.png",
    },
  ]

  return (
    <section id="projects" className="py-8 border-b border-border/40 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-semibold tracking-wider text-foreground uppercase select-none">
          Projects
        </h2>
        <div className="h-[1px] flex-1 bg-border/40" />
      </div>

      {/* Projects Column / Grid Layout */}
      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <Card
            key={i}
            className={`border transition-all duration-300 hover:border-foreground/20 shadow-xs flex flex-col overflow-hidden group ${project.featured
                ? "border-indigo-500/30 bg-indigo-500/[0.02] hover:bg-indigo-500/[0.04]"
                : "border-border/50 bg-muted/20 hover:bg-muted/30"
              }`}
          >
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-stretch">

              {/* Image Preview Block (Left) */}
              <div className="w-full h-48 md:h-auto md:w-[300px] lg:w-[380px] flex-shrink-0 relative rounded-xl overflow-hidden border border-border/30 bg-zinc-900/40">
                <Image
                  src={project.image}
                  alt={`Screenshot preview of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                  priority={project.featured}
                />
              </div>

              {/* Information Column (Right) */}
              <div className="flex-1 flex flex-col justify-between gap-4 py-1">
                <div className="flex flex-col gap-3">
                  {/* Tech tags on top */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, j) => (
                      <Badge
                        key={j}
                        variant="secondary"
                        className="px-2 py-0.5 border border-border/40 text-[10px] text-secondary-foreground font-medium tracking-wide uppercase bg-secondary/80 rounded-md select-none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title & Featured Badge */}
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-500/30 px-2.5 py-0.5 rounded-full select-none">
                        <Sparkles className="h-3 w-3" />
                        <span>Featured Engine</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-muted-foreground font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <a
                    id={`project-demo-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                    className="inline-flex items-center justify-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    id={`project-github-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View GitHub repository for ${project.title}`}
                    className="inline-flex items-center justify-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
