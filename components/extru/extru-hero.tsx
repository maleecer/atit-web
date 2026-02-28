"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { extruData } from "@/data/extru-data"
import { navData } from "@/data"

export function ExtruHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // March 6, 2026 09:00:00 AM
    const targetDate = new Date("2026-03-06T09:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    const timerInterval = setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => clearInterval(timerInterval)
  }, [])

  return (
    <section className="relative pt-40 pb-20 px-6 z-10 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Logos */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-8 mb-12"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center justify-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img src={navData.extruLogo.src} alt="EXTRU Logo" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
        
        <div className="text-3xl text-muted-foreground/50 font-light hidden sm:block">×</div>
        
        <div className="w-24 h-24 md:w-32 md:h-32 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center justify-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img src={navData.logo.src} alt="ATiT Logo" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {extruData.event.dates} • {extruData.event.venue}
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tighter">
            <span className="text-foreground">ATiT is Ready for </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 inline-block drop-shadow-sm pb-2">
              EXTRU 2026
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            {extruData.event.description}
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="w-20 h-24 md:w-28 md:h-32 bg-card border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl">
                <div className="absolute top-0 w-full h-1/2 bg-white/[0.02] border-b border-black/20" />
                <span className="text-4xl md:text-6xl font-bold font-mono text-foreground z-10 shadow-black drop-shadow-md">
                  {String(item.value).padStart(2, '0')}
                </span>
                
                {/* Glow behind numbers */}
                <div className={`absolute inset-0 opacity-20 blur-xl ${
                  i === 0 ? "bg-emerald-500" :
                  i === 1 ? "bg-teal-500" :
                  i === 2 ? "bg-cyan-500" : "bg-blue-500"
                }`} />
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground mt-4">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Discover</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-emerald-500/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
