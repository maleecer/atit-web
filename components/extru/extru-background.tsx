"use client"

import { motion } from "framer-motion"

export function ExtruBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top emerald glimpse gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] opacity-[0.08] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top, #10b981 0%, transparent 70%)",
        }}
      />
      
      {/* Bottom cyan glimpse gradient */}
      <div
        className="absolute bottom-0 right-0 w-full max-w-[800px] h-[500px] opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom right, #06b6d4 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0" 
        style={{ 
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Subtle dots at intersections */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(16,185,129,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "-0.5px -0.5px"
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 60, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 -right-32 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.02) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Diagonal scan lines */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent rotate-12 origin-left" />
        <div className="absolute top-2/4 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent -rotate-6 origin-left" />
      </div>
    </div>
  )
}
