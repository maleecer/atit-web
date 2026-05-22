"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageBackground } from "@/components/page-background"
import { Navigation } from "@/components/navigation"
import { Author } from "@/lib/supabase-articles"
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
  images: { url: string; caption: string; position: string }[]
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
  images: [],
}

export default function NewArticlePage() {
  const router = useRouter()
  const supabase = createClient()
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [authors, setAuthors] = useState<Author[]>([])
  const [tags, setTags] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
  }, [])

  const fetchData = async () => {
    try {
      const [authorsRes, tagsRes] = await Promise.all([
        fetch("/api/admin/authors"),
        fetch("/api/admin/tags"),
      ])

      setAuthors(await authorsRes.json())
      setTags(await tagsRes.json())
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage
          .from("article-images")
          .upload(fileName, file)

        if (error) throw error

        const { data: urlData } = supabase.storage
          .from("article-images")
          .getPublicUrl(fileName)

        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            {
              url: urlData.publicUrl,
              caption: "",
              position: "inline",
            },
          ],
        }))
      }
    } catch (err) {
      console.error("Upload failed:", err)
      setError("Failed to upload image")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const payload = {
        ...formData,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      }

      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to create article")
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
            <h1 className="text-3xl font-bold text-foreground">New Article</h1>
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                        slug: prev.slug || generateSlug(e.target.value),
                      }))
                    }
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content (Student's plain text) *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    required
                    rows={15}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50 resize-none font-mono text-sm"
                    placeholder="Paste the student's article content here..."
                  />
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Images
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-foreground/10 transition-colors disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "+ Add Images"}
                  </button>

                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-border">
                          <img
                            src={img.url}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <div className="p-2 bg-background">
                            <select
                              value={img.position}
                              onChange={(e) => {
                                const newImages = [...formData.images]
                                newImages[idx].position = e.target.value
                                setFormData((prev) => ({ ...prev, images: newImages }))
                              }}
                              className="w-full text-xs bg-transparent border-none text-foreground focus:outline-none"
                            >
                              <option value="hero">Hero</option>
                              <option value="inline">Inline</option>
                              <option value="gallery">Gallery</option>
                              <option value="full-width">Full Width</option>
                            </select>
                            <input
                              type="text"
                              value={img.caption}
                              onChange={(e) => {
                                const newImages = [...formData.images]
                                newImages[idx].caption = e.target.value
                                setFormData((prev) => ({ ...prev, images: newImages }))
                              }}
                              placeholder="Caption..."
                              className="w-full text-xs bg-transparent border-none text-muted-foreground placeholder:text-muted-foreground/50 focus:outline-none mt-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                {saving ? "Creating..." : "Create Article"}
              </button>
            </motion.div>
          </form>
        </div>
      </section>
    </main>
  )
}
