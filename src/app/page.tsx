import { Navbar } from "@/components/navbar"
import { BentoProfile } from "@/components/bento-profile"
import { HomeBlog } from "@/components/home-blog"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/lib/json-ld"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ujjwalkatiyar.in/#person",
  name: "Ujjwal Katiyar",
  url: "https://ujjwalkatiyar.in",
  image: "https://ujjwalkatiyar.in/profile_pic.webp",
  jobTitle: "Software Developer",
  description:
    "Software Developer building scalable real-time systems, distributed backend infrastructure, and AI observability platforms.",
  sameAs: [
    "https://github.com/ujjwalkat07",
    "https://www.linkedin.com/in/ujjwalkatiyar07",
    "https://x.com/ujjwalkatiyar07",
  ],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
    "Apache Kafka",
    "Redis",
    "ClickHouse",
    "PostgreSQL",
    "Distributed Systems",
    "AI Agents",
    "Observability",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ujjwalkatiyar.in/#website",
  name: "Ujjwal Katiyar",
  url: "https://ujjwalkatiyar.in",
  description:
    "Personal portfolio and engineering blog of Ujjwal Katiyar, Software Developer and Systems Architect.",
  author: {
    "@id": "https://ujjwalkatiyar.in/#person",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans transition-colors duration-300 antialiased selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400">
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-6">
        {/* Bento Grid Profile Section */}
        <BentoProfile />

        {/* Sections */}
        <HomeBlog />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
