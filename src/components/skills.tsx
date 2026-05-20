export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "C/C++"],
    },
    {
      title: "Frameworks",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Redux Toolkit"],
    },
    {
      title: "Databases",
      skills: ["MongoDB", "PostgreSQL", "Mongoose ODM", "Prisma ORM"],
    },
    {
      title: "Infrastructure",
      skills: ["Redis", "Kafka", "Docker", "Git/GitHub", "CI/CD", "Postman"],
    },
    {
      title: "Concepts",
      skills: ["Distributed Systems", "Microservices", "System Design", "Real-Time Architecture", "Event-Driven"],
    },
    {
      title: "APIs & Auth",
      skills: ["REST APIs", "WebSockets", "JWT", "OAuth"],
    },
  ]

  return (
    <section id="skills" className="py-14 border-b border-border/40 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-semibold tracking-wider text-foreground uppercase select-none">
          Technical Skills
        </h2>
        <div className="h-[1px] flex-1 bg-border/40" />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skillCategories.map((category, i) => (
          <div
            key={i}
            className="p-5 border border-border/50 bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:border-foreground/20 rounded-xl flex flex-col gap-3"
          >
            {/* Category title */}
            <span className="text-[10px] font-medium text-muted-foreground/80 tracking-wider uppercase select-none">
              {category.title}
            </span>

            {/* Tags wrapper */}
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill, j) => (
                <span
                  key={j}
                  className="text-xs font-normal text-muted-foreground bg-card/60 hover:text-foreground hover:bg-muted border border-border/50 rounded-md px-2.5 py-1 transition-all duration-200 cursor-default select-none shadow-xs hover:border-foreground/20 hover:scale-[1.03]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
