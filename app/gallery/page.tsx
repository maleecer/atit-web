"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { galleryData } from "@/data"

export default function GalleryPage() {
  const [displayCount, setDisplayCount] = useState(6)
  const totalMax = 10
  const limitedData = galleryData.slice(0, totalMax)
  const visibleItems = limitedData.slice(0, displayCount)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <PageBackground />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Memories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-bold mb-6 text-foreground tracking-tight"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Moments from our events, projects, and community
          </motion.p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="relative h-72 rounded-2xl overflow-hidden bg-muted group cursor-pointer border border-border/50 hover:border-accent/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-semibold text-foreground">{item.alt}</p>
                      <div className="h-0.5 w-12 bg-accent mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {displayCount < limitedData.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 text-center"
            >
              <button
                onClick={() => setDisplayCount(prev => Math.min(prev + 3, totalMax))}
                className="px-8 py-4 bg-muted hover:bg-accent hover:text-accent-foreground text-foreground rounded-full font-semibold transition-all duration-300 border border-border hover:border-accent shadow-sm flex items-center gap-2 mx-auto group"
              >
                Show More
                <svg
                  className="w-4 h-4 transform group-hover:translate-y-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
