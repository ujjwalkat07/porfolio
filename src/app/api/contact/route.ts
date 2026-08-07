import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      subject,
      message,
    })

    if (error) {
      //("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to save message." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    //("Contact POST error:", e)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
