"use client"

import { motion } from "framer-motion"
import { extruData } from "@/data/extru-data"
import { Lightbulb, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

export function ExtruProjects() {
  const router = useRouter()
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 w-full overflow-hidden bg-black/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm">
            <Lightbulb className="w-3.5 h-3.5" />
            Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
            Projects Showcased
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Explore the innovative projects that our talented students presented at the Faculty of Technology Exhibition 2026.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative">
            {extruData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => router.push(`/projects?id=${project.id + 100}`)}
                className="group relative h-full flex flex-col cursor-pointer"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/50 via-cyan-500/30 to-blue-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />

                <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden h-full flex flex-col hover:border-emerald-500/50 transition-colors duration-500 shadow-2xl z-10">
                  <div className="relative h-44 sm:h-56 overflow-hidden bg-muted/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80 z-10" />
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50 flex justify-between items-center group-hover:border-emerald-500/30 transition-colors duration-300">
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                        ATiT Student Project
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}