/**
 * Standardizes date formatting across the site to "Nov 4, 2026" style.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Parses a date string into an ISO 8601 string safely for metadata and JSON-LD.
 */
export function toIsoDate(dateStr?: string, fallback = new Date().toISOString()): string {
  if (!dateStr) return fallback
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return fallback
  return date.toISOString()
}

