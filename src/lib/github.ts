export interface GithubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
  } | null
  topics: string[]
  archived: boolean
  disabled: boolean
  default_branch: string
}

const GITHUB_USERNAME = "ujjwalkat07"

// Fallback user data in case API limit is reached or offline
const FALLBACK_USER: GithubUser = {
  login: GITHUB_USERNAME,
  id: 12345678,
  avatar_url: "https://avatars.githubusercontent.com/u/ujjwalkat07?v=4",
  html_url: `https://github.com/${GITHUB_USERNAME}`,
  name: "Ujjwal Katiyar",
  company: null,
  blog: "https://ujjwalkatiyar.in",
  location: "Noida, India",
  email: null,
  bio: "Full Stack Engineer & Systems Architect. Building scalable real-time microservices, cloud applications, and high-performance web systems.",
  twitter_username: "ujjwalkatiyar07",
  public_repos: 18,
  public_gists: 2,
  followers: 42,
  following: 15,
  created_at: "2021-01-01T00:00:00Z",
}

// Fallback repository data
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 101,
    name: "portfolio",
    full_name: `${GITHUB_USERNAME}/portfolio`,
    html_url: `https://github.com/${GITHUB_USERNAME}/portfolio`,
    description: "Modern, high-performance portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Cloudflare Pages.",
    fork: false,
    url: `https://api.github.com/repos/${GITHUB_USERNAME}/portfolio`,
    created_at: "2024-02-10T10:00:00Z",
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
    homepage: "https://ujjwalkatiyar.in",
    size: 2400,
    stargazers_count: 14,
    watchers_count: 14,
    language: "TypeScript",
    forks_count: 5,
    open_issues_count: 0,
    license: { key: "mit", name: "MIT License", spdx_id: "MIT", url: "https://api.github.com/licenses/mit" },
    topics: ["nextjs", "typescript", "tailwindcss", "portfolio", "react"],
    archived: false,
    disabled: false,
    default_branch: "main",
  },
  {
    id: 102,
    name: "distributed-task-queue",
    full_name: `${GITHUB_USERNAME}/distributed-task-queue`,
    html_url: `https://github.com/${GITHUB_USERNAME}/distributed-task-queue`,
    description: "Fault-tolerant distributed job queue engine built with Node.js, Redis, and Apache Kafka for asynchronous event handling.",
    fork: false,
    url: `https://api.github.com/repos/${GITHUB_USERNAME}/distributed-task-queue`,
    created_at: "2023-11-15T14:20:00Z",
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    pushed_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    homepage: "",
    size: 1800,
    stargazers_count: 28,
    watchers_count: 28,
    language: "TypeScript",
    forks_count: 8,
    open_issues_count: 1,
    license: { key: "mit", name: "MIT License", spdx_id: "MIT", url: "https://api.github.com/licenses/mit" },
    topics: ["distributed-systems", "redis", "kafka", "queue", "nodejs"],
    archived: false,
    disabled: false,
    default_branch: "main",
  },
  {
    id: 103,
    name: "realtime-collaborative-editor",
    full_name: `${GITHUB_USERNAME}/realtime-collaborative-editor`,
    html_url: `https://github.com/${GITHUB_USERNAME}/realtime-collaborative-editor`,
    description: "Real-time rich text and code editor supporting CRDT-based multi-user synchronization over WebSockets.",
    fork: false,
    url: `https://api.github.com/repos/${GITHUB_USERNAME}/realtime-collaborative-editor`,
    created_at: "2023-08-05T09:00:00Z",
    updated_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    pushed_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    homepage: "",
    size: 3200,
    stargazers_count: 36,
    watchers_count: 36,
    language: "TypeScript",
    forks_count: 12,
    open_issues_count: 0,
    license: { key: "mit", name: "MIT License", spdx_id: "MIT", url: "https://api.github.com/licenses/mit" },
    topics: ["websockets", "crdt", "collaboration", "editor", "react"],
    archived: false,
    disabled: false,
    default_branch: "main",
  },
  {
    id: 104,
    name: "microservices-auth-boilerplate",
    full_name: `${GITHUB_USERNAME}/microservices-auth-boilerplate`,
    html_url: `https://github.com/${GITHUB_USERNAME}/microservices-auth-boilerplate`,
    description: "Production-ready OAuth2 and JWT authentication microservice template featuring rate limiting, Docker setup, and RBAC.",
    fork: false,
    url: `https://api.github.com/repos/${GITHUB_USERNAME}/microservices-auth-boilerplate`,
    created_at: "2023-05-20T11:45:00Z",
    updated_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    pushed_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    homepage: "",
    size: 1450,
    stargazers_count: 22,
    watchers_count: 22,
    language: "Go",
    forks_count: 6,
    open_issues_count: 0,
    license: { key: "mit", name: "MIT License", spdx_id: "MIT", url: "https://api.github.com/licenses/mit" },
    topics: ["golang", "jwt", "oauth2", "microservices", "security"],
    archived: false,
    disabled: false,
    default_branch: "main",
  },
  {
    id: 105,
    name: "ai-code-summarizer",
    full_name: `${GITHUB_USERNAME}/ai-code-summarizer`,
    html_url: `https://github.com/${GITHUB_USERNAME}/ai-code-summarizer`,
    description: "CLI tool and browser extension for generating automated code reviews and commit message summaries using LLMs.",
    fork: false,
    url: `https://api.github.com/repos/${GITHUB_USERNAME}/ai-code-summarizer`,
    created_at: "2024-01-12T16:10:00Z",
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    pushed_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    homepage: "",
    size: 980,
    stargazers_count: 19,
    watchers_count: 19,
    language: "Python",
    forks_count: 4,
    open_issues_count: 0,
    license: { key: "mit", name: "MIT License", spdx_id: "MIT", url: "https://api.github.com/licenses/mit" },
    topics: ["python", "ai", "cli", "code-review", "llm"],
    archived: false,
    disabled: false,
    default_branch: "main",
  },
]

export async function fetchGithubUser(username: string = GITHUB_USERNAME): Promise<GithubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "NextJS-Portfolio-App",
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.warn(`GitHub API user fetch failed with status: ${res.status}. Using fallback user.`)
      return { ...FALLBACK_USER, login: username }
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    return { ...FALLBACK_USER, login: username }
  }
}

export async function fetchGithubRepos(username: string = GITHUB_USERNAME): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "NextJS-Portfolio-App",
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.warn(`GitHub API repos fetch failed with status: ${res.status}. Using fallback repos.`)
      return FALLBACK_REPOS
    }

    const data: GithubRepo[] = await res.json()
    
    if (Array.isArray(data) && data.length > 0) {
      return data.filter((repo) => !repo.disabled)
    }

    return FALLBACK_REPOS
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return FALLBACK_REPOS
  }
}
