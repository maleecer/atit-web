"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { projectsData, extruData } from "@/data"
import { ProjectDetailModal, type ProjectDetail } from "@/components/project-detail-modal"

// Merge standard and EXTRU projects at module scope to avoid recalculation on render
const standardProjects: ProjectDetail[] = projectsData as ProjectDetail[]
const mappedExtruProjects: ProjectDetail[] = extruData.projects.map((p) => ({
  id: p.id + 100, // Offset IDs to avoid collision with standard projects
  title: p.title,
  category: "EXTRU",
  description: p.description,
  image: p.image,
  tags: p.tags,
  fullDescription: `${p.title} is an innovative project showcased at the EXTRU 2026 exhibition. ${p.description}`,
  features: [],
  technologies: p.tags,
  team: ["Faculty of Technology Students"],
  gallery: [p.image],
  links: p.links,
}))

const allProjects = [...standardProjects, ...mappedExtruProjects].sort((a, b) => b.id - a.id)

function ProjectsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", "Arduino", "EXTRU"]

  useEffect(() => {
    const projectId = searchParams.get("id")
    if (projectId) {
      const project = allProjects.find((p) => p.id === Number(projectId))
      if (project) {
        setSelectedProject(project)
        setIsModalOpen(true)
        if (project.category === "EXTRU") {
          setSelectedCategory("EXTRU")
        } else if (project.category === "Arduino") {
          setSelectedCategory("Arduino")
        }
      }
    }
  }, [searchParams])

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const handleProjectClick = (project: ProjectDetail) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
    
    // Clear search parameters when modal is closed
    const params = new URLSearchParams(searchParams.toString())
    params.delete("id")
    const newQuery = params.toString() ? `?${params.toString()}` : ""
    router.replace(`/projects${newQuery}`, { scroll: false })
  }

  const filteredProjects = selectedCategory === "All"
    ? allProjects
    : allProjects.filter((project) => project.category === selectedCategory)

  return (
    <>
      {/* Hero section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Our Work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-bold mb-6 text-foreground tracking-tight"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Innovative solutions and creative implementations by ATIT members
          </motion.p>
        </div>
      </section>

      {/* Filter buttons */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project)}
                className="rounded-2xl overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all group cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-foreground/90 backdrop-blur-sm text-xs font-semibold text-background">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground font-medium border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground variant="combined" />
      <Navigation />
      <Suspense fallback={<div className="pt-32 text-center text-muted-foreground">Loading projects...</div>}>
        <ProjectsContent />
      </Suspense>
    </main>
  )
}
