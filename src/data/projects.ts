export interface ProjectItem {
  slug: string
  title: string
  description: string
  image: string
  demo: string
  github?: string
  pypi?: string
  blogSlug?: string
  tags: string[]
  extraCount?: number
  highlights?: string[]
}

export const projects: ProjectItem[] = [
  {
    slug: "asi-telemetry",
    title: "ASI:Telemetry",
    description:
      "An observability and monitoring platform for AI agents and LLM applications, tracking token costs, latency, agent-to-agent communication, and real-time execution traces.",
    image: "/asi.webp",
    demo: "https://asi-telemetry.vercel.app/",
    github: "https://github.com/ujjwalkat07/asi-telemetry",
    pypi: "https://pypi.org/project/asi-telemetry/",
    blogSlug: "the-engineering-behind-asi-telemetry",
    tags: ["Python", "FastAPI", "ClickHouse", "Next.js", "AI Agents"],
    extraCount: 2,
    highlights: [
      "Lightweight Python SDK for automatic monkey-patch instrumentation of Gemini and OpenAI clients",
      "Asynchronous ingestion backend powered by FastAPI and columnar ClickHouse database",
      "Live analytics dashboard for token expenditure, latency tracking, and multi-agent interaction topologies",
    ],
  },
  {
    slug: "exchange-x",
    title: "Exchange-X",
    description:
      "A full-stack cryptocurrency exchange with a real-time order matching engine pairing buy/sell orders by price-priority.",
    image: "/crypto.webp",
    demo: "https://web-exchange-x.onrender.com/",
    github: "https://github.com/ujjwalkat07/crypto-exchange-web",
    tags: ["TypeScript", "Node.js", "Next.js", "Kafka"],
    extraCount: 3,
    highlights: [
      "In-memory price-time priority matching engine processing real-time limit orders",
      "Event-driven architecture streaming market data updates over WebSockets and Apache Kafka",
      "Transactional balances, PostgreSQL ledgers, and Redis caching layers",
    ],
  },
  {
    slug: "crm-x",
    title: "CRM-X",
    description:
      "A next-generation Customer Relationship Management platform engineered as a monorepo with glassmorphic dashboards.",
    image: "/crmx.webp",
    demo: "https://crm-x-crm-client.vercel.app/",
    github: "https://github.com/ujjwalkat07/crm-x",
    tags: ["TypeScript", "Next.js", "Turborepo"],
    extraCount: 4,
    highlights: [
      "Monorepo architecture structured with Turborepo and reusable TypeScript packages",
      "Real-time pipeline tracking and analytics dashboards",
    ],
  },
  {
    slug: "lamp",
    title: "Lamp",
    description:
      "A modern TypeScript-based web application providing QR code scanning and verification capabilities combined with an event management dashboard.",
    image: "/lamp.webp",
    demo: "https://lamp-mih.vercel.app",
    github: "https://github.com/ujjwalkat07/lamp",
    tags: ["TypeScript", "Next.js", "Turborepo"],
    extraCount: 4,
    highlights: [
      "High-speed QR code ticket scanning and admission validation",
      "Event management portal for registrations, attendees, and metrics",
    ],
  },
  {
    slug: "camp-life",
    title: "Camp-Life",
    description:
      "Camp-Life is a camping and outdoor adventure platform with booking and payment gateway integration.",
    image: "/camp-life.webp",
    demo: "https://camping-ruby.vercel.app",
    github: "https://github.com/ujjwalkat07/camping",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
    highlights: [
      "Interactive campsite catalog with reservations and availability calendar",
      "Seamless payment gateway integration and automated email confirmations",
    ],
  },
]
