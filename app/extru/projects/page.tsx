"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getAllProjects } from "@/app/actions/extru-projects"
import Image from "next/image"
import Link from "next/link"

const ACCESS_PASSWORD = "atit2026"

interface ProjectWithRating {
  id: string
  name: string
  description: string
  image_url: string | null
  created_at: string
  averageRating: number
  totalRatings: number
}

type SortKey = "rating" | "votes" | "newest" | "name"

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "rating", label: "Highest Rated" },
  { key: "votes", label: "Most Rated" },
  { key: "newest", label: "Newest" },
  { key: "name", label: "A → Z" },
]

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#34d399" : "none"}
          stroke={star <= Math.round(rating) ? "#34d399" : "rgba(255,255,255,0.12)"}
          strokeWidth="1.5"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  )
}

export default function ProjectsOverviewPage() {
  const [projects, setProjects] = useState<ProjectWithRating[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<SortKey>("rating")
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (password === ACCESS_PASSWORD) {
      setUnlocked(true)
      setPasswordError(false)
      setLoading(true)
      getAllProjects().then((data) => {
        setProjects(data)
        setLoading(false)
      })
    } else {
      setPasswordError(true)
    }
  }

  const sorted = [...projects].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.averageRating - a.averageRating || b.totalRatings - a.totalRatings
      case "votes":
        return b.totalRatings - a.totalRatings || b.averageRating - a.averageRating
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  // --- Password Gate ---
  if (!unlocked) {
    return (
      <main className="min-h-[100dvh] bg-[#050505] relative flex items-center justify-center px-4 overflow-hidden">
        <div className="fixed inset-0 pointer-events-none select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/[0.06] blur-[140px] rounded-full" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xs relative z-10"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative w-9 h-9 opacity-80">
                <Image src="/assets/atit-logo.png" alt="ATiT" fill className="object-contain" />
              </div>
              <div className="h-5 w-px bg-white/[0.1]" />
              <div className="relative w-16 h-7 opacity-80">
                <Image src="/assets/events/extru-white.png" alt="EXTRU 2026" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight mb-1">
              Project Ratings
            </h1>
            <p className="text-xs text-neutral-600">
              Enter the access password to view results
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <div className="absolute -inset-px bg-gradient-to-b from-emerald-500/15 via-transparent to-transparent rounded-xl" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError(false)
                }}
                placeholder="Password"
                autoFocus
                className={`relative w-full bg-[#0c0c0c]/80 backdrop-blur-xl border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  passwordError
                    ? "border-red-500/40 focus:ring-red-500/30"
                    : "border-white/[0.08] focus:ring-emerald-500/30 focus:border-emerald-500/30"
                }`}
              />
            </div>

            <AnimatePresence>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 text-center"
                >
                  Incorrect password
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-colors text-sm relative overflow-hidden group"
            >
              <span className="relative z-10">Unlock</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </form>
        </motion.div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-[100dvh] bg-[#050505] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <span className="text-xs text-neutral-600 tracking-wider uppercase">Loading projects...</span>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-[100dvh] bg-[#050505] relative px-4 py-10 overflow-hidden">
      {/* Atmospheric layers */}
      <div className="fixed inset-0 pointer-events-none select-none">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/[0.05] blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Header with logos */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="relative w-9 h-9 opacity-80">
            <Image src="/assets/atit-logo.png" alt="ATiT" fill className="object-contain" />
          </div>
          <div className="h-5 w-px bg-white/[0.1]" />
          <div className="relative w-16 h-7 opacity-80">
            <Image src="/assets/events/extru-white.png" alt="EXTRU 2026" fill className="object-contain" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title */}
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-emerald-400 mb-3 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              Leaderboard
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Project <span className="text-emerald-400">Ratings</span>
            </h1>
            <p className="text-xs text-neutral-500 mt-2">
              {projects.length} project{projects.length !== 1 ? "s" : ""} &middot; {projects.reduce((s, p) => s + p.totalRatings, 0)} total ratings
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-none">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={`whitespace-nowrap text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  sortBy === opt.key
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : "bg-white/[0.03] border-white/[0.06] text-neutral-500 hover:text-neutral-300 hover:border-white/[0.12]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Projects List */}
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <svg className="w-7 h-7 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                </svg>
              </div>
              <p className="text-sm text-neutral-600">No projects yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={`/extru/projects/${project.id}`}
                    className="block relative group"
                  >
                    {/* Rank badge for top 3 */}
                    {sortBy === "rating" && index < 3 && project.totalRatings > 0 && (
                      <div className={`absolute -left-1 -top-1 z-20 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${
                        index === 0
                          ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                          : index === 1
                          ? "bg-neutral-400/20 border-neutral-400/30 text-neutral-300"
                          : "bg-amber-700/20 border-amber-700/30 text-amber-600"
                      }`}>
                        {index + 1}
                      </div>
                    )}

                    <div className="relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/[0.05] rounded-xl overflow-hidden hover:border-emerald-500/20 transition-all duration-300 group-hover:bg-[#0e0e0e]">
                      <div className="flex items-center gap-4 p-4">
                        {/* Project image or placeholder */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.03] border border-white/[0.06]">
                          {project.image_url ? (
                            <img
                              src={project.image_url}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-xs text-neutral-600 truncate mt-0.5">
                            {project.description}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex-shrink-0 text-right">
                          {project.totalRatings > 0 ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 justify-end">
                                <span className="text-lg font-black text-white tabular-nums">
                                  {project.averageRating}
                                </span>
                                <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </div>
                              <p className="text-[10px] text-neutral-600 tabular-nums">
                                {project.totalRatings} vote{project.totalRatings !== 1 ? "s" : ""}
                              </p>
                            </div>
                          ) : (
                            <span className="text-[10px] text-neutral-700 uppercase tracking-wider">No ratings</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="relative w-5 h-5 opacity-40">
            <Image src="/assets/atit-logo.png" alt="ATiT" fill className="object-contain" />
          </div>
          <span className="text-[10px] text-neutral-700 tracking-wider uppercase">
            ATiT &middot; Faculty of Technology
          </span>
        </motion.div>
      </div>
    </main>
  )
}
