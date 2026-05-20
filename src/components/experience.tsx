import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"

export function Experience() {
  const bullets = [
    "Built a full-stack QR code scanning solution for event onboarding, processing 2000+ participants and cutting manual check-in time by approximately 80%.",
    "Developed and deployed a web portal for judges to upload project marks and publish results in real time, enabling full transparency in evaluation.",
    "Designed and delivered responsive landing pages for MIH 3.0 and MIH 4.0 hackathons, ensuring a seamless experience across all devices.",
  ]

  return (
    <section id="experience" className="py-14 border-b border-border/40 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-semibold tracking-wider text-foreground uppercase select-none">
          Experience
        </h2>
        <div className="h-[1px] flex-1 bg-border/40" />
      </div>

      {/* Experience Card */}
      <Card className="border border-border/50 bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:border-foreground/20 shadow-none overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col gap-3 justify-between items-start md:flex-row md:items-center">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                Full Stack Developer
              </h3>
              <span className="text-xs text-muted-foreground font-normal">
                Startup4Nation (Community)
              </span>
            </div>
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted border border-border/50 text-[10px] text-muted-foreground font-light tracking-wide uppercase rounded-full select-none"
            >
              <CalendarDays className="h-3 w-3 text-muted-foreground/80" />
              <span>Oct 2024 – Feb 2026</span>
            </Badge>
          </div>

          <div className="h-[1px] bg-border/40" />

          {/* Bullets */}
          <ul className="flex flex-col gap-3.5">
            {bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-3 text-xs text-muted-foreground font-light leading-relaxed align-top"
              >
                <span className="text-indigo-500 font-bold select-none mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
