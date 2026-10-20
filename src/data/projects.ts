export interface ProjectItem {
  title: string
  description: string
  image: string
  demo: string
  github?: string
  tags: string[]
  extraCount?: number
}

export const projects: ProjectItem[] = [
  {
    title: "Exchange-X",
    description:
      "A full-stack cryptocurrency exchange with a real-time order matching engine pairing buy/sell orders by price-priority.",
    image: "/crypto.webp",
    demo: "https://web-exchange-x.onrender.com/",
    github: "https://github.com/ujjwalkat07/crypto-exchange-web",
    tags: ["TypeScript", "Node.js", "Next.js", "Kafka"],
    extraCount: 3,
  },
  {
    title: "CRM-X",
    description:
      "A next-generation Customer Relationship Management platform engineered as a monorepo with glassmorphic dashboards.",
    image: "/crmx.webp",
    demo: "https://crm-x-crm-client.vercel.app/",
    github: "https://github.com/ujjwalkat07/crm-x",
    tags: ["TypeScript", "Next.js", "Turborepo"],
    extraCount: 4,
  },
  {
    title: "Lamp",
    description:
      "LAMP is a modern TypeScript-based web application built with Next.js that provides QR code scanning and verification capabilities combined with an event management dashboard.",
    image: "/lamp.png",
    demo: "https://lamp-mih.vercel.app",
    github: "https://github.com/ujjwalkat07/lamp",
    tags: ["TypeScript", "Next.js", "Turborepo"],
    extraCount: 4,
  },
  {
    title: "Camp-Life",
    description:
      "Camp-Life is a camping and outdoor adventure platform with booking and payment gateway integration.",
    image: "/image.png",
    demo: "https://camping-ruby.vercel.app",
    github: "https://github.com/ujjwalkat07/camping",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
  },
]
