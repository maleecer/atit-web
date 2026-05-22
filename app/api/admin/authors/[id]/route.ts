import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { isAuthorizedAdmin } from "@/lib/admin-auth"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const author = await request.json()
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("authors")
      .update(author)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[Admin] Author PUT error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update author" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase
      .from("authors")
      .delete()
      .eq("id", id)

    if (error) {
      if (error.code === "23503") {
        return NextResponse.json(
          { error: "Cannot delete author because they have associated articles. Please delete or reassign their articles first." },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[Admin] Author DELETE error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete author" },
      { status: 500 }
    )
  }
}
