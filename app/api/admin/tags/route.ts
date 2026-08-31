import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { isAuthorizedAdmin } from "@/lib/admin-auth"

export async function GET() {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: tags, error } = await supabase
      .from("tags")
      .select("*")
      .order("category")
      .order("name")

    if (error) throw error

    return NextResponse.json(tags || [])
  } catch (error) {
    console.error("[API] Tags GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const tag = await request.json()
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("tags")
      .insert(tag)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error("[Admin] Tag POST error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create tag" },
      { status: 500 }
    )
  }
}
