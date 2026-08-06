import React from "react"

interface TechItem {
  name: string
  iconUrl: string
  invertInDark?: boolean
}

const technologies: TechItem[] = [
  // Languages
  {
    name: "TypeScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C/C++",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "HTML5",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  // Frontend
  {
    name: "React.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    iconUrl: "https://cdn.simpleicons.org/nextdotjs",
    invertInDark: true,
  },
  {
    name: "Tailwind CSS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Redux Toolkit",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  // Backend & APIs
  {
    name: "Node.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    iconUrl: "https://cdn.simpleicons.org/express",
    invertInDark: true,
  },
  {
    name: "Prisma ORM",
    iconUrl: "https://cdn.simpleicons.org/prisma",
    invertInDark: true,
  },
  {
    name: "Kafka",
    iconUrl: "https://cdn.simpleicons.org/apachekafka",
    invertInDark: true,
  },
  {
    name: "WebSockets",
    iconUrl: "https://cdn.simpleicons.org/socketdotio",
    invertInDark: true,
  },
  {
    name: "JWT & OAuth",
    iconUrl: "https://cdn.simpleicons.org/jsonwebtokens",
    invertInDark: true,
  },
  // Databases
  {
    name: "MongoDB",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Redis",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  // DevOps & Cloud
  {
    name: "Docker",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git / GitHub",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "AWS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Vercel",
    iconUrl: "https://cdn.simpleicons.org/vercel",
    invertInDark: true,
  },
  {
    name: "Railway",
    iconUrl: "https://cdn.simpleicons.org/railway",
    invertInDark: true,
  },
  // AI/ML
  {
    name: "OpenAI",
    iconUrl: "https://cdn.iconscout.com/icon/premium/png-512-thumb/openai-icon-svg-download-png-1290202.png?f=webp&w=512",
    invertInDark: true,
  },
  {
    name: "Anthropic Claude",
    iconUrl: "https://cdn.simpleicons.org/anthropic",
    invertInDark: true,
  },
  {
    name: "LangChain",
    iconUrl: "https://cdn.iconscout.com/icon/free/png-512/free-langchain-icon-svg-download-png-14549725.png?f=webp&w=512",
    invertInDark: true,
  },
]

export function TechStackSlider() {
  // Triple array for seamless infinite marquee loop
  const duplicatedTechs = [...technologies, ...technologies, ...technologies]

  return (
    <section className="flex flex-col gap-6 py-6 border-y border-border/40 transition-colors duration-100">
      {/* Section Header */}
      <div className="flex flex-col gap-1.5 px-2">
        <span className="text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase select-none">
          Stack I use
        </span>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Technologies I work with to build products that solve real problems
        </h2>
      </div>

      {/* Sliding Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient edge masks */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

        {/* Moving track */}
        <div className="flex w-max gap-10 sm:gap-14 animate-marquee hover:[animation-play-state:paused] transition-all">
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center gap-3 group cursor-pointer select-none"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/40 bg-card/60 p-3 group-hover:scale-110 group-hover:bg-muted/40 group-hover:border-border transition-all duration-300 shadow-sm">
                <img
                  src={tech.iconUrl}
                  alt={`${tech.name} logo`}
                  className={`h-8 w-8 object-contain transition-transform group-hover:scale-105 ${tech.invertInDark ? "dark:invert" : ""
                    }`}
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
