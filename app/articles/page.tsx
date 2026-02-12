"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"

export default function ArticlesPage() {
    return (
        <main className="min-h-screen bg-background relative">
            <PageBackground />
            <Navigation />

            <section className="pt-32 pb-20 px-6 relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-10"
                    >
                        <motion.div
                            animate={{ y: [-8, 8, -8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative inline-block"
                        >
                            {/* Glowing ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-foreground/20 flex items-center justify-center"
                            >
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="w-24 h-24 rounded-full border border-foreground/10 flex items-center justify-center"
                                >
                                    <svg
                                        className="w-10 h-10 text-foreground/60"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                                        />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            {/* Decorative floating particles */}
                            <motion.div
                                animate={{ y: [-15, 5, -15], x: [-5, 10, -5], opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-2 -right-3 w-3 h-3 rounded-full bg-foreground/20"
                            />
                            <motion.div
                                animate={{ y: [10, -10, 10], x: [5, -8, 5], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-1 -left-4 w-2 h-2 rounded-full bg-foreground/30"
                            />
                            <motion.div
                                animate={{ y: [5, -12, 5], x: [-3, 6, -3], opacity: [0.2, 0.6, 0.2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute top-4 -left-6 w-2.5 h-2.5 rounded-full bg-foreground/15"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Label */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
                    >
                        Stay Tuned
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl sm:text-7xl font-bold mb-6 text-foreground tracking-tight"
                    >
                        Articles
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4"
                    >
                        We&apos;re crafting insightful articles on technology, innovation, and the latest trends in IT.
                    </motion.p>

                    {/* Coming Soon badge - highlighted */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.6, type: "spring", stiffness: 200 }}
                        className="mb-12 mt-2"
                    >
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 30px rgba(255,255,255,0.1), 0 0 60px rgba(255,255,255,0.05)",
                                    "0 0 50px rgba(255,255,255,0.25), 0 0 100px rgba(255,255,255,0.1)",
                                    "0 0 30px rgba(255,255,255,0.1), 0 0 60px rgba(255,255,255,0.05)",
                                ],
                                scale: [1, 1.03, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 border-2 border-foreground/30 backdrop-blur-sm"
                        >
                            {/* Pulsing dot */}
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/60 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground/80" />
                            </span>
                            <span className="text-xl sm:text-2xl font-extrabold tracking-[0.15em] uppercase text-foreground">
                                Coming Soon
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-12"
                    />

                    {/* Submit your article CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="max-w-xl mx-auto mb-14"
                    >
                        <motion.div
                            whileHover={{ y: -4, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative bg-card border border-border rounded-2xl p-8 group hover:border-foreground/30 transition-all overflow-hidden"
                        >
                            {/* Subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-foreground/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center gap-4">
                                {/* Icon */}
                                <motion.div
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-14 h-14 rounded-xl bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/15 transition-colors"
                                >
                                    <svg className="w-7 h-7 text-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </motion.div>

                                {/* Text */}
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-foreground mb-2">Got an Article to Share?</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                                        If you have insightful articles on technology, innovation, or IT trends, we&apos;d love to feature them. Send us your work!
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <motion.a
                                    href="/contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 mt-2 px-8 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:shadow-lg hover:shadow-foreground/20 transition-shadow"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    Submit Your Article
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Preview cards skeleton */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
                    >
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                className="bg-card border border-border rounded-xl p-5 group hover:border-foreground/20 transition-all"
                            >
                                {/* Skeleton thumbnail */}
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                                    className="w-full h-24 rounded-lg bg-muted mb-4"
                                />
                                {/* Skeleton lines */}
                                <motion.div
                                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 + 0.2 }}
                                    className="space-y-2"
                                >
                                    <div className="h-3 bg-muted rounded-full w-full" />
                                    <div className="h-3 bg-muted rounded-full w-3/4" />
                                    <div className="h-2 bg-muted rounded-full w-1/2 mt-3" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
