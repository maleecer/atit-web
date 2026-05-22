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
    const { data: authors, error } = await supabase
      .from("authors")
      .select("*")
      .order("name")

    if (error) throw error

    return NextResponse.json(authors || [])
  } catch (error) {
    console.error("[Admin] Authors GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch authors" },
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
    const author = await request.json()
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("authors")
      .insert(author)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error("[Admin] Author POST error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create author" },
      { status: 500 }
    )
  }
}
