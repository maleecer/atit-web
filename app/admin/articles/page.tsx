"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageBackground } from "@/components/page-background"
import { Navigation } from "@/components/navigation"
import { createClient } from "@/utils/supabase/client"

export default function AdminArticlesLogin() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message || "Failed to sign in")
      setLoading(false)
      return
    }

    router.push("/admin/articles/dashboard")
  }

  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground variant="combined" />
      <Navigation />

      <section className="pt-32 pb-20 px-6 relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-foreground/10 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Sign in with your admin account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-foreground/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50 mb-3"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-background border ${
                    error ? "border-red-500" : "border-border"
                  } focus:border-foreground/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50`}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </motion.button>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            <a href="/" className="hover:text-foreground transition-colors">← Back to Home</a>
          </p>
        </motion.div>
      </section>
    </main>
  )
}
