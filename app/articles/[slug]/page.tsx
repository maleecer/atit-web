import type { Metadata } from "next"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { ArticleClient } from "./ArticleClient"
import { ArticleSchema } from "@/components/structured-data"
import { SITE_URL, siteConfig } from "@/lib/seo-config"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
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
      return null
    }

    return {
      ...article,
      author: article.author || null,
      tags: article.tags?.map((t: any) => t.tag).filter(Boolean) || [],
      images: article.images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [],
    }
  } catch (error) {
    console.error("[Server] getArticle error:", error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article was not found.",
    }
  }

  const title = article.title
  const description = article.excerpt || siteConfig.description
  const heroImage = article.images?.find((img: any) => img.position === "hero")
  const ogImageUrl = heroImage
    ? (heroImage.url.startsWith("http") ? heroImage.url : `${SITE_URL}${heroImage.url}`)
    : `${SITE_URL}${siteConfig.ogImage}`
  const url = `${SITE_URL}/articles/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at || article.created_at,
      authors: article.author ? [article.author.name] : [siteConfig.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-background relative">
        <PageBackground variant="combined" />
        <Navigation />
        <section className="pt-32 pb-20 px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">This article may have been removed or is not published yet.</p>
            <Link href="/articles" className="text-foreground hover:underline">
              ← Back to Articles
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const heroImage = article.images?.find((img: any) => img.position === "hero")
  const ogImageUrl = heroImage
    ? (heroImage.url.startsWith("http") ? heroImage.url : `${SITE_URL}${heroImage.url}`)
    : `${SITE_URL}${siteConfig.ogImage}`

  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground variant="combined" />
      <Navigation />
      
      {/* Dynamic structured data for Google Rich Snippets */}
      <ArticleSchema
        title={article.title}
        description={article.excerpt || article.title}
        url={`${SITE_URL}/articles/${article.slug}`}
        imageUrl={ogImageUrl}
        datePublished={article.published_at || article.created_at}
        dateModified={article.updated_at || article.created_at}
        authorName={article.author?.name || siteConfig.name}
        authorUrl={article.author?.linkedin_url || article.author?.github_url || undefined}
      />

      <ArticleClient article={article} />
    </main>
  )
}