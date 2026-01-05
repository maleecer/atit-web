"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

export interface ProjectDetail {
    id: number
    title: string
    category: string
    description: string
    image: string
    tags: string[]
    fullDescription?: string
    features?: string[]
    technologies?: string[]
    gallery?: string[]
    links?: {
        demo?: string
        github?: string
    }
    team?: string[]
}

interface ProjectDetailModalProps {
    project: ProjectDetail | null
    isOpen: boolean
    onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (!project) return null

    const galleryImages = project.gallery?.length ? project.gallery : [project.image]

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Close button */}
                        <motion.button
                            onClick={onClose}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                            {/* Left: Image carousel */}
                            <div className="lg:w-1/2 relative bg-muted">
                                <div className="aspect-video lg:aspect-auto lg:h-full relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImageIndex}
                                            src={galleryImages[currentImageIndex]}
                                            alt={project.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Image overlay gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />

                                    {/* Category badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-foreground text-background text-xs font-bold uppercase tracking-wider rounded-full">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Navigation arrows */}
                                    {galleryImages.length > 1 && (
                                        <>
                                            <motion.button
                                                onClick={prevImage}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </motion.button>
                                            <motion.button
                                                onClick={nextImage}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.button>
                                        </>
                                    )}

                                    {/* Image counter */}
                                    {galleryImages.length > 1 && (
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {galleryImages.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? "bg-foreground w-6" : "bg-foreground/40 hover:bg-foreground/60"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto custom-scrollbar">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    {/* Title */}
                                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{project.title}</h2>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full border border-border"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-border mb-6" />

                                    {/* Description */}
                                    <div className="mb-6">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">About</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.fullDescription || project.description}
                                        </p>
                                    </div>

                                    {/* Features */}
                                    {project.features && project.features.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                                Key Features
                                            </h3>
                                            <ul className="space-y-2">
                                                {project.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <span className="text-foreground font-mono text-sm mt-0.5">
                                                            {String(idx + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className="text-muted-foreground text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Technologies */}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                                Technologies
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1.5 bg-foreground/5 text-foreground text-xs font-medium rounded-lg border border-border"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Team */}
                                    {project.team && project.team.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                                Team
                                            </h3>
                                            <p className="text-muted-foreground text-sm">{project.team.join(", ")}</p>
                                        </div>
                                    )}

                                    {/* Links */}
                                    <div className="flex gap-3 mt-8">
                                        {project.links?.demo && (
                                            <motion.a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 py-3 px-4 bg-foreground text-background font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                View Demo
                                            </motion.a>
                                        )}
                                        {project.links?.github && (
                                            <motion.a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 py-3 px-4 bg-muted text-foreground font-semibold rounded-lg flex items-center justify-center gap-2 border border-border hover:bg-muted/80 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                Source Code
                                            </motion.a>
                                        )}
                                        {!project.links?.demo && !project.links?.github && (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-3 px-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
                                            >
                                                Request More Info
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
