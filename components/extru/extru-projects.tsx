"use client"

import { motion } from "framer-motion"
import { extruData } from "@/data/extru-data"

export function ExtruProjects() {
  return (
    <section className="py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm">
            Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Our Innovations for EXTRU 2026
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the cutting-edge prototypes and projects built by ATiT students to solve real-world problems.
          </p>
        </motion.div>

        <div className="relative">
          {/* Ambient glow behind grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          {extruData.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {extruData.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative h-full flex flex-col"
                >
                  {/* Card glowing border */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/50 via-cyan-500/30 to-blue-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
                  
                  <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden h-full flex flex-col hover:border-emerald-500/50 transition-colors duration-500 shadow-2xl z-10">
                    
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-black/50">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80 z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground flex-grow leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mt-6 pt-6 border-t border-border/50 flex justify-between items-center group-hover:border-emerald-500/30 transition-colors duration-300">
                        <button className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-2">
                          Live Demo <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* "And More" Card placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: extruData.projects.length * 0.1 }}
                className="rounded-2xl border-2 border-dashed border-border/50 bg-card/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 min-h-[300px] hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <span className="text-2xl text-muted-foreground group-hover:text-emerald-400 font-light">+</span>
                </div>
                <h3 className="text-lg font-bold text-muted-foreground group-hover:text-foreground">More Projects</h3>
                <p className="text-sm text-center mt-2 opacity-50">Visit our stalls at EXTRU 2026 to see all 20+ projects live.</p>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto rounded-3xl border border-emerald-500/20 bg-card/30 backdrop-blur-xl p-12 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
                  Innovations <span className="text-emerald-400">Brewing</span>...
                </h3>
                
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                  Our smartest minds are currently building the prototypes. Check back soon for the official reveal of ATiT's showcase projects for EXTRU 2026!
                </p>
                
                <div className="mt-8 flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-300 uppercase tracking-widest">In Development</span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}
