"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { Article, Tag, Author } from "@/lib/supabase-articles"

interface ArticleWithRelations extends Article {
  author: Author | null
  tags: Tag[]
}

export default function ArticlesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [articles, setArticles] = useState<ArticleWithRelations[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const tag = searchParams.get("tag")
    setSelectedTag(tag)
    fetchArticles()
    fetchTags()
  }, [searchParams])

  useEffect(() => {
    fetchArticles()
  }, [selectedTag, search])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedTag) params.set("tag", selectedTag)
      if (search) params.set("search", search)

      const res = await fetch(`/api/articles?${params}`)
      const data = await res.json()
      setArticles(data.articles || [])
    } catch (err) {
      console.error("Failed to fetch articles:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/admin/tags")
      const data = await res.json()
      // Ensure we only set an array to the tags state
      setTags(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to fetch tags:", err)
      setTags([])
    }
  }

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      router.push("/articles")
    } else {
      router.push(`/articles?tag=${encodeURIComponent(tagName)}`)
    }
  }

  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case "tutorial":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
      case "casestudy":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        )
    }
  }

  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground variant="combined" />
      <Navigation />

      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Articles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights on technology, innovation, and the latest trends from the ATIT community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <button
              onClick={() => router.push("/articles")}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedTag
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-foreground hover:border-foreground/50"
              }`}
            >
              All
            </button>
            {Array.isArray(tags) && tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.name)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedTag === tag.name
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-foreground hover:border-foreground/50"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
            </div>
          ) : articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground mb-4">No articles found</p>
              <button
                onClick={() => {
                  setSearch("")
                  router.push("/articles")
                }}
                className="text-foreground hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/articles/${article.slug}`}>
                    <article className="group bg-card border border-border rounded-xl overflow-hidden hover:border-foreground/30 transition-all h-full flex flex-col">
                      {article.images?.[0] && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.images[0].url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs text-foreground flex items-center gap-1">
                              {getPatternIcon(article.pattern_type)}
                              {article.pattern_type}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Array.isArray(article.tags) && article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="text-xs text-foreground/70"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            {article.author?.avatar_url ? (
                              <img
                                src={article.author.avatar_url}
                                alt={article.author.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center">
                                <span className="text-xs font-medium text-foreground/60">
                                  {article.author?.name?.charAt(0) || "?"}
                                </span>
                              </div>
                            )}
                            <span>{article.author?.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span>{article.read_time_minutes} min read</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}