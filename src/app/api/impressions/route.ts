import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

function getClientIp(request: NextRequest): string {
  // Try standard proxy headers first, then fall back
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    // x-forwarded-for can be comma-separated; take the first (original client)
    return forwarded.split(",")[0].trim()
  }

  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp.trim()

  // Cloudflare-specific header
  const cfIp = request.headers.get("cf-connecting-ip")
  if (cfIp) return cfIp.trim()

  return "unknown"
}

function hashIp(ip: string): string {
  // SHA-256 hash the IP so we never store raw IPs (privacy)
  return createHash("sha256").update(ip).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 })
    }

    const clientIp = getClientIp(request)
    const ipHash = hashIp(clientIp)

    const { data, error } = await supabase.rpc("increment_impression_unique", {
      page_slug: slug,
      visitor_hash: ipHash,
    })

    if (error) {
      console.error("Supabase RPC error:", error)
      return NextResponse.json({ error: "Failed to increment" }, { status: 500 })
    }

    return NextResponse.json({ count: data })
  } catch (e) {
    console.error("Impression POST error:", e)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("impressions")
      .select("view_count")
      .eq("slug", slug)
      .single()

    if (error && error.code !== "PGRST116") {
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
    }

    return NextResponse.json({ count: data?.view_count ?? 0 })
  } catch (e) {
    console.error("Impression GET error:", e)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
