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
    }
    data[key] = value
  })

  return { data, content }
}

function buildBlog() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Blog directory not found: ${BLOG_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"))
  const posts = []

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = parseFrontmatter(fileContent)

    posts.push({
      slug: file.replace(".md", ""),
      title: data.title || "Untitled",
      category: data.category || "General",
      description: data.description || "",
      date: data.date || "",
      lastModified: data.lastModified || "",
      readTime: data.readTime || "",
      tags: data.tags || [],
      keywords: data.keywords || [],
      link: data.link || "#",
      content: content.trim(),
    })
  })

  // Sort posts by date (newest first, assuming standard date formatting)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), "utf-8")
  console.log(`Successfully built ${posts.length} blog posts into ${OUTPUT_FILE}`)
}

buildBlog()
