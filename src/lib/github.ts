import dns from "dns"

try {
  if (dns && typeof dns.setDefaultResultOrder === "function") {
    dns.setDefaultResultOrder("ipv4first")
  }
} catch {
  // Safe fallback for non-node environments
}

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

export async function fetchGithubUser(username: string = GITHUB_USERNAME): Promise<GithubUser | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "NextJS-Portfolio-App",
    }

    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      //.warn(`GitHub API user fetch failed with status: ${res.status}.`)
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    //("Error fetching GitHub user:", error)
    return null
  }
}

export async function fetchGithubRepos(username: string = GITHUB_USERNAME): Promise<GithubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "NextJS-Portfolio-App",
    }

    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      //.warn(`GitHub API repos fetch failed with status: ${res.status}.`)
      return []
    }

    const data: GithubRepo[] = await res.json()

    if (Array.isArray(data)) {
      return data.filter((repo) => !repo.disabled)
    }

    return []
  } catch (error) {
    //("Error fetching GitHub repositories:", error)
    return []
  }
}


