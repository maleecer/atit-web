"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, Users, Clock, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"

export type EventStatus = 'upcoming' | 'open' | 'closed' | 'past'

export interface EventDetail {
  id: number
  title: string
  date: string
  category: string
  image: string
  description: string
  status: EventStatus
  fullDescription?: string
  venue?: string
  time?: string
  organizer?: string
  highlights?: string[]
  gallery?: string[]
  registrationLink?: string
}

interface EventDetailModalProps {
  event: EventDetail | null
  isOpen: boolean
  onClose: () => void
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [event?.id])

  if (!event) return null

  const galleryImages = event.gallery?.length ? event.gallery : [event.image]

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
                      alt={event.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Cinematic gradient overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent z-10 pointer-events-none opacity-80" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                      {event.category}
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
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{event.title}</h2>

                  {/* Event Info Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-muted/50 border border-border rounded-lg">
                      <Calendar className="w-4 h-4 text-accent mb-1.5" />
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Date</p>
                      <p className="text-sm text-foreground font-medium">{event.date}</p>
                    </div>
                    {event.time && (
                      <div className="p-3 bg-muted/50 border border-border rounded-lg">
                        <Clock className="w-4 h-4 text-accent mb-1.5" />
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Time</p>
                        <p className="text-sm text-foreground font-medium">{event.time}</p>
                      </div>
                    )}
                    {event.venue && (
                      <div className="p-3 bg-muted/50 border border-border rounded-lg">
                        <MapPin className="w-4 h-4 text-accent mb-1.5" />
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Venue</p>
                        <p className="text-sm text-foreground font-medium">{event.venue}</p>
                      </div>
                    )}
                    {event.organizer && (
                      <div className="p-3 bg-muted/50 border border-border rounded-lg">
                        <Users className="w-4 h-4 text-accent mb-1.5" />
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Organizer</p>
                        <p className="text-sm text-foreground font-medium">{event.organizer}</p>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border mb-6" />

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.fullDescription || event.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {event.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-accent font-mono text-sm mt-0.5">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-muted-foreground text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dynamic Registration Button */}
                  <div className="flex gap-3 mt-8">
                    {event.status === 'past' && (
                      <div className="w-full py-3 px-4 bg-muted text-muted-foreground font-semibold rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                        Event Ended
                      </div>
                    )}
                    {event.status === 'closed' && (
                      <div className="w-full py-3 px-4 bg-muted text-muted-foreground font-semibold rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                        Registration Closed
                      </div>
                    )}
                    {event.status === 'upcoming' && (
                      <div className="w-full py-3 px-4 bg-muted/50 border border-dashed border-border text-muted-foreground font-semibold rounded-lg flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        Coming Soon
                      </div>
                    )}
                    {event.status === 'open' && (
                      <motion.a
                        href={event.registrationLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-accent text-accent-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
                      >
                        Register Now
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.a>
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
