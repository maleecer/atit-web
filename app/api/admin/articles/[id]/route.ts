import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { ArticleInput } from "@/lib/supabase-articles"
import { isAuthorizedAdmin } from "@/lib/admin-auth"

export async function GET(
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
    const { data: article, error } = await supabase
      .from("articles")
      .select(`
        *,
        author:authors(*),
        tags:article_tags(tag:tags(*)),
        images:article_images(*)
      `)
      .eq("id", id)
      .single()

    if (error || !article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    const transformed = {
      ...article,
      author: article.author?.[0] || null,
      tags: article.tags?.map((t: any) => t.tag).filter(Boolean) || [],
      images: article.images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [],
      tag_ids: article.tags?.map((t: any) => t.tag.id) || [],
    }

    return NextResponse.json(transformed)
  } catch (error) {
    console.error("[Admin] Article GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    )
  }
}

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
    const body: ArticleInput = await request.json()
    const { tag_ids, images, ...articleData } = body
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Update article
    const { data: article, error: articleError } = await supabase
      .from("articles")
      .update({
        ...articleData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (articleError) throw articleError

    // Update tags
    if (tag_ids) {
      await supabase.from("article_tags").delete().eq("article_id", id)
      if (tag_ids.length > 0) {
        const tagData = tag_ids.map((tag_id) => ({
          article_id: id,
          tag_id,
        }))
        await supabase.from("article_tags").insert(tagData)
      }
    }

    // Update images
    if (images) {
      await supabase.from("article_images").delete().eq("article_id", id)
      if (images.length > 0) {
        const imageData = images.map((img, idx) => ({
          article_id: id,
          ...img,
          sort_order: idx,
        }))
        await supabase.from("article_images").insert(imageData)
      }
    }

    return NextResponse.json(article)
  } catch (error: any) {
    console.error("[Admin] Article PUT error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update article" },
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
      .from("articles")
      .delete()
      .eq("id", id)

    if (error) {
      if (error.code === "23503") {
        return NextResponse.json(
          { error: "Cannot delete article due to database constraints." },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[Admin] Article DELETE error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete article" },
      { status: 500 }
    )
  }
}
