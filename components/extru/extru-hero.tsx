"use client"

import { motion } from "framer-motion"
import { navData } from "@/data"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"

interface ExtruHeroProps {
  eventData: {
    name: string
    tagline: string
    dates: string
    venue: string
    description: string
    attendees?: string | number
    projectsCount?: number
  }
}

export function ExtruHero({ eventData }: ExtruHeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6 z-10 flex flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-6 sm:gap-8 mb-8 sm:mb-12"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex items-center justify-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img src={navData.extruLogo.src} alt="EXTRU Logo" className="w-full h-full object-contain drop-shadow-lg" />
        </div>

        <div className="text-2xl sm:text-3xl text-muted-foreground/50 font-light hidden sm:block">×</div>

        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex items-center justify-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img src={navData.logo.src} alt="ATiT Logo" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Event Completed Successfully
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 inline-block pb-1 sm:pb-2">
              EXTRU 2026
            </span>
            <br />
            <span className="text-foreground text-2xl sm:text-4xl md:text-5xl">
              Recap & Highlights
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
            {eventData.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 md:gap-12"
        >
          {[
            { icon: Calendar, label: "Date", value: "Mar 6-7" },
            { icon: MapPin, label: "Venue", value: "FOT, RUSL" },
            { icon: Users, label: "Visitors", value: eventData.attendees ? (String(eventData.attendees).endsWith("+") ? String(eventData.attendees) : `${eventData.attendees}+`) : "500+" },
            { icon: Trophy, label: "Projects", value: eventData.projectsCount ? `${eventData.projectsCount}+` : "20+" },
          ].map((stat, i) => (
            <div key={i} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-card border border-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl shrink-0">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400" />
                <div className={`absolute inset-0 opacity-20 blur-xl ${i === 0 ? "bg-emerald-500" : i === 1 ? "bg-teal-500" : i === 2 ? "bg-cyan-500" : "bg-blue-500"}`} />
              </div>
              <div className="sm:mt-3 text-left sm:text-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground block leading-tight">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-foreground">{stat.value}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 sm:mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-muted-foreground uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 sm:h-12 bg-gradient-to-b from-emerald-500/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}