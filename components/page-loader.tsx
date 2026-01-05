"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PageLoader() {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 100)

        // Hide loader after animation completes
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-100 bg-background flex items-center justify-center overflow-hidden"
                >
                    {/* Animated grid background */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                                backgroundSize: "50px 50px",
                            }}
                        />
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                                backgroundSize: "50px 50px",
                            }}
                            animate={{
                                x: [0, 50],
                                y: [0, 50],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>

                    {/* Orbiting rings */}
                    <div className="absolute">
                        <motion.div
                            className="w-48 h-48 rounded-full border border-accent/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 w-48 h-48 rounded-full border border-secondary/20"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute -inset-8 rounded-full border border-dashed border-muted-foreground/10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Scanning lines */}
                    <motion.div
                        className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
                        animate={{
                            top: ["0%", "100%", "0%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-secondary/50 to-transparent"
                        animate={{
                            left: ["0%", "100%", "0%"],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Main loader content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        {/* Logo container with effects */}
                        <motion.div
                            className="relative mb-8"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-accent/30 blur-2xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Logo */}
                            <motion.div
                                className="relative w-24 h-24 rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(var(--accent), 0.2)",
                                        "0 0 40px rgba(var(--accent), 0.4)",
                                        "0 0 20px rgba(var(--accent), 0.2)",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <motion.img
                                    src="/assets/atit-logo-rounded.png"
                                    alt="ATIT Logo"
                                    className="w-full h-full object-contain p-2"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>

                            {/* Corner accents */}
                            <motion.div
                                className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                                className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            />
                            <motion.div
                                className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                            />
                        </motion.div>

                        {/* Brand name */}
                        <motion.div
                            className="mb-6 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <h1 className="text-2xl font-bold tracking-tight text-foreground text-center">
                                ATi<span className="text-accent">T</span>
                            </h1>
                            <motion.p
                                className="text-xs text-muted-foreground uppercase tracking-[0.3em] mt-2 text-center"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Loading
                            </motion.p>
                        </motion.div>

                        {/* Progress bar */}
                        <motion.div
                            className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden"
                            initial={{ opacity: 0, scaleX: 0.5 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.div
                                className="h-full bg-linear-to-r from-accent via-secondary to-accent rounded-full"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </motion.div>

                        {/* Binary/tech text decoration */}
                        <motion.div
                            className="mt-6 flex gap-2 text-[10px] text-muted-foreground/30 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {["01", "10", "11", "00", "01"].map((binary, i) => (
                                <motion.span
                                    key={i}
                                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                >
                                    {binary}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-accent/40"
                            initial={{
                                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                            }}
                            animate={{
                                y: [null, -100],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
