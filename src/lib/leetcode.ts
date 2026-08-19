import dns from "dns"

try {
  if (dns && typeof dns.setDefaultResultOrder === "function") {
    dns.setDefaultResultOrder("ipv4first")
  }
} catch {
  // Safe fallback for non-node environments
}

export interface LeetCodeProfile {
  realName: string | null
  userAvatar: string
  ranking: number
  reputation: number
  countryName: string | null
  company: string | null
  school: string | null
  skillTags: string[]
  aboutMe: string
  starRating: number
}

export interface LeetCodeDifficultyStats {
  difficulty: "All" | "Easy" | "Medium" | "Hard"
  count: number
  submissions: number
}

export interface LeetCodeQuestionCount {
  difficulty: "All" | "Easy" | "Medium" | "Hard"
  count: number
}

export interface LeetCodeBadge {
  id: string
  name: string
  displayName: string
  icon: string
  category?: string
}

export interface LeetCodeTagProblemCount {
  tagName: string
  tagSlug: string
  problemsSolved: number
}

export interface LeetCodeLanguageCount {
  languageName: string
  problemsSolved: number
}

export interface LeetCodeRecentSubmission {
  id: string
  title: string
  titleSlug: string
  timestamp: string
}

export interface LeetCodeContestRanking {
  attendedContestsCount: number
  rating: number
  globalRanking: number
  totalParticipants: number
  topPercentage: number
  badge: {
    name: string
  } | null
}

export interface LeetCodeData {
  username: string
  githubUrl: string | null
  twitterUrl: string | null
  linkedinUrl: string | null
  profile: LeetCodeProfile
  submitStatsGlobal: {
    acSubmissionNum: LeetCodeDifficultyStats[]
    totalSubmissionNum: LeetCodeDifficultyStats[]
  }
  allQuestionsCount: LeetCodeQuestionCount[]
  badges: LeetCodeBadge[]
  submissionCalendar: Record<string, number>
  tagProblemCounts: {
    advanced: LeetCodeTagProblemCount[]
    intermediate: LeetCodeTagProblemCount[]
    fundamental: LeetCodeTagProblemCount[]
  }
  languageProblemCount: LeetCodeLanguageCount[]
  userContestRanking: LeetCodeContestRanking | null
  recentAcSubmissionList: LeetCodeRecentSubmission[]
}

const LEETCODE_USERNAME = "ujjwalkat07"

export async function fetchLeetCodeData(
  username: string = LEETCODE_USERNAME
): Promise<LeetCodeData | null> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        githubUrl
        twitterUrl
        linkedinUrl
        profile {
          realName
          userAvatar
          ranking
          reputation
          countryName
          company
          school
          skillTags
          aboutMe
          starRating
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          name
          displayName
          icon
          category
        }
        submissionCalendar
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      recentAcSubmissionList(username: $username, limit: 25) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour ISR
    })

    if (!res.ok) {
      return null
    }

    const json = await res.json()
    if (!json?.data?.matchedUser) {
      return null
    }

    const { matchedUser, allQuestionsCount, userContestRanking, recentAcSubmissionList } = json.data

    let parsedCalendar: Record<string, number> = {}
    try {
      if (typeof matchedUser.submissionCalendar === "string") {
        parsedCalendar = JSON.parse(matchedUser.submissionCalendar)
      } else if (typeof matchedUser.submissionCalendar === "object" && matchedUser.submissionCalendar !== null) {
        parsedCalendar = matchedUser.submissionCalendar
      }
    } catch {
      parsedCalendar = {}
    }

    return {
      username: matchedUser.username,
      githubUrl: matchedUser.githubUrl,
      twitterUrl: matchedUser.twitterUrl,
      linkedinUrl: matchedUser.linkedinUrl,
      profile: matchedUser.profile,
      submitStatsGlobal: matchedUser.submitStatsGlobal,
      allQuestionsCount: allQuestionsCount || [],
      badges: matchedUser.badges || [],
      submissionCalendar: parsedCalendar,
      tagProblemCounts: matchedUser.tagProblemCounts || {
        advanced: [],
        intermediate: [],
        fundamental: [],
      },
      languageProblemCount: matchedUser.languageProblemCount || [],
      userContestRanking: userContestRanking || null,
      recentAcSubmissionList: recentAcSubmissionList || [],
    }
  } catch {
    return null
  }
}
