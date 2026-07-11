import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-8 border-b border-border/40 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-semibold tracking-wider text-foreground uppercase select-none">
          About
        </h2>
        <div className="h-[1px] flex-1 bg-border/40" />
      </div>

      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Bio & Education */}
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Ujjwal Katiyar
        </h3>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground font-light leading-relaxed">
          <p>
            Full Stack Engineer with hands-on expertise in real-time architectures, distributed systems, and event-driven design. I build end-to-end products — from Kafka-powered pipelines to pixel-precise interfaces — designed for production from day one.
          </p>
          <p>
            Passionate about crafting scalable, high-performance systems and working at the intersection of backend reliability and thoughtful frontend engineering.
          </p>
        </div>

        {/* Education Box */}
        <div className="flex gap-3.5 items-start p-4 border border-border/50 bg-muted/20 rounded-xl transition-all duration-300 hover:border-foreground/20 self-start">
          <GraduationCap className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed font-light">
            <strong className="font-semibold text-foreground">
              IIMT College of Engineering
            </strong>{" "}
            · Greater Noida
            <br />
            B.Tech in Computer Science &amp; Engineering (AI Specialization) · Oct 2023 – Feb 2027
          </div>
        </div>
      </div>
    </section>
  )
}
