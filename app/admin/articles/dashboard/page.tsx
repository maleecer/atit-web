"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageBackground } from "@/components/page-background"
import { Navigation } from "@/components/navigation"
import { Article, Author, Tag } from "@/lib/supabase-articles"
import { createClient } from "@/utils/supabase/client"

// ArticleWithRelations is same as Article since API returns full relations
type ArticleWithRelations = Article

type StatusFilter = "all" | "draft" | "review" | "published"

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [articles, setArticles] = useState<ArticleWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [search, setSearch] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/admin/articles")
        return
      }
      setIsAuthenticated(true)
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles()
    }
  }, [isAuthenticated, statusFilter, search])

  const fetchArticles = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.set("status", statusFilter)
      if (search) params.set("search", search)

      const res = await fetch(`/api/admin/articles?${params}`)
      const data = await res.json()
      setArticles(data)
    } catch (error) {
      console.error("Failed to fetch articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    supabase.auth.signOut().finally(() => {
      router.push("/admin/articles")
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to delete article")
      }

      fetchArticles()
    } catch (error: any) {
      console.error("Failed to delete article:", error)
      alert(error.message || "Failed to delete article")
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const updates: Record<string, any> = { status: newStatus }
      if (newStatus === "published") {
        updates.published_at = new Date().toISOString()
      }

      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to update status")
      }

      fetchArticles()
    } catch (error: any) {
      console.error("Failed to update status:", error)
      alert(error.message || "Failed to update status")
    }
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (!isAuthenticated) return null

  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground variant="combined" />
      <Navigation />

      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Article Management</h1>
              <p className="text-muted-foreground">Manage your articles, drafts, and publications</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/admin/authors")}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-foreground/10 transition-colors"
              >
                Manage Authors
              </button>
              <button
                onClick={() => router.push("/admin/articles/new")}
                className="px-4 py-2 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
              >
                + New Article
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-foreground/50"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
            </select>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Author</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tags</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {articles.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                          No articles found
                        </td>
                      </tr>
                    ) : (
                      articles.map((article) => (
                        <tr key={article.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-foreground">{article.title}</p>
                              <p className="text-xs text-muted-foreground">/{article.slug}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground">
                            {article.author?.name || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(article.tags || []).slice(0, 3).map((tag) => (
                                <span
                                  key={tag.id}
                                  className="px-2 py-0.5 text-xs rounded-full bg-foreground/10 text-foreground/70"
                                >
                                  {tag.name}
                                </span>
                              ))}
                              {article.tags && article.tags.length > 3 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-foreground/10 text-foreground/70">
                                  +{article.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={article.status}
                              onChange={(e) => handleStatusChange(article.id, e.target.value)}
                              className={`px-3 py-1 text-xs rounded-full border cursor-pointer focus:outline-none ${getStatusColor(article.status)}`}
                            >
                              <option value="draft">Draft</option>
                              <option value="review">Review</option>
                              <option value="published">Published</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {article.created_at.split("T")[0]}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => router.push(`/admin/articles/edit?id=${article.id}`)}
                                className="p-2 rounded-lg hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75a2.25 2.25 0 01-1.364 5.345l-5.955 5.955a2.25 2.25 0 01-3.182 0l-2.909-2.909a2.25 2.25 0 013.182-2.909l5.955 5.955a2.25 2.25 0 013.182 0l2.909-2.909a2.25 2.25 0 013.182 0l5.955-5.955A2.25 2.25 0 0122.5 17.5V14" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a2.25 2.25 0 00-2.244-2.077L4.772 5.79m-8.486 0a2.25 2.25 0 00-2.244 2.077L4.772 5.79" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
