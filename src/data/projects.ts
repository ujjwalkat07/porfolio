export interface ProjectItem {
  slug: string
  title: string
  description: string
  image: string
  demo: string
  github?: string
  tags: string[]
  stack: string[]
}

export const projects: ProjectItem[] = [
  {
    slug: "asi-telemetry",
    title: "ASI:Telemetry",
    description:
      "An observability and monitoring platform for AI agents and LLM applications, tracking token costs, latency, agent-to-agent communication, and real-time execution traces.",
    image: "/asi-tele.png",
    demo: "https://asi-telemetry.vercel.app/",
    github: "https://github.com/ujjwalkat07/asi-telemetry",
    tags: ["AI", "Observability"],
    stack: ["Python", "FastAPI", "ClickHouse", "Next.js", "Docker"],
  },
  {
    slug: "exchange-x",
    title: "Exchange-X",
    description:
      "A full-stack cryptocurrency exchange with a real-time order matching engine pairing buy/sell orders by price-priority.",
    image: "/crypto.png",
    demo: "https://web-exchange-x.onrender.com/",
    github: "https://github.com/ujjwalkat07/crypto-exchange-web",
    tags: ["Distributed", "Real-time"],
    stack: ["TypeScript", "Node.js", "Apache Kafka", "Redis", "PostgreSQL"],
  },
  {
    slug: "crm-x",
    title: "CRM-X",
    description:
      "A next-generation Customer Relationship Management platform engineered as a monorepo with glassmorphic dashboards.",
    image: "/crmx.webp",
    demo: "https://crm-x-crm-client.vercel.app/",
    github: "https://github.com/ujjwalkat07/crm-x",
    tags: ["Full-stack", "Frontend"],
    stack: ["TypeScript", "Next.js", "Turborepo", "Tailwind CSS", "PostgreSQL"],
  },
  {
    slug: "lamp",
    title: "Lamp",
    description:
      "A modern TypeScript-based web application providing QR code scanning and verification capabilities combined with an event management dashboard.",
    image: "/lamp.webp",
    demo: "https://lamp-mih.vercel.app",
    github: "https://github.com/ujjwalkat07/lamp",
    tags: ["Full-stack", "Real-time"],
    stack: ["TypeScript", "Next.js", "Supabase", "Tailwind CSS"],
  }
]
