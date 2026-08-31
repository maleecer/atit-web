"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageBackground } from "@/components/page-background"
import { Navigation } from "@/components/navigation"
import { Author } from "@/lib/supabase-articles"
import { createClient } from "@/utils/supabase/client"

interface FormData {
  name: string
  bio: string
  avatar_url: string
  linkedin_url: string
  github_url: string
  student_id: string
}

const defaultFormData: FormData = {
  name: "",
  bio: "",
  avatar_url: "",
  linkedin_url: "",
  github_url: "",
  student_id: "",
}

export default function AuthorsManagement() {
  const router = useRouter()
  const supabase = createClient()
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/admin/articles")
        return
      }
      fetchAuthors()
    }

    checkAuth()
  }, [])

  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/admin/authors")
      setAuthors(await res.json())
    } catch (err) {
      console.error("Failed to fetch authors:", err)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (author?: Author) => {
    if (author) {
      setEditingId(author.id)
      setFormData({
        name: author.name,
        bio: author.bio || "",
        avatar_url: author.avatar_url || "",
        linkedin_url: author.linkedin_url || "",
        github_url: author.github_url || "",
        student_id: author.student_id || "",
      })
    } else {
      setEditingId(null)
      setFormData(defaultFormData)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData(defaultFormData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingId
        ? `/api/admin/authors/${editingId}`
        : "/api/admin/authors"

      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save author")
      }

      fetchAuthors()
      closeModal()
    } catch (err: any) {
      console.error("Failed to save author:", err)
      alert(err.message || "Failed to save author")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return

    try {
      const res = await fetch(`/api/admin/authors/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to delete author")
      }

      fetchAuthors()
    } catch (err: any) {
      console.error("Failed to delete author:", err)
      alert(err.message || "Failed to delete author")
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
            className="flex items-center justify-between mb-8"
          >
            <div>
              <button
                onClick={() => router.push("/admin/articles/dashboard")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-foreground mb-2">Authors Management</h1>
              <p className="text-muted-foreground">Manage student authors and their profiles</p>
            </div>
            <button
              onClick={() => openModal()}
              className="px-4 py-2 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              + Add Author
            </button>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author, idx) => (
                <motion.div
                  key={author.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {author.avatar_url ? (
                      <img
                        src={author.avatar_url}
                        alt={author.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-foreground/60">
                          {author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{author.name}</h3>
                      {author.student_id && (
                        <p className="text-xs text-muted-foreground">ID: {author.student_id}</p>
                      )}
                    </div>
                  </div>

                  {author.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{author.bio}</p>
                  )}

                  <div className="flex gap-2">
                    {author.linkedin_url && (
                      <a
                        href={author.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {author.github_url && (
                      <a
                        href={author.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
                    <button
                      onClick={() => openModal(author)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold text-foreground mb-6">
              {editingId ? "Edit Author" : "Add Author"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Student ID</label>
                <input
                  type="text"
                  value={formData.student_id}
                  onChange={(e) => setFormData((p) => ({ ...p, student_id: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Avatar URL</label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData((p) => ({ ...p, avatar_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData((p) => ({ ...p, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData((p) => ({ ...p, github_url: e.target.value }))}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-foreground/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </main>
  )
}
