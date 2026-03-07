"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react"
import { addProject } from "@/app/actions/extru-projects"
import Image from "next/image"

export default function AddProjectPage() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const qrCanvasRef = useRef<HTMLDivElement>(null)

  const siteUrl = typeof window !== "undefined" ? window.location.origin : ""

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be under 5MB")
        return
      }
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  function removePhoto() {
    setPhotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await addProject(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    setProjectName(formData.get("name") as string)
    setProjectId(result.id!)
    setLoading(false)
  }

  const downloadQR = useCallback(async () => {
    if (!projectId || !qrCanvasRef.current) return

    const qrSource = qrCanvasRef.current.querySelector("canvas")
    if (!qrSource) return

    const width = 600
    const height = 820
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")!

    // Background
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, width, height)

    // Subtle border
    ctx.strokeStyle = "rgba(16, 185, 129, 0.25)"
    ctx.lineWidth = 2
    ctx.roundRect(10, 10, width - 20, height - 20, 16)
    ctx.stroke()

    // Top accent line
    const grad = ctx.createLinearGradient(0, 12, width, 12)
    grad.addColorStop(0, "transparent")
    grad.addColorStop(0.5, "rgba(16, 185, 129, 0.6)")
    grad.addColorStop(1, "transparent")
    ctx.fillStyle = grad
    ctx.fillRect(10, 10, width - 20, 2)

    // Load and draw logos
    const loadImg = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })

    try {
      const [atitLogo, extruLogo] = await Promise.all([
        loadImg("/assets/atit-logo.png"),
        loadImg("/assets/events/extru-white.png"),
      ])

      // Draw ATiT logo (left of center)
      const logoY = 50
      const atitSize = 48
      const extruW = 100
      const extruH = 40
      const totalW = atitSize + 16 + 1 + 16 + extruW // logo + gap + divider + gap + logo
      const startX = (width - totalW) / 2

      ctx.drawImage(atitLogo, startX, logoY, atitSize, atitSize)

      // Divider line
      const dividerX = startX + atitSize + 16
      ctx.strokeStyle = "rgba(255,255,255,0.1)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(dividerX, logoY + 6)
      ctx.lineTo(dividerX, logoY + atitSize - 6)
      ctx.stroke()

      // Draw EXTRU logo
      ctx.drawImage(extruLogo, dividerX + 16, logoY + (atitSize - extruH) / 2, extruW, extruH)
    } catch {
      // If logos fail, just add text
      ctx.fillStyle = "rgba(255,255,255,0.6)"
      ctx.font = "bold 18px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("ATiT × EXTRU 2026", width / 2, 80)
    }

    // "SCAN TO RATE" label
    ctx.fillStyle = "rgba(52, 211, 153, 0.8)"
    ctx.font = "bold 11px sans-serif"
    ctx.textAlign = "center"
    ctx.letterSpacing = "4px"
    ctx.fillText("SCAN TO RATE", width / 2, 140)
    ctx.letterSpacing = "0px"

    // QR Code - white background
    const qrSize = 320
    const qrX = (width - qrSize - 40) / 2
    const qrY = 165
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.roundRect(qrX, qrY, qrSize + 40, qrSize + 40, 16)
    ctx.fill()

    // Draw QR from hidden canvas
    ctx.drawImage(qrSource, qrX + 20, qrY + 20, qrSize, qrSize)

    // Project name
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 22px sans-serif"
    ctx.textAlign = "center"
    const nameY = qrY + qrSize + 80
    ctx.fillText(projectName || "Project", width / 2, nameY)

    // Footer
    ctx.fillStyle = "rgba(255,255,255,0.15)"
    ctx.font = "10px sans-serif"
    ctx.fillText("ATiT · Faculty of Technology · Rajarata University", width / 2, height - 30)

    // Download
    const link = document.createElement("a")
    link.download = `${(projectName || "project").toLowerCase().replace(/\s+/g, "-")}-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [projectId, projectName, siteUrl])

  return (
    <main className="min-h-[100dvh] bg-[#050505] relative flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Layered atmospheric background */}
      <div className="fixed inset-0 pointer-events-none select-none">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/[0.07] blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] bg-cyan-500/[0.04] blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-emerald-400 mb-4 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm"
          >
            EXTRU 2026
          </motion.span>
          <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
            Register <span className="text-emerald-400">Project</span>
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Add your project and get a QR code for visitors to scan and rate.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!projectId ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="relative"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent rounded-2xl opacity-60" />

              <div className="relative bg-[#0c0c0c]/80 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-7 space-y-6">
                {/* Project Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]"
                  >
                    Project Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="e.g. Smart Glass Translator"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 focus:bg-white/[0.06] transition-all duration-300 text-sm"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="description"
                      className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]"
                    >
                      Short Description
                    </label>
                    <span className="text-[10px] text-neutral-600 tabular-nums">
                      {charCount}/300
                    </span>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    required
                    maxLength={300}
                    rows={3}
                    placeholder="Brief description of your project..."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 focus:bg-white/[0.06] transition-all duration-300 text-sm resize-none leading-relaxed"
                  />
                </div>

                {/* Photo Upload (Optional) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">
                      Project Photo
                    </label>
                    <span className="text-[10px] text-neutral-600">Optional</span>
                  </div>

                  {photoPreview ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group rounded-xl overflow-hidden border border-white/[0.08]"
                    >
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="text-xs font-bold text-red-400 bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-white/[0.08] hover:border-emerald-500/30 rounded-xl py-6 flex flex-col items-center gap-2 transition-all duration-300 hover:bg-emerald-500/[0.03] group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/[0.04] group-hover:bg-emerald-500/10 flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-neutral-600 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                        </svg>
                      </div>
                      <span className="text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        Tap to add a photo
                      </span>
                      <span className="text-[10px] text-neutral-700">
                        JPG, PNG — Max 5MB
                      </span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    name="photo"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* Error display */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-400 bg-red-500/10 border border-red-500/15 rounded-lg px-3 py-2.5"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all duration-300 text-sm tracking-wide"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Creating...
                      </>
                    ) : (
                      "Create & Generate QR"
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-b from-emerald-500/25 via-emerald-500/5 to-transparent rounded-2xl" />

              <div className="relative bg-[#0c0c0c]/80 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-7 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-bold tracking-wider uppercase">Project Created</span>
                </motion.div>

                <p className="text-xs text-neutral-500 leading-relaxed">
                  Print or display this QR code at your project stall for visitors to scan and rate.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center"
                >
                  <div className="bg-white p-5 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)]">
                    <QRCodeSVG
                      value={`${siteUrl}/extru/projects/${projectId}`}
                      size={200}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#0a0a0a"
                    />
                  </div>
                </motion.div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5">
                  <p className="text-[11px] text-neutral-500 break-all font-mono leading-relaxed">
                    {siteUrl}/extru/projects/{projectId}
                  </p>
                </div>

                {/* Hidden QR canvas for download rendering */}
                <div ref={qrCanvasRef} className="hidden">
                  <QRCodeCanvas
                    value={`${siteUrl}/extru/projects/${projectId}`}
                    size={320}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                  />
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadQR}
                  className="w-full flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-semibold py-3 rounded-xl transition-all duration-300 text-sm group"
                >
                  <svg className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download QR Card
                </button>

                <div className="h-px bg-white/[0.06]" />

                <button
                  onClick={() => {
                    setProjectId(null)
                    setError(null)
                    setCharCount(0)
                    setPhotoPreview(null)
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-semibold flex items-center gap-1.5 mx-auto"
                >
                  <span className="text-lg leading-none">+</span>
                  Add Another Project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  )
}
