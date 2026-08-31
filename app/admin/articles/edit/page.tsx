"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { PageBackground } from "@/components/page-background"
import { Navigation } from "@/components/navigation"
import { Article, Author, Tag, ArticleImage } from "@/lib/supabase-articles"
import { createClient } from "@/utils/supabase/client"

interface FormData {
  slug: string
  title: string
  excerpt: string
  content: string
  pattern_type: "standard" | "tutorial" | "casestudy"
  read_time_minutes: number
  status: "draft" | "review" | "published"
  author_id: string
  tag_ids: string[]
}

const defaultFormData: FormData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  pattern_type: "standard",
  read_time_minutes: 5,
  status: "draft",
  author_id: "",
  tag_ids: [],
}

function ArticleFormContent() {
  const router = useRouter()
  const supabase = createClient()
  const searchParams = useSearchParams()
  const articleId = searchParams.get("id")

  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [authors, setAuthors] = useState<Author[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/admin/articles")
        return
      }
      fetchData()
    }

    checkAuth()
  }, [articleId])

  const fetchData = async () => {
    try {
      const [authorsRes, tagsRes] = await Promise.all([
        fetch("/api/admin/authors"),
        fetch("/api/admin/tags"),
      ])

      const authorsData = await authorsRes.json()
      const tagsData = await tagsRes.json()

      setAuthors(authorsData)
      setTags(tagsData)

      if (articleId) {
        const articleRes = await fetch(`/api/admin/articles/${articleId}`, {
        })
        const articleData = await articleRes.json()

        setFormData({
          slug: articleData.slug || "",
          title: articleData.title || "",
          excerpt: articleData.excerpt || "",
          content: articleData.content || "",
          pattern_type: articleData.pattern_type || "standard",
          read_time_minutes: articleData.read_time_minutes || 5,
          status: articleData.status || "draft",
          author_id: articleData.author_id || "",
          tag_ids: articleData.tag_ids || [],
        })
      }
    } catch (err) {
      console.error("Failed to fetch data:", err)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const url = articleId
        ? `/api/admin/articles/${articleId}`
        : "/api/admin/articles"

      const method = articleId ? "PUT" : "POST"

      const payload = {
        ...formData,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save article")
      }

      router.push("/admin/articles/dashboard")
    } catch (err: any) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background relative">
        <PageBackground variant="combined" />
        <Navigation />
        <div className="pt-32 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground variant="combined" />
      <Navigation />

      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => router.push("/admin/articles/dashboard")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-foreground">
              {articleId ? "Edit Article" : "New Article"}
            </h1>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 space-y-6"
            >
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50"
                    placeholder="Enter article title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50"
                    placeholder="article-slug"
                  />
                  <p className="text-xs text-muted-foreground mt-1">URL: /articles/{formData.slug}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Excerpt (SEO Description)
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50 resize-none"
                    placeholder="Brief description for search engines and previews"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-foreground">
                      Content (Markdown Formatted) *
                    </label>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      Markdown Enabled
                    </span>
                  </div>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    required
                    rows={15}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50 resize-none font-mono text-sm"
                    placeholder="Write article in Markdown. E.g.
# Major Heading
## Sub Heading

Here is standard text with **bold** text and [links](url).

- Bullet 1
- Bullet 2

```javascript
// code blocks
console.log('hello world');
```"
                  />
                  <div className="mt-2 p-3 bg-muted/40 border border-border rounded-lg text-xs space-y-1 text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">Markdown Cheat Sheet:</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono">
                      <div># Heading 1 (main title)</div>
                      <div>## Heading 2 (section)</div>
                      <div>**bold text** / *italic text*</div>
                      <div>[Link Text](url)</div>
                      <div>- Unordered List Item</div>
                      <div>1. Ordered List Item</div>
                      <div>`inline code`</div>
                      <div>&gt; Blockquote</div>
                      <div className="col-span-2">```javascript [newline] code block [newline] ```</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pattern Type
                  </label>
                  <select
                    value={formData.pattern_type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pattern_type: e.target.value as FormData["pattern_type"],
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-foreground/50"
                  >
                    <option value="standard">Standard Blog</option>
                    <option value="tutorial">Tutorial/Code</option>
                    <option value="casestudy">Case Study/Visual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.read_time_minutes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        read_time_minutes: parseInt(e.target.value) || 5,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-foreground/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Author
                  </label>
                  <select
                    value={formData.author_id}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, author_id: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-foreground/50"
                  >
                    <option value="">Select author</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as FormData["status"],
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-foreground/50"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 p-4 rounded-lg bg-background border border-border min-h-[60px]">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            tag_ids: prev.tag_ids.includes(tag.id)
                              ? prev.tag_ids.filter((id) => id !== tag.id)
                              : [...prev.tag_ids, tag.id],
                          }))
                        }}
                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                          formData.tag_ids.includes(tag.id)
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground/50"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex justify-end gap-4"
            >
              <button
                type="button"
                onClick={() => router.push("/admin/articles/dashboard")}
                className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-foreground/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : articleId ? "Update Article" : "Create Article"}
              </button>
            </motion.div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default function ArticleFormPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background relative">
        <PageBackground variant="combined" />
        <Navigation />
        <div className="pt-32 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
        </div>
      </main>
    }>
      <ArticleFormContent />
    </Suspense>
  )
}
