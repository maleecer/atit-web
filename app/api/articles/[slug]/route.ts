import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const { data: article, error } = await supabase
      .from("articles")
      .select(`
        *,
        author:authors(*),
        tags:article_tags(tag:tags(*)),
        images:article_images(*)
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .single()

    if (error || !article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }

    // Transform - author is returned as object, not array
    const transformed = {
      ...article,
      author: article.author || null,
      tags: article.tags?.map((t: any) => t.tag).filter(Boolean) || [],
      images: article.images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [],
    }

    return NextResponse.json(transformed)
  } catch (error) {
    console.error("[API] Article GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    )
  }
}
