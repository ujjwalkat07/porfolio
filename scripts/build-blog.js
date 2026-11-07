const fs = require("fs")
const path = require("path")

const BLOG_DIR = path.join(__dirname, "../content/blog")
const OUTPUT_DIR = path.join(__dirname, "../src/content")
const OUTPUT_FILE = path.join(OUTPUT_DIR, "blog-posts.json")

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: fileContent }

  const yaml = match[1]
  const content = match[2]
  const data = {}

  yaml.split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(":")
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1)
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1)
    } else if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => {
          item = item.trim()
          if (item.startsWith('"') && item.endsWith('"')) return item.slice(1, -1)
          if (item.startsWith("'") && item.endsWith("'")) return item.slice(1, -1)
          return item
        })
    } else if (value === "true") {
      value = true
    } else if (value === "false") {
      value = false
    }
    data[key] = value
  })

  return { data, content }
}

function calculateReadingTime(content) {
  // Strip code blocks, HTML/JSX tags, and import statements for accurate word count
  const clean = content
    .replace(/^import\s+.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .trim()
  const words = clean.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function extractToc(markdown) {
  const headings = []
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const rawText = match[2].trim()
    
    // Skip empty headings or headings that start with TODO
    if (!rawText || /^todo/i.test(rawText)) continue

    const text = rawText
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    headings.push({ id, text, level })
  }
  return headings
}

function buildBlog() {
  if (!fs.existsSync(BLOG_DIR)) {
    process.exit(1)
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
  const posts = []

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = parseFrontmatter(fileContent)

    // Explicit slug from frontmatter: read data.slug directly; fallback to filename only if missing
    const slug = data.slug ? String(data.slug).trim() : file.replace(/\.mdx?$/, "")
    const isDraft = Boolean(data.draft === true || data.draft === "true")

    posts.push({
      slug,
      title: data.title || "Untitled",
      category: data.category || "General",
      description: data.description || "",
      date: data.date || "",
      lastModified: data.lastModified || "",
      readTime: calculateReadingTime(content),
      tags: data.tags || [],
      link: data.link || `https://ujjwalkatiyar.in/blog/${slug}`,
      draft: isDraft,
      toc: extractToc(content),
    })
  })

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), "utf-8")
  console.log(`Successfully built ${posts.length} blog posts into ${OUTPUT_FILE}`)
}

buildBlog()
