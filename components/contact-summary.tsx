"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { socialLinks as siteSocialLinks } from "@/lib/seo-config"

export function ContactSummary() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-background">
            {/* Background accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] opacity-[0.03] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
                    >
                        Connect With Us
                    </motion.span>

                    <h2 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground tracking-tight">
                        Have a project in mind? <br />
                        <span className="text-muted-foreground">Let's build something great.</span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                        Whether you have a question about our events, want to collaborate on a project, or just want to say hi, we're always open to new connections.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                        <Link
                            href="/contact"
                            className="px-10 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-foreground/10"
                        >
                            Get in Touch
                        </Link>

                        <a
                            href="mailto:atit@tec.rjt.ac.lk"
                            className="text-foreground font-semibold hover:text-muted-foreground transition-all flex items-center gap-2 group"
                        >
                            atit@tec.rjt.ac.lk
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="flex items-center justify-center gap-8">
                        {Object.entries(siteSocialLinks).map(([name, href], index) => (
                            <motion.a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -2 }}
                                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium uppercase tracking-widest"
                            >
                                {name}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Decorative lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent" />
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent" />
            </div>
        </section>
    )
}
