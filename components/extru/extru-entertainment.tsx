"use client"

import { motion } from "framer-motion"
import { extruData } from "@/data/extru-data"
import { Gamepad2, Activity, Joystick, Brain } from "lucide-react"

// Icon mapper
const IconMap: Record<string, any> = {
  Gamepad2,
  Activity,
  Joystick,
  Brain,
}

export function ExtruEntertainment() {
  return (
    <section className="py-24 px-6 relative z-10 bg-black/40 border-y border-white/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400 mb-4 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              Experience
            </span>
            <h2 className="text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
              Entertainment <br />
              <span className="text-muted-foreground">&</span> Interactive
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              It's not just about viewing projects. At our zone, you can play, compete, and interact with technology in fun, immersive ways.
            </p>
            
          </motion.div>

          {/* Entertainment item layout */}
          <div className="md:w-2/3 w-full">
            {extruData.entertainment.map((item, i) => {
              const Icon = IconMap[item.icon] || Gamepad2
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group overflow-hidden rounded-3xl bg-card border border-white/10 p-8 hover:border-cyan-500/40 transition-all duration-300 shadow-xl"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-between">
                    
                    <div className="flex flex-col gap-6 w-full">
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg">
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                          {item.type}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-3 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                      </div>
                      
                      {item.link && (
                        <div className="mt-4">
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95"
                          >
                            <Gamepad2 className="w-5 h-5" />
                            Register Now
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
