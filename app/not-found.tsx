"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <PageBackground />
            <Navigation />

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/20 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-24 h-24 border border-secondary/20"
                    animate={{
                        rotate: [0, -360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-accent/5 rounded-lg"
                    animate={{
                        y: [-20, 20, -20],
                        rotate: [0, 45, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/3 w-20 h-20 border-2 border-dashed border-muted-foreground/10 rounded-full"
                    animate={{
                        rotate: [360, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Main content */}
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Glitchy 404 text */}
                    <motion.div
                        className="relative mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground via-muted-foreground to-foreground/50 select-none"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            404
                        </motion.h1>

                        {/* Glitch layers */}
                        <motion.span
                            className="absolute inset-0 text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-accent/20 select-none"
                            animate={{
                                x: [-2, 2, -2],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                        >
                            404
                        </motion.span>
                        <motion.span
                            className="absolute inset-0 text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-secondary/20 select-none"
                            animate={{
                                x: [2, -2, 2],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3, delay: 0.1 }}
                        >
                            404
                        </motion.span>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                            Oops! Lost in the digital void
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                            The page you're looking for has vanished into the matrix.
                            Let's get you back on track.
                        </p>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/20 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Back to Home
                            </motion.button>
                        </Link>

                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:border-foreground/30 hover:bg-muted/50 transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact Us
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Fun interactive element */}
                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.p
                            className="text-xs text-muted-foreground/50 uppercase tracking-widest"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            Error Code: PAGE_NOT_FOUND
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Animated scan line effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    background: "linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.02) 50%)",
                    backgroundSize: "100% 4px",
                }}
            />
            <motion.div
                className="absolute left-0 right-0 h-px bg-accent/10 pointer-events-none z-20"
                animate={{
                    top: ["0%", "100%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </main>
    )
}
