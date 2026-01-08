"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
}

interface ProjectsPreviewProps {
  projects: Project[]
}

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
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
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-background relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Showcase of our innovative solutions and creations</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-colors group"
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              </div>

              {/* Project details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-xs font-semibold text-primary">
                    {project.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              Explore All Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
