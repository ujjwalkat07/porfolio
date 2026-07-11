import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import { Github } from "@/components/icons"

export function Projects() {
  const projects = [
    {
      title: "CRM-X",
      tags: ["TypeScript", "Next.js", "Express", "Node.js", "Turborepo", "Tailwind CSS", "Framer Motion"],
      description:
        "A next-generation Customer Relationship Management platform engineered as a high-performance monorepo. Combines a premium glassmorphic growth dashboard, sales pipeline automation, lead tracking, and client-server decoupling.",
      demo: "https://crm-x-crm-client.vercel.app/",
      github: "https://github.com/ujjwalkat07/crm-x",
    },
    {
      title: "Exchange-X",
      tags: ["TypeScript", "Node.js", "Next.js", "Redis", "Kafka", "MongoDB", "WebSockets"],
      description:
        "A full-stack cryptocurrency exchange with a real-time order matching engine pairing buy/sell orders by price-priority. Live price updates via WebSockets, high-throughput processing with Kafka, and Redis caching for concurrent data access.",
      demo: "https://web-exchange-x.onrender.com/",
      github: "https://github.com/ujjwalkat07/crypto-exchange-web",
    },
    {
      title: "QR Event Management System",
      tags: ["TypeScript", "Node.js", "Next.js", "PostgreSQL", "REST API"],
      description:
        "QR code-based participant verification system for large-scale events. Includes a JWT-secured evaluation platform for mentors and judges. Onboarded 2000+ participants with an 80% reduction in manual check-in time.",
      demo: "https://lamp-mih.vercel.app",
      github: "https://github.com/ujjwalkat07/lamp",
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <Card
            key={i}
            className="border border-border/50 bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 shadow-none flex flex-col justify-between overflow-hidden group"
          >
            <CardContent className="p-6 flex flex-col gap-4 h-full justify-between">
              <div className="flex flex-col gap-4">
                {/* Title */}
                <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, j) => (
                    <Badge
                      key={j}
                      variant="secondary"
                      className="px-2 py-0.5 border border-border/40 text-[9px] text-muted-foreground/90 font-light tracking-wide uppercase bg-muted/65 rounded-md select-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-4 border-t border-border/40 mt-4">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 text-[11px] font-normal text-muted-foreground px-3 py-2 border border-border/50 rounded-lg bg-card hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 text-[11px] font-normal text-muted-foreground px-3 py-2 border border-border/50 rounded-lg bg-card hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
