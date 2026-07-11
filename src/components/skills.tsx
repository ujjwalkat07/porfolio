import { Code, Layers, Database, Server, GitBranch, Key } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: ["TypeScript", "JavaScript", "Python", "C/C++"],
    },
    {
      title: "Frameworks",
      icon: Layers,
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Redux Toolkit"],
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["MongoDB", "PostgreSQL", "Mongoose ODM", "Prisma ORM"],
    },
    {
      title: "Infrastructure",
      icon: Server,
      skills: ["Redis", "Kafka", "Docker", "Git/GitHub", "CI/CD", "Postman"],
    },
    {
      title: "Concepts",
      icon: GitBranch,
      skills: ["Distributed Systems", "Microservices", "System Design", "Real-Time Architecture", "Event-Driven"],
    },
    {
      title: "APIs & Auth",
      icon: Key,
      skills: ["REST APIs", "WebSockets", "JWT", "OAuth"],
    },
  ]

  return (
    <section id="skills" className="py-8 border-b border-border/40 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-semibold tracking-wider text-foreground uppercase select-none">
          Technical Skills
        </h2>
        <div className="h-[1px] flex-1 bg-border/40" />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, i) => {
          const Icon = category.icon
          return (
            <div
              key={i}
              className="group p-5 border border-border/30 bg-muted/5 hover:bg-muted/15 transition-all duration-300 hover:border-foreground/15 rounded-xl flex flex-col gap-4 shadow-sm"
            >
              {/* Category Title & Icon */}
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-indigo-500/5 text-indigo-500 group-hover:bg-indigo-500/10 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-foreground tracking-wider uppercase select-none">
                  {category.title}
                </span>
              </div>

              {/* Tags wrapper */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="text-xs font-normal text-muted-foreground bg-card/60 hover:text-indigo-500 dark:hover:text-indigo-400 border border-border/50 rounded-md px-2.5 py-1 transition-all duration-200 cursor-default select-none shadow-xs hover:bg-indigo-500/5 hover:border-indigo-500/20 hover:scale-[1.03]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
