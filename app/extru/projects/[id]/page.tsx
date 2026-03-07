"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getProject, rateProject } from "@/app/actions/extru-projects"
import { useParams } from "next/navigation"
import Image from "next/image"

interface ProjectData {
  id: string
  name: string
  description: string
  image_url: string | null
  averageRating: number
  totalRatings: number
}

function StarRating({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (v: number) => void
  disabled: boolean
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hovered || value)
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange(star)}
            onMouseEnter={() => !disabled && setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onTouchStart={() => !disabled && onChange(star)}
            className="relative p-1.5 transition-transform duration-200 active:scale-90 disabled:cursor-default touch-manipulation"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-10 h-10 sm:w-11 sm:h-11"
              animate={active ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <defs>
                <linearGradient id={`starGrad-${star}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={active ? "#34d399" : "transparent"} />
                  <stop offset="100%" stopColor={active ? "#10b981" : "transparent"} />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#starGrad-${star})`}
                stroke={active ? "#34d399" : "rgba(255,255,255,0.12)"}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </motion.svg>
          </button>
        )
      })}
    </div>
  )
}

export default function ProjectRatingPage() {
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [selectedRating, setSelectedRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const data = await getProject(projectId)
      if (!data) {
        setNotFound(true)
      } else {
        setProject(data)
      }
      setLoading(false)
    }
    load()
  }, [projectId])

  async function handleSubmit() {
    if (selectedRating === 0 || submitting) return
    setSubmitting(true)
    setSubmitError(null)

    const result = await rateProject(projectId, selectedRating, feedback || undefined)
    if (result.error) {
      setSubmitError(result.error)
      setSubmitting(false)
      return
    }

    const updated = await getProject(projectId)
    if (updated) setProject(updated)
    setSubmitted(true)
    setSubmitting(false)
  }

  // --- Loading State ---
  if (loading) {
    return (
      <main className="min-h-[100dvh] bg-[#050505] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <span className="text-xs text-neutral-600 tracking-wider uppercase">Loading project...</span>
        </motion.div>
      </main>
    )
  }

  // --- Not Found State ---
  if (notFound) {
    return (
      <main className="min-h-[100dvh] bg-[#050505] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Project Not Found</h1>
          <p className="text-sm text-neutral-500">This project may have been removed or the link is invalid.</p>
        </motion.div>
      </main>
    )
  }

  // --- Main Rating UI ---
  return (
    <main className="min-h-[100dvh] bg-[#050505] relative flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Atmospheric layers */}
      <div className="fixed inset-0 pointer-events-none select-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/[0.06] blur-[140px] rounded-full" />
        <div className="absolute bottom-[15%] left-[20%] w-[300px] h-[300px] bg-cyan-500/[0.03] blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {/* ATiT Logo */}
          <div className="relative w-10 h-10 opacity-80">
            <Image
              src="/assets/atit-logo.png"
              alt="ATiT"
              fill
              className="object-contain"
            />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-white/[0.1]" />

          {/* EXTRU Logo */}
          <div className="relative w-20 h-8 opacity-80">
            <Image
              src="/assets/events/extru-white.png"
              alt="EXTRU 2026"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Project Card */}
        <div className="relative">
          {/* Card border glow */}
          <div className="absolute -inset-px bg-gradient-to-b from-emerald-500/20 via-white/[0.03] to-transparent rounded-2xl" />

          <div className="relative bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/[0.04] rounded-2xl overflow-hidden">
            {/* Top accent stripe */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

            {/* Project Image (if available) */}
            {project!.image_url && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="relative w-full h-44 overflow-hidden"
              >
                <img
                  src={project!.image_url}
                  alt={project!.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade to card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/30 to-transparent" />
              </motion.div>
            )}

            <div className="p-6 sm:p-7">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-7"
              >
                <h1 className="text-2xl font-black text-white tracking-tight leading-tight mb-3">
                  {project!.name}
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {project!.description}
                </p>
              </motion.div>

              {/* Stats Row */}
              {project!.totalRatings > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mb-7 pb-5 border-b border-white/[0.06]"
                >
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-lg font-black text-white tabular-nums">{project!.averageRating}</span>
                    <span className="text-xs text-neutral-600">/5</span>
                  </div>
                  <div className="h-4 w-px bg-white/[0.08]" />
                  <span className="text-xs text-neutral-500">
                    {project!.totalRatings} {project!.totalRatings === 1 ? "rating" : "ratings"}
                  </span>
                </motion.div>
              )}

              {/* Rating Section */}
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="rate"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-[0.15em] mb-4">
                        Rate this project
                      </p>
                      <div className="flex justify-center">
                        <StarRating
                          value={selectedRating}
                          onChange={setSelectedRating}
                          disabled={submitting}
                        />
                      </div>
                      {selectedRating > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-xs text-emerald-400/70 mt-3 font-medium"
                        >
                          {selectedRating === 1 && "Needs work"}
                          {selectedRating === 2 && "Fair enough"}
                          {selectedRating === 3 && "It's good!"}
                          {selectedRating === 4 && "Really great!"}
                          {selectedRating === 5 && "Outstanding! 🔥"}
                        </motion.p>
                      )}
                    </div>

                    {/* Optional Feedback */}
                    <AnimatePresence>
                      {selectedRating > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="feedback"
                                className="text-[11px] font-bold text-neutral-500 uppercase tracking-[0.12em]"
                              >
                                Feedback
                              </label>
                              <span className="text-[10px] text-neutral-700">Optional</span>
                            </div>
                            <textarea
                              id="feedback"
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              maxLength={500}
                              rows={2}
                              placeholder="Share your thoughts about this project..."
                              disabled={submitting}
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all duration-300 resize-none leading-relaxed disabled:opacity-50"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {submitError && (
                      <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/15 rounded-lg px-3 py-2">
                        {submitError}
                      </p>
                    )}

                    <motion.button
                      onClick={handleSubmit}
                      disabled={selectedRating === 0 || submitting}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 text-sm tracking-wide relative overflow-hidden group ${
                        selectedRating > 0
                          ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                          : "bg-white/[0.04] text-neutral-600 cursor-not-allowed"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          "Submit Rating"
                        )}
                      </span>
                      {selectedRating > 0 && (
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      )}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center py-4 space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
                    >
                      <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <div>
                      <h2 className="text-lg font-bold text-white mb-1">Thank You!</h2>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Your {selectedRating}-star rating has been recorded.
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2">
                      <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-bold text-white tabular-nums">{project!.averageRating}</span>
                      <span className="text-[10px] text-neutral-600">
                        ({project!.totalRatings} {project!.totalRatings === 1 ? "rating" : "ratings"})
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer with logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <div className="relative w-6 h-6 opacity-40">
            <Image
              src="/assets/atit-logo.png"
              alt="ATiT"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-neutral-700 tracking-wider uppercase">
            ATiT &middot; Faculty of Technology
          </span>
        </motion.div>
      </motion.div>
    </main>
  )
}
