import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { ArticleInput } from "@/lib/supabase-articles"
import { isAuthorizedAdmin } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    let query = supabase
      .from("articles")
      .select(`
        *,
        author:authors(*),
        tags:article_tags(tag:tags(*)),
        images:article_images(*)
      `)
      .order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
    }

    const { data: articles, error } = await query

    if (error) throw error

    const transformed = articles?.map((article: any) => ({
      ...article,
      author: article.author?.[0] || null,
      tags: article.tags?.map((t: any) => t.tag).filter(Boolean) || [],
      images: article.images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [],
    })) || []

    return NextResponse.json(transformed)
  } catch (error) {
    console.error("[Admin] Articles GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles" },
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
    const body: ArticleInput = await request.json()
    const { tag_ids, images, ...articleData } = body
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Insert article
    const { data: article, error: articleError } = await supabase
      .from("articles")
      .insert(articleData)
      .select()
      .single()

    if (articleError) throw articleError

    // Insert tags
    if (tag_ids && tag_ids.length > 0) {
      const tagData = tag_ids.map((tag_id) => ({
        article_id: article.id,
        tag_id,
      }))
      await supabase.from("article_tags").insert(tagData)
    }

    // Insert images
    if (images && images.length > 0) {
      const imageData = images.map((img, idx) => ({
        article_id: article.id,
        ...img,
        sort_order: idx,
      }))
      await supabase.from("article_images").insert(imageData)
    }

    return NextResponse.json(article, { status: 201 })
  } catch (error: any) {
    console.error("[Admin] Article POST error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create article" },
      { status: 500 }
    )
  }
}
