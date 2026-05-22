import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import type { Article, Tag, ArticleImage, Author } from "@/lib/supabase-articles"

// ArticleRow is same as Article since API returns full relations
type ArticleRow = Article

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const tag = searchParams.get("tag")
  const search = searchParams.get("search")
  const author = searchParams.get("author")
  const limit = parseInt(searchParams.get("limit") || "10")
  const offset = parseInt(searchParams.get("offset") || "0")

  try {
    let query = supabase
      .from("articles")
      .select(`
        *,
        author:authors(*),
        tags:article_tags(tag:tags(*)),
        images:article_images(*)
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (tag) {
      query = query.eq("tags.tag.name", tag)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    if (author) {
      query = query.eq("author.name", author)
    }

    const { data: articles, error } = await query

    if (error) throw error

    // Get total count
    let countQuery = supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")

    if (tag) {
      countQuery = countQuery.eq("tags.tag.name", tag)
    }

    if (search) {
      countQuery = countQuery.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    if (author) {
      countQuery = countQuery.eq("author.name", author)
    }

    const { count } = await countQuery

    // Transform data - author is object, not array
    const transformedArticles = articles?.map((article: any) => ({
      ...article,
      author: article.author || null,
      tags: article.tags?.map((t: any) => t.tag).filter(Boolean) || [],
      images: article.images?.sort((a: ArticleImage, b: ArticleImage) => a.sort_order - b.sort_order) || [],
    })) || []

    return NextResponse.json({
      articles: transformedArticles,
      total: count || 0,
      limit,
      offset,
    })
  } catch (error) {
    console.error("[API] Articles GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    )
  }
}
