"use client"

import { motion } from "framer-motion"

export function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top glimpse gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top, rgba(255,255,255,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 -right-32 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Diagonal lines */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]">
        <div className="absolute top-20 left-0 w-[200%] h-px bg-white rotate-12 origin-left" />
        <div className="absolute top-1/3 left-0 w-[200%] h-px bg-white -rotate-12 origin-left" />
        <div className="absolute top-2/3 left-0 w-[200%] h-px bg-white rotate-6 origin-left" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-full h-full border-r border-t border-white/20" />
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.03]">
        <div className="absolute bottom-0 left-0 w-full h-full border-l border-b border-white/20" />
      </div>
    </div>
  )
}
